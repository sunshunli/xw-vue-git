<template>
    <div class="upaload">
        <span  class="input-file">请选择
        <input @change="change" type="file" :ref="fkey" class="imgFile"></span>
        <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
        <span  style="margin-left:10px;" >{{msg}}</span>
        <input type="button" style="margin-left:10px;" class="btn btn-info" @click="upload" value="上传" />
    </div>
</template>

<script>
    import AjaxUtil from "../../tool/ajaxService.js";
    export default {
        extends:AjaxUtil,
        components: {},
        props:["fname","url","completedCallback","vtype"],
        name: "FileUpload",
        data(){
            return {
                fkey:Math.ceil(Math.random()*1000000000),
                showLoading:false,
                msg:""
            }
        },
        computed:{
            
        },
        methods:{
            change:function(){
                let val = this.$refs[this.fkey].value;
                this.msg = val.substring(val.lastIndexOf('\\') + 1);
            },
            resetFileInput:function(){
                this.$refs[this.fkey].value = "";
            },
            upload:function(){
                
                let dom = this.$refs[this.fkey];
                let val = dom.value;
                if(val){
                    let formData = new FormData();
                    formData.append(this.fname,dom.files[0]);
                    if(this.vtype){
                        let fileName = dom.files[0].name;
                        var suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                        if(this.vtype.indexOf(',') == -1){
                            if(this.vtype != suffix){
                                this.msg = "后缀名必须为:"+ this.vtype;
                                return;
                            }
                        }else{
                            let res = this.vtype.split(',').filter(item=>{
                                return item.toLowerCase() == suffix.toLowerCase();
                            })
                            if(res.length == 0){
                                this.msg = "后缀名必须为:"+ this.vtype;
                                return;
                            }
                        }
                    }
                    this.showLoading = true;
                    this.uploadFetch(this.url,formData).then((result) => {
                        this.showLoading = false;
                        this.completedCallback({success:true,data:result});
                    }).catch((err) => {
                        this.showLoading = false;
                        this.msg = "上传异常";
                        this.resetFileInput();
                        this.completedCallback({success:false,data:err});
                    });
                }else{
                    this.msg = "请选择文件";
                }
            }
        },
        created(){
            
        },
        mounted () {
            
        }
    }
</script>

<style scoped>
.input-file {
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
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    background-color: #f00;
    /*transform: translate(-300px, 0px) scale(4);*/
    height: 100%;
    width: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
}
.loading{width:24px;}
</style>
