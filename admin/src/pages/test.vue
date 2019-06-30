

<template>
    <div>
        <v-input label="年龄12" type="text" msg="正整数11" vType='number' v-model="abc"></v-input>
        {{abc}}

         <le-date-picker ref='dd' v-model="dd" label="日期组件" ></le-date-picker>

        <le-time-picker label="时间组件" v-model="tt" ></le-time-picker>

        <le-date-time-picker label="时间日期组件" v-model="dt"></le-date-time-picker>    

        <le-local-select v-model="sl" label="模糊搜索" ref='s1' display-name="name" display-value="code"></le-local-select> 

        <le-upload label="图片上传" :options="options" v-model="uploadUrl"></le-upload>

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
            dt:"",
            sl:"",
            options:{
                multiple:true,
                url:"/api/lanc/his/admin/Upload/RobotModelImage/v1",
                completedCallback:(d)=>{
                    console.log(d);
                },
                vtype:"jpg,png,gif",
                fname:"file",
                analysis:(d)=>{
                    return d.data;
                },
            },
            uploadUrl:""
        }
    },
    methods:{
        setv(){
            this.dd = "2019-01-02";
            this.tt = "12:01:20";
            this.dt = "2019-01-02 11:11:22";
            this.sl = "1,3";

            this.uploadUrl = ["/api/lanc/his.jpg"];
        },
        getv(){
            console.log(this.dd + "---" + this.tt + "---" + this.dt + "---" + this.sl + "----" + this.uploadUrl);
        },
        changecks(item,data){
            console.log(data.vals);
        }
    },
    mounted(){
        let data = [
            {name:"aaa",code:"1"},
            {name:"aaa1",code:"2"},
            {name:"aaa2",code:"3"},
            {name:"bbb",code:"4"},
            {name:"ccc",code:"5"},
        ]
        this.$refs["s1"].getCurrentComponent().init(Unit.object.cloneObj(data));
    }
}
</script>

<style scoped>

</style>
