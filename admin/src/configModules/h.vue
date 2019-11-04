
<template>
    <div>
        <div class="le_comps_core_css">
            <div class='le_list_search_pannel clearfix'>
                <h1>项目配置</h1>
                <div class="col2">
                    <le-local-select :readonly="baseReadOnly" v-model="project.projectPath" placeholder='选择项目' label="选择项目" :data-source="project.projects" display-name="name" display-value="value"></le-local-select>
                    <le-input :readonly="baseReadOnly" v-model="project.moduleName" label="模块名称" placeholder="输入模块名称"></le-input>
                    <le-button value="添加模块" @click="saveModule"></le-button>
                    <le-button value="重置" @click="resetBaseConfig"></le-button>
                </div>
                <h1>页面配置</h1>
                <div class="col2">
                    <le-input v-model="listBtnConfig.subModulePath" tip="页面路径:sub1/sub2" label="页面路径" placeholder="输入页面路径"></le-input>
                    <le-input v-model="listBtnConfig.pageName" tip="如person.vue" label="文件名称" placeholder="输入文件名称"></le-input>
                    <le-button value="添加列表页" @click="show2 = false;show1 = true"></le-button>
                    <le-button value="添加新页面" @click="show2 = true;show1 = false"></le-button>
                </div>
            </div>
            
            <div class='le_table_container' v-show="show1">
                <h1>列表页基础配置</h1>
                <div class="col2">
                    <le-input v-model="listBtnConfig.tableTitle" label="列表名称" placeholder="输入列表名称"></le-input>
                    <le-input v-model="listBtnConfig.colsCount" label="一行展示多少列" placeholder="输入列数"></le-input>
                    <le-checkbox-list label="是否有dialog" :data-source="config.dialog.dataSource" display-name="name" display-value="code" v-model="hasDialog"></le-checkbox-list>
                    <le-button type="save" value="保存配置" @click="createModuleFile"></le-button>
                </div>
                <div class="col4">
                    <le-button type="create" value="添加按钮" @click="addListPageButton"></le-button>
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
                                        <le-local-select labelWidth="0" placeholder="选择按钮类型" :data-source="item.buttonTypes" display-name="name" display-value="code" v-model="item.btnType"></le-local-select>
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
                </div>
                <h1>列表页搜索字段配置</h1>
                <div class='col4'>
                    <le-button type="create" value="添加列" @click="addSearchCols"></le-button>
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
                                    <le-local-select labelWidth="0" placeholder="选择字段类型" :data-source="item.fieldTypes" display-name="name" display-value="code" v-model="item.type"></le-local-select>
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
                                    <le-input labelWidth="0" v-model="item.url" placeholder="URL" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                </div>
                            </td>
                            <td>
                                <div class="w200">
                                    <le-input labelWidth="0" v-model="item.dataSource" placeholder="dataSource" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                </div>
                            </td>
                            <td>
                                <div class="w200">
                                    <le-input labelWidth="0" v-model="item.displayName" placeholder="显示名称" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                </div>
                            </td>
                            <td>
                                <div class="w200">
                                    <le-input labelWidth="0" v-model="item.displayValue" placeholder="服务端传值Key" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-show="hasDialog=='1'">
                    <h1>Dialog表单配置</h1>
                    <div class="col4">
                        <le-button type="create" value="添加列" @click="addDialogCols"></le-button>
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
                                    <td>tip</td>
                                    <td>开启验证</td>
                                    <td>是否必填</td>
                                    <td>验证类型</td>
                                    <td>msg</td>
                                </tr>
                            </thead>
                            <tr v-for="(item,idx) in form.cols" :key="idx">
                                <td>
                                    <div style="width:100px">
                                        <le-button type="remove" value="删除" @click="delRow(item,form.cols)"></le-button>
                                    </div>
                                </td>
                                <td>
                                    <div class='w200'>
                                        <le-local-select labelWidth="0" placeholder="请选择" :data-source="item.selectDataSource.typeDatsSource" display-name="name" display-value="code" v-model="item.type"></le-local-select>
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
                                        <le-input labelWidth="0" v-model="item.url" placeholder="Ajax请求url" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.dataSource" placeholder="绑定数据源字段" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.displayName" placeholder="displayName" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.displayValue" placeholder="displayValue" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.tip" placeholder="tip"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-local-select labelWidth="0" placeholder="is on" :data-source="item.selectDataSource.onDataSource" display-name="name" display-value="code" v-model="item.on"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-local-select labelWidth="0" v-show='item.on == "1"' placeholder="is required" :data-source="item.selectDataSource.requiredDatsSource" display-name="name" display-value="code" v-model="item.required"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-local-select labelWidth="0" v-show="item.type == 'text' && item.on == '1'" placeholder="input验证类型" :data-source="item.selectDataSource.valifyDataSource" display-name="name" display-value="code" v-model="item.valifyType"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-show="item.on == '1'" v-model="item.msg" placeholder="错误提示信息"></le-input>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <h1>Table参数配置</h1>
                <div class="col4">
                    <pre contenteditable id="table_options">
                        {
                            showCk:true,
                            map:[
                                {key:"shop",val:"商城"},
                                {key:"accessField",val:"封禁纬度"}
                            ],
                            getUrl:()=>{
                                return "/risk/limit/black/user/query/lst";
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
                                    action:this.edit
                                }
                            ]
                        }
                    </pre>
                </div>
            </div>

            <div class="le_table_container" v-show="show2">

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
            show1:false,
            show2:false,
            baseReadOnly:false,
            project:{
                projects:[],
                projectPath:"",
                moduleName:"",
            },
            hasDialog:"1",
            config:Config,
            listBtnConfig:{
                subModulePath:"",
                tableTitle:"",
                pageName:"",
                colsCount:"",
                btns:[]
            },
            listSearchColsConfig:{
                cols:[]
            },
            form:{
                cols:[]
            }
        }
    },
    computed:{

    },
    methods:{
        addDialogCols(){
            let defaultCol = Unit.object.cloneObj(this.config.form.defaultCol);
            defaultCol.selectDataSource.typeDatsSource = Unit.object.cloneObj(this.config.enum.typeDatsSource);
            defaultCol.selectDataSource.requiredDatsSource = Unit.object.cloneObj(this.config.enum.requiredDatsSource);
            defaultCol.selectDataSource.onDataSource = Unit.object.cloneObj(this.config.enum.onDataSource);
            defaultCol.selectDataSource.valifyDataSource = Unit.object.cloneObj(this.config.enum.valifyDataSource);
            this.form.cols.push(defaultCol);
        },
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
            if(!this.listBtnConfig.tableTitle){
                this.listBtnConfig.tableTitle = this.listBtnConfig.pageName.split('.')[0] + "_List";
            }

            let data = {
                tableOptionsName:this.listBtnConfig.pageName.split('.')[0] + "_table_options",
                btn:this.listBtnConfig,
                cols:this.listSearchColsConfig,
                tableOptions:eval("("+document.getElementById("table_options").innerText.trim()+")"),
                form:Unit.object.cloneObj(this.form.cols),
                hasDialog:this.hasDialog
            }
            data = Unit.object.cloneObj(data);
            data.btn.btns.forEach(x=>{
                delete x.buttonTypes
            })
            data.cols.cols.forEach(x=>{
                delete x.fieldTypes
            })

            //dialog
            if(this.hasDialog == "1"){
                data.form.forEach(x=>{
                    delete x.selectDataSource;
                })
            }

            let res = {
                projectName:"",
                moduleName:"",
                page:{
                    fileName:"",
                    path:"",
                    type:""
                },
                listOptions:{
                    search:{
                        btn:[],
                        cols:[],
                    },
                    tableOptions:{}
                },
                dialog:{
                    hasDialog:"",
                    form:[]
                },

            }

            debugger
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
