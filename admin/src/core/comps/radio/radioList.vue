<template>
    <div>
        123
        <span class="span" @click="changeCK(item)" v-for="(item,index) in state.data" :key="index">
            <span>{{item[displayName]?item[displayName]:'未设置'}}</span>
            <span class="fa" :class="item.ck?'fa-dot-circle-o':'fa-circle-o'"></span>
        </span>
        <p class="text-left" v-show="state.showError">{{$attrs.msg}}</p>
    </div>
</template>

<script>

import CommonUtil from "../../tool/commonUtil.js";

export default {
    name:"LeRadioList",
    props:["displayName","displayValue"],
    data(){
        return {
            state:{
                showError:false,
                data:[],
            },
            validataComponentType:"Radio",
            name:_idSeed.newId(),
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
            this.state.data = CommonUtil.object.addPrimaryAndCk(data);
        },
        /**
         * @description 重置数据源
         * @returns
         */
        resetData(){
            this.state.data.forEach(item=>{
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

            this.$emit("change",item,this.state.data);
        },
        /**
         * @description 设置选中项, 数据回写用
         * @param val 单个值
         * @returns
         */
        setValue(val){
            this.resetData();
            this.data.forEach(item=>{
                if(item[this.displayValue] == val){
                    item.ck = true;
                }
            })  
        },
        /**
         * @description 获取选中的值
         * @returns
         */
        getValue(){
            let res = this.state.data.filter(item=>{
                return item.ck == true;
            });
            return res && res.length ==1?res[0][this.displayValue]:"";
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
        margin: 10px 20px;
    }
    .ck{
        position:absolute;
        left:49px;
        z-index:-100
    }
</style>
