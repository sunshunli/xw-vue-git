
<template>
    <div>
        <span class="span" v-for="(item,index) in data" :key="index">
            <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
            <span class="fa" :class="item.ck?'fa-check-square':'fa-square-o'" @click="changeItem(item)"></span>
        </span>
        
        <p class="text-left" v-show="state.showError">{{$attrs.msg}}</p>
    </div>
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
                showError:false
            },
            data:[]
        }
    },
    computed:{

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

</style>

