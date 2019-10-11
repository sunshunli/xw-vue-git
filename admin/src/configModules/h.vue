
<template>

    <div>
        <div class="le_comps_core_css">
            <div class='le_list_search_pannel clearfix'>
                <div class="col2">
                    <le-local-select :readonly="baseReadOnly" v-model="project.projectPath" placeholder='选择项目' label="选择项目" :data-source="project.projects" display-name="name" display-value="value"></le-local-select>
                    <le-input :readonly="baseReadOnly" v-model="project.moduleName" label="模块名称" placeholder="输入模块名称"></le-input>
                    <le-button value="添加模块" @click="saveModule"></le-button>
                    <le-button value="重置" @click="resetBaseConfig"></le-button>
                </div>
            </div>
            <!-- 查询条件按钮组 le_search_btn_group-->
            <!-- <div class="le_search_btn_group cleatfix">
                <le-button type="create" value="配置列表页"></le-button>
            </div> -->
            <!-- tableList容器 le_table_container -->
            <div class='le_table_container'>
                <h1>列表页基础配置</h1>
                <div class="col3">
                    <le-input v-model="listBtnConfig.pageName" label="页面名称" placeholder="输入页面名称"></le-input>
                    <le-input v-model="listBtnConfig.colsCount" label="一行展示多少列" placeholder="输入列数"></le-input>
                    <le-button type="create" value="添加按钮" @click="addListPageButton"></le-button>
                    <le-button type="create" value="添加列" @click="addSearchCols"></le-button>
                    <le-button type="save" value="保存配置" @click="createModuleFile"></le-button>
                </div>
                <table class="le-table">
                    <thead>
                        <tr class="title">
                            <td>操作</td>
                            <td>按钮名称</td>
                            <td>按钮类型</td>
                            <td>按钮事件名称</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,idx) in listBtnConfig.btns" :key="idx">
                            <td>
                                <div style="width:100px">
                                    <le-button type="remove" value="删除" @click="delRow(item,listBtnConfig.btns)"></le-button>
                                </div>
                            </td>
                            <td>
                                <div class="w200">
                                    <le-input labelWidth="0" v-model="item.btnName" placeholder="按钮名称"></le-input>
                                </div>
                            </td>
                            <td>
                                <div class='w200'>
                                    <le-local-select labelWidth="0" placeholder="选择按钮类型" :data-source="item.buttonTypes" display-name="name" display-value="val" v-model="item.btnType"></le-local-select>
                                </div>
                            </td>
                            <td>
                                <div class="w200">
                                    <le-input labelWidth="0" v-model="item.btnHandle" placeholder="输入事件名称"></le-input>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1>列表页搜索字段配置</h1>
                <table class="le-table">
                    <thead>
                        <tr class="title">
                            <td>操作</td>
                            <td>字段类型</td>
                            <td>字段名</td>
                            <td>Label</td>
                            <td>LabelWidth</td>
                            <td>placeholder</td>
                            <td>Url</td>
                            <td>dataSource</td>
                            <td>displayName</td>
                            <td>displayValue</td>
                        </tr>
                    </thead>
                    <tr v-for="(item,idx) in listSearchColsConfig.cols" :key="idx">
                        <td>
                            <div style="width:100px">
                                <le-button type="remove" value="删除" @click="delRow(item,listSearchColsConfig.cols)"></le-button>
                            </div>
                        </td>
                        <td>
                            <div class='w200'>
                                <le-local-select labelWidth="0" placeholder="选择字段类型" :data-source="item.fieldTypes" display-name="name" display-value="value" v-model="item.fieldType"></le-local-select>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.key" placeholder="接口字段名称(key)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.label" placeholder="字段名称(label)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.labelWidth" placeholder="labelWidth"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.placeholder" placeholder="输入placeholder"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.dataSource" placeholder="dataSource" v-show="showDisplay(item)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.url" placeholder="URL" v-show="showDisplay(item)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.displayName" placeholder="显示名称" v-show="showDisplay(item)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.displayValue" placeholder="服务端传值Key" v-show="showDisplay(item)"></le-input>
                            </div>
                        </td>
                    </tr>
                    <!-- <tr v-for="(item,idx) in config.cols" :key="idx">
                        <td>
                            <div style="width:100px">
                                <le-button type="remove" value="删除" @click="delRow(item,config.cols)"></le-button>
                            </div>
                        </td>
                        <td>
                            <div class='w200'>
                                <le-local-select labelWidth="0" placeholder="请选择" :data-source="item.fieldTypes" display-name="name" display-value="value" v-model="item.fieldType"></le-local-select>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.key" placeholder="接口字段名称(key)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.label" placeholder="字段名称(label)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.tip" placeholder="字段tip"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.placeholder" placeholder="输入placeholder"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-local-select labelWidth="0" v-show="showValidata(item)" placeholder="input验证类型" :data-source="item.valiTypes" display-name="name" display-value="value" v-model="item.valiType"></le-local-select>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.displayName" placeholder="显示名称" v-show="showDisplay(item)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.displayValue" placeholder="服务端传值Key" v-show="showDisplay(item)"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-input labelWidth="0" v-model="item.errorMsg" placeholder="错误提示信息"></le-input>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-checkbox-list labelWidth="0" :data-source="item.isSearchDataSource" display-name="name" display-value="value" v-model="item.isSearch"></le-checkbox-list>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-checkbox-list labelWidth="0" :data-source="item.isOnDataSource" display-name="name" display-value="value" v-model="item.isOn"></le-checkbox-list>
                            </div>
                        </td>
                        <td>
                            <div class="w200">
                                <le-checkbox-list labelWidth="0" :data-source="item.isRequiredDataSource" display-name="name" display-value="value" v-model="item.isRequired"></le-checkbox-list>
                            </div>
                        </td>
                    </tr> -->
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import Unit from "../core/tool/commonUtil.js";
import Config from "./createConfig.js";

let list_tool = {
    searchList:{
        btn:{
            addListPageButton(context){
                let tmp = Unit.object.cloneObj(context.config.searchPage.btn.defaultBtnPropertys);
                tmp.buttonTypes = Unit.object.cloneObj(context.config.searchPage.btn.buttonTypes);
                context.listBtnConfig.btns.push(tmp);
            }
        },
        searchCols:{
            addSearchCols(context){
                let tmp = Unit.object.cloneObj(context.config.searchPage.col.defaultColPropertys);
                tmp.fieldTypes = Unit.object.cloneObj(context.config.searchPage.col.fieldTypes);
                context.listSearchColsConfig.cols.push(tmp);
            }
        }
    }
}

export default {
    name:"H",
    data(){
        return {
            baseReadOnly:false,
            project:{
                projects:[],
                projectPath:"",
                moduleName:"",
            },
            config:Config,
            listBtnConfig:{
                pageName:"",
                colsCount:"",
                btns:[]
            },
            listSearchColsConfig:{
                cols:[]
            }
        }
    },
    computed:{

    },
    methods:{
        addListPageButton(){
            list_tool.searchList.btn.addListPageButton(this);
        },
        resetBaseConfig(){
            this.baseReadOnly = false;
        },
        saveModule(){
            if(!this.project.projectPath || !this.project.moduleName){
                this.alert.showAlert("warning","必须输入项目和模块名称!");
                return;
            }
            this.ajax.postFetch("/comp/createModuleFolder",{moduleName:this.project.moduleName,projectPath:this.project.projectPath}).then(d=>{
                this.baseReadOnly = true;
                this.alert.showAlert("success","新增成功Module文件夹!");
            }).catch(e=>{
                this.alert.showAlert("error",e);
            })
        },
        createModuleFile(){
            if(!this.project.projectPath || !this.project.moduleName || !this.listBtnConfig.pageName){
                this.alert.showAlert("warning","项目名称, 模块名称, 页面名称必填!");
                return;
            }
            if(!this.listBtnConfig.colsCount){
                this.listBtnConfig.colsCount = 3;
            }
            let data = {
                btn:this.listBtnConfig,
                cols:this.listSearchColsConfig
            }
            data = Unit.object.cloneObj(data);
            data.btn.btns.forEach(x=>{
                delete x.buttonTypes
            })
            data.cols.cols.forEach(x=>{
                delete x.fieldTypes
            })
            this.ajax.postFetch("/comp/createModuleFile",{moduleName:this.project.moduleName,projectPath:this.project.projectPath,data:data}).then(d=>{
                this.alert.showAlert("success","新增成功!");
                this.baseReadOnly = false;
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        delRow(row,items){
            this.alert.showConfirm('是否删除?',d=>{
                Unit.arrayServer.removeItems(items,[row]);
            })
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
        addSearchCols(){
            list_tool.searchList.searchCols.addSearchCols(this);
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
    },
    mounted(){
        this.getProjects();
        this.listBtnConfig.btns.push(
            {btnName:"搜索",buttonTypes:Unit.object.cloneObj(this.config.searchPage.btn.buttonTypes),btnType:"search",btnHandle:"search"}
        )
    }
}
</script>
<style scoped>
    .w200{
        width: 94%;
    }
    
    .le-table{
        width:100%;
        border:1px solid #aeaeae;
        text-align :center;
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
