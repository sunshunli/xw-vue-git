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
                //所有需要验证的组件必须带上这个validataType属性，这个属性的值可以为input，select，radio等需要验证的组件 
                validataComponentType:"Input",
                vValue:"",
                state:{
                    showError:false,
                    borderCls:"inputIcon",//inputRedIcon inputGreenIcon inputIcon
                    successIcon:""//icon-cuo,icon-duihao
                }
            }
        },
        computed:{
            
        },
        methods:{
            changeEvent(e){
                if(this.$attrs.checkIsOff()){
                    this.$attrs.setIsSuccess(this.$attrs.verify(this.vValue));
                }
            },
            getValue(){
                return this.vValue;
            },
            setValue(value){
                this.vValue = value;
            }
        },
        mounted () {
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

    .inputIcon{
        border-right: 0;
        display: inline-block;
        margin: 10px 20px;
    }
</style>