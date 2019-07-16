
<template>
    <div class = "le_dialog_mask" v-show="value">
        <!-- width height 为option传入   margin为计算 width/height的一半 + 10(padding)-->
        <div class = "le_dialog_box" v-bind:style="dialogStyle">
            <!-- 顶部 -->
            <div class="le_dialog_top">
                <div class="le_dialog_title">{{title?title:"标题"}}</div>
                <div class="le_dialog_closeIcon">
                    <i class="fa fa-close" @click="close"></i>
                </div>
            </div>
            <div class = "le_dialog_contine">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LeDialog",
    props:["title","width","height","value"],
    data(){
        return {
        }
    },
    computed:{
        dialogStyle(){
            return {
                width:this.width?this.width + "px" : 700 + "px",
                height:this.height?this.height + "px" : 300 + "px",
            }
        }
    },
    watch:{
        value(val){
        }
    },
    methods:{
        close(){
            this.$emit("input",false);
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
    *{
        margin:0;
        padding:0;
    }

    /* 遮罩 */
    .le_dialog_mask{
        position:fixed;
        width:100%;
        height:100%;
        z-index:999;
        background:rgba(30,30,30,0.6);
        top:0;
        left:0;
        
    }
    /* dialog  box */
    .le_dialog_box{
        position:fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        background:#fff;
        border-radius: 7px;
        padding:10px;
        display:box;
        display:-webkit-box;
        display:-webkit-flex; 
        display:-moz-box; 
        display:-ms-flexbox; 
        display:flex;
        justify-content:space-between;
        flex-direction:column;
        padding: 20px 35px;
        border-radius: 3px;
        min-width: 400px;
        overflow-y: scroll;
    }

    /* 上面部分 */
    .le_dialog_top{
        width:100%;
        display:box;
        display:-webkit-box;
        display:-webkit-flex; 
        display:-moz-box; 
        display:-ms-flexbox; 
        display:flex;
        justify-content:space-between;
        border-bottom: 1px solid #dcdfe6;
        margin-bottom: 20px;
    }
    /* 标题 */
    .le_dialog_title{
        color:#333;
        font-size:18px;
        line-height:35px;
        padding-bottom:0;
        font-weight:normal;
        text-align: left;
        margin-left: 4px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    /* 关闭按钮 */
    .le_dialog_closeIcon {
        flex:1;
        text-align:right;
        vertical-align: middle;
        font-size:20px;
        line-height: 35px;
    }

    .fa-close{
        cursor: pointer;
    }

    /* 内容区 */
    .le_dialog_contine{
        flex:1;
        /* 火狐禁用滚动条 */
        overflow:-moz-hidden-unscrollable!important;
        overflow:scroll;
        font-size: 14px;
        color: #606266;
        text-align: left;
    }
    /* 滚动条整体的样式 */
    .le_dialog_contine::-webkit-scrollbar{
        width: 1px;
        height:10px;
        /* background-color:transparent; */
    }
    /* ie */
    .le_dialog_contine{
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        /* -ms-scroll-snap-type: proximity; */
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        /* overflow: auto; */
        overflow: hidden;
    }
    /* 底部 */
    .le_dialog_bottom{
        display:flex;
        padding-top:20px;
        width:100%;
        justify-content:flex-end;
    }
    .le_dialog_bottom button{
        padding: 6px 16px;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        color: #fff;
        font-size: 14px !important;
        font-weight: 500;
        cursor: pointer;
        outline: none;
    }
    /* 确认按钮 */
    .le_dialog_bottom .le_dialog_confirm{
        background-color: #409EFF;
        border: none;
    }
    /* 取消按钮 */
    .le_dialog_bottom .le_dialog_cancel{
        background-color: #fff;
        color:#606266;
        margin-left:20px;
    }

    .dialogBtnContent{
        text-align: right;
        border-top:1px solid #ccc;
    }
</style>
