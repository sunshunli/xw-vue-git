<template>
    <div class="form-item">
        <label class="form-item-label" :class="$attrs.on != undefined && $attrs.required!=undefined?'requireed':''">{{$attrs.label}}</label>
        <div  class="form-item-div fa" :class="state.successIcon">
            <span class="span" @click="changeCK(item)" v-for="(item,index) in data" :key="index">
                <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
                <span class="fa" :class="item.ck?'fa-dot-circle-o':'fa-circle-o'"></span>
            </span>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
        </div>
    </div>
</template>

<script>

import CommonUtil from "../../tool/commonUtil.js";

export default {
    name:"LeRadioList",
    props:["displayName","displayValue","value"],
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data(){
        return {
            state:{
                successIcon:"",
                showError:false,
            },
            data:[],
            validataComponentType:"Radio",
            name:_idSeed.newId(),
        }
    },
    watch:{
        value(val){
            this.setValue(val);
        }
    },
    methods:{
        /**
         * @description 设置数据源，自动添加ck属性来控制是否选中状态
         * @returns
         */
        init(data){
            this.data = CommonUtil.object.addPrimaryAndCk(data);
        },
        /**
         * @description 重置数据源
         * @returns
         */
        resetData(){
            this.data.forEach(item=>{
                item.ck = false;
            })
        },
        /**
         * @description radio的change事件，会触发父组件的change回调
         * @returns 回传2个参数到父组件的回调，当前item和数据源data
         */
        changeCK(item){
            this.resetData();
            item.ck = true;
            this.state.showError = false;
            this.$emit('input',item[this.displayValue]);
            this.$emit("change",item,this.data);
        },
        /**
         * @description 设置选中项, 数据回写用
         * @param val 单个值
         * @returns
         */
        setValue(val){
            this.resetData();
            if(val){
                this.data.forEach(item=>{
                    if(item[this.displayValue] == val){
                        item.ck = true;
                    }
                })  
            }
        },
        /**
         * @description 获取选中的值
         * @returns
         */
        getValue(){
            return this.value;
        },
        
    },
    mounted(){

    }
}
</script>

<style scoped>
    .span{
        position:relative;
        cursor: pointer;
        display: inline-block;
        margin: 10px 20px 10px 0;
    }
    .ck{
        position:absolute;
        left:49px;
        z-index:-100
    }


    .form-item{
        width: 32%;
        float: left;
        text-align: left;
        margin:0 0 22px 0;
    }

    .form-item .form-item-label{
        width: 17%;
        margin-right: 1%;
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
        /* height: 40px; */
        line-height: normal;
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
        width: 80%;
        /* vertical-align: text-bottom; */
    }
    .requireed::before{
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
</style>
