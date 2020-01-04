<template>
    <div class="bg">
        <div class="login">
            <input type="button" value="A" @click="requestHttp('AAA')" />
            <input type="button" value="B" @click="requestHttp('BBB')" />
            <input type="button" value="C" @click="requestHttp('CCC')" />
        </div>

        <test-comp ref='comref'></test-comp>

        <!-- <table-list title="<#批量导入列表#>" ref='batchImport_list_ref' :options='list_table_options'></table-list> -->

        LocalTableList<le-button type="info" @click="getItems" value="get"></le-button>
        <local-table-list ref="localtable" :options="options"></local-table-list>
    </div>
</template>

<script>
    import CommonUtil from "../../core/tool/commonUtil.js";
    import TestComp from "./test_comp.vue";

    export default {
        name: "Login",
        components: {TestComp},
        data(){
            return {
                id:"",
                options:{
                    showCk:true,
                    singleSelected:true,
                    map:[
                        {key:"id",val:"<#任务ID#>"},
                        {key:"excelName",val:"<#文件名称#>"},
                        {key:"createBy",val:"<#上传用户#>"},
                        {key:"uploadData.startTime",val:"<#上传时间#>",type:"datetime"},
                        {key:"uploadData.endTime",val:"<#导入状态#>",type:"datetime"},
                        {key:"totalNum",val:"<#总记录数#>"},
                        {key:"successNum",val:"<#成功数#>"},
                        {key:"failNum",val:"<#失败数#>"},
                        {key:"name",val:"<#完成时间#>",convert:this.formatTime},
                        {key:"name",val:"<#备注说明#>"}
                    ],
                    actions:[
                        {key:"remove",val:"删除",action:this.removeItem}
                    ]
                },
                list_table_options:{
                    map:[
                        {key:"id",val:"<#任务ID#>"},
                        {key:"excelName",val:"<#文件名称#>"},
                        {key:"createBy",val:"<#上传用户#>"},
                        {key:"uploadData.startTime",val:"<#上传时间#>",type:"datetime"},
                        {key:"uploadData.endTime",val:"<#导入状态#>",type:"datetime"},
                        {key:"totalNum",val:"<#总记录数#>"},
                        {key:"successNum",val:"<#成功数#>"},
                        {key:"failNum",val:"<#失败数#>"},
                        {key:"name",val:"<#完成时间#>",convert:this.formatTime},
                        {key:"name",val:"<#备注说明#>"},
                    ],
                    getUrl:() => {
                        return "/productAPI/uploadflow/queryAllList?modelCode=21&taskCode=40";
                    },
                    pageOption:{
                        sizeKey:"pageSize",
                        indexKey:"pageNum",
                        index:1,
                        size:10
                    },
                    analysis:(data)=>{
                        let _data = [{"uploadData":{"materialNumber":"11047-00-40","price":"120000","startTime":"1577333134000 ","endTime":"2018-10-10"},"msg":null,"createBy":"zouting1","code":7,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":2,"id":"b42af45d-d794-49bd-8189-41ddd634268f","uploadStatus":0},{"uploadData":{"materialNumber":"11047-92-40","price":"130000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":8,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":3,"id":"08925239-4f97-48d0-bf0e-488c29d6923a","uploadStatus":0},{"uploadData":{"materialNumber":"11138-15-20R","price":"230000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":9,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":4,"id":"31a42e52-2296-41c7-8dfe-27ffa8a851eb","uploadStatus":0},{"uploadData":{"materialNumber":"11141-05-20R","price":"340000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":10,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":5,"id":"8d621884-725d-4d0d-83b3-aa56715ed3ae","uploadStatus":0},{"uploadData":{"materialNumber":"120エンノハル","price":"330000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":11,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":6,"id":"de25d0ef-1036-4359-9485-96caa46b046e","uploadStatus":0},{"uploadData":{"materialNumber":"","price":"","startTime":"","endTime":""},"msg":null,"createBy":"zouting1","code":12,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":7,"id":"d8e72aec-8688-4dea-a18f-0a3fd42f5127","uploadStatus":0}]
                        return {
                            data:_data,
                            count:100
                        }
                        if(data && data.data && data.data.data){
                            return {
                                data:data.data.data,
                                count:data.data.totalNum
                            }
                        }else{
                            return {
                                data:[],
                                count:0
                            }
                        }
                    }
                },
            }
        },
        methods:{
            requestHttp(id){
                this.$refs['comref'].doHttp(id);
            },
            removeItem(row){
                this.$refs["localtable"].removeItem(row);
            },
            getItems(){
                console.log(this.$refs["localtable"].getCheckedItems("id"));
            }
        },
        mounted(){
            let _data = [{"uploadData":{"materialNumber":"11047-00-40","price":"120000","startTime":"1577333134000 ","endTime":"2018-10-10"},"msg":null,"createBy":"zouting1","code":7,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":2,"id":"b42af45d-d794-49bd-8189-41ddd634268f","uploadStatus":0},{"uploadData":{"materialNumber":"11047-92-40","price":"130000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":8,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":3,"id":"08925239-4f97-48d0-bf0e-488c29d6923a","uploadStatus":0},{"uploadData":{"materialNumber":"11138-15-20R","price":"230000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":9,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":4,"id":"31a42e52-2296-41c7-8dfe-27ffa8a851eb","uploadStatus":0},{"uploadData":{"materialNumber":"11141-05-20R","price":"340000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":10,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":5,"id":"8d621884-725d-4d0d-83b3-aa56715ed3ae","uploadStatus":0},{"uploadData":{"materialNumber":"120エンノハル","price":"330000","startTime":"1577333134000 ","endTime":"1580357206000 "},"msg":null,"createBy":"zouting1","code":11,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":6,"id":"de25d0ef-1036-4359-9485-96caa46b046e","uploadStatus":0},{"uploadData":{"materialNumber":"","price":"","startTime":"","endTime":""},"msg":null,"createBy":"zouting1","code":12,"taskCode":40,"createTime":1577340382269,"updateTime":null,"orders":7,"id":"d8e72aec-8688-4dea-a18f-0a3fd42f5127","uploadStatus":0}]
            
            this.$refs["localtable"].init(_data);
        }
    }
</script>

<style scoped>
</style>