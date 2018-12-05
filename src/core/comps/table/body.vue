<template>
    <tbody>
        <tr v-for="(row,index) in data" @click="e=>selectRow(row,e)" :key="index">
            <td v-if="showCk">
                <input type="checkbox" :checked="row.ck" />
            </td>
            <td v-if="actions && actions.length != 0">
                <button v-for="(x,i) in actions" class="btn btn-sm btn-link" @click="e=>{x.action(row)}" :key="i">{{x.val}}</button>
            </td>
            <td v-for="(item,idx) in cols" :key="idx">
                <a v-if="item.convert && item.action" @click="e=>item.action(row,item)">
                    {{item.convert(item,row)}}
                </a>
                <span v-if="item.convert && !item.action">
                    {{item.convert(item,row)}}
                </span>
                <a v-if="!item.convert && item.action" @click="e=>item.action(row,item)">
                    {{getValByFieldInRow(item,row)}}
                </a>
                <span v-if="!item.convert && !item.action">
                    {{getValByFieldInRow(item,row)}}
                </span>
            </td>
        </tr>
    </tbody>
</template>

<script>
    import Util from "../../tool/commonUtil.js";
    
    export default {
        name: "BodySection",
        props:["actions","data","cols","accpetHBNotice","showCk"],
        data(){
            return {
                
            }
        },
        computed:{
            
        },
        mounted(){
            
        },
        methods:{
            selectRow:function(row,e){
                row.ck = !row.ck;
                this.accpetHBNotice(null,{data:this.data});
            },
            getValByFieldInRow:function(item,row){
                let key = item.key;
                let val = "";
                if(typeof row[key] == "boolean"){
                    val = row[key].toString();
                }else{
                    let v = "row."+item.key;
                    let tmp = eval("("+v+")");
                    if(tmp == undefined){
                        val = "";
                    }else{
                        let type = item.type;
                        if(type){
                            type = type.toLowerCase();
                            switch(type){
                                case "date":
                                    val = Util.date.date(tmp);
                                    break;
                                case "datetime":
                                    val = Util.date.dateTime(tmp);
                                    break;
                                case "time":
                                    val = Util.date.time(tmp);
                                    break;
                                default:
                                    val = tmp;
                            }
                        }else{
                            val = tmp;
                        }
                    }
                }
                return val;
            }
        }
    }
</script>

<style scoped>
    .tableList .relative{
        position: relative;
    }
    .tableList .maskLayer{
        position: absolute;left: 0;top: 0;bottom: 0;right: 0;
    }
    .btnCls{
        margin:0 5px;
    }
</style>