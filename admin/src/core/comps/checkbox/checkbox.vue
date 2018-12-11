<template>
    <span class="span" @click="changeCK">
        <span>{{lableName?lableName:'未设置'}}</span>
        <i class="fa" :class="ckCls"></i>
        <input class="ck" type="checkbox" :checked="checked" />
    </span>
</template>

<script>

const _checkedCls = "fa-check-square";
const _unCheckedCls = "fa-square-o";

export default {
    name:"LeCheckbox",
    props:["checked","lableName"],
    data(){
        return {
            
        }
    },
    computed:{
        ckCls(){
            return this.checked?_checkedCls:_unCheckedCls;
        }
    },
    methods:{
        /**
         * @description checkbox回调，会触发le-checkbox的change
         * @description 不能主动去修改checked属性，因为checked属性是父组件传递过来的
         * @returns
         */
        changeCK(){
            //千万不要直接去用   this.checked = !this.checked, 子组件不允许去改变父组件里面的值
            this.$emit('change',!this.checked);
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
    .span{
        position:relative;
        cursor: pointer;
    }
    .ck{
        position:absolute;
        left:49px;
        z-index:-100
    }
</style>
