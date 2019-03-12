
import func from './vue-temp/vue-editor-bridge';

<template>
    <div>
        <slot></slot>
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
            for(let i=0;i<this.subComps.length;i++){
                this.subComps[i].$attrs.setIsSuccess(false);
            }
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

</style>
