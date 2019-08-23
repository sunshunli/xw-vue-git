<template>
    <div style="text-align:left;">
        <div class="le_list_title-pannel navbar clearfix">
            <h1 class="al-title ng-binding">Black List</h1>
            <ul class="breadcrumb al-breadcrumb"><li>XW-VUE-GIT</li><li>Module</li></ul>
        </div>

        <div class='searchPanel le_comps_core_css clearfix'>
            <div class="col2">
                <le-input placeholder="请输入年龄" label="年龄" msg="正整数" vType='positiveDecimals' v-model="searchModel.age"></le-input>
                <le-input label="身份证号码" vType="number" msg="正整数22" v-model="searchModel.id"></le-input>
            </div>
            <div class="col3">
                <le-time-picker label="时间组件" msg="时间不允许为空" v-model="searchModel.time"></le-time-picker>
                <le-date-time-picker label="时间日期组件" msg="日期and时间不允许为空" v-model="searchModel.datetime"></le-date-time-picker>           
                <le-local-select @change="showSelectItem" enabledInput label="选择职业1" :dataSource="jobArray" display-name="name" display-value="code" v-model='searchModel.job'></le-local-select> 

                <le-local-select multiple placeholder="job" @change="showSelectItem" enabledInput label="选择职业2" :dataSource="jobArray" display-name="name" display-value="code" v-model='searchModel.job'></le-local-select> 
            </div>
            <div class="col4">
                <le-input label="年龄" msg="正整数" vType='number' v-model="searchModel.age"></le-input>
                <le-input label="年龄" msg="正整数" vType='number' v-model="searchModel.age"></le-input>
                <le-input label="身份证号码" vType="number" msg="正整数22" v-model="searchModel.id"></le-input>
                <le-date-picker label="日期组件" msg="日期不允许为空" v-model="searchModel.date"></le-date-picker>
            </div>
        </div>

        <div class="le_list_button_pannel" style="text-align:right;margin-right:10px">
            <le-button type="search" value="Search" @click="search"></le-button>
            <le-button type="create" value="新增" @click="openDialog"></le-button>
            <le-button type="enable" value="解封" @click="setEnable(false)"></le-button>
            <le-button type="disable" value="禁封" @click="setEnable(true)"></le-button>
            <le-button type="delete" value="删除" @click="deleteItem"></le-button>
        </div>

        <div class='le_list_table_pannel panel-table text-center'>
            <!-- <div class="table-title">黑名单列表</div> -->
            <div class='overflow-table'>    
                <table-list title="黑名单列表" ref='black_list_table' :options='tableOptions'></table-list>
            </div>
        </div>
        <le-dialog title="弹出层" height="605" width="1000" v-model="showDialog" :close-callback="closeDialog">
            <div slot="body">
                <le-form ref="form2" class="le_comps_core_css">
                    <le-input label="身份证号码" :readonly="readonly" vType="number" msg="身份证号码必填" v-model="entity.id"></le-input>
                    <le-textarea placeholder="请输入详细地址" label="详细地址" :readonly="readonly" msg="详细地址必填" v-model="entity.content" on></le-textarea>
                    <le-date-picker on placeholder="请选择日期" label="日期组件" :readonly="readonly" msg="日期不允许为空" v-model="entity.date"></le-date-picker>
                    <le-time-picker on placeholder="请选择时间" label="时间组件" :readonly="readonly" msg="时间不允许为空" v-model="entity.time"></le-time-picker>
                    <le-date-time-picker placeholder="请选择日期时间" on label="时间日期组件" :readonly="readonly" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>           
                    <le-local-select on label="选择职业" msg="职业必填" :readonly="readonly" :data-source="jobArray" multiple ref="dialogJobRef" display-name="name" display-value="code" v-model='entity.job'></le-local-select> 
                    <le-radio-list on label="性别" display-name="name" :readonly="readonly" :data-source="sexArray" ref='dialogSexRef' msg="性别必须选择" display-value="code" v-model="entity.sex"></le-radio-list>
                    <le-checkbox-list on label="爱好" :readonly="readonly" :data-source="favArray" display-name="name" msg="爱好必须选择" display-value="code" v-model="entity.fav"></le-checkbox-list> 
                    <le-upload on required msg='图片必须上传' :readonly="readonly" :options="uploadOptions" label="文件上传" v-model="entity.url"></le-upload>     
                    <le-editor on label="详情信息22:" msg='详情信息必填' :readonly="readonly"  ref="editor" :option = "option"></le-editor>    
                    
                    <!-- <le-editor on label="详情信息:" msg='详情信息必填' ref="editor" :readonly="readonly" :option = "option"></le-editor>     -->
                </le-form>
            </div>
        
            <div slot="button">
                <le-button type='submit' value="禁用" @click="disabledForm"></le-button>
                <le-button type='submit' value="保存" @click="submit('form2')"></le-button>
                <le-button type='close' value="关闭" @click="closeDialog"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import Unit from "../core/tool/commonUtil.js";
import $ from "jquery";
export default {
    name:"FormValidate",
    data(){
        return {
            readonly:false,
            searchModel:{
                age:"1",
                id:"",
                data:"",
                time:"",
                datetime:"",
                job:"",
                sex:"",
                fav:""
            },
            showDialog:false,
            uploadOptions:{
                tip:"图片大小必须小于100kb,大小100*200",
                multiple:true,
                url:"/file/img/upload",
                completedCallback:(d)=>{
                    console.log(d);
                },
                vtype:"jpg,png,gif",
                width:"750",
                height:"350",
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
                url:""
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
                        key:"edit",
                        val:"编辑",
                        action:this.search,
                    },
                    {
                        key:"delete",
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
        showSelectItem(val){
            this.searchModel.job;  
        },
        deleteItem(){
            var that = this;
            that.alert.showConfirm("确定删除当前这条数据吗?",function(){
                that.alert.showAlert("success","删除成功")
            })
        },
        openDialog(){
            window.setTimeout(()=>{
                this.entity.fav = "1,2";
                this.entity.sex = "5";
                this.entity.job = "3,4,5";
                // this.entity.url = "//p1.lefile.cn/fes/cms/2019/07/28/2zhionbdnffudj5y0w7metrs3pds6k051235.jpg,//p4.lefile.cn/fes/cms/2019/07/28/ra04vay1l7hgmu0lh5kxdjlgnt9pza102201.png"
                this.entity.url = null;
            },1000)
            this.showDialog = true;
            this.$refs.editor.getCurrentComponent().setValue("dsadasdasdasd");
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
            this.$refs.form2.reset();
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

    .form-item /deep/ label{
        width: 94px !important;
        margin-right: 10px;
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
