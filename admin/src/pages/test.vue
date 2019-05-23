

<template>
    <div>
        <baby-input ref='b1'></baby-input>
        <span v-for="(item,index) in data" class='html' :key="index">{{item.name}}</span>
    </div>
</template>

<script>

import BabyInput from "./myInput.vue";

export default {
    name:"TestPage",
    components:{BabyInput},
    data(){
        return {
            data:[],
        }
    },
    methods:{
        replaceHTMLTag(str){
            return str.replace(/\${2}(【[\u4e00-\u9fa5]+?】)\${2}/g, '<span style="color:red">$1</span>');
        },
        replaceCount(str){
            return str.replace(/#(\w+?)#/g, '$1');
        }
    },
    mounted(){
        window.setTimeout(()=>{
            this.$refs['b1'].setName("我是倩倩");

            let data = [
                {name:'按客户付款方$$【数学启蒙课】$$按时打卡空间但是阿萨德呢'},
                {name:'按客户付款方#rhymeCount#按时打卡空间但是阿萨德呢'}
            ]
            data.forEach(item=>{
                let str = this.replaceHTMLTag(item.name);
                str = this.replaceCount(str);
                item.name = str;
            })
            this.data = data;
        },0)

        window.setTimeout(()=>{
            let spans = document.getElementsByTagName("span");
            for(let i = 0;i<spans.length;i++){
                let str = spans[i].textContent;
                spans[i].innerHTML = str;
                console.log(str);
            }
        },1000)
    }
}
</script>

<style scoped>

</style>
