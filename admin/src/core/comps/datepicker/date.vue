

<template>
    <div style="margin-top:100px;margin-left:500px;">
        <!-- 添加current激活input current样式  去掉则是默认样式 -->
        <div class="div-box current">
            <i class="icon-date fa fa-calendar"></i>
            <input type="text" class="date" />
        </div>
        <!-- 展开下拉 -->
        <div class="picker-box">
            <div class="picker-header">
                <button>
                    <i class="fa fa-angle-double-left" @click="prevYear"></i>
                </button>
                <button>
                    <i class="fa fa-angle-left" @click="prevMonth"></i>
                </button>
                <div class="hearderText">
                    {{state.currentYear}}/{{state.currentMonth}}
                </div>
                <button>
                    <i class="fa fa-angle-right" @click="nextMonth"></i>
                </button>
                <button>
                    <i class="fa fa-angle-double-right" @click="nextYear"></i>
                </button>
            </div>
            <div class="picker-body">
                <table>
                    <tr>
                        <th v-for="(item,index) in Weeks" :key="index">{{item}}</th>
                    </tr>
                    <tr v-for="(item,index) in state.data" :key="index">
                        <td :class="x.month != state.currentMonth?'disable':''" v-for="(x,idx) in item" :key="idx">{{x.day}}</td>
                        <!-- <td class="disable">30</td>
                        <td>1</td>
                        <td class="current">2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td> -->
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

const _tool = {
    init(year,month){

    },
    /**
     * @description 根据年月获取当前月有多少天
     * @param year:年份
     * @param month:月份
     * @returns 天数:int
     */
    getDays(year,month){
        let date = new Date(year,month,0);
        return date.getDate();
    },
    /**
     * @description 根据年月获取当前月的第一天是星期几
     * @param year:年份
     * @param month:月份
     * @returns 第一天是周几:int
     */
    getWeek(year,month){
        let str = year + "," + month + "," + "01";
        let data = new Date(str);
        return data.getDay();
    },
    /**
     * @description 根据当前月份的总天数
     * @param year:年份
     * @param month:月份
     * @returns days:int
     */
    getCurrentDays(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        return _tool.getDays(year,month);
    },
    /**
     * @description 根据月份获取上个月的年月日数据
     * @param year:年份
     * @param month:月份
     * @returns json:{year:0,month:0,days:0}
     */
    getPrevMonthDays(year,month){
        let res = {year:0,month:0,days:0};
        if(month == 1){
            res.year = year - 1;
            res.month = 12;
            res.days = this.getDays(res.year,res.month);
        }else{
            res.year = year;
            res.month = month - 1;
            res.days = this.getDays(res.year,res.month);
        }
        return res;
    },
    /**
     * @description 根据月份获取下个月的年月日数据
     * @param year:年份
     * @param month:月份
     * @returns json:{year:0,month:0,days:0}
     */
    getNextMonthDays(year,month){
        let res = {year:0,month:0,days:0};
        if(month == 12){
            res.year = year + 1;
            res.month = 1;
            res.days = this.getDays(res.year,res.month);
        }else{
            res.year = year;
            res.month = month + 1;
            res.days = this.getDays(res.year,res.month);
        }
        return res;
    },
    /**
     * @description 组装日历面板上面的 5*7 = 35天所有数据源
     * @param year:年份
     * @param month:月份
     * @returns Array[]
     */
    getFullData(year,month){
        let res = [];
        //获取当前月第一天是周几
        let week = this.getWeek(year,month);
        //获取当前月一起多少天
        let currentDays = this.getDays(year,month);
        //上个月的数据条数
        let prevDaylen = week - 1;
        //获取上一个月有多少天
        let prevMonthDays = this.getPrevMonthDays(year,month);
        let allData = [];
        //push上个月填充的数据
        for(let i = prevDaylen;i>0;i--){
            allData.push({year:prevMonthDays.year,month:prevMonthDays.month,day:prevMonthDays.days - i + 1});
        }
        //push当前月填充的数据
        for(let i=1;i<=currentDays;i++){
            allData.push({year:year,month:month,day:i});
        }
        //push下个月剩余的数据
        let nextDaysLen = 42 - (prevDaylen + currentDays);
        let nextMonthDays = this.getNextMonthDays(year,month);
        for(let i = 1;i<=nextDaysLen;i++){
            allData.push({year:nextMonthDays.year,month:nextMonthDays.month,day:i});
        }
        return allData;
    },
    groupArray(data){
        let res = [];
        for(let i=0;i<6;i++){
            let tmp = [];
            for(var k=0;k<7;k++){
                tmp.push(data[i*7 + k]);
            }
            res.push(tmp);
        }
        return res;
    }
}

import Week from "./config.js";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

/**
 * @description 日期格式  6*7  
 */

export default {
    name:"LeDatePicker",
    data(){
        return {
            state:{
                currentYear:currentYear,
                currentMonth:currentMonth,
                data:[]
            },
            currentDay:0
        }
    },
    computed:{
        Weeks(){
            return Week.data;
        }
    },
    methods:{
        prevYear(){
            let year = this.state.currentYear - 1;
            let month = this.state.currentMonth;
            let data = _tool.getFullData(year,month);
            this.state = {
                currentYear:year,
                currentMonth:month,
                data:_tool.groupArray(data)
            }
        },
        prevMonth(){
            let year = this.state.currentYear;
            let month = this.state.currentMonth;
            if(month == 1){
                month = 12;
                year = year - 1;
            }else{
                month = month - 1;
            }
            let data = _tool.getFullData(year,month);
            this.state = {
                currentYear:year,
                currentMonth:month,
                data:_tool.groupArray(data)
            }
        },
        nextMonth(){
            let year = this.state.currentYear;
            let month = this.state.currentMonth;
            if(month == 12){
                month = 1;
                year = year + 1;
            }else{
                month = month + 1;
            }
            let data = _tool.getFullData(year,month);
            this.state = {
                currentYear:year,
                currentMonth:month,
                data:_tool.groupArray(data)
            }
        },
        nextYear(){
            let year = this.state.currentYear + 1;
            let month = this.state.currentMonth;
            let data = _tool.getFullData(year,month);
            this.state = {
                currentYear:year,
                currentMonth:month,
                data:_tool.groupArray(data)
            }
        }
    },
    mounted(){
        let days = _tool.getFullData(this.state.currentYear,this.state.currentMonth);
        this.state.data = _tool.groupArray(days);
    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;

    }

    body {
        height: 10000px;
    }

    /* 
        box 
    */
    .div-box {
        display: inline-block;
        position: relative;
        height: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid #aeaeae;
        box-sizing: content-box;
    }

    .div-box.current {
        border: 1px solid #409EFF!important;
        box-sizing: content-box;
    }
    .div-box input {
        border:0px solid #fff;
    }
    .div-box.current .icon-date{
        color:#409EFF;
    }

    /* 
        icon 默认
        */
    .icon-date {
        color: #cfcfcf;
        position: absolute;
        left: 0;
        z-index: 5;
        /*引入图片图片*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 5px;
        font-size: 20px;
    }

    /* 
        date选择器
        */
    .date {
        padding-left: 27px;
        outline: none;
        height: 30px;
    }

    .picker-box {
        width: 250px;
        border: 1px solid #aeaeae;
        box-sizing: border-box;
        margin-top: 4px;
    }


    /* 选择器头部 */
    .picker-header {
        display: flex;
        /* display: inline-block; */
        width: 100%;
        border-bottom: 1px solid #aeaeae;
        line-height: 1.8em;

    }

    .picker-header .hearderText {
        flex: 1;
        text-align: center;
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
