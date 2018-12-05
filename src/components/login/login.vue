<template>
    <div>
        <label>登录名：</label>
        <input type="text" ref="__loginName" />

        <label>密码：</label>
        <input type="password" ref="__loginPwd" />

        <input type="button" value="登录" @click="login" />
    </div>
</template>

<script>
    import AjaxUtil from "../../core/tool/ajaxService";
    import Util from "../../core/tool/commonUtil";
    export default {
        extends:AjaxUtil,
        name: "Login",
        methods:{
            login:function () {
                
                let name = this.$refs["__loginName"].value;
                let pwd = this.$refs["__loginPwd"].value;

                this.postFetch("/api/login/login",{name:name,pwd:pwd}).then(d=>{
                    Util.cookie.setCookie("uname",name);
                    this.$router.push({path:"/"});
                })
            }
        }
    }
</script>

<style scoped>

</style>