

<template>
    <div>
        <v-input label="年龄12" type="text" msg="正整数11" vType='number' v-model="abc"></v-input>
        {{abc}}

        <le-radio-list label="性别" v-model="abc" ref="ck" @change="changecks" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list>
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
            abc:""
        }
    },
    methods:{
        setv(){
            this.abc = "3"
        },
        getv(){
            console.log(this.abc);
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

        this.$refs["ck"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.abc = "1";
    }
}
</script>

<style scoped>

</style>
