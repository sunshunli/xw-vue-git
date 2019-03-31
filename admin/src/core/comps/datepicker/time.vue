
<template>
    <div class="timeContent">
        <div class="searchBar">
            <i class="fa fa-clock-o clock"></i>
            <input type="text" v-model="currentTime" class="timeInput" @click.stop="showPicker()"/>
            <i class="fa fa-times-circle clearTime" @click.stop="clearTime"></i>
            <input type="button" value="del"  @click.stop="clearTime" />
        </div>
        <div class="timePicker" v-show="isShowPicker">
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

         <p class="text-left" v-show="state.showError">{{msg}}</p>
    </div>
</template>

<script>

import Config from "./config.js";
import $ from "jquery";

export default {
    name:"LeTimePicker",
    props:["msg"],
    data(){
        return {
            //validataHOC组件属性
            validataComponentType:"TimePicker",
            //时分秒数据源
            hours:Config.Hour,
            minutes:Config.Minute,
            seconds:Config.Second,
            //验证组件需要的错误信息提示
            state:{
                showError:false
            },
            //选择谈层
            isShowPicker:false,
            //每次组件初始化都会赋上唯一的key
            KEYS:{
                hourDomKey:Math.ceil(Math.random()*1000000000000),
                minDomKey:Math.ceil(Math.random()*1000000000000),
                secDomKey:Math.ceil(Math.random()*1000000000000),
            },
            //计算滚动时候的下个位置的li的索引
            nextSelect:0
        }
    },
    computed:{
        currentHour(){
            let currentItem =  this.hours.filter(el=>{
                return el.cls == "active";
            });
            return currentItem.length!=0?currentItem[0].name:new Date().getHours();
        },
        currentMin(){
            let currentItem =  this.minutes.filter(el=>{
                return el.cls == "active";
            });
            return currentItem.length!=0?currentItem[0].name:new Date().getMinutes();
        },
        currentSec(){
            let currentItem =  this.seconds.filter(el=>{
                return el.cls == "active";
            });
            return currentItem.length!=0?currentItem[0].name:new Date().getSeconds();
        },
        currentTime(){
            return this.currentHour + ":"+ this.currentMin + ":" + this.currentSec;
        }
    },
    methods:{
        setCls(data,index){
            data && data instanceof Array && data.forEach((el,idx)=>{
                if(idx == index){
                    el.cls = "active";
                }else{
                    el.cls = "";
                }
            })
        },
        showPicker(){
            this.setValue(this.currentHour + ":" + this.currentMin + ":" + this.currentSec);
            this.isShowPicker = true;
        },
        pickerBodyClick(){
             this.isShowPicker = false;
        },
        scrollHandle(event,data,tag){
            let dom = event.target;

            var sHeight = $(dom).scrollTop();
            var curSelectLi = Math.floor(sHeight / 30);
            var yu = sHeight % 30;
            if(curSelectLi == 0){
                if(yu <10){
                    this.nextSelect = 0;
                 }else{
                    this.nextSelect = 1;
                }
            }else if( curSelectLi > 0){
                if(yu > 10){
                    this.nextSelect = curSelectLi +1
                }else{
                    this.nextSelect = curSelectLi;
                }
            }else{
                this.nextSelect = 0;
            };
            var li = $(dom).children('li')[this.nextSelect];
            this.setCls(data,this.nextSelect,tag);
        },
        setValue(str){
            if(!str){
                str = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
            }
            let tmp = str.split(':');
            
            let hHeight = 0;
            let mHeight = 0;
            let sHeight = 0;
            this.hours.forEach((e,idx)=>{
                if(e.name == tmp[0]){
                    e.cls = "active";
                    hHeight = idx;
                }
            })
            this.minutes.forEach((e,idx)=>{
                if(e.name == tmp[1]){
                    e.cls = "active";
                    mHeight = idx;
                }
            })
            this.seconds.forEach((e,idx)=>{
                if(e.name == tmp[2]){
                    e.cls = "active";
                    sHeight = idx;
                }
            })

            let hourDom = this.$refs[this.KEYS.hourDomKey];
            let minDom = this.$refs[this.KEYS.minDomKey];
            let secDom = this.$refs[this.KEYS.secDomKey];
            window.setTimeout(d=>{
                $(hourDom).scrollTop(parseInt(hHeight) * 30);
                $(minDom).scrollTop(parseInt(mHeight) * 30);
                $(secDom).scrollTop(parseInt(sHeight) * 30);
            },0)
        },
        clearTime(){
            this.setValue("00:00:00");
        }
    },
    mounted(){
        let that = this;
        let hourDom = this.$refs[this.KEYS.hourDomKey];
        let minDom = this.$refs[this.KEYS.minDomKey];
        let secDom = this.$refs[this.KEYS.secDomKey];
        hourDom.addEventListener("scroll",e=>{
            this.scrollHandle(e,that.hours);
        },false);
        minDom.addEventListener("scroll",e=>{
            this.scrollHandle(e,that.minutes);
        },false);
        secDom.addEventListener("scroll",e=>{
            this.scrollHandle(e,that.seconds);
        },false);

        document.body.addEventListener("click",this.pickerBodyClick,false);

        this.setValue();
    },
    beforeDestroy(){
        let hourDom = this.$refs[this.KEYS.hourDomKey];
        let minDom = this.$refs[this.KEYS.minDomKey];
        let secDom = this.$refs[this.KEYS.secDomKey];
        hourDom.removeEventListener("scroll",this.scrollHandle);
        minDom.removeEventListener("scroll",this.scrollHandle);
        secDom.removeEventListener("scroll",this.scrollHandle);
        document.body.removeEventListener("click",this.pickerBodyClick);
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
