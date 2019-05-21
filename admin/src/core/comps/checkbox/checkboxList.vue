
<template>
    <!-- <div class="checkboxContent">
        <span class="span" v-for="(item,index) in data" :key="index">
            <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
            <span class="fa" :class="item.ck?'fa-check-square':'fa-square-o'" @click="changeItem(item)"></span>
        </span> -->
        
        <!-- <p class="text-center" v-show="state.showError">{{$attrs.msg}}</p> -->
    


    <div class="form-item">
            <label class="form-item-label" :class="$attrs.required!=undefined?'requireed':''">{{$attrs.label}}</label>
            <div  class="form-item-div fa" :class="state.successIcon">
                <span class="span" v-for="(item,index) in data" :key="index" @click="changeItem(item)">
                    <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
                    <span class="fa" :class="item.ck?'fa-check-square':'fa-square-o'"></span>
                </span>
                <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            </div>
        </div>

<!-- </div> -->

</template>

<script>

import CommonUtil from "../../tool/commonUtil.js";

export default {
    name:"LeCheckboxList",
    props:["displayName","displayValue"],
    data(){
        return {
            validataComponentType:"Checkbox",
            state:{
                successIcon:"",
                showError:false
            },
            data:[]
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
         * @description checkbox的change事件 会触发checkboxList的change回调
         * @param item 当前的选中项
         * @returns
         */
        changeItem(item){
            item.ck = !item.ck;
            let res = this.getCheckedItems();
            this.$emit('change',res);
            if(this.$attrs.checkIsOff()){
                this.state.showError = this.getValue() == ""?true:false;
            }
        },
        /**
         * @method
         * @description 传入displayValue的时候，返回对象，里面可直接取vals(为displayValue的数组)
         * @description 不传入displayValue，返回对象，里面可去items数组(为选中的项的集合)
         * @returns
         */
        getCheckedItems(){
            return CommonUtil.object.getCheckedItems(this.data,this.displayValue);
        },
        /**
         * @description 对外暴露getValue方法
         * @returns 类型:字符串,为兼容validataHOC，必须返回字符串
         */
        getValue(){
            let res = this.getCheckedItems().vals.join(',');
            return res;
        },
        /**
         * @description 回写的方法，设置checkbox选中状态
         * @param vals 必须为数组, 必须设置displayValue为需要传递的value字段
         * @return
         */
        setValue(vals){
            this.data.forEach(item=>{
                let cked = false;
                vals.forEach(x=>{
                    if(item[this.displayValue] == x){
                        cked = true;
                    }
                })
                if(cked){
                    item.ck = true;
                }
            })
        },
    },
    mounted(){

    }
}
</script>

<style scoped>
    .span{
        margin: 10px 20px;
        display: inline-block;
        margin-left: 0;
        cursor: pointer;
    }

    .span .fa{
        vertical-align: middle;
    }

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

