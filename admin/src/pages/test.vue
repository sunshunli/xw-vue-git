

<template>
    <div>
        <v-input label="年龄12" type="text" msg="正整数11" vType='number' v-model="abc"></v-input>
        {{abc}}

         <le-date-picker ref='dd' v-model="dd" label="日期组件" ></le-date-picker>

        <le-time-picker label="时间组件" v-model="tt" ></le-time-picker>

        <le-date-time-picker label="时间日期组件" v-model="dt"></le-date-time-picker>    

        <!-- <le-radio-list label="性别" v-model="abc" ref="ck" @change="changecks" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list> -->
        <le-button type="default" value="set" @click="setv"></le-button>
        <le-button type="default" value="get" @click="getv"></le-button>
    </div>
</template>

<script>

import Unit from "../core/tool/commonUtil.js";
export default {
    name:"TestPage",
    data(){
        return {
            abc:"",
            dd:"",
            tt:"",
            dt:""
        }
    },
    methods:{
        setv(){
            this.dd = "2019-01-02";
            this.tt = "12:01:20";
            this.dt = "2019-01-02 11:11:22";
        },
        getv(){
            console.log(this.dd + "---" + this.tt + "---" + this.dt);
        },
        changecks(item,data){
            console.log(data.vals);
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>

</style>
