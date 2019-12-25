<template>
    <div class="bg">
        <div class="login">
            <input type="button" value="A" @click="requestHttp('AAA')" />
            <input type="button" value="B" @click="requestHttp('BBB')" />
            <input type="button" value="C" @click="requestHttp('CCC')" />
        </div>

        <test-comp ref='comref'></test-comp>
    </div>
</template>

<script>
    import commonUtil from "../../core/tool/commonUtil.js";
    import TestComp from "./test_comp.vue";

    export default {
        name: "Login",
        components: {TestComp},
        data(){
            return {
                id:""
            }
        },
        methods:{
            requestHttp(id){
                this.$refs['comref'].doHttp(id);
            }
        }
    }
</script>

<style scoped>
</style>