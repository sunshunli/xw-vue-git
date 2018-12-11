
<template>
    <div>
        <le-checkbox v-for="(item,index) in data" :key="index" :checked="item.ck" @change="changeCkList(item)" :lable-name="item[displayName]"></le-checkbox>
    </div>
</template>

<script>

import CommonUtil from "../../tool/commonUtil.js";
import LeCheckbox from "./checkbox.vue";
export default {
    name:"LeCheckboxList",
    components:{LeCheckbox},
    props:["displayName","displayValue"],
    data(){
        return {
            data:[]
        }
    },
    computed:{

    },
    methods:{
        /**
         * @description 设置数据源，自动添加ck属性来控制是否选中状态
         * @returns
         */
        init(data){
            this.data = CommonUtil.object.addPrimaryAndCk(data);
        },
        /**
         * @description 回写的方法，设置checkbox选中状态
         * @param vals 必须为数组, 必须设置displayValue为需要传递的value字段
         * @return
         */
        setChecked(vals){
            this.data.forEach(item=>{
                let cked = false;
                vals.forEach(x=>{
                    if(item[this.displayValue] == x){
                        cked = true;
                    }
                })
                if(cked){
                    item.ck = true;
                }
            })
        },
        /**
         * @description checkbox的change事件 会触发checkboxList的change回调
         * @param item 当前的选中项
         * @returns
         */
        changeCkList(item){
            item.ck = !item.ck;
            this.$emit('change',this.getCheckedItems());
        },
        /**
         * @method
         * @description 传入displayValue的时候，返回对象，里面可直接取vals(为displayValue的数组)
         * @description 不传入displayValue，返回对象，里面可去items数组(为选中的项的集合)
         * @returns
         */
        getCheckedItems(){
            if(this.displayValue){
                return CommonUtil.object.getCheckedItems(this.data,this.displayValue);
            }else{
                return CommonUtil.object.getCheckedItems(this.data,"id");
            }
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>
