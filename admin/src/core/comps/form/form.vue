
<template>
    <div class="formStyle">
        <div class="container">
            <div class="medium formDiv">
                <form>
                    <slot></slot>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LeForm",
    data(){
        return {
            subComps:[]
        }
    },
    methods:{
        getAllSubComponents(arr){
            if(arr && arr instanceof Array && arr.length >=1){
                for(let i =0;i< arr.length;i++){
                    if(arr[i].$attrs.checkIsOff && arr[i].$attrs.checkIsOff() && arr[i].validataComponentType != undefined){
                        this.subComps.push(arr[i]);
                    }
                    
                    let children = arr[i].$children;
                    if(children.length > 0){
                        this.getAllSubComponents(children);
                    }
                }
            }else{
                return;
            }
        },
        validate(){
            this.subComps = [];
            this.getAllSubComponents(this.$children);
            if(this.subComps.length == 0){
                return new Promise(function(resolve,reject){
                    resolve({
                        success:true,
                        errorInfo:[],
                        msg:"没有找到需要验证的组件"
                    })
                })
            }else{
                let tmp = this.subComps;
                let count = 0;
                let res = {success:false,info:[]};
                let errorComps = [];
                for(let i=0;i<tmp.length;i++){
                    let vInputRes = tmp[i].$attrs.getVerifyResult();
                    if(!vInputRes.success){
                        count++;
                        res.info.push(vInputRes.msg);
                        errorComps.push(tmp[i]);
                    }
                }
                res.success = count == 0?true:false;
                return new Promise(function(resolve,reject){
                    if(res.success){
                        resolve(res);
                    }else{
                        //显示出错组件的错误信息
                        errorComps.forEach(comp=>{
                            comp.$attrs.setIsSuccess(false);
                        })
                        reject(res);
                    }
                })
            }

        }
    },
    mounted(){
    }
}
</script>

<style scoped>
    
    *{
        margin: 0;
        padding: 0;
        outline: none;
        text-decoration: none;
        list-style: none;
    }

    html,body{
        width: 100%;
        height: 100%;
    }

    .formStyle{
        width: 100%;
    }

    .formStyle .container{
        width: 800px;
        overflow-y: scroll;
        padding: 30px 0; 
    }

    .formStyle .container .formDiv{
        overflow: hidden;
        min-height: 1000px;
        text-align: left;
        padding:10px 0;
    }

    .formStyle .form-item{
        float: left;
        width: 100%;
        line-height: normal;
        margin-bottom: 22px;
        position: relative;
    }

    .formStyle .form-item .form-item-label{
        width: 18%;
        margin-right: 6px;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0;
        box-sizing: border-box;
        margin-bottom: 0;
    }

    .formStyle .medium .form-item .form-item-label{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .formStyle .small .form-item .form-item-label{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }

    .formStyle .mini .form-item .form-item-label{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }

    .formStyle .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        width: 35%;
        vertical-align: top;
    }

    .formStyle .requireed::before{
        content: "*";
        color: #f56c6c;
        font-size: 12px;
        margin-right: 2px;
    }
    
    .formStyle .form-item .form-item-input{
        /* width: 88%; */
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8% 0 4%;
        color: #606266;
        outline: none;
    }

    .formStyle .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }

    .formStyle .medium .form-item .form-item-input{
        height: 38px;
        line-height: 38px;
        font-size: 14px;
    }

    .formStyle .small .form-item .form-item-input{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }

    .formStyle .mini .form-item .form-item-input{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }





   
</style>
