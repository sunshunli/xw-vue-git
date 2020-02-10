
<template>
    <div class="treeContent" style="height:2000px;border:1px solid bule">
        <div style="float:left">
            <button @click="deleteNode">删除节点</button>
            <button @click="getNodes">获取被选中节点</button>
            <button @click="reSet">reSet</button>
            <button @click="bind">bind</button>
            <button @click="expandAll(true)">expand</button>
            <button @click="expandAll(false)">unExpand</button>
            <button @click="checkall(true)">checkAll</button>
            <button @click="checkall(false)">unCheckAll</button>
            <!-- <le-asyn-tree displayName="name" :asynOptions="asynOptions" ref="tree" :itemClick="itemClick" checkbox></le-asyn-tree> -->
            <le-local-tree displayName="name" ref="tree1" :itemClick="itemClick" childrenKey="children" checkbox></le-local-tree>

        </div>
        <div style="float:left">
            <le-button value="新增菜单" @click="save"></le-button>
            <le-button value="删除节点" @click="remove"></le-button>

            <le-button value="Local更新节点" @click="updateLocal"></le-button>
            <le-button value="Local删除节点" @click="removeLocal"></le-button>
        </div>
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
                    return "/auth/resources/getResources?parent_id="+d.id;
                },
                analysis:d=>{
                    return d.data;
                }
            }
        }
    },
    methods:{
        itemClick(item){
            console.log(item);
            this.selectNode = item;
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
            this.ajax.getFetch("/auth/resources/getResources?parent_id="+id).then(d=>{
                this.data = d.data;
                this.$refs["tree"].init(d.data);
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
        },
        save(){
            let params = {
                parent_id: "dd9dcf8b-b882-4611-908b-e2cf03ace556",
                id: "",
                name: "test" + Math.ceil(Math.random()*100),
                url: "11111"+ Math.ceil(Math.random()*100),
                display_order: 1,
                isIdempotent: 0,
                isCompatible: 0,
                isDefaultOpt: 0,
                isWritable: 0,
                isOutLink: 0,
                paramFilters: [],
                createBy: "",
                createTimeStr: "",
                updateBy: "",
                updateTimeStr: "",
            }
            this.ajax.postFormData("/auth/resources/saveOrUpdateApi", params).then(d=>{
                this.alert.showAlert("success","insert success");
                this.$refs["tree"].reloadNode(this.selectNode);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        remove(){
            this.ajax.postFormData("/auth/resources/delResource?id=" + this.selectNode.id, null).then(d=>{
                this.alert.showAlert("success","remove success");
                this.$refs["tree"].reloadNode(this.selectNode.__parentNode);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        updateLocal(){
            let data = {__displayName:"a",__children:[
                {name:"B2_1",age:5,id:3},
                {name:"B2_1",age:6,id:4}
            ]};
            this.$refs["tree1"].reloadNode(this.selectNode, data);
        },
        removeLocal(){
            let data = {__children:[]};
            this.$refs["tree1"].reloadNode(this.selectNode, data);
        }
    },
    mounted(){
        // this.getTreeData(0);

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
