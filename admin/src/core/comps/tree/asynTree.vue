
<template>
    <div>
        <tree-item
            v-for="(item,index) in state.data" :key="index"
            :item="item"
            :displayName="displayName"
            :asynOptions="asynOptions"
            :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
        ></tree-item>
    </div>
</template>

<script>

import TreeItem from "./treeItem.vue";
import CommonUtil from '../../tool/commonUtil';
import KEYS from "./config.js";

export default {
    name:"LeAsynTree",
    components:{TreeItem},
    props:["displayName","asynOptions","itemClick"],
    data(){
        return {
            state:{
                data:[]
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
                let children = arr[i].__children;
                if(children instanceof Array && children && children.length >0){
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
            let tmpData = KEYS.INITATTRIBUTE(originData,null,true);
            this.state = {
                data:tmpData
            };
        },
        /**
         * @description 更新单个节点
         * @param node 当前节点
         * @param data 传输的数据,格式{__displayName:"a",__children:[]}
         */
        updateSingleNode(node,data){
            node[this.displayName] = data.__displayName?data.__displayName:node[this.displayName];
            if(data.__children && data.__children instanceof Array && data.__children.length != 0){
                let tmpData = KEYS.INITATTRIBUTE(data.__children,node,false);
                node.__children = tmpData;
            }
        }
    },
    mounted(){
        //订阅所有
        let that = this;
        _eventPublisher.on(this.EVENTPUBLISHKEY,d=>{
            let item = that.getNodeById(that.state.data,d.__tmpId);
            //ajax请求获取子节点数据
            if(d.actionKey == KEYS.ACTIONKEY.UPDATECHILDREN){
                item.__hasChildren = d.data.hasChildren;
                item.__children = d.data.children;
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //判断是否有children，进行展开的样式处理
            else if(d.actionKey == KEYS.ACTIONKEY.OPEN){
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //当前项选中的callback
            else if(d.actionKey == KEYS.ACTIONKEY.SELECTEDITEM){
                if(item.__color){
                    item.__color = "";
                }else{
                    item.__color = "color";
                }
                this.itemClick(item);
            }
        })
    }
}
</script>

<style>

</style>
