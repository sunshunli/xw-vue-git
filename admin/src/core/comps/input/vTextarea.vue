<template>
    <div class="form-item">
        <label class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div fa" :class="state.successIcon">
            <textarea @keyup.enter="enterEvent($event)" :style="{height:(height?height:80)+'px'}" v-on:blur="blurEvent($event)" :readonly="readonlyFlag" class="form-item-input" :value="currentValue" v-on:input="changeEvent($event)"></textarea>
            <i class="fa fa-times-circle icon-del" @click.stop="clear"></i>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
        </div>
    </div>
</template>

<script>

    export default{
        inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
        name:"LeTextarea",
        //不能显示声明props，必须从HOC里面传递下来，然后通过$attrs获取，因为props不让修改
        // props:["msg","vType","regex","off"],
        props:["value","height","readonly"],
        data(){
            return {
                //所有需要验证的组件必须带上这个validataType属性，这个属性的值可以为input，select，radio等需要验证的组件 
                validataComponentType:"TextArea",
                state:{
                    showError:false,
                    successIcon:""
                },
                currentValue:this.value
            }
        },
        computed:{
            readonlyFlag(){
                if(this.readonly == undefined){
                    return false;
                }
                if(this.readonly === ""){
                    return true;
                }
                if(this.readonly === false){
                    return false;
                }
                return true;
            }
        },
        watch:{
            value(val){
                this.setValue(val);
            }
        },
        methods:{
            enterEvent(e){
                if(this.readonlyFlag){
                    return;
                }
                this.$emit("enter",e.target.value);
            },
            blurEvent(e){
                if(this.readonlyFlag){
                    return;
                }
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },
            changeEvent(e){
                this.currentValue = e.target.value;
                this.$emit("input",e.target.value);
            },
            getValue(){
                return this.currentValue;
            },
            setValue(value){
                this.currentValue = value;
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },
            clear(){
                if(!this.readonlyFlag){
                    this.$emit("input","");
                }
            }
        },
        mounted(){
            
        }
    }
</script>

<style scoped>
    .form-item{
        text-align: left;
        margin:0 0 22px 0;
    }

    .form-item .form-item-label{
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: normal;
        padding: 0;
        box-sizing: border-box;
        margin-bottom: 0;
    }

    .medium .form-item .form-item-label{
        line-height: normal;
        font-size: 14px;
    }
    .small .form-item .form-item-label{
        height: 34px;
        line-height: normal;
        font-size: 14px;
    }
    .mini .form-item .form-item-label{
        height: 28px;
        line-height: normal;
        font-size: 12px;
    }
    .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        position: relative;
            flex: 1;
    }

    form .form-item .form-item-div{
        position: relative;
        width: 100%;
    }

    .required::before{
        content: "*";
        color: #f56c6c;
        font-size: 12px;
        margin-right: 2px;
    }
    .form-item .form-item-input{
        width: 100%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8% 0 4%;
        color: #606266;
        outline: none;
        resize: none;
    }
    .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }
    .medium .form-item .form-item-input{
        line-height: normal;
        font-size: 14px;
        height: 80px;
        vertical-align: middle;
        padding: 10px 20px 10px 10px;
    }

    .form-item i{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
        right: 8px;
        cursor: pointer;
    }

    .medium .form-item i{
        position: absolute;
        top: 50%;
        color: #c0c4cc;
        font-weight: normal;
        right: 8px;
        cursor: pointer;
        transform: translateY(-50%);
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
        margin: 0;
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