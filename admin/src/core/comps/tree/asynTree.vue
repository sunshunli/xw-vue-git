
<template>
    <div>
        <tree-item
            v-for="(item,index) in state.data" :key="index"
            :item="item"
            :displayName="displayName"
            :asynOptions="asynOptions"
            :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
            :checkbox="checkbox"
        ></tree-item>
    </div>
</template>
<script>

import TreeItem from "./asynTreeItem.vue";
import CommonUtil from '../../tool/commonUtil.js';
import DEFINE_KEY from "../Define.js";
import _tool from "./treePrivateMethods.js";

export default {
    name:"LeAsynTree",
    components:{TreeItem},
    props:["displayName","asynOptions","itemClick",'checkbox'],
    data(){
        return {
            originData:null,
            state:{
                data:[]
            },
            EVENTPUBLISHKEY:_idSeed.newId() + "_TREE_NOTICEKEY",
        }
    },
    methods:{
        /**
         * @description 根据当前节点的checkbox状态，修改所有父节点的checkbox状态
         * @param 当前node节点
         * @returns
         */
        setParentCheckBoxStatus(node){
            if(node && node.__hasChildren && node.__children.length != 0){
                let count = 0;
                node.__children.forEach(x=>{
                    if(x.__checkboxStatus){
                        count++;
                    }
                })
                node.__checkboxStatus = count == node.__children.length?true:false;

                let parentNode = _tool.getNodeById(this.state.data,node.__parentId);
                this.setParentCheckBoxStatus(parentNode);
            }
        },
        /**
         * @description 根据当前节点的checkbox状态，修改所有子节点的checkbox状态
         * @param 当前node节点
         * @param status状态
         * @returns
         */
        setChildrenCheckboxStatus(node,status){
            if(!node){
                return;
            }
            node.__checkboxStatus = status;
            //如果存在children，则改变所有子元素
            if(node.__hasChildren && node.__children.length != 0){
                node.__children.forEach(x => {
                    x.__checkboxStatus = status;
                    this.setChildrenCheckboxStatus(x,status);
                });
            }
        },
        /**
         * @description 初始化并且默认获取第一个根节点
         * @returns node/null
         */
        init(data){
            this.originData = CommonUtil.object.cloneObj(data);
            let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(data,null,true);
            this.state = {
                data:tmpData
            };
            if(this.state.data.length > 0){
                return this.state.data[0];
            }
            return null;
        },
        reset(){
            let _originData = CommonUtil.object.cloneObj(this.originData);
            this.state = {
                data:DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(_originData,null,true)
            };
            this._originData = _originData;
        },
        /**
         * @description 更新单个节点
         * @param node 当前节点
         * @param data 传输的数据,格式{__displayName:"a",__children:[]}
         */
        updateSingleNode(node,data){
            node[this.displayName] = data.__displayName?data.__displayName:node[this.displayName];
            if(data.__children && data.__children instanceof Array && data.__children.length != 0){
                let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(data.__children,node,false);
                node.__children = tmpData;
            }
        },
        /**
         * @description 删除节点
         * @param node 需要删除的节点
         */
        deleteSingleNode(node){
            let parentNode = _tool.getNodeById(this.state.data,node.__parentId);
            //非根节点
            if(parentNode){
                CommonUtil.arrayServer.removeItems(parentNode.__children,[node]);
            }
            //根节点
            else{
                CommonUtil.arrayServer.removeItems(this.state.data,[node]);
            }
        },
        /**
         * @description 获取所有被选中子节点
         * @returns Array
         */
        getAllCheckedNodes(){
            _tool.checkedNodes = [];
            _tool.getAllCheckedNodes(this.state.data);
            return _tool.checkedNodes;
        },
        /**
         * @description 获取所有被选中子节点，不包含parentNode
         * @returns Array
         */
        getAllCheckboxNodesExcludeParent(){
            _tool.checkedNodes = [];
            _tool.getAllCheckboxNodesExcludeParent(this.state.data);
            return _tool.checkedNodes;
        }
    },
    mounted(){
        //订阅所有
        let that = this;
        /**
         * @description 处理所有订阅事件
         */
        _eventPublisher.on(this.EVENTPUBLISHKEY,d=>{
            let item = _tool.getNodeById(that.state.data,d.__tmpId);
            //如果数据错误，没有找到当前节点，直接return
            if(!item){
                return;
            }
            //无children情况下，展开事件（ajax请求）
            if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.UPDATECHILDREN){
                item.__hasChildren = d.data.hasChildren;
                item.__children = d.data.children;
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //有children的情况下，展开事件
            else if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.OPEN){
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //当前项选中事件，执行callback
            else if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.SELECTEDITEM){
                _tool.setSingleColor(this.state.data,item);
                this.itemClick(item);
            }
            //checkbox状态变化事件
            else if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.CHECKBOX){
                //改变所有子节点的checkbox状态
                this.setChildrenCheckboxStatus(item,d.checkboxStatus);
                //改变所有父节点的checkbox状态
                this.setParentCheckBoxStatus(_tool.getNodeById(that.state.data,item.__parentId));
            }
        })
    }
}
</script>

<style scoped>

</style>

