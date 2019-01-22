
<template>
    <div class="treeContent">
        <le-asyn-tree
            displayName="name"
            childrenKey="children"
            :asynOptions="asynOptions"
            ref="tree"
            :itemClick="itemClick"
        ></le-asyn-tree>
    </div>
</template>

<script>
export default {
    name:"TreeTest",
    data(){
        return {
            data:[],
            asynOptions:{
                getUrl:d=>{
                    return "xxx"
                },
                analysis:d=>{
                    return d;
                }
            }
        }
    },
    methods:{
        itemClick(item){
            console.log(item);
        }
    },
    mounted(){
        window.setTimeout(d=>{
            let data = [
                {name:"A",id:1},
                {name:"B",id:1},
                {name:"C",id:1},
                {name:"D",id:1}
            ];
            this.$refs["tree"].init(data);
        },1000)
    }
}
</script>

<style>
    .treeContent{
        width: auto;
        border: 1px solid red;
        float: left;
        padding: 24px;
        padding-left: 0;
        text-align: left;
        color: #606266;
        font-size: 14px;
    }

    .treeContent div{
        line-height: 24px;
    }

    .treeContent button{
        border: none;
        background-color: transparent;
        outline: none;
    }
</style>
