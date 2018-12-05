<template>
    <div>
        <label>登录名：</label>
        <input type="text" ref="__loginName" value="wupeng5" />

        <label>密码：</label>
        <input type="password" ref="__loginPwd" value = "Chen199102082"/>

        <input type="button" value="登录" @click="login" />
    </div>
</template>

<script>
    import AjaxUtil from "../../core/tool/ajaxService";
    import Util from "../../core/tool/commonUtil";
    export default {
        extends:AjaxUtil,
        name: "LocalLogin",
        methods:{
            login:function () {
                
                let name = this.$refs["__loginName"].value;
                let pwd = this.$refs["__loginPwd"].value;
            
                //this.postFetch("/api/login/login",{name:name,pwd:pwd}).then(d=>{
                    //Util.cookie.setCookie("uname",name);
                    //this.$router.push({path:"/"});
                //})
                //jid=a8cffa6a-b9e9-4c4e-bbb4-d78b4f51ef01; tid=; userid=zhengjp2; userName=%E9%83%91%E5%BB%BA%E5%B9%B3; _sid=
                 this.postFetch(Util.basePath+"/login",{userid:name,password:pwd}).then(d=>{
                    Util.cookie.setCookie("userName",name);
                    this.$router.push({path:"/"});
                })
                // Util.cookie.setCookie("jid","a8cffa6a-b9e9-4c4e-bbb4-d78b4f51ef01")
                // Util.cookie.setCookie("_sid","39c2870f-9615-47de-916e-523e861c8725")                
                // Util.cookie.setCookie("tid","27da3655-3255-f67f-eb2f-8b42fd9c414b")
                //this.$router.push({ name: 'Limitations'});
            }
        }
    }
</script>

<style scoped>

</style>