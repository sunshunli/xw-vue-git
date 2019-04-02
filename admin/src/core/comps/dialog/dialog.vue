


<template>
    <div class = "le_dialog_mask">
        <!-- width height 为option传入   margin为计算 width/height的一半 + 10(padding)-->
        <div class = "le_dialog_box"  style = "width:800px;height:300px;margin-left:-410px;margin-top:-160px;">
            <!-- 顶部 -->
            <div class="le_dialog_top">
                <div class="le_dialog_title">标题</div>
                <div class="le_dialog_closeIcon">
                    <i class="fa fa-close"></i>
                </div>
            </div>
            <div class = "le_dialog_contine">
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内
                容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字内容区文字
                内容区文字内容区文字内容区文字内容区文字内容区文字
            </div>
            <div class = "le_dialog_bottom">
                <!-- 使用button组件的css 可以改为引入button组件 -->
                <button class = "le_dialog_confirm">
                    <i class = "fa fa-check"></i>确认
                </button>
                <button class = "le_dialog_cancel">
                    <i class = "fa fa-close"></i>取消
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LeDialog",
    data(){
        return {

        }
    },
    methods:{

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
        z-index:99;
        background:rgba(30,30,30,0.6);
        top:0;
        left:0;
        
    }
    /* dialog  box */
    .le_dialog_box{
        width:500px;
        height:300px;
        position:fixed;
        left:50%;
        top:50%;
        margin-top:-160px;
        margin-left:-260px;
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
    }
    /* 标题 */
    .le_dialog_title{
        color:#333;
        font-size:20px;
        line-height:35px;
        padding-bottom:5px;
        font-weight:800;
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
    /* 内容区 */
    .le_dialog_contine{
        flex:1;
        /* 火狐禁用滚动条 */
        overflow:-moz-hidden-unscrollable!important;
        overflow:scroll;
    
    }
    /* 滚动条整体的样式 */
    .le_dialog_contine::-webkit-scrollbar{
        width:0px;
    }
    /* ie */
    .le_dialog_contine{
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        overflow: auto;
    }
    /* 底部 */
    .le_dialog_bottom{
        display:flex;
        height:35px;
        padding-top:5px;
        width:100%;
        justify-content:flex-end;
    }
    .le_dialog_bottom button{
            height: 35px;
            line-height: 35px;
            padding: 0 20px;
            border: none;
            border-radius: 3px;
            border: 1px solid #dcdfe6;
            border-color: #dcdfe6;
            color: #fff;
            font-size: 14px !important;
            cursor: pointer;
            outline:none;
    }
    /* 确认按钮 */
    .le_dialog_bottom .le_dialog_confirm{
        background-color: #409EFF;
    }
    /* 取消按钮 */
    .le_dialog_bottom .le_dialog_cancel{
        background-color: #fff;
        color:#606266;
        margin-left:20px;
    }
</style>
