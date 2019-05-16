<template>
    <div class="form-item">
        <label class="form-item-label" :class="$attrs.required!=undefined?'requireed':''">{{$attrs.label}}:</label>
        <div  class="form-item-div fa" :class="state.successIcon">
            <input type="text" class="form-item-input" v-model="vValue" v-on:input="changeEvent()" />
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
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
    .formStyle .form-item{
        float: left;
        width: 100%;
        line-height: normal;
        margin-bottom: 24px;
        position: relative;
    }

    .formStyle .form-item .form-item-label{
        width: 18%;
        margin-right: 10px;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0;
        box-sizing: border-box;
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
        width: 88%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8% 0 4%;
        color: #606266;
    }

    .formStyle .form-item .form-item-input:focus{
        border: 1px solid #409eff;
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

    .formStyle .form-item .promptMsg{
        font-size: 12px;
        color: #f56c6c;
        line-height: 20px;
        text-align: left;
        position: absolute;
    }

    .formStyle .medium .fa-check-circle-o .form-item-input{
        border: 1px solid #67c23a;
    }

    .formStyle .small .fa-check-circle-o .form-item-input{
        border: 1px solid #67c23a;
    }

    .formStyle .mini .fa-check-circle-o .form-item-input{
        border: 1px solid #67c23a;
    }

    .formStyle .medium .fa-times-circle-o .form-item-input{
        border: 1px solid #f56c6c;
    }

    .formStyle .small .fa-times-circle-o .form-item-input{
        border: 1px solid #f56c6c;
    }

    .formStyle .mini .fa-times-circle-o .form-item-input{
        border: 1px solid #f56c6c;
    }

    .formStyle  .fa.fa-times-circle-o{
        position: relative;
    }

    .formStyle  .fa.fa-check-circle-o{
        position: relative;
    }

    /* 错误图标 */
    .formStyle  .fa-times-circle-o:before{
        content: "\f05c";
        position: absolute;
        top: 10px;
        right: 8px;
        font-size: 12px;
        color: #f56c6c;
    }

    .formStyle .medium .fa-times-circle-o:before{
        top: 15px;
    }

    .formStyle .small .fa-times-circle-o:before{
        top: 12px;
    }

    .formStyle .mini .fa-times-circle-o:before{
        top: 10px;
    }

    /* 正确图标 */
    .formStyle  .fa-check-circle-o:before{
        content: "\f05d";
        position: absolute;
        top: 10px;
        right: 8px;
        font-size: 12px;
        color: #67c23a;
    }

    .formStyle .medium .fa-check-circle-o:before{
        top: 15px;
    }

    .formStyle .small .fa-check-circle-o:before{
        top: 12px;
    }

    .formStyle .mini .fa-check-circle-o:before{
        top: 10px;
    }
</style>