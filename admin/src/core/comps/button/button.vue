<template>
    <button @click="$emit('click')" :disabled="cdisabled" :class="data.cls"><i class="fa" :class="data.iCls"></i>{{value?value:"未设置"}}</button>	
</template>
<script>

import DEFINE_KEY from "../Define.js";

export default {
    name:"LeButton",
    props:["type","value","disabled"],
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data(){
        return {
            
        }
    },
    computed:{
        cdisabled(){
            if(!this.disabled){
                return false;
            }
            if(typeof this.disabled == "string"){
                return this.disabled=="true"?true:false;
            }else{
                return new Boolean(this.disabled);
            }
        },
        _type(){
            let _type = "default";
            if(this.type){
                _type = this.type;
            }
            return _type;
        },
        data(){
            let tmp = {cls:"",iCls:"",value:""};
            tmp = DEFINE_KEY.BUTTON_CONFIG[this._type];
            if(this.cdisabled){
                tmp.cls = tmp.cls + " isDisabled";
            }else{
                tmp.cls = tmp.cls.replace('isDisabled','');
            }
            return tmp;
        }
    },
    methods:{
    },
    mounted(){
        // console.log(this.$slots);
    }
}   
</script>
<style scoped>
    .isDisabled{
        color: #fff;
        background-color: #a0cfff !important;
        border-color: #a0cfff;
        cursor: not-allowed;
    }
    button{
        height: 28px;
        line-height: 28px;
        padding: 0 13px;
        border: none;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        border-color: #dcdfe6;
        color: #fff;
        font-size: 12px !important;
        cursor: pointer;
    }
    .default{
        background-color: #fff;
        color: #3e3a3a;
        border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    }

    .back{
        background-color: #fff;
        color:#fff;
    }
    .add{
        background-color: #42b1ff;
        border-color: #42b1ff;
    }

    .delete{
        background-color: #f56c6c;
        border-color: #f56c6c;
    }

    .edit{
        background-color: #6c81ff;
        border-color: #6c81ff;
    }

    .submit{
        background-color: #ea4cf0;
        border-color: #ea4cf0;
    }

    .back{
        background-color: #3699ff;
        border-color: #3699ff;
    }

    .setting{
        background-color:#9d72ff;
        border-color: #9d72ff; 
        color: #fff;
    }

    .search{
        background-color: #00ded1;
        border-color: #00ded1;
    }

    .enable{
        background-color: #42d5ff;
        border-color: #42d5ff;
    }

    .disable{
        background-color: #c24cee;
        border-color: #c24cee;
    }

    .publish{
        background-color: #62e082;
        border-color: #62e082;
    }

    .down{
        background-color: #f3bf34;
        border-color: #f3bf34;
    }

    .upload{
        background-color: #46f0c6;
        border-color: #46f0c6;
    }

    .play{
        background-color: #6c81ff;
        border-color:#6c81ff;
    }

    .start{
        background-color: #7cc341;
        border-color: #7cc341;
    }

    .stop{
        background-color: #62e082;
        border-color: #62e082;
    }

    .info{
        background-color: #9d72ff;
        border-color: #9d72ff;
    }

    .danger{
        background-color: #e85656;
        border-color:#e85656;
    }

    .warning{
        background-color: #ff33a6;
        border-color: #ff33a6;
    }

    button i{
        font-size: 12px !important;
        margin-right: 4px;
    }

</style>
