
<template>
    <div>
        <div>
            <tree-item
                v-for="(item,index) in state.data" :key="index"
                :item="item"
                :displayName="displayName"
                :childrenKey="childrenKey"
                :asynOptions="asynOptions"
                :accpetItemNotice="accpetItemNotice"
            ></tree-item>
        </div>
    </div>
</template>

<script>

import TreeItem from "./treeItem.vue";
import CommonUtil from '../../tool/commonUtil';

export default {
    name:"LeAsynTree",
    components:{TreeItem},
    props:["displayName","childrenKey","asynOptions"],
    data(){
        return {
            state:{
                data:[]
            }
        }
    },
    methods:{
        getItemById(item){
            this.state.data.forEach(d=>{
                if(d.__tmpId == item.__tmpId){
                    d.hasChildren = item.hasChildren;
                    d[this.childrenKey] = item[this.childrenKey];
                    d["name"] = item["name"]
                }
            })
        },
        accpetItemNotice(data){
            this.getItemById(data);
            this.state = {
                data:this.state.data
            }
            console.log(this.state.data);
        },
        init(data){
            let originData = CommonUtil.object.deepArrayClone(data);
            for (let index = 0; index < originData.length; index++) {
                const element = originData[index];
                element.__tmpId = Math.ceil(Math.random()*10000000000000000);
                element.hasChildren = false;
                element.cls = "";
                element[this.childrenKey] = [];
            }
            this.state = {
                data:originData
            };
            debugger
        }
    },
    mounted(){},
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
