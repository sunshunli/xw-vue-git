
<template>
    <div>
        
        <!-- <div>Step 1:选择项目:
            <select v-model="project.selectProject">
                <option v-for="(item,index) in project.projects" :key="index" :value="item.value">{{item.name}}</option>
            </select>
           
        </div>
        
        <div>
            Step 2:配置属性
            <input type="button" value="添加字段" @click="add" />

            <div>
                <div>
                    
                </div>
            </div>
        </div>

        <input type="text" v-model="path" placeholder="自动创建view，api，store" />

        <input type="button" value="创建模块" @click="create" /> -->
        <div class = "row">
            <div class="rowTitle">
                选择项目:
            </div>
            <div class="rowContent">
                <div class = "le-select">
                    <select  v-model="project.selectProject">
                        

                        <option v-for="(item,index) in project.projects" :key="index" :value="item.value">{{item.name}}</option>    
                    </select>
                    <i class='fa fa-angle-down' aria-hidden='true'></i>
                </div>
            </div>
        </div>
         <!-- <div class = "row">
             <div class="rowTitle">
                 配置属性：
             </div>
            <div class="rowContent">
               <button class = "le-btn btn-config">
                   <i class="fa fa-plus-square-o" aria-hidden="true"></i>添加字段
               </button>
            </div>
            <div class = "rowContent">
                <div>
                    
                </div>
            </div>
        </div> -->
        <div class="row">
            <div class="rowTitle">
                配置模块:
            </div>
            <div class="rowContent">
                <input class = "le-input" type="text" v-model="path" placeholder="自动创建view，api，store" />
            </div>
            
        </div>
        <div class="row">
            <div class="rowTitle">
                cols:
            </div>
            <div class="rowContent">
               <button class = "le-btn btn-config" @click = "add">
                   <i class="fa fa-plus-square-o" aria-hidden="true"></i>添加一条
               </button>
            </div>
         
            
        </div>
        <div class = "row" style = "margin-left:30px;">
                <table class = "le-table" v-show = "config.cols.length>0">
                    <tr class = "title">
                        <td v-for = "item in colsTitleList" :key = "item.key" class = "title">
                            {{item.name}}
                        </td>
                    </tr>
                    <tr v-for = "item in config.cols" :key = "item.key">
                        <td>
                             <input class = "le-input" type="text" v-model = "item.name"/>
                        </td>
                        <td>
                             <input class = "le-input" type="text" v-model = "item.displayName"/>
                        </td>
                        <td>
                            <div class = "le-select">
                                <select v-model = "item.fieldType">
                                    <option v-for = "item in config.fieldTypes" 
                                            :key = "item.value" 
                                            :value = "item.value">{{item.value}}</option>
                                
                                </select>
                                <i class='fa fa-angle-down' aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <div class = "le-select">
                                <select v-model = "item.validateType">
                                    <option value="1">选择11111111111111</option>
                                
                                </select>
                                <i class='fa fa-angle-down' aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <label for="isSearch">
                                <input class="le-check" type="checkbox"  v-model = "item.showSearch">
                            </label>
                        </td>
                        <td>
                            <label for="isRequired">
                                <input class="le-check" type="checkbox"  v-model = "item.isConvert">
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
        <div class="row">
            <div class = "rowContent rowRight">
                <button class = "le-btn btn-submit">
                    <i class="fa fa-check" aria-hidden="true"></i>保存
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import $ from "jquery";

export default {
    components:{},
    name:"H",
    data(){
        return {
            project:{
                selectProject:"",
                projects:[],
            },
            config:{
                fieldTypes:[
                    {name:"text",value:"text"},
                    {name:"select",value:"select"},
                    {name:"checkbox",value:"checkbox"},
                    {name:"datepicker",value:"datepicker"},
                ],
               cols:[
                   {name:"",key:"",fieldType:"text",isConvert:false,displayName:"",displayValue:"",showSearch:true,validateType:"1"}
               ]
            },
            colsTitleList:[
                {
                    name:"字段名",
                    key:"name"
                },
                {
                    name:"显示名",
                    key :"displayName"
                },
                {
                    name:"字段类型",
                    key :"fieldType"
                },
                {
                    name:"验证类型",
                    key :"validateType"
                },
                {
                    name:"isSearch",
                    key :"showSearch"
                },
                {
                    name:"isRequired",
                    key :"isRequired"
                }
            ],
            path:""
        }
    },
    computed:{

    },
    methods:{
        getProjects(){
            this.ajax.getFetch("/comp/getProjects").then(d=>{
                let result = [{name:"请选择",value:""}];
                d.data && d.data.split('\r\n').forEach(item => {
                    result.push({name:item.substring(item.lastIndexOf('/')+1),value:item});
                });
                this.project.projects = result;
                this.$refs['ss'].init(result);
            })
        },
        add(){
            this.config.cols.push({name:"",key:"",fieldType:"",isConvert:false,displayName:"",displayValue:"",showSearch:true})
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
