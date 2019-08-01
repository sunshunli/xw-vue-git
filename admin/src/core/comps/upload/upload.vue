<template>
    <div class="form-item upaload">
        <div>
            <label class="form-item-label" :class="$attrs.on != undefined?'requireed':''">{{$attrs.label}}</label>
            <span  class="input-file">请选择
            <input @change="change" type="file" :ref="fkey" class="imgFile"></span>
            <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
        </div>
        
        <div class="fileList" v-show="srcs.length>0">
            <span v-for="(item,index) in srcs" :key="index"><a target="_blank" :href="item.name">{{"image_" + item.idx}}</a><i @click="removeItem(item)" class="fa fa-times"></i></span>
        </div>

        <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
    </div>
</template>

<script>
import CommonUtil from '../../tool/commonUtil';
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
            }
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
                    //多文件上传
                    if(this.multiple){
                        this.srcs.push({name:src,idx:this.getMaxIndex()});
                    }else{
                        this.srcs = [{name:src,idx:1}];
                    }
                    this.$emit('input',this.getNames(this.srcs));
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
                return this.getNames(this.srcs);
            },
            getMaxIndex(name){
                let tmp = [];
                this.srcs.forEach(x=>{
                    tmp.push(x.idx);
                })
                if(tmp.length != 0){
                    tmp.sort((a,b)=>{
                        return b - a;
                    })
                    return tmp[0] + 1;
                }else{
                    return 1;    
                }         
            },
            setValue(srcs){
                if(srcs == ""){
                    return;
                }
                if(this.srcs.length == 0){
                    srcs.split(',').forEach((x,idx)=>{
                        this.srcs.push({name:x,idx:(this.srcs.length+1)});
                    })
                }
            },
            getNames(data){
                let res = [];
                data && data.forEach(x=>{
                    res.push(x.name);
                })
                return res.join(',');
            },
            removeItem(item){
                let tmp = [];
                this.srcs.forEach(x=>{
                    if(x.name != item.name){
                        tmp.push(x);
                    }
                })
                this.srcs = tmp;
                this.$emit('input',this.getNames(this.srcs));
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
    width: 50px;
    background-color: #2c7;
    border-radius: 4px;
    padding: 5px;
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
    opacity: 0;
    filter: alpha(opacity=0);
    width: 100%;
    height: 100%;
}
.loading{width:24px;}

.fileList{
    display: inline-block;
    vertical-align: middle;
    width: 80%;
    margin-left: 19.5%;
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
    flex-direction: column;
    align-items: initial;
}

.upaload label{
    text-align: right;
    display: inline-block;
}

.formStyle .form-item .promptMsg{
        width: 81%;
    float: right;
    font-size: 12px;
    color: #f56c6c;
    line-height: 20px;
    text-align: left;
}
</style>
