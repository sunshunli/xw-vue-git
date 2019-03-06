

<template>
    <div>
        <le-form>
            sub
            <le-button value="测试"></le-button>
            <v-input ref="name1" error-msg="请输入数字">
                继续验证：<v-input ref="name2" error-msg="请输入汉字"></v-input>
            </v-input>
            <input type="text" value="sss" />
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

    },
    mounted(){

    }
}
</script>

<style scoped>

</style>
