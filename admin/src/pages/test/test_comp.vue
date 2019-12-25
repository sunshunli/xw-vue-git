<template>
    <div class="bg">
        {{msg}}
    </div>
</template>

<script>
    import commonUtil from "../../core/tool/commonUtil.js";

    export default {
        name: "TestComp",
        data(){
            return {
                msg:"",
                //0, 准备发送
                //1, 发送中
                //2, 发送完毕
                status:"0"
            }
        },
        methods:{
            doHttp(id){
                let ctl = null;
                debugger
                if(this.status == 1){
                    ctl && ctl.abort();
                    this.msg = id + "取消请求成功";
                }
                this.msg = id + "正在发送请求";
                this.status = 1;
                let promise = this.ajax.getFetch("/tpl/component/myfragments?id="+id);
                ctl = promise.controller;
                promise.promise.then(x=>{
                    this.msg = id + "发送请求完毕";
                    this.status == 2;
                })
            }   
        },
        mounted(){
            this.msg = "ajax准备就绪";
        }
    }
</script>

<style scoped>
</style>