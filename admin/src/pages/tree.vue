
<template>
    <div class="treeContent" style="height:2000px;border:1px solid bule">
        <le-asyn-tree
            displayName="name"
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
                    debugger
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
            //异步操作，更新当前节点
            window.setTimeout(d=>{
                this.$refs["tree"].updateSingleNode(item,{__displayName:"xxx",__children:[{name:"new",id:"123"}]});
            },1000)
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

            this.alert.showAlert("success","success!!!!");

            this.alert.showConfirm("提示",d=>{

            })

            this.alert.showNotify("success","更新成功！！！");
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
