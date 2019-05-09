
<template>
    <div class="treeContent" style="height:2000px;border:1px solid bule">
        <button @click="deleteNode">删除节点</button>
        <button @click="getNodes">获取被选中节点</button>
        <button @click="reSet">reSet</button>
        <le-asyn-tree
            displayName="name"
            :asynOptions="asynOptions"
            ref="tree"
            :itemClick="itemClick"
            checkbox
        ></le-asyn-tree>
    </div>
</template>

<script>
export default {
    name:"TreeTest",
    data(){
        return {
            selectNode:null,
            data:[],
            asynOptions:{
                getUrl:d=>{
                    return "/goods/index/queryList/115?parentUnit="+d.unitCode
                },
                analysis:d=>{
                    return d.data.data;
                }
            }
        }
    },
    methods:{
        itemClick(item){
            console.log(item);
            this.selectNode = item;
            //异步操作，更新当前节点
            window.setTimeout(d=>{
                // this.$refs["tree"].updateSingleNode(item,{__displayName:"xxx",__children:[{name:"new",id:"123"}]});
            },1000)
        },
        deleteNode(){
            this.$refs["tree"].deleteSingleNode(this.selectNode);
        },
        getNodes(){
            let res = this.$refs["tree"].getAllCheckedNodes();
            console.log(res);
        },
        getTreeData(id){
            this.ajax.getFetch("/goods/index/queryList/115?parentUnit="+id).then(d=>{
                this.$refs["tree"].init(d.data.data);
            }).catch(e=>{
                debugger
            })
        },
        reSet(){
            this.$refs["tree"].reset();
        }
    },
    mounted(){
       this.getTreeData(0);
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
