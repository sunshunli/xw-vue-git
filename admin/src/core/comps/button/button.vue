<template>
    <div>
        <button @click="$emit('click')" :disabled="cdisabled" :class="data.cls"><i class="fa" :class="data.iCls"></i>{{value?value:"未设置"}}</button>	
    </div>
</template>
<script>

import DEFINE_KEY from "../Define.js";

export default {
    name:"LeButton",
    props:["type","value","disabled"],
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
        color:#606266;
    }

    .back{
        background-color: #fff;
        color:#606266;
    }
    .add{
        background-color: #67c23a;
    }

    .delete{
        background-color: #f56c6c;
    }

    .submit{
        background-color: #409EFF;
    }

    .back{
        background-color: #c4c4c4;
    }

    .search{
        background-color: #d5a6d2;
    }

    .edit{
        background-color: #606f7f;
    }

    .start{
        background-color: #e6a23c;
    }

    .stop{
        background-color: #f56c6c;
    }

    .info{
        background-color: #3f9f14;
    }

    button i{
        font-size: 12px !important;
        margin-right: 4px;
    }

</style>
