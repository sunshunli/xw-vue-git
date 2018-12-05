<template>
    <div>
        <v-input :ref="name" error-msg="请输入数字" :v-type="num"></v-input>
        <button @click="submit">提交</button>
    <!-- select -->
    <div>
        <local-select ref='localSelectId' :data="selectData" :analysis="analysis"></local-select>
        
        <input type="button" value="getSelectedItems" @click="getSelectedItems" />
    </div>
</div>
</template>
<script>
    import AjaxUtil from "../core/tool/ajaxService";
    import Util from "../core/tool/commonUtil";
    import LocalSelect from "../core/comps/select/localSelect.vue";
    import VInput from "../core/comps/input/vInput.vue"

    export default {
        extends:AjaxUtil,
        components: {LocalSelect,VInput},
        name: "Login",
        data(){
            return {
                selectData:[],
                num:"number",
                name:"name"
            }
        },
        methods:{
            analysis:function(data){
                let res = [];
                data.forEach(item => {
                    res.push({name:item.name,code:item._id});
                }); 
                return res;
            },
            getSelectData:function(){
                this.getFetch("/api/person/list").then(d=>{
                    this.selectData = d.data.data;
                })
            },
            getSelectedItems:function(){
                console.log(this.$refs['localSelectId'].getSelectedItems());
            },
            submit(){
                console.log(this.$refs[this.name].getResult());
            }
        },
        mounted:function () {
            this.getSelectData();
        },
        created(){

        }
    }
</script>
<style scoped>
    .inputRedIcon input{border-right: 0;border-color: red;outline: none;}
    .inputRedIcon div span.icon{background: #fff;border-color: red;color: red;}
    .inputRedIcon p{color: red;}


    .inputGreenIcon input{border-right: 0;}
    .inputGreenIcon div span.icon{background: #fff;font-size: 16px;color: rgb(72, 255, 0);}
    .inputGreenIcon p{display: none}

    .inputIcon{border-right: 0;}
</style>