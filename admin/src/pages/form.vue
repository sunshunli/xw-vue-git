

<template>
    <div>
        <le-form ref="form1">
            sub
            
            <v-input ref="name1" msg="请输入数字111">
                继续验证：<v-input ref="name2" msg="请输入汉字222"></v-input>
            </v-input>
            <input type="text" value="sss" />

            <le-button value="提交" @click="submit"></le-button>
        </le-form>
    </div>
</template>

<script>
export default {
    name:"FormValidate",
    data(){
        return {}
    },
    methods:{
        submit(){
            let res = this.$refs["form1"].validate();
            res.then(d=>{
                debugger
            }).catch(e=>{
                debugger
            })
        }
    },
    mounted(){

    }
}
</script>

<style scoped>

</style>
