<template>
    <div class="upaload">
        <span  class="input-file">请选择
        <input @change="change" type="file" :ref="fkey" class="imgFile"></span>
        <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
        
        <img v-show="src" style="width:100px;height:100px" :src="src" />
        <!-- <input type="button" style="margin-left:10px;" class="btn btn-info" @click="upload" value="上传" /> -->
    </div>
</template>

<script>
    export default {
        components: {},
        props:["options"],
        name: "FileUpload",
        data(){
            return {
                fkey:Math.ceil(Math.random()*1000000000),
                showLoading:false,
                src:""
            }
        },
        computed:{
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
                return this.options.size?this.options.size:"9999";
            }
        },
        methods:{
            /**
             * @description 设置图片的路径, 数据回写的时候需要
             * @returns
             */
            setImgSrc(src){
                this.src = src;
            },
            /**
             * @description filechange事件
             * @returns
             */
            change:function(){
                let val = this.$refs[this.fkey].value;
                this.upload();
            },
            /**
             * @description 重置file-input的value，防止value一样的情况下再次点击file-input按钮不生效
             * @returns
             */
            reloadFileInput:function(){
                this.$refs[this.fkey].value = "";
            },
            /**
             * @description 上传的主体方法
             * @returns
             */
            upload:function(){
                if(!this.url || !this.fname){
                    this.alert.showAlert("error","上传url和fname必须配置!");
                    return;
                }
                let dom = this.$refs[this.fkey];
                let formData = new FormData();
                formData.append(this.fname,dom.files[0]);
                
                if(this.vtype){
                    let fileName = dom.files[0].name;
                    var suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                    if(this.vtype.indexOf(suffix) == -1){
                        this.alert.showAlert("info","后缀名必须为:"+ this.vtype);
                        return;
                    }
                }
                if(this.size){
                    let size = dom.files[0].size;
                    let re = /^[0-9]+.?[0-9]*$/;
                    let maxSize = parseFloat(this.size);
                    if (!re.test(this.size)) {
                　　　　maxSize = 999;
            　　     }
                    if(size > maxSize * 1024 *1024){
                        this.alert.showAlert("info","文件大小必须小于:"+ this.size + "M");
                        return;
                    }
                }
                this.showLoading = true;
                this.ajax.uploadFetch(this.url,formData).then((result) => {
                    this.options.analysis?this.setImgSrc(this.options.analysis(result)):this.setImgSrc(result); 
                    this.alert.showAlert("success","上传成功");
                    this.showLoading = false;
                    this.reloadFileInput();
                    this.completedCallback&&this.completedCallback({success:true,data:result});
                }).catch((err) => {
                    this.showLoading = false;
                    this.alert.showAlert("error","上传异常");
                    this.reloadFileInput();
                    this.completedCallback&&this.completedCallback({success:false,data:err});
                });
                
            }
        },
        created(){
            
        },
        mounted () {
            
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
