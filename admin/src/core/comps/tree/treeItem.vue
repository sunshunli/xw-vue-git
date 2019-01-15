<template>
    <div>
        <button @click="clickItem(item)">{{item[displayName]}}</button>
        {{item.name +"---"+ isFolder}}
        <!-- <div v-show="isFolder">
            <tree-item
                v-for="(x,index) in item.children"
                :item="x"
                :key="index"
                :displayName="displayName"
                :childrenKey="childrenKey"
            ></tree-item>
        </div> -->
    </div>    
</template>

<script>
export default {
    name:"TreeItem",
    props:["item","displayName","childrenKey","asynOptions","accpetItemNotice"],
    data(){
        return {
            
        }
    },
    computed:{
        isFolder(){
            return this.item.hasChildren && this.item.hasChildren.length != 0;
        }
    },
    methods:{
        getTestData(item){
            let name = item[this.displayName] + "_";
            return [{name:name + "0",id:2},
                {name:name + "1",id:3}];
        },
        clickItem(item,data){
            let _url  = this.asynOptions.getUrl();

            let tmp = this.asynOptions.analysis(this.getTestData(item));
            let returnObject = {};
            if(tmp && tmp.length != 0){
                // 处理子节点数据源
                // tmp.forEach(x => {
                //     x.hasChildren = false;
                //     x[this.childrenKey] = [];
                //     x.cls = "";
                //     x.__tmpId = Math.ceil(Math.random()*10000000000000000);
                // });
                returnObject["hasChildren"] = true;
                returnObject[this.childrenKey] = tmp;
                returnObject["__tmpId"] = item.__tmpId;
                returnObject["name"] = "AAA";
            }
            this.accpetItemNotice(returnObject);

            // window.setTimeout(d=>{
            //     let tmp = this.asynOptions.analysis(this.getTestData(item));
            //     let returnObject = {};
            //     if(tmp && tmp.length != 0){
            //         //处理子节点数据源
            //         tmp.forEach(x => {
            //             x.hasChildren = false;
            //             x[this.childrenKey] = [];
            //             x.cls = "";
            //             x.__tmpId = Math.ceil(Math.random()*10000000000000000);
            //         });
            //         returnObject["hasChildren"] = true;
            //         returnObject[this.childrenKey] = tmp;
            //         returnObject["__tmpId"] = item.__tmpId;
            //     }
            //     this.accpetItemNotice(returnObject);
            // },100)
            // this.ajax.getFetch(_url).then(d=>{
            //     let tmp = this.asynOptions.analysis(d);
            //     if(tmp && tmp.length != 0){
            //         item.hasChildren = true;
            //         item[this.childrenKey] = tmp;
            //     }
            // })
        }

    },
    mounted(){

    }
}
</script>

<style>

</style>
