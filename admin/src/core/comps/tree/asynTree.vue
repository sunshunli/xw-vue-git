
<template>
    <div>
        <tree-item
            v-for="(item,index) in state.data" :key="index"
            :item="item"
            :displayName="displayName"
            :childrenKey="childrenKey"
            :asynOptions="asynOptions"
            :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
        ></tree-item>
    </div>
</template>

<script>

import TreeItem from "./treeItem.vue";
import CommonUtil from '../../tool/commonUtil';

const ACTIONKEY = {
    OPEN:"open",
    UPDATECHILDREN:"updateChilden",
    CHECK:"check"
}

export default {
    name:"LeAsynTree",
    components:{TreeItem},
    props:["displayName","childrenKey","asynOptions","itemClick"],
    data(){
        return {
            state:{
                data:[],
            },
            EVENTPUBLISHKEY:Math.ceil(Math.random()*10000000000000) + "_TREE_NOTICEKEY"
        }
    },
    methods:{
        //遍历tree的数据源，根据__tmpId找到当前节点
        getNodeById(arr,id){
            let res = null;
            for(let i =0;i<arr.length;i++){
                if(arr[i].__tmpId == id){
                    res = arr[i];
                    return res;
                }
                let children = arr[i].children;
                if(children && children.length >0){
                    let _tmp = this.getNodeById(children,id);
                    if(_tmp){
                        res = _tmp;
                        return res;
                    }
                }
            }
            return res;
        },
        init(data){
            let originData = CommonUtil.object.deepArrayClone(data);
            originData.forEach(element=>{
                element.__tmpId = Math.ceil(Math.random()*10000000000000);
                element.hasChildren = false;
                element[this.childrenKey] = [];
                element.cls = "fa-caret-right";
                element['level'] = 1;
                element.open = false;
                element.parentId = -1;
            })
            this.state = {
                data:originData
            };
        }
    },
    mounted(){
        //订阅所有
        let that = this;
        _eventPublisher.on(this.EVENTPUBLISHKEY,d=>{
            let item = that.getNodeById(that.state.data,d.__tmpId);
            //ajax请求获取子节点数据
            if(d.actionKey == ACTIONKEY.UPDATECHILDREN){
                item.hasChildren = d.data.hasChildren;
                item[that.childrenKey] = d.data[that.childrenKey];
                item.open = d.data.open;
                item.cls = d.data.cls;
            }
            //判断是否有children，进行展开的样式处理
            else if(d.actionKey == ACTIONKEY.OPEN){
                item.open = d.data.open;
                item.cls = d.data.cls;
            }
            //当前项选中的callback
            this.itemClick(item);
        })
    },
    // computed:{
    //     dataSource(){
    //         this.state.data.map(item => {
    //             item.hasChildren = false;
    //             item[this.childrenKey] = [];
    //             item.cls = "";
    //             item.__tmpId = Math.ceil(Math.random()*10000000000000000);
    //         });
    //         debugger
    //         return [...this.state.data];
    //     }
    // }
}
</script>

<style>

</style>
