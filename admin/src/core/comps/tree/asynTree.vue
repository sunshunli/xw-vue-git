
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
import KEYS from "./config.js";

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
            let tmpData = KEYS.INITATTRIBUTE(originData,null,true);
            this.state = {
                data:tmpData
            };
        },
        updateSingleNode(node,data){
            node[this.displayName] = data.name?data.name:node[this.displayName];
            if(data.children instanceof Array && data.children.length != 0){
                let tmpData = KEYS.INITATTRIBUTE(data.children,node,false);
                node[this.childrenKey] = tmpData;
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
                debugger
                item.hasChildren = d.data.hasChildren;
                item[that.childrenKey] = d.data[that.childrenKey];
                item.expand = d.data.expand;
                item.cls = d.data.cls;
            }
            //判断是否有children，进行展开的样式处理
            else if(d.actionKey == KEYS.ACTIONKEY.OPEN){
                item.expand = d.data.expand;
                item.cls = d.data.cls;
            }
            //当前项选中的callback
            else if(d.actionKey == KEYS.ACTIONKEY.SELECTEDITEM){
                if(item.color){
                    item.color = "";
                }else{
                    item.color = "color";
                }
                this.itemClick(item);
            }
        })
    }
}
</script>

<style>

</style>
