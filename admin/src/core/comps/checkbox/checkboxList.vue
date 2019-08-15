
<template>
    <div class="form-item">
        <label class="form-item-label" :class="$attrs.on != undefined?'requireed':''">{{$attrs.label}}</label>
        <div class="form-item-div fa" :class="state.successIcon">
            <span class="span" v-for="(item,index) in data" :key="index" @click="changeItem(item)">
                <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
                <span class="fa" :class="item.ck?'fa-check-square':'fa-square-o'"></span>
            </span>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
        </div>
    </div>
</template>

<script>

import tool from "../leCompsTool.js";

export default {
    name:"LeCheckboxList",
    props:["displayName","displayValue","value","dataSource","readonly"],
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
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
        },
        dataSource(val){
            if(val && val.length >0){
                this.init(val);
                this.setValue(this.value);
            }
        }
    },
    methods:{
        /**
         * @description 设置数据源，自动添加ck属性来控制是否选中状态
         * @returns
         */
        init(data){
            this.data = tool.object.addPrimaryAndCk(data);
        },
        /**
         * @description checkbox的change事件 会触发checkboxList的change回调
         * @param item 当前的选中项
         * @returns
         */
        changeItem(item){
            if(this.readonlyFlag){
                return;
            }
            item.ck = !item.ck;
            let res = this.getCheckedItems();
            this.$emit('input',res.vals.join(','));
            this.$emit('change',res);
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        },
        /**
         * @method
         * @description 传入displayValue的时候，返回对象，里面可直接取vals(为displayValue的数组)
         * @description 不传入displayValue，返回对象，里面可去items数组(为选中的项的集合)
         * @returns
         */
        getCheckedItems(){
            return tool.object.getCheckedItems(this.data,this.displayValue);
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
         * @param vals 必须为数组, 必须设置displayValue为需要传递的value字段，如果传入空，则重置所有
         * @return
         */
        setValue(vals){
            vals!=null && vals!=undefined?vals=vals.toString():vals="";
            if(!vals){
                this.data.forEach(item=>{
                    item.ck = false;
                })
            }else{
                this.data.forEach(item=>{
                    let cked = false;
                    vals.split && vals.split(',').forEach(x=>{
                        if(item[this.displayValue].toString() == x.toString()){
                            cked = true;
                        }
                    })
                    if(cked){
                        item.ck = true;
                    }else{
                        item.ck = false;
                    }
                })
            }
        }
    },
    mounted(){
        if(this.dataSource && this.dataSource.length >0){
            this.init(this.dataSource);
        }
        this.setValue(this.value);
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

    form .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        vertical-align: text-bottom;
        flex: 1;
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
  
    .form-item .promptMsg{
        font-size: 12px;
        color: #f56c6c;
        line-height: 20px;
        text-align: left;
        position: absolute;
        margin: 0;
    }
</style>