

<template>
    <div class="searchContent">
        <div class="navbar clearfix">
            <h1 class="al-title ng-binding" id="crumbsTitle">DemoPage</h1>
            <ul class="breadcrumb al-breadcrumb" id="crumbs"><li>XW-VUE-GIT</li><li>DemoPage</li></ul>
        </div>

        <div class="searchItem">
            <v-input label="年龄" type="text" msg="正整数11" vType='number'></v-input>
            <v-input label="身份证号码" vType="number" msg="正整数22"></v-input>
            <le-local-select label="模糊搜索" multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code"></le-local-select>  
            <le-date-time-picker label="时间日期组件" ref="dt1" msg="日期and时间不允许为空"></le-date-time-picker>                       
            <le-time-picker label="时间组件" ref="t1" msg="时间不允许为空"></le-time-picker>
            <le-date-picker label="日期组件" ref="d1" msg="日期不允许为空"></le-date-picker>
        </div>

        <div class="btnGroup">
            <le-button type="search" value="Search"></le-button>
            <le-button type="create" value="New" @click="open"></le-button>
            <le-button type="edit" value="Modify"></le-button>
            <le-button type="info" value="info"></le-button>
            <le-button type="warning" value="warning"></le-button>
            <le-button type="enable" value="enable"></le-button>
        </div>


        <table-list :ref="tk1" :options="options"></table-list>

        <le-dialog title="弹出层" height="500" confirm-text="Save" cancel-text="Close" ref='dialog' @click="save">
            <le-form ref="form2" style="width:600px">
            
                <v-input label="年龄" type="text" msg="正整数11" vType='number' on></v-input>

                <v-input label="身份证号码" vType="number" msg="正整数22" on required></v-input>

                <le-radio-list label="性别" ref="r1" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list>

                <le-checkbox-list label="爱好" @change='changecks' ref='cl1' display-name="name" msg="复选框必填1" display-value="code" on required></le-checkbox-list>
            
                <le-date-picker label="日期组件" ref="d2" msg="日期不允许为空" on required></le-date-picker>

                <le-time-picker label="时间组件" ref="t2" msg="时间不允许为空"  on required></le-time-picker>

                <le-date-time-picker label="时间日期组件" ref="dt2" msg="日期and时间不允许为空" on required></le-date-time-picker>           

                <le-local-select label="模糊搜索" multiple ref="s2" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select> 

            </le-form>
        </le-dialog>
    </div>
</template>

<script>
import Unit from "../core/tool/commonUtil.js";
export default {
    name:"demoValidate",
    data(){
        return {
            showDialogFlag:false,
            tk1:'demoTableList',
            options:{
                showCk:true,
                //singleSelected:true,
                getUrl:()=>{
                    // return "/site/siteManage/selectSiteList?nameLike=&tanentId=&status=&curPage=1&pageSize=10&ran=2571772";
                    return "/goods/index/queryList/115?parentUnit=0&ran=10069";
                },
                actions:[
                    {key:"edit",val:"Modify",type:'edit'},
                    {key:"delete",val:"delete",type:'delete'},
                    {key:"publish",val:"publish",type:'publish'},
                    {key:"enable",val:"enable",type:'enable'},
                    {key:"disable",val:"disable",type:'disable'},
                ],
                map:[
                    {key:'code',val:'名称名称名称名称'},
                    {key:'createBy',val:'地址地址'},
                    {key:'unitCode',val:'编码'},
                    {key:'createBy',val:'创建时间创建时间'},
                    {key:'code',val:'名称'},
                    {key:'createBy',val:'地址'},
                    {key:'unitCode',val:'编码'},
                    {key:'createBy',val:'创建时间'},
                    {key:'code',val:'名称'},
                    {key:'createBy',val:'地址'},
                    {key:'unitCode',val:'编码'},
                    {key:'createBy',val:'创建时间'},
                ],
               
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"currentPage",
                    index:1,
                    size:10
                },
                analysis:(data)=>{
                    if(data.data.data.length !== 0){
                        return {
                            data:data.data.data,
                            count:data.data.totalNum
                        };
                    }
                }
            }
        }
    },
    methods:{
        submit(){
            let res = this.$refs["form1"].validate();
            res.then(d=>{
                debugger
            }).catch((error)=>{
                debugger
            })
        },
        changecks(data){
            console.log("11");
        },
        dialogCb(){
            console.log(this.$refs['dialog'].showDialog);
        },
        open(){
            this.$refs['dialog'].open();
        },
        save(){
            let res = this.$refs["form2"].validate();
            res.then(d=>{
                debugger
            }).catch((error)=>{
                debugger
            })
        }
    },
    mounted(){
        let data = [
            {name:"aaa",code:"1"},
            {name:"aaa1",code:"1"},
            {name:"aaa2",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ]

        this.$refs["d1"].getCurrentComponent().setValue("2019-04-23");
        this.$refs["t1"].getCurrentComponent().setValue("20:40:59");
        this.$refs["dt1"].getCurrentComponent().setValue("2018-06-21 21:41:51");
        this.$refs["s1"].getCurrentComponent().init(Unit.object.cloneObj(data));

        this.$refs["r1"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["cl1"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["d2"].getCurrentComponent().setValue("2019-04-23");
        this.$refs["t2"].getCurrentComponent().setValue("20:40:59");
        this.$refs["dt2"].getCurrentComponent().setValue("2018-06-21 21:41:51");
        this.$refs["s2"].getCurrentComponent().init(Unit.object.cloneObj(data));
    }
}
</script>

<style scoped>
    .searchContent{
        min-width: 900px;
        min-height: 600px;
        overflow: scroll;
        padding: 20px;
        /* background: url("https://p2.lefile.cn/product/adminweb/2019/05/23/d7b50040-4f55-4a8e-aaf5-d5731edde5d1.jpg") 0 0 no-repeat; */
        background-size: 100% 100%;
    }

    .searchContent .searchItem{
        width: 100%;
        height: auto;
        float: left;
        border-bottom: 1px solid rgba(0,0,0,.12);
        box-shadow: 0 1px 0 0 hsla(0,0%,100%,.12);
        margin-bottom: 10px;
    }

    .searchContent .btnGroup{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-bottom: 10px;
        text-align: right;
        padding: 10px 0 ;
    }

     .navbar{
        height: 75px;
        border-bottom: 1px solid rgba(0,0,0,.12);
        box-shadow: 0 1px 0 0 hsla(0,0%,100%,.12);
        margin: 0 auto;
        margin-bottom: 30px;
    }

    .navbar h1.al-title {
        font-weight: 700;
        color: #000;
        float: left;
        width: auto;
        margin: 0;
        padding: 0;
        font-size: 24px;
        opacity: .9;
        padding-top: 17px;
        padding-bottom: 27px;
    }

    .navbar .al-breadcrumb {
        background: 0 0;
        color: #000;
        margin: 0;
        float: right;
        margin-top: 13px;
    }

    .navbar .al-breadcrumb li {
        font-size: 18px;
        font-weight: 400;
    }

    .navbar .breadcrumb>li, .pagination {
        display: inline-block;
    }
    
    .breadcrumb>li+li:before {
        padding: 0 5px;
        color: #ccc;
        /* content: "/\00a0"; */
        content: "/";
    }

</style>
