<template>
    <div>

        <input type="text" id="abc" />

        是否弹窗<input type="checkbox" v-model="hasDialog" />

        <input type="button" value="创建模块" @click="create" placeholder="自动创建view，api，store" />
    </div>
</template>

<script>
export default {
    name:"fs",
    data(){
        return {
            path:"",
            hasDialog:false
        }
    },
    methods:{
        create(){
            let _path = this.path;
            this.ajax.postFetch("/comp/createModule",{moduleName:$("#abc").val()}).then(d=>{
                
            })
        },
        ctl(method,context){
            clearTimeout(method.sid);

            method.sid = window.setTimeout(function(){
                method.call(context);
            },100)
        }
    },
    mounted(){
        // let that = this;
        // $("#abc").on("input",function(e){
        //     that.ctl(that.create);
        // })
    }
}
</script>

<style scoped>

</style>
