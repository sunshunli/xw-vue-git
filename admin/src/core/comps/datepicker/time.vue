
<template>
    <div clsss="timeContent">
        <div class="searchBar">
            <i class="fa fa-clock-o clock"></i>
            <input type="text" class="timeInput"/>
            <i class="fa fa-times-circle clearTime"></i>
        </div>
        <div class="timePicker" style="display:block">
            <div id="timePanel" class="timePanel">
                <div class="hour">
                    <ul>
                        <li :class="h.cls" v-for="(h,idx) in hours" :key="idx">{{h.name}}</li>
                    </ul>
                </div>
                <div class="minute">
                    <ul>
                        <li :class="h.cls" v-for="(h,idx) in minutes" :key="idx">{{h.name}}</li>
                    </ul>
                </div>
                <div class="seconds">
                    <ul>
                        <li :class="h.cls" v-for="(h,idx) in seconds" :key="idx">{{h.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="timeBtnGroup">
                <button id="cancel" type="button">取消</button>
                <button id="confirm" type="button">确定</button>
            </div>
        </div>
    </div>
</template>

<script>

import Config from "./config.js";

export default {
    name:"LeTimePicker",
    data(){
        return {
            validataComponentType:"TimePicker",
            state:{
                showError:false
            },
            selectTime:"",
            isShowPicker:false
        }
    },
    computed:{
        hours(){
            return Config.Hour;
        },
        minutes(){
            return Config.Minute;
        },
        seconds(){
            return Config.Second;
        }
    },
    methods:{

    },
    mounted(){
        
    }
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

.timeContent{
    width: 200px;
    height: auto;
}

.timeContent .searchBar{
    width: 200px;
    height: 40px;
    position: relative;
    cursor: pointer;
}

.timeContent .searchBar i{
    position: absolute;
    top: 12px;
    left: 10px;
    color: #c0c4cc;
    font-weight: normal;
}

.timeContent .searchBar i.clearTime{
    left: 176px;
    display: none;
}

.timeContent .timeInput{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 26px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 200px;
}

.timeContent .timePicker{
    width: 190px;
    height: auto;
    margin: 0 auto;
    border: 1px solid #e4e7ed;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 2px;
    position: absolute;
    left: 0;
    z-index: 1000;
    user-select: none;
    box-sizing: content-box;
    margin-left: 8px;
}

.timeContent .timePicker .timePanel{
    height: 190px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.timeContent .timePicker .timePanel::before{
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

.timeContent .timePicker .timePanel div{
    height: 100%;
    float: left;
    text-align: center;
    color: #606266;
    font-weight: normal;
    font-size: 14px;
}

.timeContent .timePicker .timePanel div ul::before{
    content: "";
    display: block;
    width: 100%;
    height: 80px;
}

.timeContent .timePicker .timePanel div ul::after{
    content: "";
    display: block;
    width: 100%;
    height: 80px;
}

.timeContent .timePicker .timePanel div ul{
    height: 100%;
    overflow-y: scroll;
}

.timeContent .timePicker .timePanel div ul::-webkit-scrollbar{
    width: 0px;
    height: 10px; 
    background-color:transparent;
} 

.timeContent .timePicker .timePanel div ul li{
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}


.timeContent .timePicker .timeBtnGroup{
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    border-top:1px solid #e4e7ed;
    text-align: right;
}

.timeContent .timePicker .timeBtnGroup button{
    width: 40px;
    height: 100%;
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}

.timeContent #confirm{
    color:#409eff;
}

.timeContent .active{
    color: #409eff;
    font-size: 16px;
}
</style>

