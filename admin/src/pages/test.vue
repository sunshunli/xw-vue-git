

<template>
    <div>
        <baby-input ref='b1'></baby-input>
    </div>
</template>

<script>

import BabyInput from "./myInput.vue";

export default {
    name:"TestPage",
    components:{BabyInput},
    data(){
        return {
        }
    },
    methods:{

    },
    mounted(){
        window.setTimeout(()=>{
            this.$refs['b1'].setName("我是倩倩");
        },1000)
    }
}
</script>

<style scoped>

</style>
