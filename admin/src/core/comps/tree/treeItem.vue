<template>
    <div v-bind:style="paddingLeft">
        <button @click="clickItem(item)">{{item[displayName]}}</button>
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
            return [{name:name + "0",id:2},
                {name:name + "1",id:3}];
        },
        clickItem(item,data){
            if(!item.hasChildren){
                let _url  = this.asynOptions.getUrl(item);
                window.setTimeout(d=>{
                    let tmp = this.asynOptions.analysis(this.getTestData(item));
                    if(tmp && tmp.length != 0){
                        //处理子节点数据源
                        tmp.forEach(x => {
                            x.__tmpId = Math.ceil(Math.random()*10000000000000000);
                            x.hasChildren = false;
                            x[this.childrenKey] = [];
                            x.cls = "";
                            x.level = item.level + 1;
                            x.open = false;
                            x.parentId = item.__tmpId;
                        });
                        //通知root节点，有数据变化，自己本身节点不做任何改变(不能改变自身对象)
                        let tmpObject = {actionKey:ACTIONKEY.UPDATECHILDREN,__tmpId:item.__tmpId,data:{}};
                        tmpObject.data[this.childrenKey] = tmp;
                        tmpObject.data["hasChildren"] = true;
                        tmpObject.data["open"] = true;
                        _eventPublisher.broadcast(this.EVENTPUBLISHKEY,tmpObject);
                    }
                },100)
                // this.ajax.getFetch(_url).then(d=>{
                //     let tmp = this.asynOptions.analysis(d);
                //     if(tmp && tmp.length != 0){
                //         item.hasChildren = true;
                //         item[this.childrenKey] = tmp;
                //     }
                // })
            }else{
                _eventPublisher.broadcast(this.EVENTPUBLISHKEY,{
                    actionKey:ACTIONKEY.OPEN,
                    __tmpId:item.__tmpId,
                    data:{
                        open:!item.open
                    }
                });
            }
        },
    },
    mounted(){
        // let array = [
        //     {name:1,id:1,children:[
        //         {name:"1-1",id:"2",children:[{
        //             name:"1-1-1",id:"35"
        //         }]},
        //         {name:"1-2",id:"24",children:[
        //             {name:"1-2-1",id:"3"}
        //         ]},
        //         {name:"1-3",id:"25",children:[
        //             {name:"1-2-1",id:"4"}
        //         ]}
        //     ]},
        //     {name:2,id:12,children:[
        //         {name:"2-1",id:"2",children:[{
        //             name:"2-1-1",id:"39"
        //         }]},
        //         {name:"2-2",id:"9",children:[
        //             {name:"2-2-1",id:"10"}
        //         ]},
        //         {name:"2-3",id:"9",children:[
        //             {name:"2-2-1",id:"13"},
        //             {name:"2-2-2",id:"15"},
        //             {name:"2-2-3",id:"11"}
        //         ]}
        //     ]}
        // ];
        // let res = this.getNodeById(array,"35");
        // console.log(res);
    }
}
</script>

<style>

</style>
