<template>
    <div class="bg">
        <div class="login">
            <h1>欢迎登陆后台管理系统</h1>
            <div class="login-item">
                <input type="text" v-model="username"/>
            </div>
            <div class="login-item">
                <input type="password" v-model="password" />
            </div>

            <input  class="login-btn" type="button" value="登 录" @click="login('loginForm')" />
        </div>
    </div>
    
</template>

<script>
    import commonUtil from "../../core/tool/commonUtil";

    export default {
        name: "Login",
        data(){
            return {
                username:"wupeng5",
                password:"Chen199102082"
            }
        },
        methods:{
            login() {
                this.ajax.postFetch("/login",{userid:this.username,password:this.password}).then(d=>{
                    // commonUtil.cookie.setCookie("userName",d.data.uname);
                    this.$router.push({path:"/form"});
                })
            }
        }
    }
</script>

<style scoped>
.refreImg img {
        border-radius: 2px;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    .frechBox {
        display: block;
        margin-top: -10px;
    }

    .refreImg {
        width: 38.2%;
        height: 40px;
        /* line-height: 20px; */
        position: absolute;
        z-index: 1000;
        right: 0;
        top: -1px;
    }

    .bg{
        background: url(../../static/images/login-bg.png) no-repeat;
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
    }
    .login{
        padding-top:200px;
        margin: 0 auto;
    }

    .login h1{
        font-size:20px;
        color: #145eb3;
        line-height: 24px;
        font-weight: bold;
        margin-bottom: 28px;
    }

    .login-item{
        width: 368px;
        margin: 0 auto;
        height: 40px;
        margin-bottom: 16px;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .login-item input{
        width: 100%;
        line-height: 38px;
        background: #fff;
        font-size: 16px;
        color: rgba(0,0,0,0.25);
        padding: 0 0 0 36px;        
        display: block;
        border: none;
        outline: none;
    }

    .login-btn{
        width: 368px;
        line-height: 40px;
        background: rgba(24,144,255,1);
        text-align: center;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        padding: 0;
        border: none;
    }
    .forgot-password{
        color: rgba(24,144,255,1);
        width: 368px;
        margin: 0 auto;
        text-align: right;
        line-height: 22px;
        margin-bottom: 4px;
    }

    .forgot-password label{
        font-weight:400!important;
        font-size:14px;
        cursor:pointer;
    }
</style>