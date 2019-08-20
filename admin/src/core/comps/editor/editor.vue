<template>
    <div class="form-item">
        <label class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div fa LeEditor" >
            <div :ref="titleKey" style="text-align:left;border-bottom:1px solid #aeaeae"></div>
            <div :ref="textareaKey" class="editor__textarea" style="text-align:left"></div>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
        </div>
       
    </div>
</template>

<script>
import E from "wangeditor";
import Define from "../define.js";
import tool from "../leCompsTool.js";
export default {
    name: "editor",
    props: ["value", "option"],
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data() {
        return {
            titleKey:tool._idSeed.newId(),
            textareaKey:tool._idSeed.newId(),
            inheritAttrs: false, //控制attrs的属性不渲染到根元素上面
            validataComponentType: "EDitor",
            __editor: null,
            state: {
                showError: false,
                successIcon: ""
            }
        };
    },
    computed: {
        // onchangeTimeout(){
        //     return this.option && this.option.onchangeTimeout ? this.option.onchangeTimeout : "-1";
        // },
        imgUploadUrl() {
            return this.option && this.option.url ? this.option.url : null;
        },
        imgFname() {
            return this.option && this.option.fname ? this.option.fname : null;
        },
        menusConfig() {
            return this.option && this.option.menus ? this.option.menus : null;
        }
    },
    methods: {
        /**
         * @description 设置富文本的内容可以为html也可以是textarea
         * @params { String } val 内容
         */
        setValue(val) {
            this.__editor.txt.html(val);
        },
        /**
         * @description 获取富文本内的html文本
         */
        getValue() {
            let html = this.__editor.txt.html();
            if(html == "<p><br></p>"){
                return "";
            }
            return html;
        },
        /**
         * @description 获取富文本内的text文本
         */
        getText() {
            return this.__editor.txt.text();
        },
        /**
         * @description 清空富文本内的文本
         */
        clear() {
            this.setValue("");
        },

        /**
         * @description 上传图片自定义方法
         * @params cb 组件内部insert方法
         */
        uploadImg(files, cb) {
            if (!this.imgUploadUrl || !this.imgFname) {
                this.alert.showAlert("error", "上传url和fname必须配置!");
                return;
            }
            let file = files[0];
            let formData = new FormData();
            formData.append(this.imgFname, file);
            this.ajax.uploadFetch(this.imgUploadUrl, formData)
                .then(result => {
                    let url = this.option.analysis?this.option.analysis(result):result;
                    cb(url);
                })
                .catch(e => {
                    this.alert.showAlert("error", "上传异常");
                });
        },
        /**
         * @description 获取编译器的实例
         */
        getEditorDom() {
            return this.editor;
        }
    },
    mounted() {
        this.__editor = new E(this.$refs[this.titleKey], this.$refs[this.textareaKey]);
        // 配置菜单 - 默认可以展示所有菜单 如果需要设置 请修改option.menus 具体参见define.js
        this.__editor.customConfig.menus = this.menusConfig?this.menusConfig:Define.EDITOR_MENUS.DEFAULT_MENU;
        // 配置表情
        this.__editor.customConfig.emotions = Define.EDITOR_MENUS.DEFAULT_EMJOY;
        // onchange 会在无任何操作的 xxx 毫秒之后被触发  如果需要设置 请修改option.onchangeTimeout 默认值：-1 无延迟（设置延迟可能导致setvalue回写有问题）
        // this.__editor.customConfig.onchangeTimeout = this.onchangeTimeout;
        //监听事件onchange onblur
        this.__editor.customConfig.onchange = (html) => {
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        }
        this.__editor.customConfig.onblur = (html)=> {
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        }
        /*
            监听事件onchange onfocus onfocus
            this.__editor.customConfig.onchange = (html) => {
                this.changeEvent(html);
            }
            监听focus事件
            this.editor.customConfig.onfocus = () => {
                this.foucusEvent();
            }
            监听blur事件
            this.editor.customConfig.onblur = function (html) {
                this.blurEvent(html);
            }
        */
        // 配置自定义z_index
        this.__editor.customConfig.zIndex = "auto";
        // 自定义上传图片的方法
        this.__editor.customConfig.customUploadImg = (files, insert) => {
            this.uploadImg(files, insert);
        };
        this.__editor.create();
    },
    beforeDestroy(){
        
    }
};
</script>

<style scoped>
.LeEditor{
    border:1px solid #aeaeae;
    box-sizing:border-box;
    border-bottom: none;
}
.LeEditor .editor__textarea{
    height:90px;
    font-size:12px;
    line-height:30px;
}
	.form-item{
		text-align: left;
		margin:0 0 22px 0;
		display: inline-block;
        width: 100%;
	}

    .form-item .form-item-label{
        width: auto;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: normal;
        padding: 0;
        box-sizing: border-box;
        margin-bottom: 0;
    }

    .medium .form-item .form-item-label{
        line-height: normal;
        font-size: 14px;
        vertical-align: top;
    }
    .small .form-item .form-item-label{
        height: 34px;
        line-height: normal;
        font-size: 14px;
    }
    .mini .form-item .form-item-label{
        height: 28px;
        line-height: normal;
        font-size: 12px;
    }
    .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        width: 100%;
        position: relative;
        flex: 1;
    }

    form .form-item .form-item-div{
        position: relative;
        border:none;
    }


.LeEditor /deep/ .w-e-toolbar .w-e-droplist,.LeEditor /deep/ .w-e-text-container .w-e-panel-container{
  z-index: 1 !important;
}

form .form-item .form-item-div{
    border: 1px solid #aeaeae !important;
}

.form-item .promptMsg{
  margin: 0 auto;
    font-size: 12px;
    color: #f56c6c;
    line-height: 20px;
    text-align: left;
    position: absolute;
    bottom: -20px;
}

.form-item .form-item-label{
    height: auto;
    text-align: right;
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    color: #606266;
    line-height: normal;
    padding: 0;
    box-sizing: border-box;
    margin-bottom: 0;
}

.form-item .form-item-label.required::before {
    content: "*";
    color: #f56c6c;
    font-size: 12px;
    margin-right: 2px;
}
</style>
