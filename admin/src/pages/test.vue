

<template>
    <div>
        <v-input label="年龄12" type="text" msg="正整数11" vType='number' v-model="abc"></v-input>
        {{abc}}
        <le-button type="default" value="set" @click="setv"></le-button>
        <le-button type="default" value="get" @click="getv"></le-button>
    </div>
</template>

<script>


export default {
    name:"TestPage",
    data(){
        return {
            abc:"1"
        }
    },
    methods:{
        setv(){
            this.abc = "wwww"
        },
        getv(){
            console.log("-----"+this.abc);
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>

</style>
