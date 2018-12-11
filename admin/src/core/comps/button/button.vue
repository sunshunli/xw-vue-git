<template>
    <div>
        <!-- http://fontawesome.dashgame.com/ -->
        
        <!-- <button class="submit"><i class="fa fa-cloud-download"></i>下载</button>
        <button class="submit"><i class="fa fa-cloud-upload"></i>上传</button>
        <button class="add"><i class="fa fa-file"></i>新建</button>
        <button class="delete"><i class="fa fa-trash-o fa-lg"></i>删除</button>	
        <button class="submit"><i class="fa fa-check"></i>提交</button>
        <button class="default"><i class="fa fa-rotate-left"></i>返回</button>
        <button class="search"><i class="fa fa-search"></i>查询</button>
        <button class="add"><i class="fa fa-edit"></i>修改</button>
        <button class="start"><i class="fa fa-play"></i>启用</button>
        <button class="stop"><i class="fa fa-stop"></i>停用</button>
        <button class="info"><i class="fa fa-info-circle"></i>详情</button>	 -->

        <button @click="$emit('click')" :disabled="cdisabled" :class="data.cls"><i class="fa" :class="data.iCls"></i>{{value?value:"未设置"}}</button>	
    
    </div>
</template>
<script>

const _button_map = {
    "down":{cls:"submit",iCls:"fa-cloud-download"},
    "upload":{cls:"submit",iCls:"fa-cloud-upload"},
    "create":{cls:"add",iCls:"fa-file"},
    "delete":{cls:"delete",iCls:"fa-trash-o fa-lg"},
    "submit":{cls:"submit",iCls:"fa-check"},
    "back":{cls:"back",iCls:"fa-rotate-left"},
    "search":{cls:"search",iCls:"fa-search"},
    "edit":{cls:"add",iCls:"fa-edit"},
    "play":{cls:"start",iCls:"fa-play"},
    "stop":{cls:"stop",iCls:"fa-stop"},
    "info":{cls:"info",iCls:"fa-info-circle"},
    "setting":{cls:"back",iCls:"fa-cog"},
    "default":{cls:"default",iCls:""}
}

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
            tmp = _button_map[this._type];
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
