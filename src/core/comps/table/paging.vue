<template>
    <div class="pageNumCls" >
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link">总条数:{{count}}</a></li>
                <li class="page-item" @click="this.prev"><a class="page-link">上一页</a></li>
                <li class="page-item" @click="this.next"><a class="page-link">下一页</a></li>                
                <li class="page-item"><a class="page-link">当前页</a></li>
                <li class="page-item"><a class="page-link">{{index}}/{{total}}</a></li>
                <li class="page-item"><a class="page-link">到</a></li>                        
                <li class="page-item"><input type="text" :ref="this.goIndexKey" class='form-control input-sm' style="width:60px" placeholder='第几页'/></li>
                <li class="page-item" @click="this.goToIndex"><a class="page-link">确定</a></li>               
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props:["options","goNext","goPrev","goIndex"],
        name: "PagingSection",
        data(){
            return {
                goIndexKey:Math.ceil(Math.random()*10000000000)
            }
        },
        computed:{
            index:function(){
                return this.options.index;
            },
            count:function(){
                return this.options.count;
            },
            total:function(){
                return this.options.total;
            }
        },
        methods:{
            next:function () {
                if(this.index >= this.total){
                    return;
                }
                this.goNext();
            },
            prev:function () {
                if(this.index <=1){
                    return;
                }
                this.goPrev();
            },
            goToIndex:function () {
                let eIndex = this.$refs[this.goIndexKey].value;
                if( eIndex > this.total || eIndex<= 1 || isNaN(eIndex)){
                    this.$refs[this.goIndexKey].value = "";
                    return;
                }
                this.goIndex(eIndex);
            }
        },
        updated(a,b) {
        },
        mounted(){
        },
        created(){
        }
    }
</script>

<style scoped>
    .paging{height: 26px; margin: 30px 0; line-height: 26px;}
    .paging input[type=button]{
        height: 26px;
        min-width: 26px;
        padding: 0 5px;
        border: 1px solid #dfdfdf;
        box-sizing: border-box;
        background: none;
        margin-right: 4px;
        border-radius: 5px;}
    .paging input[type=text]{width: 30px; height: 20px; border: 1px solid #797979; text-align: center;}
    .paging span{padding: 0 5px;}
    .pageNumCls{float: right;margin-right: 20px;}
</style>