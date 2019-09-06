<template>
    <div style="text-align:left;">
        <div class="le_list_title-pannel navbar clearfix">
            <h1 class="al-title ng-binding">Black List</h1>
            <ul class="breadcrumb al-breadcrumb"><li>XW-VUE-GIT</li><li>Module</li></ul>
        </div>

        <div class='searchPanel le_comps_core_css clearfix'>
            <div class="col3">
                <le-input labelWidth="150" placeholder="请输入年龄" label="年龄" v-model="searchModel.age"></le-input>
                <le-input labelWidth="200" label="身份证号码" v-model="searchModel.id"></le-input>
                <le-upload labelWidth='150' multiple :options="uploadOptions1" label="图片上传" v-model="url"></le-upload>    
                <le-upload labelWidth='150' multiple :options="uploadOptions2" label="文件上传" v-model="files"></le-upload>    
            </div>
            <div class="col3">
                <le-time-picker labelWidth="90" label="时间组件" v-model="searchModel.time"></le-time-picker>
                <le-date-time-picker @changeDateTime="update" labelWidth="90" label="时间日期组件" v-model="searchModel.datetime"></le-date-time-picker>           
                <le-local-select labelWidth="90" @change="showSelectItem" enabledInput label="选择职业1" :dataSource="jobArray" display-name="name" display-value="code" v-model='searchModel.job'></le-local-select> 
                <le-local-select labelWidth="100" placeholder="job" enabledInput label="选择职业2" :dataSource="jobArray" display-name="name" display-value="code" v-model='searchModel.job'></le-local-select> 
            </div>
            <div class="col4">
                <le-date-picker labelWidth="250" label="日期组件" v-model="searchModel.date"></le-date-picker>
            </div>
        </div>

        <div class="le_list_button_pannel" style="text-align:right;margin-right:10px">
            <le-button type="search" value="Search" @click="search"></le-button>
            <le-button type="create" value="Add" @click="add"></le-button>
            <le-button type="create" value="新增" @click="openDialog"></le-button>
            <le-button type="start" value="解封" @click="setEnable(false)"></le-button>
            <le-button type="stop" value="禁封" @click="notDeleteItem(true)"></le-button>
            <le-button type="remove" value="删除" @click="deleteItem"></le-button>
        </div>

        <div class='le_list_table_pannel panel-table text-center'>
            <!-- <div class="table-title">黑名单列表</div> -->
            <div class='overflow-table'>    
                <table-list title="黑名单列表" ref='black_list_table' :options='tableOptions'></table-list>
            </div>
        </div>
        <le-dialog title="弹出层" height="605" width="1000" v-model="showDialog" :close-callback="closeDialog">
            <div slot="body">
                <le-form labelWidth='180' ref="form2" class="le_comps_core_css">
                    <le-input labelWidth='150' tip="请输入身份证号码" label="身份证号码" :readonly="readonly" v-model="entity.id"></le-input>
                    <le-input labelWidth='150' tip="输入省市区的详细信息" label="地址" :readonly="readonly" on required msg="地址必填" v-model="entity.address"></le-input>
                    <le-textarea tip="详细信息描述文案不能瞎写" labelWidth='150' placeholder="请输入详细地址" label="详细地址" :readonly="readonly" msg="详细地址必填" v-model="entity.content" on></le-textarea>
                    <le-date-picker labelWidth='150' tip="输入当前之后的日期" on placeholder="请选择日期" label="日期组件" :readonly="readonly" msg="日期不允许为空" v-model="entity.date"></le-date-picker>
                    <le-time-picker labelWidth='150' tip="输入当前之后的时间" on placeholder="请选择时间" label="时间组件" :readonly="readonly" msg="时间不允许为空" v-model="entity.time"></le-time-picker>
                    <le-date-time-picker @changeDateTime="update1" labelWidth='150' tip="输入当前之后的日期和事件" on placeholder="请选择日期时间" label="时间日期组件" :readonly="readonly" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>           
                    <le-local-select labelWidth='150' tip="职业选择2个" on label="选择职业" msg="职业必填" :readonly="readonly" :data-source="jobArray" multiple ref="dialogJobRef" display-name="name" display-value="code" v-model='entity.job'></le-local-select> 
                    <le-radio-list labelWidth='150' tip="性别男或女" on label="性别" display-name="name" :readonly="readonly" :data-source="sexArray" ref='dialogSexRef' msg="性别必须选择" display-value="code" v-model="entity.sex"></le-radio-list>
                    <le-checkbox-list labelWidth='150' tip="请选择一个或多个爱好" on label="爱好" :readonly="readonly" :data-source="favArray" display-name="name" msg="爱好必须选择" display-value="code" v-model="entity.fav"></le-checkbox-list> 
                    <!-- <le-upload labelWidth='150' on required msg='图片必须上传' :readonly="readonly" :options="uploadOptions" label="文件上传" v-model="entity.url"></le-upload>      -->
                    <le-editor labelWidth='180' tip="请输入富文本信息" label="详情信息22:" msg='详情信息必填' :readonly="readonly"  ref="editor" :option = "option"></le-editor>    
                    
                    <!-- <le-editor on label="详情信息:" msg='详情信息必填' ref="editor" :readonly="readonly" :option = "option"></le-editor>     -->
                </le-form>
            </div>
        
            <div slot="button">
                <le-button type='remove' value="清空" @click="clearAll"></le-button>
                <le-button type='stop' value="禁用" @click="disabledForm"></le-button>
                <le-button type='save' value="保存" @click="submit('form2')"></le-button>
                <le-button type='cancel' value="关闭" @click="closeDialog"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import Unit from "../core/tool/commonUtil.js";
import $ from "jquery";

let _data = [
    {name:"aaa",code:"1"},
    {name:"aa1",code:"2"},
    {name:"aa2",code:"3"},
    {name:"bbb",code:"4"},
    {name:"ccc",code:"5"},
    {name:"bb1",code:"6"},
    {name:"bb2啊啊啊啊啊啊啊",code:"7"},
    {name:"bb3",code:"8"},
    {name:"cc1",code:"9"},
    {name:"cc2",code:"10"},
];


export default {
    name:"FormValidate",
    data(){
        return {
            url:"",
            files:"",
            readonly:false,
            searchModel:{
                age:"",
                id:"",
                data:"",
                time:"",
                datetime:"",
                job:"",
                sex:"",
                fav:""
            },
            showDialog:false,
            uploadOptions1:{
                tip:"图片大小必须小于100kb,大小100*200",
                multiple:true,
                url:"/file/img/upload",
                completedCallback:(d)=>{
                    console.log(d);
                },
                vtype:"jpg,png,gif",
                size:"0.1",
                width:"750",
                height:"350",
                fname:"file",
                analysis:(d)=>{
                    return d.data;
                }
            },
            uploadOptions2:{
                tip:"文件大小必须小于100kb",
                multiple:true,
                url:"/file/img/upload",
                completedCallback:(d)=>{
                    console.log(d);
                },
                fname:"file",
                analysis:(d)=>{
                    return d.data;
                }
            },
            entity:{
                age:"",
                id:"",
                content:"",
                data:"",
                time:"",
                datetime:"",
                job:"2",
                sex:"1",
                fav:"3,4",
                url:"",
                address:""
            },
            tableOptions:{
                showCk:true,
                map:[
                    {key:"shop",val:"商城",convert:this.convertShop},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"},
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"},
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"}
                ],
                getUrl:()=>{
                    // if(this.searchModel.age == ""){
                    //     return "";
                    // }
                    return "/risk/limit/black/user/query/lst?isNeedAllCout=true&userName=&companyName="+this.searchModel.age+"&status=-1";
                },
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"pageNum",
                    index:1,
                    size:10
                },
                actions:[
                    {
                        key:"update",
                        val:"编辑",
                        action:this.search,
                    },
                    {
                        key:"remove",
                        val:"注销",
                        action:this.search,
                    }
                ],
                analysis:(d)=>{
                    let data = d.data;
                    if(data && data.lstAccesses instanceof Array && data.lstAccesses.length >0){
                        return {
                            data:data.lstAccesses,
                            count:data.allCount
                        };
                    }else{
                        return {
                            data:[],
                            count:0
                        }
                    }
                }
            },
            jobArray:[],
            sexArray:[],
            favArray:[],
            text:"",
            text2:"",
            option:{
                url : "/file/img/upload",
                fname : "file",
                analysis:(d) => {
                    return d.data
                }
            }
        }
    },
    methods:{
        update(str){
            debugger
        },
        update1(str1){
            debugger
        },
        add(){
            this.$router.push({path:"/add"});
        },
        convertShop(key,row){
            if(row[key.key] == "聚享汇"){
                return "<span style='color:red'>聚享汇</span>";
            }else{
                return "<span style='color:blue'>"+row[key.key]+"</span>";
            }
        },
        disabledForm(){
            this.readonly = !this.readonly;
        },
        clearAll(){
            this.$refs.form2.reset();
        },
        showSelectItem(val){
            this.searchModel.job;  
        },
        deleteItem(){
            this.jobArray = [];
        },
        notDeleteItem(){
            this.jobArray = Unit.object.cloneObj(_data);
        },
        openDialog(){
            this.$refs.form2.reset();
            window.setTimeout(()=>{
                this.entity.age = "3";
                this.entity.id = "1";
                this.entity.content = "我是信息";
                this.entity.date = "2019-08-29";
                this.entity.time = "14:48:10";
                this.entity.datetime = "2019-08-29 14:48:10";
                this.entity.sex = "5";
                this.entity.fav = "1,2";
                this.entity.job = "3,4,5";
                this.entity.address = "和谐家园";
                this.entity.url = "//p1.lefile.cn/fes/cms/2019/07/28/2zhionbdnffudj5y0w7metrs3pds6k051235.jpg,//p4.lefile.cn/fes/cms/2019/07/28/ra04vay1l7hgmu0lh5kxdjlgnt9pza102201.png"
                this.$refs.editor.getCurrentComponent().setValue("dsadasdasdasd");
            },0)
            this.showDialog = true;
        },
        search(){
            this.$refs.black_list_table.searchCurrentIndex();
        },
        submit(id){
            let res = this.$refs["form2"].validate();
            res.then(d=>{
                let eee = this.entity;
                debugger
                this.closeDialog();
            }).catch((error)=>{
                let eee = this.entity;
                debugger
            })
        },
        closeDialog(){
            this.showDialog = false;
        },
        setEnable(enable){
            let ids = this.$refs.black_list_table.getCheckedItems("id").vals;
            if(ids.length ==0){
                this.alert.showAlert("error","至少选中一个项目进行处理");
                return;
            }
            let params = {
                accessobjids:ids.join(','),
                reason:"abcd",
                status:enable?"LIVE":"DEAD"
            };
            this.ajax.postFetch("/risk/limit/black/user/update",params).then(data=>{
                if(data.data.result){
                    this.alert.showAlert("success","处理成功!");
                    this.search();
                }else{
                    this.alert.showAlert("error",data.data.desc);
                }
            });
        },
    },
    mounted(){
        
        window.setTimeout(()=>{
            // this.$refs["jobRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));

            // this.$refs["dialogJobRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));
            // this.$refs["dialogSexRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));
            // this.$refs["dialogFavRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));

            // this.jobArray = Unit.object.cloneObj(_data);
            this.sexArray = Unit.object.cloneObj(_data);
            this.favArray = Unit.object.cloneObj(_data);
        },1000)
        this.jobArray = Unit.object.cloneObj(_data);
    }
}
</script>

<style scoped>
    .searchPanel .col2{
        width:60% !important;
    }
    .searchPanel .col3{
        width:80% !important;
    }
    .searchPanel .col4{
        width:60% !important;
        align-items: center;
    }

    .navbar{
        height: 75px;
        border-bottom: 1px solid #ddd;
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

    .le_dialog_box .col3{
        width: 100%;
        align-items: baseline;
    }

    .col_label /deep/ .form-item-label{
        width: auto !important;
        flex-wrap: inherit;
        position: relative;
        /* padding-left: 10px !important; */
    }

    .col_label /deep/ .requireed::before{
        left: 4px;
    }
</style>
