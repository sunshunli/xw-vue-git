
<template>
    <div>
        <div>Step 1:选择项目:
            <select v-model="project.selectProject">
                <option v-for="(item,index) in project.projects" :key="index" :value="item.value">{{item.name}}</option>
            </select>
            <!-- <local-select ref="ss" displayName="name" displayValue="value"></local-select> -->
        </div>

        <div>
            Step 2:配置属性
            <input type="button" value="添加字段" @click="add" />

            <div>
                <div>
                    
                </div>
            </div>
        </div>

        <input type="text" v-model="path" />

        <input type="button" value="创建模块" @click="create" placeholder="自动创建view，api，store" />
    </div>
</template>

<script>

let recorder = null;

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
                   {name:"",key:"",fieldType:"",isConvert:false,displayName:"",displayValue:"",showSearch:false}
               ]
            },
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

        },
        create(){
            if(!this.path || !this.selectProject){
                this.alert.showAlert("warning","必须输入项目和模块名称!");
                return;
            }
            this.ajax.postFetch("/comp/createModule",{moduleName:this.path,projectPath:this.selectProject}).then(d=>{
                this.alert.showAlert("success","新增成功!");
            },r=>{
                this.alert.showAlert("warning",r.data);
            }).catch(e=>{
                this.alert.showAlert("error",e);
            })
        }
    },
    mounted(){
        // this.getProjects();
    }
}
</script>
<style>

</style>
