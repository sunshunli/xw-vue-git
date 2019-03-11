

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
                    if(arr[i].off == undefined && arr[i].type == "validataInput"){
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
            debugger
            
            if(this.subComps.length == 0){
                return {
                    success:true,
                    errorInfo:[],
                    msg:"没有找到需要验证的组件"
                }
            }else{
                let tmp = this.subComps;
                let count = 0;
                let res = {success:false,info:[]};
                for(let i=0;i<tmp.length;i++){
                    let vInputRes = tmp[i].getVerifyResult();
                    if(!vInputRes.success){
                        count++;
                        res.info.push(vInputRes.msg);
                    }
                }
                res.success = count == 0?true:false;
                return new Promise(function(resolve,reject){
                    if(res.success){
                        resolve(res);
                    }else{
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
