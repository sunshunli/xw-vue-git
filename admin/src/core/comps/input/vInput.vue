<template>
    <div class="form-item">
        <label class="form-item-label" :class="$attrs.required!=undefined?'requireed':''">{{$attrs.label}}</label>
        <div  class="form-item-div fa" :class="state.successIcon">
            <input type="text" class="form-item-input" v-model="vValue" v-on:input="changeEvent()" />
            <i class="fa fa-times-circle icon-del" @click.stop="clearInputEvent"></i>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
        </div>
    </div>
</template>

<script>
    import Util from "../../../core/tool/commonUtil";

    export default{
        inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
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
            /**
             * @description 设置成功失败的状态
             * @param {bool} flag为 true or false
             */
            setStateByFlag(flag){
                this.state = {
                    successIcon:flag?"fa-check-circle-o":"fa-times-circle-o",
                    showError:!flag?true:false
                }
            },
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
            },
            clearInputEvent(){
                this.setValue("");
                if(this.$attrs.checkIsOff && this.$attrs.checkIsOff()){
                    this.setStateByFlag(false);
                }
            }
        },
        mounted () {
        }
    }
</script>

<style scoped>
    .form-item{
        width: 55%;
        text-align: left;
        margin:0 0 22px 0;
    }

    .form-item .form-item-label{
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
        margin-bottom: 0;
    }
    .medium .form-item .form-item-label{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .small .form-item .form-item-label{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }
    .mini .form-item .form-item-label{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }
    .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        /* width: 35%; */
        width: 80%;
        vertical-align: top;
    }
    .requireed::before{
        content: "*";
        color: #f56c6c;
        font-size: 12px;
        margin-right: 2px;
    }
    .form-item .form-item-input{
        /* width: 100%; */
        width: 50%;
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
    .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }
    .medium .form-item .form-item-input{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .form-item i{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
        right: 51%;
        cursor: pointer;
    }

    .medium .form-item i{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
        right: 51%;
        cursor: pointer;
    }

    .mini .form-item i{
        top: 7px;
    }

    .small .form-item .form-item-input{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }
    .mini .form-item .form-item-input{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }

    .form-item .promptMsg{
        font-size: 12px;
        color: #f56c6c;
        line-height: 20px;
        text-align: left;
        position: absolute;
    }

    .fa-check-circle-o .form-item-input{
        border: 1px solid #67c23a;
    }

    .fa-times-circle-o .form-item-input{
        border: 1px solid #f56c6c;
    }

    .fa.fa-times-circle-o{
        position: relative;
    }

    .fa.fa-check-circle-o{
        position: relative;
    }

    .searchMulSelect .icon-del{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
    }

</style>