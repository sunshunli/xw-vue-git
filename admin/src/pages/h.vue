
<template>
    <div>

        <div>Step 1:选择项目:
            <select v-model="selectProject">
                <option v-for="(item,index) in projects" :key="index" :value="item.value">{{item.name}}</option>
            </select>
            <local-select ref="ss" displayName="name" displayValue="value"></local-select>
            
        </div>

        <input type="text" v-model="path" />

        <input type="button" value="创建模块" @click="create" placeholder="自动创建view，api，store" />
    </div>
</template>

<script>

export default {
    components:{},
    name:"H",
    data(){
        return {
            selectProject:"",
            projects:[],
            path:""
        }
    },
    computed:{

    },
    methods:{
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
        this.ajax.getFetch("/comp/getProjects").then(d=>{
            let result = [{name:"请选择",value:""}];
            d.data && d.data.split('\r\n').forEach(item => {
                result.push({name:item.substring(item.lastIndexOf('/')+1),value:item});
            });
            this.projects = result;
            this.$refs['ss'].init(result);
        })

        
    }
}
</script>
<style>

</style>
