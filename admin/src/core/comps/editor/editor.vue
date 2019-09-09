<template>
    <div class="form-item" :style="{height:_height,width:_width}">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div :id = "'_editor-'+titleKey" class="form-item-div fa LeEditor" >
            <div :ref="titleKey" style="text-align:left;border-bottom:1px solid #aeaeae"></div>
            <div :ref="textareaKey" class="editor__textarea" style="text-align:left"></div>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            <p class="tip" v-show="!state.showError">{{$attrs.tip}}</p>
        </div>
    </div>
</template>

<script>
import E from "wangeditor";
import define from "../define.js";
import tool from "../leCompsTool.js";
import $ from "jquery";
export default {
    name: "editor",
    props: ["value", "option","width","height"],
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
            },
            formLabelWidth:"0"
        };
    },
    computed: {
        _height(){
            if(this.height){
                return this.height + "px";
            }
            return "260px";
        },
        _width(){
            if(this.width){
                if(this.width.toString().indexOf('%') != -1){
                    return this.width;
                }
                return this.width + "px";
            }
            return "100%"
        },
        labelWidthVal(){
            if(this.$attrs.labelWidth){
                return this.$attrs.labelWidth;
            }
            if(this.formLabelWidth != 0){
                return this.formLabelWidth;
            }
            return define.LABELWIDTH;
        },
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
        },
        toggleViewsource(editorSelector){
            let editorHtml = this.getValue();
            let t = $(editorSelector + ' ._wangEditor_btn_viewsource').text()
            if($(editorSelector + ' ._wangEditor_btn_viewsource').text() == '源码'){
                editorHtml = editorHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
                $(editorSelector + ' ._wangEditor_btn_viewsource').text('返回');
            }else{
                editorHtml = this.getText().replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&nbsp;/ig, " ");
                $(editorSelector + ' ._wangEditor_btn_viewsource').text('源码');
            }
            this.__editor.txt.html(editorHtml);
            this.__editor.change && this.__editor.change();	//更新编辑器的内容
        },
        reset(){
            this.setValue("");
            this.$attrs.setStateByFlag(0);
        }
    },
    created(){
        let that = this;
        tool._form_event_publisher.on(that._uid,(data)=>{
            this.formLabelWidth = data;
        });
    },
    mounted() {
        this.__editor = new E(this.$refs[this.titleKey], this.$refs[this.textareaKey]);
        // 配置菜单 - 默认可以展示所有菜单 如果需要设置 请修改option.menus 具体参见define.js
        this.__editor.customConfig.menus = this.menusConfig?this.menusConfig:define.EDITOR_MENUS.DEFAULT_MENU;
        // 配置表情
        // this.__editor.customConfig.emotions = define.EDITOR_MENUS.DEFAULT_EMJOY;
        // onchange 会在无任何操作的 xxx 毫秒之后被触发  如果需要设置 请修改option.onchangeTimeout 默认值：-1 无延迟（设置延迟可能导致setvalue回写有问题）
        // this.__editor.customConfig.onchangeTimeout = this.onchangeTimeout;
        //监听事件onchange onblur
        this.__editor.customConfig.onchange = (html) => {
            this.$emit("change",html);
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        }
        this.__editor.customConfig.onblur = (html)=> {
            this.$emit("blur",html);
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
        // 增加富文本功能
        let editorSelector = '#_editor-'+this.titleKey;
        $(editorSelector + " .w-e-toolbar").prepend('<div class="w-e-menu"><span class="_wangEditor_btn_viewsource">源码</span></div>');
        $(editorSelector + " .w-e-toolbar").find("._wangEditor_btn_viewsource").on("click",() =>{
            this.toggleViewsource(editorSelector);
        })
    },
    beforeDestroy(){
        let editorSelector = '#_editor-'+this.titleKey;
        $(editorSelector + " .w-e-toolbar").find("._wangEditor_btn_viewsource").off("click");
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

form .form-item .form-item-div{
    height: 100%;
    position: relative;
    border: 1px solid #aeaeae !important;
}

.LeEditor /deep/ .w-e-toolbar .w-e-droplist,.LeEditor /deep/ .w-e-text-container .w-e-panel-container{
  z-index: 1 !important;
}

.LeEditor /deep/ ._wangEditor_btn_viewsource{
    font-size: 12px;
    color: #606266;
    float: left;
    margin-top: -1px;
}

.LeEditor /deep/ .w-e-toolbar .w-e-menu{
    padding: 5px 8px;
    cursor: pointer;
    float: left;
}

.LeEditor /deep/ .w-e-toolbar{
        display: block !important;
}

.LeEditor /deep/ .w-e-toolbar::after{
    content:".";display:block;height:0;clear:both;visibility:hidden
}

.LeEditor /deep/ .w-e-toolbar .w-e-menu{
    float: left;
    padding: 5px 7px;
}

</style>
