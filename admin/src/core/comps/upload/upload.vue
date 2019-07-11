<template>
    <div class="form-item upaload">
        <label class="form-item-label" :class="$attrs.on != undefined?'requireed':''">{{$attrs.label}}</label>
        <span  class="input-file">请选择
        <input @change="change" type="file" :ref="fkey" class="imgFile"></span>
        <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
        
        <div class="fileList" v-show="srcs.length>0">
            <span v-for="(item,index) in srcs" :key="index"><a target="_blank" :href="item">{{names[index]}}</a><i @click="removeItem(item)" class="fa fa-times"></i></span>
        </div>

        <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
    </div>
</template>

<script>
    export default {
        components: {},
        props:["options","value"],
        name: "LeUpload",
        inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
        data(){
            return {
                validataComponentType:"FileUpload",
                fkey:_idSeed.newId(),
                showLoading:false,
                srcs:[],
                names:[],
                state:{
                    showError:false,
                    successIcon:""
                }
            }
        },
        computed:{
            multiple(){
                return this.options.multiple?true:false;
            },
            fname(){
                return this.options.fname;
            },
            url(){
                return this.options.url;
            },
            completedCallback(){
                return this.options.completedCallback;
            },
            vtype(){
                return this.options.vtype?this.options.vtype:"";
            },
            size(){
                if(this.options.size){
                    let re = /^[0-9]+.?[0-9]*$/;
                    if (!re.test(this.size)) {
                        return 100;
            　　     }
                        return parseFloat(this.options.size);
                }else{
                    return 100;
                }
            },
        },
        watch:{
            value(val){
                this.setValue(val);
            }
        },
        methods:{
            /**
             * @description filechange事件
             * @returns
             */
            change(){
                let val = this.$refs[this.fkey].value;
                this.upload();
            },
            /**
             * @description 重置file-input的value，防止value一样的情况下再次点击file-input按钮不生效
             * @returns
             */
            reloadFileInput(){
                this.$refs[this.fkey].value = "";
            },
            /**
             * @description 上传的主体方法
             * @returns
             */
            upload(){
                if(!this.url || !this.fname){
                    this.alert.showAlert("error","上传url和fname必须配置!");
                    return;
                }
                let dom = this.$refs[this.fkey];
                let fileObj = dom.files[0];
                let formData = new FormData();
                formData.append(this.fname,fileObj);
                let fileName = fileObj.name;
                if(this.vtype){
                    var suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                    if(this.vtype.indexOf(suffix) == -1){
                        this.alert.showAlert("info","后缀名必须为:"+ this.vtype);
                        return;
                    }
                }
                if(this.size){
                    let fileSize = fileObj.size;
                    if(fileSize > this.size * 1024 *1024){
                        this.alert.showAlert("info","文件大小必须小于:"+ this.size + "MB");
                        return;
                    }
                }
                this.showLoading = true;
                this.ajax.uploadFetch(this.url,formData).then((result) => {
                    let src = this.options.analysis?this.options.analysis(result):result;
                    this.alert.showAlert("success","上传成功");
                    if(!this.multiple){
                        this.srcs.length = 0;
                    }
                    this.srcs.push(src);
                    this.names.push(fileName);
                    this.$emit('input',this.srcs);
                    this.showLoading = false;
                    this.reloadFileInput();
                    if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                        this.$attrs.setVerifyCompState();
                    }
                    this.completedCallback&&this.completedCallback({success:true,data:result});
                }).catch((err) => {
                    this.showLoading = false;
                    this.alert.showAlert("error","上传异常");
                    this.reloadFileInput();
                    this.completedCallback&&this.completedCallback({success:false,data:err});
                });
            },
            getValue(){
                return this.srcs.join(',');
            },
            setValue(srcs){
                if(!srcs){
                    this.srcs = [];
                    return;
                }
                
                for (let index = 0; index < srcs.length; index++) {
                    const element = this.names[index];
                    if(!element){
                        this.names[index] = srcs[index].substring(srcs[index].lastIndexOf('.') - 1)
                    }
                }
                this.srcs = srcs;
            },
            removeItem(item){
                let res = this.srcs.filter(x=>{
                    return x.indexOf(item) == -1
                })
                this.$emit('input',res);
            }
        },
        mounted(){
            this.setValue(this.value);
        }
    }
</script>

<style scoped>
.imgFile{
    cursor:pointer;
}
.input-file {
    cursor:pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    width: 100%;
    background-color: #2c7;
    border-radius: 4px;
    padding: 7px 10px;
    font-size: 12px;
    font-weight: normal;
    line-height: 18px;
    color: #fff;
    text-decoration: none;
}
.input-file input[type="file"] {
    cursor:pointer;
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    font-size: 14px;
    background-color: #f00;
    /*transform: translate(-300px, 0px) scale(4);*/
    /* height: 100%;
    width: 100%; */
    opacity: 0;
    filter: alpha(opacity=0);
}
.loading{width:24px;}

.fileList{
    width: 82.5%;
    float: right;
}

.fileList span{
    display: inline-block;
    padding: 0 10px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    box-sizing: border-box;
    border-color: transparent;
    margin: 7px 0 2px 6px;
    background-color: #f0f2f5;
    color: #909399;
    padding-right: 25px;
    position: relative;
    max-width: 230px;
    overflow: hidden;
}

.fileList span a{
    color: #606266;
}

.fileList .fa-times{
    width: 12px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 4px;
    font-size: 12px;
    font-size: 12px;
    font-style: normal;
    background-color: #c8cacd;
    border-radius: 9px;
    color: #fff3f3;
    text-align: center;
    cursor: pointer;
}

.formStyle .form-item{
    text-align: left;
}

.upaload label{
    width: 17%;
    text-align: right;
    margin-right: 6px;
    display: inline-block;
}

</style>
