<template>
    <div>
        <div v-bind:class="state.borderCls">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="vValue" v-on:input="changeEvent()" />
                <div class="input-group-append">
                    <span class="input-group-text icon" v-bind:class="state.successIcon"></span>
                </div>
            </div>
            <p class="text-left" v-show="state.showError">{{$attrs.msg}}</p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Util from "../../../core/tool/commonUtil";

    export default{
        name:"VInput",
        //不能显示声明props，必须从HOC里面传递下来，然后通过$attrs获取，因为props不让修改
        // props:["msg","vType","regex","off"],
        props:[],
        data(){
            return {
                //所有需要验证的组件必须带上这个type=validataInput属性
                type:"validataInput",
                vValue:"",
                state:{
                    flag:false,
                    showError:false,
                    borderCls:"inputIcon",//inputRedIcon inputGreenIcon inputIcon
                    successIcon:""//icon-cuo,icon-duihao
                }
            }
        },
        computed:{
            //一旦开启off 表示停止验证
            validata(){
                if(this.off != undefined){
                    return false;
                }
                return true;
            }
        },
        methods:{
            setIsSuccess(flag){
                if(flag){
                    this.state = {
                        borderCls:"inputGreenIcon",
                        successIcon:"icon-duihao",
                        showError:false,
                        flag:true
                    }
                }else{
                    this.state = {
                        borderCls:"inputRedIcon",
                        successIcon:"icon-cuo",
                        showError:true,
                        flag:false
                    }
                }
            },
            changeEvent(e){
                if(this.validata){
                    this.setIsSuccess(this.verify(this.vValue));
                }
            },
            verify(val){
                var reg = /^[0-9]*$/;
                if (!reg.test(val)) {
                    return false;
                }
                return true;
            },
            getVerifyResult(){
                return {
                    success:this.off!=undefined?true:this.state.flag,
                    value:this.vValue,
                    msg:this.off!=undefined?"当前组件不需要验证":this.$attrs.msg
                }
            }
        },
        mounted () {
            1
            debugger
            
        }
    }
</script>

<style scoped>
    .inputRedIcon input{border-right: 0;border-color: red;outline: none;}
    .inputRedIcon div span.icon{background: #fff;border-color: red;color: red;}
    .inputRedIcon p{color: red;}


    .inputGreenIcon input{border-right: 0;}
    .inputGreenIcon div span.icon{background: #fff;font-size: 16px;color: rgb(72, 255, 0);}
    .inputGreenIcon p{display: none}

    .inputIcon{border-right: 0;}
</style>