

<template>
    <div style="margin-top:100px;margin-left:500px;">
        <!-- 添加current激活input current样式  去掉则是默认样式 -->
        <div class="div-box current">
            <i class="icon-date fa fa-calendar"></i>
            <input type="text" class="date" readonly v-model="selectDayStr" @click.stop="showPicker"/>
        </div>
        <!-- 展开下拉 -->
        <div class="picker-box" v-show="isShowPicker">
            <div class="picker-header">
                <button>
                    <i class="fa fa-angle-double-left" @click.stop="prevYear"></i>
                </button>
                <button>
                    <i class="fa fa-angle-left" @click.stop="prevMonth"></i>
                </button>
                <div class="hearderText">
                    {{state.currentYear}}/{{state.currentMonth}}
                </div>
                <button>
                    <i class="fa fa-angle-right" @click.stop="nextMonth"></i>
                </button>
                <button>
                    <i class="fa fa-angle-double-right" @click.stop="nextYear"></i>
                </button>
            </div>
            <div class="picker-body">
                <table>
                    <tr>
                        <th v-for="(item,index) in Weeks" :key="index">{{item}}</th>
                    </tr>
                    <tr v-for="(item,index) in data" :key="index">
                        <td :class="x.cls" v-for="(x,idx) in item" :key="idx" @click.stop="selectItem(x)">{{x.day}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

const _tool = {
    vueComp:null,
    /**
     * @description _tool引用vue组件实例，方便获取当前state内容，只允许使用，不允许更改
     */
    init(vueComp){
        _tool.vueComp = vueComp;
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
     * @description 组装日历面板上面的 6*7 = 42天所有数据源, datepicker组件最核心的渲染方法
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
            allData.push({year:prevMonthDays.year,month:prevMonthDays.month,day:prevMonthDays.days - i + 1,cls:"disable"});
        }
        //push当前月填充的数据，控制选中日期的样式，分为2种情况
        //如果还没有选择日期
        let tmp = {y:0,m:0,d:0};
        if(_tool.vueComp.selectDay == ""){
            tmp = {y:new Date().getFullYear(),m:new Date().getMonth() + 1,d:new Date().getDate()};
        }
        //如果选择了日期
        else{
            let _arr = _tool.vueComp.selectDay.split('-');
            tmp = {y:_arr[0],m:_arr[1],d:_arr[2]};
        }
        for(let i=1;i<=currentDays;i++){
            if(i == tmp.d && year == tmp.y && month == tmp.m){
                allData.push({year:year,month:month,day:i,cls:"current"});
            }else{
                allData.push({year:year,month:month,day:i,cls:""});
            }
        }
        
        //push下个月剩余的数据
        let nextDaysLen = 42 - (prevDaylen + currentDays);
        let nextMonthDays = this.getNextMonthDays(year,month);
        for(let i = 1;i<=nextDaysLen;i++){
            allData.push({year:nextMonthDays.year,month:nextMonthDays.month,day:i,cls:"disable"});
        }
        return allData;
    },
    /**
     * @description 数组分组
     * @param data:42个数据源，分为6个数组
     * @returns Array
     */
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

/**
 * @description 日期格式  6(row)*7(col)
 * @param state.currentYear, state.currentMonth, state.currentDay控制picker弹出层的年和月的选择
 * @param selectDay控制所选择的值，也就是文本框里面的值
 * @param 这2者不可以统一用state里面的值来标识
 * @param isShowPicker控制是否显示弹出层
 * @param data:Array 根据年月日来组合需要的数据源，该数据源必须分组，也就是必须调用initPicker方法
 */

export default {
    name:"LeDatePicker",
    data(){
        return {
            state:{
                currentYear:new Date().getFullYear(),
                currentMonth:new Date().getMonth() + 1,
                currentDay:new Date().getDate(),
            },
            data:[],
            selectDay:"",
            isShowPicker:false
        }
    },
    computed:{
        Weeks(){
            return Week.data;
        },
        selectDayStr(){
            if(this.selectDay == ""){
                return "";
            }
            let tmp = this.selectDay.split('-');
            let y = tmp[0];
            let m = parseInt(tmp[1]);
            let d = parseInt(tmp[2]);
            m = m<10?"0"+m:m;
            d = d<10?"0"+d:d;
            return y + "-" + m + "-" + d;
        }
    },
    methods:{
        /**
         * @description 根据年份，月份 初始化日期控件数据源
         * @param year:年份
         * @param month:月份
         * @returns
         */
        initPicker(year,month){
            let days = _tool.getFullData(year,month);
            this.data = _tool.groupArray(days);
        },
        /**
         * @description 点击其他地方，隐藏picker选择层
         * @returns
         */
        pickerBodyClick(){
            this.isShowPicker = false;
        },
        /**
         * @description 点击文本框显示picker选择层, 每次点击根据选中的日期来复位
         * @returns
         */
        showPicker(){
            this.isShowPicker = true;
            if(this.selectDay){
                this.setValue(this.selectDayStr);
            }else{
                this.setValue(this.state.currentYear + "-" + this.state.currentMonth + "-" + this.state.currentDay);
                this.selectDay = "";
            }
        },
        /**
         * @description 日期弹出层选中事件
         * @param x:当前选中项，{year:0,month:0,day:0,cls:""}
         * @returns
         */
        selectItem(x){
            this.data.forEach(arr => {
                arr.forEach(element=>{
                    if(element.cls == "current"){
                        if(element.month == this.state.currentMonth){
                            element.cls = "";
                        }else{
                            element.cls = "disable";
                        }
                    }
                })
            });
            x.cls = "current";
            this.state.currentDay = x.day;
            this.selectDay = x.year + "-" + x.month + "-" + x.day;
            this.isShowPicker = false;
        },
        /**
         * @description 上一年切换事件
         * @returns
         */
        prevYear(){
            let year = parseInt(this.state.currentYear) - 1;
            let month = parseInt(this.state.currentMonth);
            this.state = {
                currentYear:year,
                currentMonth:month,
                currentDay:this.state.currentDay
            }
            this.initPicker(year,month);
        },
        /**
         * @description 上一月切换事件
         * @returns
         */
        prevMonth(){
            let year = parseInt(this.state.currentYear);
            let month = parseInt(this.state.currentMonth);
            if(month == 1){
                month = 12;
                year = year - 1;
            }else{
                month = month - 1;
            }
            this.state = {
                currentYear:year,
                currentMonth:month,
                currentDay:this.state.currentDay
            }
            this.initPicker(year,month);
        },
        /**
         * @description 下一月切换事件
         * @returns
         */
        nextMonth(){
            let year = parseInt(this.state.currentYear);
            let month = parseInt(this.state.currentMonth);
            if(month == 12){
                month = 1;
                year = year + 1;
            }else{
                month = month + 1;
            }
            this.state = {
                currentYear:year,
                currentMonth:month,
                currentDay:this.state.currentDay
            }
            this.initPicker(year,month);
        },
        /**
         * @description 下一年切换事件
         * @returns
         */
        nextYear(){
            let year = parseInt(this.state.currentYear) + 1;
            let month = parseInt(this.state.currentMonth);
            this.state = {
                currentYear:year,
                currentMonth:month,
                currentDay:this.state.currentDay
            }

            this.initPicker(year,month);
        },
        /**
         * @description 设置当前值
         * @param str:字符串，2019-03-25格式
         * @returns
         */
        setValue(str){
            let _arr = str && str.split('-');
            this.state = {
                currentYear:_arr[0],
                currentMonth:parseInt(_arr[1]),
                currentDay:parseInt(_arr[2])
            }
            this.selectDay = str;
            this.initPicker(_arr[0],parseInt(_arr[1]));
        },
        /**
         * @description 获取当前组件的值，为validataHOC准备
         * @returns str:字符串
         */
        getValue(){
            return this.selectDayStr;
        }
    },
    mounted(){
        _tool.init(this);
        this.initPicker(this.state.currentYear,this.state.currentMonth);
        document.body.addEventListener("click",this.pickerBodyClick,false);
    },
    beforeDestroy () {
        document.body.removeEventListener("click",this.pickerBodyClick);
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
