<template>
    <div v-bind:style="paddingLeft">
        <button @click="clickItem(item)" class="fa" :class="item.cls">{{item[displayName]}}</button>
        {{item.level * 18 +"---"+ item.hasChildren}}
        <div v-if="item.hasChildren && item.hasChildren.length != 0" v-show="item.open">
            <tree-item
                v-for="(x,index) in item.children"
                :item="x"
                :key="index"
                :displayName="displayName"
                :childrenKey="childrenKey"
                :asynOptions="asynOptions"
                :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
            ></tree-item>
        </div>
    </div>    
</template>

<script>

const ACTIONKEY = {
    OPEN:"open",
    UPDATECHILDREN:"updateChilden",
    CHECK:"check"
}

export default {
    name:"TreeItem",
    props:["item","displayName","childrenKey","asynOptions","EVENTPUBLISHKEY"],
    data(){
        return {
            paddingLeft: "padding-left:"+this.item.level * 18 + "px"
        }
    },
    methods:{
        getTestData(item){
            
            let name = item[this.displayName] + "_";
            console.log(name);
            if(name == "A_" || name == "A_0_"){
                return [{name:name + "0",id:2},
                {name:name + "1",id:3}];
            }else{
                return [];
            }
        },
        clickItem(item,data){
            if(!item.hasChildren){
                let _url  = this.asynOptions.getUrl(item);
                window.setTimeout(d=>{
                    let tmp = this.asynOptions.analysis(this.getTestData(item));

                    //通知root节点，有数据变化，自己本身节点不做任何改变(不能改变自身对象)
                    let tmpObject = {actionKey:ACTIONKEY.UPDATECHILDREN,__tmpId:item.__tmpId,data:{}};

                    if(tmp && tmp.length != 0){
                        //处理子节点数据源
                        tmp.forEach(x => {
                            x.__tmpId = Math.ceil(Math.random()*10000000000000000);
                            x.hasChildren = false;
                            x[this.childrenKey] = [];
                            x.cls = "fa-caret-right";
                            x.level = item.level + 1;
                            x.open = false;
                            x.parentId = item.__tmpId;
                        });
                        tmpObject.data[this.childrenKey] = tmp;
                        tmpObject.data["hasChildren"] = true;
                        tmpObject.data["open"] = true;
                        tmpObject.data["cls"] = "fa-caret-down";
                    }else{
                        tmpObject.data[this.childrenKey] = [];
                        tmpObject.data["hasChildren"] = false;
                        tmpObject.data["open"] = false;
                        tmpObject.data["cls"] = "fa-caret-left";
                    }
                    _eventPublisher.broadcast(this.EVENTPUBLISHKEY,tmpObject);
                },100)
                // this.ajax.getFetch(_url).then(d=>{
                //     let tmp = this.asynOptions.analysis(d);
                //     if(tmp && tmp.length != 0){
                //         item.hasChildren = true;
                //         item[this.childrenKey] = tmp;
                //     }
                // })
            }else{
                let cls = "";
                if(item[this.childrenKey] && item[this.childrenKey].length != 0){
                    if(item.cls == "fa-caret-right"){
                        cls = "fa-caret-down";
                    }else{
                        cls = "fa-caret-right";
                    }
                }else{
                    cls = "fa-caret-left";
                }

                _eventPublisher.broadcast(this.EVENTPUBLISHKEY,{
                    actionKey:ACTIONKEY.OPEN,
                    __tmpId:item.__tmpId,
                    data:{
                        open:!item.open,
                        cls:cls
                    }
                });
            }
        },
    },
    mounted(){
    }
}
</script>

<style>
    div{
        color: #606266;
    }

    .treeContent button{
        color: #606266;
    }

    .treeContent button::before{
        color: #a7acb5;
        height: 12px;
        display: inline-block;
        text-align: center;
        padding: 5px;
        padding-left: 0;
        vertical-align: baseline;
    }

    .treeContent .fa-caret-left::before{
        color: #fff;
    }


</style>
