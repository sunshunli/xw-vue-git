
<template>

    <div>
        <div class="le_comps_core_css">
            <div class='le_list_search_pannel clearfix'>
                <div class="col2">
                    <le-local-select v-model="project.projectPath" placeholder='选择项目' label="选择项目" :data-source="project.projects" display-name="name" display-value="value"></le-local-select>
                    <le-input v-model="project.moduleName" label="模块名称" placeholder="输入模块名称"></le-input>
                    <le-button value="添加模块" @click="saveModule"></le-button>
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
                            <td>删除</td>
                            <td>字段类型</td>
                            <td>字段名</td>
                            <td>Label</td>
                            <td>tip</td>
                            <td>placeholder</td>
                            <td>验证类型</td>
                            <td>displayName</td>
                            <td>displayValue</td>
                            <td>错误提示信息</td>
                            <td>是否为搜索条件</td>
                            <td>是否开启验证</td>
                            <td>是否必填</td>
                        </tr>
                    </thead>
                    <tr v-for="(item,idx) in config.cols" :key="idx">
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
                projects:[],
                projectPath:"",
                moduleName:"",
            },
            config:Config
        }
    },
    computed:{

    },
    methods:{
        saveModule(){
            if(!this.project.projectPath || !this.project.moduleName){
                this.alert.showAlert("warning","必须输入项目和模块名称!");
                return;
            }
            this.ajax.postFetch("/comp/createModuleFolder",{moduleName:this.project.moduleName,projectPath:this.project.projectPath}).then(d=>{
                this.alert.showAlert("success","新增成功Module文件夹!");
            }).catch(e=>{
                this.alert.showAlert("error",e);
            })
        },
        save(){
            this.ajax.postFetch("/comp/createModuleFile",{moduleName:this.project.moduleName,projectPath:this.project.projectPath}).then(d=>{
                this.alert.showAlert("success","新增成功!");
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
            tmpCol.fieldTypes = Unit.object.cloneObj(this.config.selectDataSource.fieldTypes);
            tmpCol.valiTypes = Unit.object.cloneObj(this.config.selectDataSource.valiTypes);
            tmpCol.isSearchDataSource = Unit.object.cloneObj(this.config.selectDataSource.isSearchDataSource);
            tmpCol.isRequiredDataSource = Unit.object.cloneObj(this.config.selectDataSource.isRequiredDataSource);
            tmpCol.isOnDataSource = Unit.object.cloneObj(this.config.selectDataSource.isOnDataSource);
            this.config.cols.push(tmpCol);
        }
    },
    mounted(){
        this.getProjects();
    }
}
</script>
<style scoped>
    .w200{
        width: 93%;
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
