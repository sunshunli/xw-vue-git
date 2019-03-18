<template>
    <div class="ML12" >
         <div class = "fa-item" :class="item.__color">
            <button @click="expandNode(item)" class="fa" :class="item.__cls"></button>
            <!-- <input type="checkbox" name="test"/> -->
            <span class="fa fa-checkBox fa-check-square"></span>
            <span class="fa fa-checkBox"></span>
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
            ></tree-item>
        </div>
    </div>
</template>

<script>
import KEYS from "./config.js";

export default {
    name:"TreeItem",
    props:["item","displayName","asynOptions","EVENTPUBLISHKEY"],
    data(){
        return {

        }
    },
    methods:{
        getTestData(item){
            let name = item[this.displayName] + "_";
            return [{name:name + "0",id:2},
                {name:name + "1",id:3}];
            if(name == "A_" || name == "A_0_"){
                return [{name:name + "0",id:2},
                {name:name + "1",id:3}];
            }else{
                return [];
            }
        },
        expandNode(item,data){
            if(!item.__hasChildren){
                console.log("ajax请求");
                let _url  = this.asynOptions.getUrl(item);
                //发送ajax请求, 改变loading状态
                item.__cls = "fa-caret-load";
                window.setTimeout(()=>{
                    let tmp = this.asynOptions.analysis && this.asynOptions.analysis(this.getTestData(item));
                    
                    //通知root节点，有数据变化，自己本身节点不做任何改变(不能改变自身对象)
                    let tmpObject = {actionKey:KEYS.ACTIONKEY.UPDATECHILDREN,__tmpId:item.__tmpId,data:{}};
                    if(tmp && tmp instanceof Array && tmp.length != 0){
                        let tmpData = KEYS.INITATTRIBUTE(tmp,item,false);
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
                },100)
                // this.ajax.getFetch(_url).then(d=>{
                //     //asynOptions 函数必须返回数组
                //     let tmp = this.asynOptions.analysis && this.asynOptions.analysis(d);
                    
                //     //通知root节点，有数据变化，自己本身节点不做任何改变(不能改变自身对象)
                //     let tmpObject = {actionKey:KEYS.ACTIONKEY.UPDATECHILDREN,__tmpId:item.__tmpId,data:{}};
                //     if(tmp && tmp instanceof Array && tmp.length != 0){
                //         let tmpData = KEYS.INITATTRIBUTE(tmp,item,false);
                //         tmpObject.data.children = tmpData;
                //         tmpObject.data.hasChildren = true;
                //         tmpObject.data.expand = true;
                //         tmpObject.data.cls = "fa-caret-down";
                //     }else{
                //         tmpObject.data.children = [];
                //         tmpObject.data.hasChildren = false;
                //         tmpObject.data.expand = false;
                //         tmpObject.data.cls = "fa-caret-left";
                //     }
                //     _eventPublisher.broadcast(this.EVENTPUBLISHKEY,tmpObject);
                // })
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
                    actionKey:KEYS.ACTIONKEY.OPEN,
                    __tmpId:item.__tmpId,
                    data:{
                        expand:!item.__expand,
                        cls:cls
                    }
                });
            }
        },
        selectItem(item){
            _eventPublisher.broadcast(this.EVENTPUBLISHKEY,{
                actionKey:KEYS.ACTIONKEY.SELECTEDITEM,
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
        background:#f55!important;
        color:#fff!important;
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
        background: url(/static/images/loading.gif?03ce3dc…) 0 0 no-repeat;
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
