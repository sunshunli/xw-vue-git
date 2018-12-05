<template>
    <thead>
        <tr>
            <th v-if="showCk">
                <input type="checkbox" :checked="ck" @click="setAll" />
            </th>
            <th v-if="actions && actions.length != 0">
                操作
            </th>
            <th v-for="(item,index) in cols" :key="index" class="thCols">
                {{item.val}}
                <i v-if="index == 0  ? true : false" class="icon icon-caidan menu" @click.stop="showChangeColsDialog"></i>
                <div class="colsModal" v-if="index == 0 && colsModalShow ? true : false" @click.stop>
                    <div v-for="(item,index) in defaultCols" :key="index">
                        <p>
                            <input type="checkbox" :checked="item.ck" @click.stop="e=>{itemCheckChange(item,e)}" />
                            <span>{{item.val}}</span>
                        </p>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
    import Util from "../../tool/commonUtil.js";
    export default {
        props:["originCols","accpetHBNotice","noticeChangeCols","ck","actions","cols","showCk"],
        name: "HeaderSection",
        data(){
            return {
                colsModalShow:false
            }
        },
        computed:{
            defaultCols:function(){
                return Util.object.addPrimaryAndCk(Util.object.deepArrayClone(this.originCols),true);
            }
        },
        methods:{
            setAll:function(){
                this.accpetHBNotice({ck:!this.ck},null);
            },
            itemCheckChange:function(item,e){
                item.ck = !item.ck;
                e.target.checked = item.ck;

                this.reSetCols();
            },
            reSetCols:function(){
                let cols = Util.object.getCheckedItems(this.defaultCols).items;
                if(cols.length == 0){
                    this.noticeChangeCols(this.defaultCols);
                    this.defaultCols.forEach(item => {
                        item.ck = true;
                    });
                }else{
                    this.noticeChangeCols(cols);
                }
            },
            showChangeColsDialog:function(){
                this.colsModalShow =  this.colsModalShow ? false : true;
            },
            bodyClick:function(){
                console.log("body click");
                this.colsModalShow = false;
            }
        },
        updated(a,b) {
            
        },
        mounted(){
            
        },
        created () {
            document.body.addEventListener("click",this.bodyClick,false);
        },
        beforeDestroy () {
            document.body.removeEventListener("click",this.bodyClick)
        }
    }
</script>

<style scoped>
    .enterIndexCls{width: 50px;display: inline-block;}
    .colsModal{border:1px solid #ddd;padding:10px;border-radius: 3px;position: absolute;left:30px;top:0;background: #fff;color: #000;z-index: 999;}
    .colsModal p {text-align: left;}
    .colsModal p input{float: left;margin-left: 15px;margin-right: 15px;}
    .thCols {position: relative;}
    .colsModal .bot input{width: 50px;line-height: 15px;margin: 0 5px;}
    .menu{position: absolute;left:10px;top:0;font-size: 20px;}
</style>