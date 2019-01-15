
<template>
    <div>
        <le-asyn-tree
            displayName="name"
            childrenKey="children"
            :asynOptions="asynOptions"
            ref="tree"
        ></le-asyn-tree>
    </div>
</template>

<script>
export default {
    name:"TreeTest",
    data(){
        return {
            data:[],
            asynOptions:{
                getUrl:d=>{
                    return "xxx"
                },
                analysis:d=>{
                    return d;
                }
            }
        }
    },
    methods:{

    },
    mounted(){
        window.setTimeout(d=>{
            let data = [
                {name:"A",id:1},
                {name:"B",id:1},
                {name:"C",id:1},
                {name:"D",id:1}
            ];
            this.$refs["tree"].init(data);
        },1000)
    }
}
</script>

<style>

</style>
