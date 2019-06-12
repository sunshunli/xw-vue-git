

<template>
    <div class="searchContent">
        <div class="navbar clearfix">
            <h1 class="al-title ng-binding" id="crumbsTitle">页面推广</h1>
            <ul class="breadcrumb al-breadcrumb" id="crumbs"><li>XW-VUE-GIT</li><li>UsePage</li></ul>
        </div>

        <div class="searchItem">
            <v-input label="原地址" ref="targetUrl" type="text" msg="正整数11" vType='number'></v-input>
            <v-input label="推广ID" ref="generalizeId" type="text" msg="正整数11" vType='number'></v-input>
            <le-local-select label="租户" ref="tanentId" display-name="name" msg="下拉框必选" display-value="code"></le-local-select> 
            <le-local-select label="推广渠道" ref="channel" display-name="name" msg="下拉框必选" display-value="code"></le-local-select> 
            <le-local-select label="推广类型" ref="type" display-name="name" msg="下拉框必选" display-value="code"></le-local-select> 
            <le-date-time-picker label="开始时间" ref="d1"></le-date-time-picker>
            <le-date-time-picker label="结束时间" ref="d2"></le-date-time-picker>
        </div>

        <div class="rightBox">
            <div class="btnGroup">
                <le-button type="search" value="Search" @click="search"></le-button>
                <le-button type="create" value="New" @click="open"></le-button>
                <le-button type="enable" value="enable" @click="enable(true)"></le-button>
                <le-button type="disable" value="disable" @click="enable(false)"></le-button>
                <le-button type="info" value="info" @click="getInfo"></le-button>
            </div>
            <table-list :ref="tk1" :options="options"></table-list>
        </div>

        <le-dialog title="弹出层" height="500" confirm-text="Save" cancel-text="Close" ref='dialog' @click="save(addOrEdit,edititemId)">
            <le-form ref="form2" style="width:600px">
            
                <v-input label="推广地址" :disabled="isInfo" msg="推广地址必填" ref="tgdz" type="text" on required></v-input>

                <v-input label="原地址" :disabled="isInfo" ref="ydz" msg="原地址必填" on required></v-input>

                <v-input label="失效默认地址" :disabled="isInfo" ref="sxdz" msg="失效默认地址必填" vtype="text" on required></v-input>

                <le-date-time-picker :disabled="isInfo" label="开始时间" msg="开始时间必填" ref="dt1" on required></le-date-time-picker>
                <le-date-time-picker :disabled="isInfo" label="结束时间" msg="结束时间必填" ref="dt2" on required></le-date-time-picker>

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
            edititemId :'',
            addOrEdit :'add',
            isInfo:false,
            tbListParams:{
                type:'',
                parentId:'',
                parentCode:''
            },
            selectNode:null,
            showDialogFlag:false,
            tk1:'demoTableList',
            options:{
                showCk:true,
                getUrl:()=>{
                    var that =this;
                    return "/spread/siteSpread/getPage?siteId=9f746cfa-b5e8-49ab-82d6-86cbedce8119&tanentId="
                    +that.$refs["tanentId"].$children[0].getValue()
                    +"&beginTimeWapper="+that.$refs["d1"].$children[0].getValue()+"&endTimeWapper="
                    +that.$refs["d2"].$children[0].getValue()+"&targetUrl="
                    +that.$refs["targetUrl"].$children[0].vValue+"&channel="
                    +that.$refs["channel"].$children[0].getValue()+"&type="
                    +that.$refs["type"].$children[0].getValue()+"&generalizeId="
                    +that.$refs["generalizeId"].$children[0].vValue;     
                },
                actions:[
                    {key:"edit",val:"Modify",type:'edit',action:this.editItem},
                    {key:"delete",val:"delete",type:'delete',action:this.deleteItem},
                ],
                map:[
                    {key:'proxyUrl',val:'推广地址'},
                    {key:'targetUrl',val:'原地址'},
                    {key:'channel',val:'推广渠道'},
                    {key:'type',val:'推广类型'},
                    {key:'id',val:'推广ID'},
                    {key:'status',val:'状态',convert:this.formateStatus},
                    {key:'updateTimeStr',val:'有效时间'},
                ],
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"curPage",
                    index:1,
                    size:10
                },
                analysis:(data)=>{
                    if(data.data !==null && data.data.length !== 0){
                        return {
                            data:data.data.dataList,
                            count:data.data.count
                        };
                    }
                }
            }
        }
    },
    methods:{
        search(){
            let tk = this.$refs[this.tk1];
            tk.search(tk.getParams().index);
        },
        submit(){
            // let res = this.$refs["form1"].validate();
            // res.then(d=>{
            //     debugger
            // }).catch((error)=>{
            //     debugger
            // })
        },
        open(){
            this.$router.push({path:'/usePageAdd'})
        },
        getInfo(){
            this.isInfo = true;
            var item = this.$refs[this.tk1].getCheckedItems();
            if(item.data.length !== 1){
                this.alert.showAlert('error','请选择一条数据')
            }else{
                this.$refs['dialog'].open();
                this.ajax.getFetch("/spread/siteSpread/detail?id="+item.data[0].id).then(d=>{
                    var that = this;
                    var data = d.data.opt.dataList[0];
                    that.$refs['tgdz'].getCurrentComponent().setValue(data.spreadUrl);
                    that.$refs['ydz'].getCurrentComponent().setValue(data.targetUrl);
                    that.$refs['sxdz'].getCurrentComponent().setValue(data.defaultUrl);
                    this.$refs["dt1"].getCurrentComponent().setValue(data.beginTimeStr);
                    this.$refs["dt2"].getCurrentComponent().setValue(data.endTimeStr);
                    this.edititemId = data.id;
                });
            }  
            
        },
        save(flag,editItemId){
            let res = this.$refs["form2"].validate();
            res.then(d=>{
                var that = this;
                var param1 = {
                    tanentId: 12,
                    siteId: '9f746cfa-b5e8-49ab-82d6-86cbedce8119',
                    proxyUri:that.$refs['tgdz'].$children[0].vValue,
                    targetUrl: that.$refs['ydz'].$children[0].vValue,
                    defaultUrl: that.$refs['sxdz'].$children[0].vValue,
                    beginTimeWapper: that.$refs['dt1'].$children[0].getValue(),
                    endTimeWapper: that.$refs['dt2'].$children[0].getValue(),
                };
                var url = '';
                if(flag == 'edit'){
                    param1.id= editItemId;
                    url = '/spread/siteSpread/update'
                }else{
                    url = '/spread/siteSpread/add'
                };
                Unit.http(url,"post",param1).then(d=>{
                    console.log(d)
                    var that = this;
                    if(d.status == 200){
                        that.alert.showAlert('success',d.msg);
                        that.$refs['dialog'].close();
                        that.search();
                    }else{
                        that.alert.showAlert('error',d.msg);
                    }
                }).catch(e=>{
                    context.alert.showAlert("error",e.data?e.data:"<#接口异常,操作失败#>");
                });
            }).catch((error)=>{
                console.log(error)
            })
        },
        deleteItem(row){
            console.log(row)
        },
        enable(flag){
            var item = this.$refs[this.tk1].getCheckedItems();
            if(item.data.length !== 1){
                this.alert.showAlert('error','请选择一条数据')
            }else{
                var param ={
                ids:item.data[0].id,
                    enable:flag
                };
                Unit.http('/spread/siteSpread/trigger',"post",param).then(d=>{
                    var that = this;
                    that.alert.showAlert('success','成功');
                    that.search();
                }).catch(e=>{
                    context.alert.showAlert("error",e.data?e.data:"<#接口异常,操作失败#>");
                });
            }
        },
        editItem(row){
            this.isInfo = false;
            this.addOrEdit = 'edit';
            this.getInfo();
        },
        deleteItem(row){
            var item = this.$refs[this.tk1].getCheckedItems();
            if(item.data.length !== 1){
                this.alert.showAlert('error','请选择一条数据')
            }else{
                Unit.http("/spread/siteSpread/delete",'post',{'ids': item.data[0].id}).then(d=>{
                   if(d.status == 200){
                       this.alert.showAlert('success','删除成功');
                       this.search()
                   }else{
                       this.alert.showAlert('error',d.msg)
                   }
                });
            }
        },
        //转换类型
        formateStatus:function(row,item){
            var res = '';
            switch(item.status){
            case 0:
                return res="禁用";
                break;
            case 1:
                return res="启用";
                break;
            case 2:
                return res="新建";
                break;
            case 3:
                return res="修改";
                break;
            case 4:
                return res="删除";
                break;
            }
        },
    },
    mounted(){
        this.ajax.getFetch("/auth/dict/getdictmap?keys=MallType").then(d=>{
            var that = this;
           
            var _MallType = [];
            for(var item in d.data.MallType){
                _MallType.push({code:item,name:d.data.MallType[item]})
            };
            var _channels=[{name:'Pc',code:'1'},{name:'App',code:'2'},{name:'Wap',code:'3'},{name:'Normal',code:'4'},{name:'Drianage',code:'5'},{name:'Activity',code:'6'},{name:'IOEHumanService',code:'7'},{name:'M4HumanService',code:'8'},{name:'HumanService"',code:'9'}];
            var _types=[{name:'Normal',code:'0'},{name:'C2C',code:'1'},{name:'OMO',code:'2'},{name:'Service',code:'3'}];

            that.$refs["tanentId"].getCurrentComponent().init(Unit.object.cloneObj(_MallType));
            that.$refs["channel"].getCurrentComponent().init(Unit.object.cloneObj(_channels));
            that.$refs["type"].getCurrentComponent().init(Unit.object.cloneObj(_types));
            // this.$refs["dt1"].getCurrentComponent().setValue("2018-06-10 11:11:51");
            // this.$refs["dt2"].getCurrentComponent().setValue("2018-06-21 21:41:51");
            // that.$refs["s1"].setValue(_MallType[0]);
        }).catch(e=>{
            this.alert.showAlert("error",e.data);
        })

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

    .leftBox{
        border: 1px solid red;
        float: left;
        width: 20%;
        height: 100%;
        min-height: 500px;
    }
    .rightBox{
        float: left;
        width: 100%;
        height: 100%;
        min-height: 500px;
    }

    .leftBox /deep/ .selectContent{
        width: 100% !important;
    }            

    .leftBox /deep/ .form-item .form-item-div{
        width: 100%  !important;
    }


</style>
