
<template>

    <div>
        <div class="le_comps_core_css">
            <div class='le_list_search_pannel clearfix'>
                <div class="col1">
                    <le-local-select placeholder='选择项目' label="选择项目" :data-source="project.projects" display-name="name" display-value="value" v-model="project.selectProject"></le-local-select>
                </div>
            </div>
            <!-- 查询条件按钮组 le_search_btn_group-->
            <div class="le_search_btn_group cleatfix">
                <le-button type="create" value="添加Col" @click="add"></le-button>
                <le-button type="save" value="保存配置" @click="save"></le-button>
            </div>
            <!-- tableList容器 le_table_container -->
            <div class='le_table_container'>
                <table class="le-table">
                    <thead>
                        <tr class="title">
                            <td>字段类型</td>
                            <td>字段名</td>
                            <td>显示文本</td>
                            <td>验证类型</td>
                            <td>displayName</td>
                            <td>displayValue</td>
                            <td>错误提示信息</td>
                            <td>isSearch</td>
                            <td>isRequired</td>
                        </tr>
                    </thead>
                    <tr v-for="item in config.cols" :key="item.key">
                        <td>
                            <le-local-select labelWidth="0" placeholder="请选择" :data-source="item.fieldTypes" display-name="name" display-value="value" v-model="item.fieldType"></le-local-select>
                        </td>
                        <td>
                            <le-input labelWidth="0" v-model="item.fieldname" placeholder="接口字段名称"></le-input>
                        </td>
                        <td>
                            <le-input labelWidth="0" v-model="item.fieldKey" placeholder="页面显示字段名称"></le-input>
                        </td>
                        <td>
                            <le-local-select labelWidth="0" v-show="showValidata(item)" placeholder="请选择input验证类型" :data-source="item.valiTypes" display-name="name" display-value="value" v-model="item.valiType"></le-local-select>
                        </td>
                        <td>
                            <input labelWidth="0" class="le-input" type="text" v-model="item.displayName" placeholder="显示名称" v-show="showDisplay(item)"/>
                        </td>
                        <td>
                            <le-input labelWidth="0" v-model="item.displayValue" placeholder="服务端传值Key" v-show="showDisplay(item)"></le-input>
                        </td>
                        <td>
                            <le-input labelWidth="0" v-model="item.errorMsg" placeholder="错误提示信息"></le-input>
                        </td>
                        <td>
                            <le-checkbox-list :data-source="item.isSearchDataSource" display-name="name" display-value="value" v-model="item.isSearch"></le-checkbox-list>
                        </td>
                        <td>
                            <le-checkbox-list :data-source="item.isRequiredDataSource" display-name="name" display-value="value" v-model="item.isRequired"></le-checkbox-list>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import Unit from "../core/tool/commonUtil.js";
import Config from "./createConfig.js";

export default {
    name:"H",
    data(){
        return {
            project:{
                selectProject:"",
                projects:[],
            },
            path:"",
            config:Config
        }
    },
    computed:{

    },
    methods:{
        save(){

        },
        showValidata(item){
            if(item.fieldType == "text"){
                return true;
            }
            return false;
        },
        showDisplay(item){
            if(item.fieldType == "select" || item.fieldType == "radioList" || item.fieldType == "checkboxList"){
                return true;
            }
            return false;
        },
        getProjects(){
            this.ajax.getFetch("/comp/getProjects").then(d=>{
                let result=[];
                d.data && d.data.split('\r\n').forEach(item => {
                    result.push({name:item.substring(item.lastIndexOf('/')+1),value:item});
                });
                this.project.projects=result;
                this.$refs['ss'].init(result);
            })
        },
        add(){
            let tmpCol = Unit.object.cloneObj(this.config.defaultCol);
            tmpCol.fieldTypes = Unit.object.cloneObj(this.config.fieldTypes);
            tmpCol.valiTypes = Unit.object.cloneObj(this.config.valiTypes);
            tmpCol.isSearchDataSource = Unit.object.cloneObj(this.config.isSearchDataSource);
            tmpCol.valiTypes = Unit.object.cloneObj(this.config.valiTypes);
            this.config.cols.push(tmpCol);
        },
        create(){
            if(!this.path || !this.project.selectProject){
                this.alert.showAlert("warning","必须输入项目和模块名称!");
                return;
            }
            this.ajax.postFetch("/comp/createModule",{moduleName:this.path,projectPath:this.project.selectProject}).then(d=>{
                this.alert.showAlert("success","新增成功!");
            },r=>{
                this.alert.showAlert("warning",r.data);
            }).catch(e=>{
                this.alert.showAlert("error",e);
            })
        }
    },
    mounted(){
        this.getProjects();
    }
}
</script>
<style scoped>
    .row{
        text-align:left;
    }
    .row{
        width:100%;
        padding-top:20px;
        display:flex;
    }

    .rowTitle{
        font-size:14px;
        line-height:40px;
        font-weight:800;
        width:80px;
        text-align:right;
    }
    .le-btn {
        outline:none;
        border:1px solid #f2f2f2;
        border-radius:3px;
        box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.1);
        line-height:30px;
        /* margin-top:2px; */
        width:80px;
        background-color:#fff;
        color:#333;
        font-size:12px;
        box-sizing: border-box;

    }
    .btn-config{
        background:rgb(153, 207, 153);
        color:#fff;
        border:rgb(164, 218, 164);
    }
    .btn-submit{
        background: rgb(120, 120, 211);
        color:#fff;
        border:rgb(120, 120, 211);
        
    }
    .btn-submit:hover{
        background: rgb(102, 102, 211);
        border:rgb(102, 102, 211);
    }
     .le-btn i {
         font-variant: unset;
         padding-right:3px;
     }
     .le-select{
        width: 180px;
        height: 40px;
        border-radius: 5px;
        /* box-shadow: 0 0 5px #ccc; */
        border:1px solid #aeaeae;
        position: relative;
        margin:0 auto;
     }
     .le-select select{
        border: none;
        outline: none;
        width: 100%;
        height: 38px;
        line-height: 40px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-left: 10px;
        padding-right:40px

    }
    .le-select i{
        content: "";
        font-size:16px;
        position: absolute;
        right: 20px;
        top: 10px;
        pointer-events: none;
    }
    .rowContent{
        margin-left:10px;
        position: relative;

    }
    .le-input{
        outline: none;
        /* box-shadow: 0 0 5px #ccc; */
        appearance: none;
        width: 180px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;

        -webkit-appearance: none;
        -moz-appearance: none;
        border: 1px solid #aeaeae;
        background:rgb(248, 248, 248);
        padding-left:10px;
        padding-right:10px;

    }
    
    .le-check[type=checkbox] {
        width:16px;
        height:16px;
        z-index:10;
        position: absolute;;
        top:50%;
        margin-top:-8px;
        margin-left:-8px;     
    }
    .le-check[type=checkbox]::before {
        content:" ";
        display:inline-block;
        color:#000;
        width:16px;
        height:16px;
        background:#fff;
        border:1px #aeaeae solid;
        position: absolute;
        border-radius:3px;
        background:rgb(248, 248, 248);

        
    }
    .le-check[type=checkbox]:checked::before {
        content:"\f00c";
        color:#1ab394; 
        font: normal normal normal 14px/1 FontAwesome; 
        font-size: inherit; 
        text-rendering: auto; 
        border:1px #333 solid;
        -webkit-font-smoothing: antialiased; 
        -moz-osx-font-smoothing: grayscale;
        border-radius:3px;
        background:rgb(248, 248, 248);

    }
    .rowCenter{
        text-align: center;
        margin:0 auto;
    }
    .rowRight{
        text-align: center;
        margin-left:200px;

    }
    .le-table{
        width:1000px;
        border:1px solid #aeaeae;
        text-align :center;
        /* margin-top:20px; */
        
    }
    .le-table td{
        
        border:1px solid #aeaeae;
        text-align :center;
        padding-top:10px;
        padding-bottom:10px;
        position:relative;
        
    }
    .le-table tr.title{
        background:#f2f2f2;
    }
    .le-table td.title{
        font-size:14px;
        line-height:28px;
        font-weight:800;
    }
</style>
