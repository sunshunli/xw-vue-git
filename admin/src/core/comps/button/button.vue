<template>
    <button @click="$emit('click')" :disabled="cdisabled" :class="data.cls"><i class="fa" :class="data.iCls"></i>{{value?value:"未设置"}}</button>	
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
        color: #4c4545;
        border-color:#4c4545;
    }

    .back{
        background-color: #fff;
        color:#cf320f;
    }
    .add{
        background-color: #90b900;
        border-color: #90b900;
    }

    .delete{
        background-color: #f56c6c;
        border-color: #f56c6c;
    }

    .edit{
        background-color: #16d047;
        border-color: #16d047;
    }

    .submit{
        background-color: #409EFF;
        border-color: #409EFF;
    }

    .back{
        background-color: #c4c4c4;
        border-color: #c4c4c4;
    }

    .search{
        background-color: #209e91;
        border-color: #209e91;
    }

    .enable{
        background-color: #23dbf9;
        border-color: #23dbf9;
    }

    .disable{
        background-color: #e85656;
        border-color: #e85656;
    }

    .publish{
        background-color: #9e9191;
        border-color: #9e9191;
    }

    .start{
        background-color: #7cc341;
        border-color: #7cc341;
    }

    .stop{
        background-color: #f56c6c;
        border-color: #f56c6c;
    }

    .info{
        background-color: #2dacd1;
        border-color: #2dacd1;
    }

    .danger{
        background-color: #e85656;
        border-color:#e85656;
    }

    .warning{
        background-color: #dfb81c;
        border-color: #dfb81c;
    }

    button i{
        font-size: 12px !important;
        margin-right: 4px;
    }

</style>
