
<template>
    <div class="treeContent" style="height:2000px;border:1px solid bule">
        <button @click="deleteNode">删除节点</button>
        <button @click="getNodes">获取被选中节点</button>
        <button @click="reSet">reSet</button>
        <button @click="bind">bind</button>
        <button @click="expandAll(true)">expand</button>
        <button @click="expandAll(false)">unExpand</button>
        <button @click="checkall(true)">checkAll</button>
        <button @click="checkall(false)">unCheckAll</button>
        <le-asyn-tree displayName="name" :asynOptions="asynOptions" ref="tree" :itemClick="itemClick" checkbox></le-asyn-tree>

        <le-local-tree displayName="name" ref="tree1" :itemClick="itemClick" childrenKey="children" checkbox></le-local-tree>
    </div>
</template>

<script>

import Uint from "../core/tool/commonUtil.js";
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
            let res1 = this.$refs["tree1"].getAllCheckedNodes();
            console.log(res,res1);
        },
        getTreeData(id){
            this.ajax.getFetch("/goods/index/queryList/115?parentUnit="+id).then(d=>{
                this.$refs["tree"].init(d.data.data);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        reSet(){
            this.$refs["tree"].reset();
            this.$refs["tree1"].reset();
        },
        bind(){
            this.$refs["tree1"].bindCKByField("id",[1,3,4,5]);
        },
        expandAll(flag){
            this.$refs["tree1"].expandAll(flag);
        },
        checkall(flag){
            this.$refs["tree1"].checkAll(flag);
        }
    },
    mounted(){
        this.getTreeData(0);

        let localTreeData = [
            {name:"A",age:1,id:1},
            {name:"B",age:2,children:[
                {name:"B1",age:3,id:12},
                {name:"B2",age:4,children:[
                    {name:"B2_1",age:5,id:3},
                    {name:"B2_1",age:6,id:4},
                ]}
            ]},
            {name:"C",age:7,children:[
                {name:"C1_1",age:8,id:5},
            ]},
        ];
        this.$refs["tree1"].init(localTreeData);
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
