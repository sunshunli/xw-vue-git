<template>
    <div>
        123
        <span class="span" @click="changeCK(item)" v-for="(item,index) in data" :key="index">
            <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
            <i class="fa" :class="item.cls"></i>
            <input class="ck" type="radio" :checked="item.ck" :name="name"/>
        </span>
    </div>
</template>

<script>

const _checkedCls = "fa-dot-circle-o";
const _unCheckedCls = "fa-circle-o";

import CommonUtil from "../../tool/commonUtil.js";
import ValidataHOC from "../input/validataHOC.js";

export default {
    name:"LeRadioList",
    props:["displayName","displayValue"],
    data(){
        return {
           data:[],
           validataComponentType:"Radio",
           name:Math.ceil(Math.random()*10000000)
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
            let _data = CommonUtil.object.addPrimaryAndCk(data);
            _data.forEach(item=>{
                item.cls = _unCheckedCls;
            });
            this.data = _data;
        },
        /**
         * @description 重置数据源
         * @returns
         */
        resetData(){
            this.data.forEach(item=>{
                item.ck = false;
                item.cls = _unCheckedCls;
            })
        },
        /**
         * @description radio的change事件，会触发父组件的change回调
         * @returns 回传2个参数到父组件的回调，当前item和数据源data
         */
        changeCK(item){
            this.resetData();
            item.ck = true;
            item.cls = _checkedCls;

            this.$emit("change",item,this.data);
        },
        /**
         * @description 设置选中项, 数据回写用
         * @param val 单个值
         * @returns
         */
        setChecked(val){
            this.resetData();
            this.data.forEach(item=>{
                if(item[this.displayValue] == val){
                    item.cls = _checkedCls;
                    item.ck = true;
                }
            })  
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
    .span{
        position:relative;
        cursor: pointer;
    }
    .ck{
        position:absolute;
        left:49px;
        z-index:-100
    }
</style>
