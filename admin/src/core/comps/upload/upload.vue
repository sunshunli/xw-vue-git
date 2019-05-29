<template>
    <div class="form-item upaload">
        <label class="form-item-label" :class="$attrs.on != undefined && $attrs.required!=undefined?'requireed':''">{{$attrs.label}}</label>
        <span  class="input-file">请选择
        <input @change="change" type="file" :ref="fkey" class="imgFile"></span>
        <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
        
        <div v-show="src.length>0">
            <span v-for="(item,index) in src" :key="index"><a target="_blank" :href="item.src">{{item.name}}</a></span>
        </div>

        <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
    </div>
</template>

<script>
    export default {
        components: {},
        props:["options"],
        name: "LeUpload",
        inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
        data(){
            return {
                validataComponentType:"FileUpload",
                fkey:_idSeed.newId(),
                showLoading:false,
                src:[],
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
                        this.src.length = 0;
                    }
                    this.src.push({src:src,name:fileName});
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
                return this.src.join(',');
            },
            setValue(vals,names){
                if(!vals){
                    this.src = [];
                    return;
                }
                this.src = [];
                let path = [];
                let fileName = [];
                if(names && names.split && vals && vals.split ){
                    path = vals.split(',');
                    fileName = names.split(',');
                }else{
                    path = vals.split(',');
                    for(let i = 0; i< path.length; i++){
                        fileName.push(path[i].substring(path[i].lastIndexOf('.') - 1));
                    }
                }
                for(let i = 0; i<path.length; i++){
                    this.src.push({src:path[i],name:fileName[i]});
                }
            }
        },
        mounted(){
            
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
</style>
