<template>
    <div>
        <button @click="clickItem(item)">{{item[displayName]}}</button>
        {{item.name +"---"+ isFolder}}
        <div v-show="isFolder">
            <tree-item
                v-for="(x,index) in item.children"
                :item="x"
                :key="index"
                :displayName="displayName"
                :childrenKey="childrenKey"
                :asynOptions="asynOptions"
                :accpetItemNotice="accpetItemNotice"
            ></tree-item>
        </div>
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
        // selfNotice(item){
        //     let _url  = this.asynOptions.getUrl();
        //     let tmp = this.asynOptions.analysis(this.getTestData(item));
        // },
        clickItem(item,data){
            let _url  = this.asynOptions.getUrl();

            window.setTimeout(d=>{
                let tmp = this.asynOptions.analysis(this.getTestData(item));
                if(tmp && tmp.length != 0){
                    //处理子节点数据源
                    tmp.forEach(x => {
                        x.hasChildren = false;
                        x[this.childrenKey] = [];
                        x.cls = "";
                        x.__tmpId = Math.ceil(Math.random()*10000000000000000);
                    });
                    item.hasChildren = true;
                    item[this.childrenKey] = tmp;
                }
                this.accpetItemNotice(item);
            },100)
            // this.ajax.getFetch(_url).then(d=>{
            //     let tmp = this.asynOptions.analysis(d);
            //     if(tmp && tmp.length != 0){
            //         item.hasChildren = true;
            //         item[this.childrenKey] = tmp;
            //     }
            // })
        },
        getNodeById(arr,id){
            let res = null;
            for(let i =0;i<arr.length;i++){
                if(arr[i].id == id){
                    res = arr[i];
                    console.log(1);
                    return res;
                }
                let children = arr[i].children;
                if(children && children.length >0){
                    let _tmp = this.getNodeById(children,id);
                    if(_tmp){
                        res = _tmp;
                        console.log(2);
                        return res;
                    }
                }
            }
            console.log(3);
            return res;
        }
    },
    mounted(){
        let array = [
            {name:1,id:1,children:[
                {name:"1-1",id:"2",children:[{
                    name:"1-1-1",id:"35"
                }]},
                {name:"1-2",id:"24",children:[
                    {name:"1-2-1",id:"3"}
                ]},
                {name:"1-3",id:"25",children:[
                    {name:"1-2-1",id:"4"}
                ]}
            ]},
            {name:2,id:12,children:[
                {name:"2-1",id:"2",children:[{
                    name:"2-1-1",id:"39"
                }]},
                {name:"2-2",id:"9",children:[
                    {name:"2-2-1",id:"10"}
                ]},
                {name:"2-3",id:"9",children:[
                    {name:"2-2-1",id:"13"},
                    {name:"2-2-2",id:"15"},
                    {name:"2-2-3",id:"11"}
                ]}
            ]}
        ];
        let res = this.getNodeById(array,"35");
        console.log(res);
    }
}
</script>

<style>

</style>
