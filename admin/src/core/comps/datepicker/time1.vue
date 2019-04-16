
<template>
    <div class="timeContent">
        <div class="searchBar">
                <i class="fa fa-clock-o clock"></i>
                <div class="timeInput" :ref="KEYS.timeInputDomKey"></div>
                <i class="fa fa-times-circle clearTime" :ref="KEYS.clearTimeDomKey"></i>
        </div>
        <div class="timePicker" v-show="isShowPicker" :ref="KEYS.timePanelDomKey">
            <div class="timePanel">
                <div class="hour">
                    <ul :ref="KEYS.hourDomKey"></ul>
                </div>
                <div class="minute">
                    <ul :ref="KEYS.minDomKey"></ul>
                </div>
                <div class="seconds">
                    <ul :ref="KEYS.secDomKey"></ul>
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
import $ from "jquery";

export default {
    name:"LeTimePicker1",
    // props:["msg","isDatetimePicker"],
    data(){
        return {
            curShowTime : [0,0,0],
            clickCurShowTime : [0,0,0],
            arrLength:0,
            arrTime : [],
            isShowPicker:false,
            //每次组件初始化都会赋上唯一的key
            KEYS:{
                hourDomKey:Math.ceil(Math.random()*1000000000000),
                minDomKey:Math.ceil(Math.random()*1000000000000),
                secDomKey:Math.ceil(Math.random()*1000000000000),
                timeInputDomKey:Math.ceil(Math.random()*1000000000000),
                timePanelDomKey:Math.ceil(Math.random()*1000000000000),
                clearTimeDomKey:Math.ceil(Math.random()*1000000000000),
            },
            //计算滚动时候的下个位置的li的索引
            nextSelect:0,
            //标识是否清空，在滚动的时候清除这个标识
            isClear:true,
        }
    },
    computed:{
        currentTime(){
            if(this.isClear){
                return "";
            }
            return this.currentHour + ":"+ this.currentMin + ":" + this.currentSec;
            }
        },
    methods:{
        initLi(tag){
            switch(tag){
                case 'hour':
                    this.arrLength = 23;
                    break;
                case 'minute':
                    this.arrLength = 59;
                    break;
                case 'seconds':
                    this.arrLength = 59;
                    break;
            }
            var timeHtml = '';
            for(var i = 0 ; i <=this.arrLength ; i ++){
                if(i < 10){
                    i = '0'+i;
                }
                timeHtml = timeHtml + '<li>'+ i +'</li>';
            };
            var className = '.'+tag+' ul';
            $(className).append(timeHtml);
        },
        pickerBodyClick(){
            this.isShowPicker = false;
        },
        //确定
        clickConfirm(){
            this.curShowTime = [];
            this.clickCurShowTime=[];
            this.arrTime = [];
            var actives = $(this.$refs[this.KEYS.timePanelDomKey])
            var activeLi =actives.find('.active');
            for(var i = 0 ; i < activeLi.length ; i++){
                this.arrTime.push( activeLi[i].innerText );
                this.curShowTime.push($(activeLi[i]).index());
                this.clickCurShowTime.push($(activeLi[i]).index())
            };
            $(this.$refs[this.KEYS.timeInputDomKey]).text(this.arrTime.join(':'));
            actives.hide();
        },
        //input获取焦点然后显示时间控件
        timeInputOnfocus(){
            $(this.$refs[this.KEYS.timePanelDomKey]).show();
            var that = this;
            var ulList = $('.timePanel ul');
            for(var i = 0 ; i < ulList.length; i ++){
                $(ulList[i]).scroll(function(){
                    that.scrollFun(this)
                })
            }
        },
        //计算将要被选中的时间
        scrollFun(sthis,curSelect){
            var sHeight = $(sthis).scrollTop();
            var curSelectLi =Math.floor(sHeight / 30) ;
            var yu = sHeight % 30;
            if(curSelectLi == 0){
                if(yu <10){
                   this. nextSelect = 0;
                 }else{
                    this.nextSelect = 1;
                }
            }else if( curSelectLi > 0){ //当余数刚好为0的时候，则选中下一个，否则选中上一个
                if(yu > 10){
                    this.nextSelect = curSelectLi +1
                }else{
                    this.nextSelect = curSelectLi;
                }
            }else{
                this.nextSelect = 0;
            };
            // curScrollTop = nextSelect * 30 + 'px';
            // $( $(sthis)[0] ).animate({scrollTop:curScrollTop});
            var dom = $(sthis).children('li')[this.nextSelect];
            $(dom).addClass('active').siblings().removeClass('active');
        },

    },
    mounted(){
        this.initLi('hour');
        this.initLi('minute');
        this.initLi('seconds');
        let timeInputDom = this.$refs[this.KEYS.timeInputDomKey];
        
        // document.body.addEventListener("click",this.pickerBodyClick,false);
        $(timeInputDom).on('click',()=>{
            this.timeInputOnfocus();
        });
        $(".timeContent").on('click','#confirm',()=>{
            this.clickConfirm();
        });
        //清除时间
        var curClear = this.$refs[this.KEYS.clearTimeDomKey];
        $(curClear).on("click",curClear,()=>{
            $(timeInputDom).text('');
            $(timeInputDom).find('.active').removeClass('active');
            $(timeInputDom).find('ul').scrollTop(0)
            $(timeInputDom).find('.clearTime').hide();
        });
    },
    beforeDestroy(){
        let hourDom = this.$refs[this.KEYS.hourDomKey];
        let minDom = this.$refs[this.KEYS.minDomKey];
        let secDom = this.$refs[this.KEYS.secDomKey];
        hourDom.removeEventListener("scroll",this.scrollHandle);
        minDom.removeEventListener("scroll",this.scrollHandle);
        secDom.removeEventListener("scroll",this.scrollHandle);
        // document.body.removeEventListener("click",this.pickerBodyClick);
    }
}
</script>

<style>
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
    max-width: 200px;
    height: auto;
    width:100%;
}

.timeContent .searchBar{
    max-width: 200px;
    width:100%;
    height: 40px;
    position: relative;
    cursor: pointer;
}

.timeContent .searchBar i{
    position: absolute;
    top: 12px;
    /* left: 10px; */
    color: #c0c4cc;
    font-weight: normal;
}
.timeContent .searchBar .clock{
    left:10px;
}
.timeContent .searchBar i.clearTime{
    right:10px;
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
    max-width: 200px;
    width:100%;
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
    margin-top:3px;
    /* margin-left: 8px; */
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
.timeButtom{
    text-align: right;
    width:100%;
    height:40px;
    border-top:1px solid #f2f2f2;
    margin-top:2px;
}
.timeButtom button{
    float:right;margin-right:10px;font-size:12px;line-height:20px;margin-top:8px;background:#fff;
        outline: none;
        border:1px solid #dcdfe6;
        border-radius:3px;
}
</style>
