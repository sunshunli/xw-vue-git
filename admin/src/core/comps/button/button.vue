<template>
    <span class="asBtn" @click.stop="clickHandle" :disabled="cdisabled" :class="[data.cls,disabledClass]"><i class="fa" :class="data.iCls"></i>{{value?value:"未设置"}}</span>	
</template>
<script>

import DEFINE_KEY from "../define.js";

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

        disabledClass(){
            if(!this.disabled){
                return '';
            }else{
                return 'disabledIcon'
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
            if(!tmp){
                tmp = {cls:"default",iCls:"",value:""};
            }else{
                if(this.cdisabled){
                    tmp.cls = tmp.cls + " isDisabled";
                }else{
                    tmp.cls = tmp.cls.replace('isDisabled','');
                }
            }
            return tmp;
        }
    },
    methods:{
        clickHandle(){
            if(!this.disabled){
                this.$emit('click')
            }
        }
    },
    mounted(){
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
    span{
        height: 30px;
        line-height: 30px;
        display: inline-block;
        outline: none;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        color: #fff;
        font-size: 12px !important;
        cursor: pointer;
        padding: 0 13px 0 22px;
        position: relative;
        margin: 3px;
        /* vertical-align: text-bottom; */
    }

    span .fa{
        position: absolute;
        top: 8px;
        left: 5px;
    }

    .default{
        padding: 0 13px;
        background-color: #fff;
        color: #3e3a3a;
        border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    }

    .search{
        background-color: #5e9bec;
        border-color:#5e9bec;
    }
    .create{
        background-color: #49cfad;
        border-color: #49cfad;
    }

    .update{
        background-color: #a2d469;
        border-color: #a2d469;
    }

    .remove{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }

    .approve{
        background-color: #4b89dc;
        border-color: #4b89dc;
    }

    .reject{
        background-color: #f6bb43;
        border-color: #f6bb43;
    }

    .start{
        background-color:#35bb9c;
        border-color: #35bb9c; 
        color: #fff;
    }

    .stop{
        background-color: #4b89dc;
        border-color: #4b89dc;
    }

    .info{
        background-color: #3bafda;
        border-color: #3bafda;
    }

    .reset{
        background-color: #5e9bec;
        border-color: #5e9bec;
    }

    .up{
        background-color: #a2d469;
        border-color: #a2d469;
    }

    .down{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }

    .publish{
        background-color: #49cfad;
        border-color: #49cfad;
    }

    .cancelPublish{
        background-color: #5e9bec;
        border-color:#5e9bec;
    }

    .import{
        background-color:#a2d469;
        border-color: #a2d469;
    }

    .review{
        background-color: #35bb9c;
        border-color: #35bb9c;
    }

    .batch{
        background-color: #4b89dc;
        border-color: #4b89dc;
    }

    .setting{
        background-color: #4fc1e9;
        border-color:#4fc1e9;
    }

    .decorate{
        background-color: #ad92ed;
        border-color: #ad92ed;
    }

    .prevPage{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }

    .nextPage{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }

    .confirm{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }

    .save{
        background-color: #a2d469;
         border-color: #a2d469;
    }

    .back{
        background-color: #4fc1e9;
         border-color: #4fc1e9;
    }

    .cancel{
        background-color: #bababa;
         border-color: #bababa;
    }

    .choose{
        background-color: #5e9bec;
         border-color: #5e9bec;
    }

    .holdSave{
        background-color: #8dc051;
         border-color: #8dc051;
    }

    .prev{
        background-color: #4fc1e9;
         border-color: #4fc1e9;
    }

    .next{
        background-color: #4fc1e9;
         border-color: #4fc1e9;
    }

    button i{
        font-size: 12px !important;
        margin-right: 4px;
    }

    .close{
        background-color: gray;
        border-color:black;
    }

    .asBtn:hover{
        opacity: 0.8;
    }

    .asBtnHover{
        opacity: 0.8;
        color: red;
    }
</style>
