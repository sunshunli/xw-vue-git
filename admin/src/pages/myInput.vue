

<template>
    <div>
        <input type="text" v-model="state.name" v-bind:readonly="state.visible" @click="myClick" @blur="submitNewName" />
    </div>
</template>

<script>
export default {
    name:"BabyInput",    
    data(){
        return {
            state:{
                name:"",
                visible:true
            }
        }
    },
    methods:{
        setName(name){
            this.state.name = name;
        },
        setVisible(visible){
            this.state.visible = visible;
        },
        myClick(){
            if(this.state.visible){
                this.setVisible(false);
                this.$emit('click');
            }
        },
        submitNewName(){
            console.log(this.state.name);
        }
    }
}
</script>

<style scoped>

</style>
