

<template>
    <div>
        LeForm  123
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"LeForm",
    data(){
        return {
            subComps:[]
        }
    },
    methods:{
        getAllSubComponents(arr){
            if(arr && arr instanceof Array && arr.length >=1){
                for(let i =0;i< arr.length;i++){
                    if(arr[i].leInputValidate){
                        this.subComps.push(arr[i]);
                    }
                    
                    let children = arr[i].$children;
                    if(children.length > 0){
                        this.getAllSubComponents(children);
                    }
                }
            }else{
                return;
            }
        }
    },
    mounted(){
        debugger
        let comps = this.getAllSubComponents(this.$children);
    }
}
</script>

<style scoped>

</style>
