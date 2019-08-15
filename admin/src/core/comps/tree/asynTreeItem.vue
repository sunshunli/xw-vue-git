<template>
    <div class="ML12" >
         <div class = "fa-item" :class="item.__color" :style="'margin-left:'+(item.__level-1)*10+'px'">
            <input type="button" @click="expandNode(item)" class="fa" :class="item.__cls" />
            <span v-if="checkbox!=undefined?true:false" class="fa fa-checkBox" :class="item.__checkboxStatus?'fa-check-square':''" @click="changeCheckboxStatus(item)"></span>
            <span class="tree-item-name" @click="selectItem(item)">{{item[displayName]}}</span>     
        </div>
        <div v-if="item.__hasChildren && item.__children instanceof Array && item.__hasChildren.length != 0" v-show="item.__expand">
            <tree-item
                v-for="(x,index) in item.__children"
                :item="x"
                :key="index"
                :displayName="displayName"
                :asynOptions="asynOptions"
                :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
                :checkbox = "checkbox"
                :readonly="readonly"
            ></tree-item>
        </div>
    </div>
</template>

<script>
import DEFINE_KEY from "../define.js";

export default {
    name:"TreeItem",
    props:["item","displayName","asynOptions","EVENTPUBLISHKEY","checkbox","readonly"],
    data(){
        return {

        }
    },
    methods:{
        /**
         * @description checkbox状态改变的事件
         */
        changeCheckboxStatus(item){
            if(this.readonly){
                return;
            }
            if(this.checkbox != undefined){
                _eventPublisher.broadcast(this.EVENTPUBLISHKEY,{
                    actionKey:DEFINE_KEY.TREE_CONFIG.ACTIONKEY.CHECKBOX,
                    __tmpId:item.__tmpId,
                    checkboxStatus:!item.__checkboxStatus
                });
            }
        },
        /**
         * @description 展开节点操作，包含无子节点数据情况下的ajax请求和有数据情况下的显示和隐藏
         * @param item: 当前选中节点
         */
        expandNode(item){
            if(!item.__hasChildren){
                console.log("ajax请求");
                let _url  = this.asynOptions.getUrl(item);
                //发送ajax请求, 改变loading状态
                item.__cls = "fa-caret-load";
                this.ajax.getFetch(_url).then(d=>{
                    //asynOptions 函数必须返回数组
                    let tmp = this.asynOptions.analysis && this.asynOptions.analysis(d);
                    
                    //通知root节点，有数据变化，自己本身节点不做任何改变(不能改变自身对象)
                    let tmpObject = {actionKey:DEFINE_KEY.TREE_CONFIG.ACTIONKEY.UPDATECHILDREN,__tmpId:item.__tmpId,data:{}};
                    if(tmp && tmp instanceof Array && tmp.length != 0){
                        let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(tmp,item,false);
                        tmpObject.data.children = tmpData;
                        tmpObject.data.hasChildren = true;
                        tmpObject.data.expand = true;
                        tmpObject.data.cls = "fa-caret-down";
                    }else{
                        tmpObject.data.children = [];
                        tmpObject.data.hasChildren = false;
                        tmpObject.data.expand = false;
                        tmpObject.data.cls = "fa-caret-left";
                    }
                    _eventPublisher.broadcast(this.EVENTPUBLISHKEY,tmpObject);
                })
            }else{
                console.log("展开折叠操作");
                let cls = "";
                if(item.__children && item.__children instanceof Array && item.__children.length != 0){
                    if(item.__cls == "fa-caret-right"){
                        cls = "fa-caret-down";
                    }else{
                        cls = "fa-caret-right";
                    }
                }else{
                    cls = "fa-caret-left";
                }

                _eventPublisher.broadcast(this.EVENTPUBLISHKEY,{
                    actionKey:DEFINE_KEY.TREE_CONFIG.ACTIONKEY.OPEN,
                    __tmpId:item.__tmpId,
                    data:{
                        expand:!item.__expand,
                        cls:cls
                    }
                });
            }
        },
        /**
         * @description 选中当前项事件，会传递到root触发选中回调
         * @param item:当前选中项
         */
        selectItem(item){
            _eventPublisher.broadcast(this.EVENTPUBLISHKEY,{
                actionKey:DEFINE_KEY.TREE_CONFIG.ACTIONKEY.SELECTEDITEM,
                __tmpId:item.__tmpId,
                selectedItem:item
            });
        }
    },
    mounted(){
    }
}
</script>

<style scoped>
    div{
        color: #606266;
    }
    .tree-item-name{
        cursor:pointer;
    } 
    .ML12 .color{
        /* background:#f55!important;
        color:#fff!important; */
        color: red !important;
    }
    .ML12{
        padding-left:6px;
        padding-right: 6px;
    }
    .ML12 .fa-item{
        padding-left: 0;
        text-align: left;
        color: #606266;
        font-size: 14px;
        padding:2px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        position: relative;
    }
    .fa-item button{
        color: #606266;
        padding:0;
        border: none;
        background-color: transparent;
        outline: none;
    }
    .fa-item button::before{
        color: #a7acb5;
        width: 12px;
        height: 12px;
        display: inline-block;
        text-align: center;
        vertical-align: baseline;
        padding: 6px 0;
    }

    .fa-item .fa-caret-left::before{
        color: transparent;
    }

    .fa-item .fa-caret-load{
        background: url("//p4.lefile.cn/product/adminweb/2019/08/01/b98419e5-a8a9-48be-87e0-b66c9ef93d05.gif") 0 0 no-repeat;
        background-size: 100%;
        width: 12px;
        height: 23px;
        padding: 6px 0;
        background-position: center;
        vertical-align: baseline;
        background-position-y: 5px;
     }
    
    .fa-checkBox{
        width: 12px;
        height: 12px;
        border: 1px solid #337ab7;
        display: inline-block;
        border-radius: 2px;
        margin-right: 2px;
        vertical-align: sub;
    }

    .fa-check-square:before{
        color: #337ab7;
        position: absolute;
        top: 10px;
        left: 18px;
    }

</style>
