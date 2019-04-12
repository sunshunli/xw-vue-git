<template>
    <div class = "current">
        <div class = "dataTimePicker">
            <!-- 日期 -->
            <i class="icon-date fa fa-calendar"></i>
            <div class = "date-box">
                <!-- 展示文字的地方 -->
                <div class = "dateTimeText">
                    2018/09/09 10:10:10
                </div>
                <!-- 展开日期下拉 -->
                <div class="picker-box">
                    <div class="picker-header">
                        <!-- 上一年 -->
                        <button>
                            <i class="fa fa-angle-double-left"></i>
                        </button>
                        <!-- 上一月按钮 -->
                        <button>
                            <i class="fa fa-angle-left"></i>
                        </button>
                        <!-- 日期显示input -->
                        <input class = "ipt" type="text" readonly value = "2018/02/30">
                        <div class="hearderText">
                            <div style = "display:inline-block;width:100px;position:relative;">
                                
                                <div class="time-box">
                                    <!-- 时间显示input -->
                                    <input type="text" class="ipt" readonly value = "10:01:01"/>
                                    <!-- 时间下拉 -->
                                    <div class="timePicker">
                                        <div class="timePanel">
                                            <div class="hour">
                                                <ul :ref="KEYS.hourDomKey">
                                                    <li :class="h.cls" v-for="(h,idx) in hours" :key="idx">{{h.name}}</li>
                                                </ul>
                                            </div>
                                            <div class="minute">
                                                <ul :ref="KEYS.minDomKey">
                                                    <li :class="h.cls" v-for="(h,idx) in minutes" :key="idx">{{h.name}}</li>
                                                </ul>
                                            </div>
                                            <div class="seconds">
                                                <ul :ref="KEYS.secDomKey">
                                                    <li :class="h.cls" v-for="(h,idx) in seconds" :key="idx">{{h.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- 下一月 -->
                        <button>
                            <i class="fa fa-angle-right"></i>
                        </button>
                        <!-- 下一年 -->
                        <button>
                            <i class="fa fa-angle-double-right"></i>
                        </button>
                    </div>
                    <!-- 日期table -->
                    <div class="picker-body">
                        
                        <table>
                            <tr>
                                <th v-for="(item,index) in Weeks" :key="index">{{item}}</th>
                            </tr>
                            <tr >
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td class = "current">04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr >
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr >
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr >
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr >
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr >
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 右侧删除 -->
            
            <i class="fa fa-times-circle clearTime"></i>
        </div>
    </div>
</template>
<script>
import Config from "./config.js";
export default {
        data(){
            return {
                hours:Config.Hour,
                minutes:Config.Minute,
                seconds:Config.Second,
                //每次组件初始化都会赋上唯一的key
                KEYS:{
                    hourDomKey:Math.ceil(Math.random()*1000000000000),
                    minDomKey:Math.ceil(Math.random()*1000000000000),
                    secDomKey:Math.ceil(Math.random()*1000000000000),
                },
                
            }
        },
        computed: {
            Weeks(){
                return Config.Week;
            },
        },
        
}   
</script>
<style scoped>
    ul,li{
        padding:0;
        margin: 0;
        list-style: none;
    }

    li{
        height: 32px;
        line-height: 32px;
    }
    .dataTimePicker{
        display:inline-block;
        width: 292px;
        height: auto;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        box-sizing: border-box;
        position:relative;

    }
    .current .dataTimePicker{
       border: 1px solid #409EFF!important;
        box-sizing: content-box;
    }
    .dataTimePicker .date-box,.dataTimePicker .time-box{
        width: 120px;
        height: 40px;
        cursor: pointer;
        float: left;
    }
    
     .dataTimePicker .date-box .dateTimeText{
         /* -webkit-appearance: none; */
        background-color: #fff;
        background-image: none;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 240px;

        /* border:none; */
    }
    .dataTimePicker .date-box{
        margin-left:26px;
    }
    .icon-date{
        position: absolute;
        top: 12px;
        left: 10px;
        color: #c0c4cc;
        font-weight: normal;
    }
    .clearTime{
        position: absolute;
        top: 12px;
        right: 10px;
        color: #c0c4cc;
        font-weight: normal;
    }
    .timePicker{
        width: 190px;
        height: auto;
        margin: 0 auto;
        border: 1px solid #e4e7ed;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 2px;
        position: absolute;
        z-index: 1000;
        user-select: none;
        box-sizing: content-box;
        margin-top:1px;
        margin-left:10px;
    }
    .timePanel{
        height: 190px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        
    }
    .timePanel::before{
        content: "";
        top: 41%;
        position: absolute;
        height: 32px;
        z-index: -1;
        left: 0;
        right: 0;
        box-sizing: border-box;
        padding-top: 6px;
        text-align: left;
        border-top: 1px solid #e4e7ed;
        border-bottom: 1px solid #e4e7ed;
        padding: 0;
    }
    .timePanel div{
        height: 100%;
        float: left;
        text-align: center;
        color: #606266;
        font-weight: normal;
        font-size: 14px;
    }
    .timePanel div ul::before{
        content: "";
        display: block;
        width: 100%;
        height: 80px;
    }
    .timePanel div ul::after{
        content: "";
        display: block;
        width: 100%;
        height: 80px;
    }
    .timePanel div ul{
        height: 100%;
        overflow-y: scroll;
    }
    .timePanel div ul::-webkit-scrollbar{
        width: 0px;
        height: 10px; 
        background-color:transparent;
    } 
    .timePanel div ul li{
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }


    /* 日期 */
     .picker-box {
        /* display: inline-block; */
        width: 300px;
        /* border: 1px solid #aeaeae; */
        box-sizing: border-box;
        margin-top: 1px;
        left:0;
        position: absolute;
        background:#fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index:10000;
        
    }
    /* 选择器头部 */
    .picker-header {
        display: flex;
        /* display: inline-block; */
        width: 100%;
        border-bottom: 1px solid #aeaeae;
        line-height: 1.8em;

    }
    .ipt{
        width:100px;
        margin-left:10px;
        height:32px;
       outline:none;
        margin-top:9px;
    }

    .picker-header .hearderText {
        flex: 1;
        /* text-align: center; */
        height:50px;
    }

    .picker-header button {
        padding-left: 5px;
        padding-right: 5px;
        border: 0;
        background-color: transparent;
        outline: none;
    }


    /* 选择器部分 */
    .picker-body {
        width: 100%;
        padding: 6px;
        display: inline-block;
    }

    .picker-body table {
        text-align: center;
        width: 100%;
        line-height: 2em;
    }

    .picker-body table th {
        text-align: center;
    }

    .picker-body table td {
        cursor: pointer;
    }

    .picker-body table td.disable {
        background: #f0f0f0 !important;
        color: #cbcbcb !important;
    }

    .picker-body table td.current {
        background: #4fbba0 !important;
        color: #fff !important;
    }

    .picker-body table td:hover {
        background: #f55;
        color: #fff;
    }
</style>