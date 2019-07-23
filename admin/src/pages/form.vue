<template>
    <div style="text-align:left;">
        <div class="le_list_title-pannel navbar clearfix">
            <h1 class="al-title ng-binding">Black List</h1>
            <ul class="breadcrumb al-breadcrumb"><li>XW-VUE-GIT</li><li>Module</li></ul>
        </div>

        <div ref='le_list_search_pannel' class='le_list_search_pannel clearfix' label-width="100">
            <v-input label="年龄" msg="正整数" vType='number' v-model="searchModel.age"></v-input>
            <v-input label="身份证号码" vType="number" msg="正整数22" v-model="searchModel.id"></v-input>
            <le-date-picker label="日期组件" msg="日期不允许为空" v-model="searchModel.date"></le-date-picker>
            <le-time-picker label="时间组件" msg="时间不允许为空" v-model="searchModel.time"></le-time-picker>
            <le-date-time-picker label="时间日期组件" msg="日期and时间不允许为空" v-model="searchModel.datetime"></le-date-time-picker>           
            <le-local-select label="选择职业" multiple ref="jobRef" display-name="name" display-value="code" v-model='searchModel.job'></le-local-select> 
        </div>

        <div class="le_list_button_pannel" style="text-align:right;margin-right:10px">
            <le-button type="search" value="Search" @click="search"></le-button>
            <le-button type="create" value="新增" @click="openDialog"></le-button>
            <le-button type="enable" value="解封" @click="setEnable(false)"></le-button>
            <le-button type="disable" value="禁封" @click="setEnable(true)"></le-button>
        </div>

        <div class='le_list_table_pannel panel-table text-center'>
            <div class="table-title">黑名单列表</div>
            <div class='overflow-table'>    
                <table-list ref='black_list_table' :options='tableOptions'></table-list>
            </div>
        </div>

        <le-dialog title="弹出层" height="500" v-model="showDialog">
            <le-form ref="form2" style="width:600px">
                <v-input on required label="年龄" msg="正整数" vType='number' v-model="entity.age"></v-input>
                <v-input label="身份证号码" vType="number" msg="正整数22" v-model="entity.id"></v-input>
                <v-textarea label="详细地址" msg="正整数22" v-model="entity.content" on></v-textarea>
                <le-date-picker on label="日期组件" msg="日期不允许为空" v-model="entity.date"></le-date-picker>
                <le-time-picker on label="时间组件" msg="时间不允许为空" v-model="entity.time"></le-time-picker>
                <le-date-time-picker on label="时间日期组件" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>           
                <le-local-select on label="选择职业" msg="职业必填" :data-source="jobArray" multiple ref="dialogJobRef" display-name="name" display-value="code" v-model='entity.job'></le-local-select> 
                <le-radio-list on label="性别" display-name="name" :data-source="sexArray" ref='dialogSexRef' msg="性别必须选择" display-value="code" v-model="entity.sex"></le-radio-list>
                <le-checkbox-list on label="爱好" ref='dialogFavRef' :data-source="favArray" display-name="name" msg="爱好必须选择" display-value="code" v-model="entity.fav"></le-checkbox-list> 
                <le-upload on required msg='图片必须上传' :options="uploadOptions" label="文件上传" v-model="entity.url"></le-upload>                
            </le-form>
            <div class="dialogBtnContent">
                <le-button type='submit' value="保存" @click="submit('form2')"></le-button>
                <le-button type='close' value="关闭" @click="close"></le-button>
            </div>
        </le-dialog>
    </div>
</template>

<script>

let _data = [
    {name:"aaa",code:"1"},
    {name:"aaa1",code:"2"},
    {name:"aaa2",code:"3"},
    {name:"bbb",code:"4"},
    {name:"ccc",code:"5"},
];

import Unit from "../core/tool/commonUtil.js";
import $ from "jquery";
export default {
    name:"FormValidate",
    data(){
        return {
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
                multiple:true,
                url:"/file/img/upload",
                completedCallback:(d)=>{
                    console.log(d);
                },
                vtype:"jpg,png,gif",
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
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"}
                ],
                getUrl:()=>{
                    return "/risk/limit/black/user/query/lst?isNeedAllCout=true&userName=&companyName=&status=-1";
                },
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"pageNum",
                    index:1,
                    size:10
                },
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
            favArray:[]
        }
    },
    methods:{
        openDialog(){
            window.setTimeout(()=>{
                this.entity.fav = "1,2";
                this.entity.sex = "5";
                this.entity.job = "3,4,5";
            },2000)
            this.showDialog = true;
        },
        close(){
            this.showDialog = false;
        },
        search(){
            this.$refs.black_list_table.searchCurrentIndex();
        },
        submit(id){
            let res = this.$refs[id].validate();
            res.then(d=>{
                let eee = this.entity;
                debugger
            }).catch((error)=>{
                debugger
            })
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
            this.$refs["jobRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));

            // this.$refs["dialogJobRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));
            // this.$refs["dialogSexRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));
            // this.$refs["dialogFavRef"].getCurrentComponent().init(Unit.object.cloneObj(_data));

            this.jobArray = Unit.object.cloneObj(_data);
            this.sexArray = Unit.object.cloneObj(_data);
            this.favArray = Unit.object.cloneObj(_data);
        },1000)


        var labelwidth = this.$refs.le_list_search_pannel.attributes["label-width"].value;
        $(".le_list_search_pannel .form-item label").css("width",labelwidth)
    }
}
</script>

<style scoped>
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

    




</style>
