<template>
    <div class="tableContainer">
        <table class="table">
            <header-section :singleSelected="singleSelected" :show-ck="showCk" :origin-cols="originCols" :accpet-h-b-notice="accpetHBNotice" :notice-change-cols="noticeChangeCols" :ck="state.ck" :actions="actions" :cols="state.cols"></header-section>        

            <body-section :singleSelected="singleSelected" :show-ck="showCk" :actions="actions" :cols="state.cols" :accpet-h-b-notice="accpetHBNotice" :data="state.data"></body-section>
        </table>

        <paging-section :options="state.pageOption" :go-index="gIndex" :go-prev="prev" :go-next="next"></paging-section>
    </div>
</template>

<script>
    import HeaderSection from "./header.vue";
    import BodySection from "./body.vue";
    import PagingSection from "./paging.vue";
    import Util from "../../tool/commonUtil.js";
    
    export default {
        components: {HeaderSection,BodySection,PagingSection},
        props:["options"],
        name: "TableList",
        data(){
            return {
                state:{
                    data:[],
                    cols:this.options.map,
                    ck:false,
                    pageOption:{
                        index:this.options.pageOption.index?this.options.pageOption.index:1,
                        size:this.options.pageOption.size?this.options.pageOption.size:10,
                        count:0,
                        total:0
                    }
                }
            }
        },
        computed:{
            originCols:function(){
                return Util.object.cloneObj(this.options.map);
            },
            showCk:function(){
                return this.options.showCk;
            },
            actions:function(){
                return this.options.actions;
            },
            getUrl:function(){
                return this.options.getUrl;
            },
            singleSelected:function(){
                return this.options.singleSelected;
            }
        },
        methods:{
            /**
             * @description 根据参数获取数据源
             * @returns
             */
            getData:function(index){
                if(!index){
                    index = 1;
                }
                let url = this.options.getUrl();
                if( url === ""){
                    return;
                }
                let suffix = url.indexOf('?') === -1?"?":"&";
                let size = this.state.pageOption.size;
                url += suffix + this.options.pageOption.indexKey + "=" + index + "&"+ this.options.pageOption.sizeKey + "=" + size;
                this.ajax.getFetch(url).then(data=>{
                    let res = {};
                    if(this.options.analysis){
                        res = this.options.analysis(data);
                    }else{
                        res = data;

                    }                    
                    if(res.data && res.data instanceof Array && res.data.length != 0){
                        let arr = Util.object.addPrimaryAndCk(res.data);
                        let total = -1;
                        if(parseInt(res.count)%size == 0){
                            total = parseInt(res.count)/size;
                        }else{
                            total = parseInt(parseInt(res.count)/size) + 1;
                        }

                        this.state = {
                            data:arr,
                            cols:this.state.cols,
                            ck:false,
                            pageOption:{
                                index:index,
                                count:res.count,
                                total:total,
                                size:size
                            }
                        }
                    }else{
                        this.state = {
                            data:[],
                            cols:this.state.cols,
                            ck:false,
                            pageOption:{
                                index:1,
                                count:0,
                                total:0,
                                size:size
                            }
                        }
                        Util.throwError("数据源为空或者检查analysis, getUrl, pageOption参数!");
                    }
                }).catch(e=>{
                    this.alert.showAlert("error","列表["+url+"]请求失败!");
                })
            },
            /**
             * @description 从head和body接收到通知，需要更新数据源，然后下发所有子组件
             */
            accpetHBNotice:function(hData,bData){
                //如果data有参数，说明是从head过来的通知，如果没有就说明是body过来的通知
                if(hData){
                    this.state.data.map(item=>{
                        item.ck = hData.ck;
                    })
                    this.state = {
                        data:this.state.data,
                        ck:hData.ck,
                        cols:this.state.cols,
                        pageOption:this.state.pageOption
                    }
                }
                if(bData){
                    let items = Util.object.getCheckedItems(bData.data);
                    let flag = items.items.length == this.state.data.length?true:false;
                    this.state = {
                        data:bData.data,
                        ck:flag,
                        cols:this.state.cols,
                        pageOption:this.state.pageOption
                    }
                }
            },
            /**
             * @description 从head里面收到通知，表头的cols变化
             * @returns
             */
            noticeChangeCols:function(map){
                this.state.cols = map;
            },
            /**
             * @description 分页的上一页事件
             * @returns
             */
            prev:function(){
                let index = this.state.pageOption.index;
                index--;
                this.getData(index);
            },
            /**
             * @description 分页的下一页事件
             * @returns
             */
            next:function(){
                let index = this.state.pageOption.index;
                index++;
                this.getData(index);
            },
            /**
             * @description 分页组件，到某一页的事件
             * @returns
             */
            gIndex:function(index){
                this.getData(index);
            },
            /**
             * @description 获取tbody里面选中了哪些项
             * @param field 字段名称, 非必填项
             * @returns {data:[],vals:[]}
             */
            getCheckedItems(field){
                let res = {data:[],vals:[]};
                if(this.state.data && this.state.data instanceof Array){
                    this.state.data.forEach(x=>{
                        if(x.ck){
                            res.data.push(x);
                            if(field){
                                res.vals.push(x[field]);
                            }
                        }
                    })
                }
                return res;
            },
            /**
             * @description 获取组件当前参数，包含index，和 tbody的data
             * @returns {index:0,data:[]}
             */
            getParams(){
                return {index:this.state.pageOption.index,data:this.state.data};
            },
            /**
             * @description 搜索方法
             * @param index 搜索索引，非必填
             * @returns
             */
            search(index){
                if(!index){
                    this.getData();
                }else{
                    this.getData(this.state.pageOption.index);
                }
            },
            /**
             * @description 在当前index下搜索
             * @returns
             */
            searchCurrentIndex(){
                this.search(this.getParams().index);
            }
        },
        mounted () {
            this.getData(this.state.pageOption.index);
        },
        destroyed(){
            
        }
    }
</script>

<style scoped>
    .table{
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        border-radius: 6px 6px 0 0;
        overflow: hidden;
    }
  
    table thead{
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        color: #fff;
        background-color: #e3e3e3;
    }

    table tbody{
        height: 38px;
        line-height: 38px;
        font-size: 12px;
    }
</style>
