
<template>
    <div class="timeContent" :name="KEYS.ROOTDOM">
        <div class="searchBar">
                <i class="fa fa-clock-o clock"></i>
                <div class="timeInput" :name="KEYS.timeInputDomKey" @click.stop="open"></div>
                <div class="fa fa-times-circle clearTime" :name="KEYS.clearTimeDomKey" @click.stop="clearTimeStr"></div>
        </div>
        <div class="timePicker" :name="KEYS.timePanelDomKey">
            <div class="timePanel">
                <div class="hour">
                    <ul :name="KEYS.hourDomKey"></ul>
                </div>
                <div class="minute">
                    <ul :name="KEYS.minDomKey"></ul>
                </div>
                <div class="seconds">
                    <ul :name="KEYS.secDomKey"></ul>
                </div>
            </div>
            <div class="timeBtnGroup">
                <button id="cancel" type="button" @click.stop="closePicker">关闭</button>
                <button id="confirm" type="button" @click.stop="ok">确定</button>
            </div>
        </div>
         <p class="text-left" v-show="state.showError">{{msg?msg:"未设置时间控件的错误提示信息"}}</p>
    </div>
</template>

<script>

import $ from "jquery";

export default {
    name:"LeTimePicker",
    props:["msg"],
    data(){
        return {
            //validataHOC组件属性
            validataComponentType:"TimePicker",
            //验证组件需要的错误信息提示
            state:{
                showError:false
            },
            //每次组件初始化都会赋上唯一的key
            KEYS:{
                ROOTDOM:_idSeed.newId(),
                hourDomKey:_idSeed.newId(),
                minDomKey:_idSeed.newId(),
                secDomKey:_idSeed.newId(),
                timeInputDomKey:_idSeed.newId(),
                timePanelDomKey:_idSeed.newId(),
                clearTimeDomKey:_idSeed.newId()
            },
            //计算滚动时候的下个位置的li的索引
            nextSelect:0
        }
    },
    methods:{
        //确定
        ok(){
            let res = [];
            this.getJQDom(this.KEYS.timePanelDomKey).find("li.active").each((idx,el) => {
                res.push(el.innerText);
            });
            this.getJQDom(this.KEYS.timeInputDomKey).html(res.join(':'));
            this.getJQDom(this.KEYS.timePanelDomKey).hide();
            this.state.showError = false;
        },
        //关闭
        closePicker(){
            this.getJQDom(this.KEYS.timePanelDomKey).hide();
        },
        //显示选择层,并且滚动
        open(){
            this.getJQDom(this.KEYS.timePanelDomKey).show();
            let index = this.getCurrentHMSIndex();
            this.getJQDom(this.KEYS.hourDomKey).scrollTop(index[0]*30);
            this.getJQDom(this.KEYS.minDomKey).scrollTop(index[1]*30);
            this.getJQDom(this.KEYS.secDomKey).scrollTop(index[2]*30);
        },
        //3个ul的滚动事件
        scrollFun(dom){
            var sHeight = $(dom).scrollTop();
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
                    this.nextSelect = curSelectLi + 1;
                }else{
                    this.nextSelect = curSelectLi;
                }
            }else{
                this.nextSelect = 0;
            };
            var nextDom = $(dom).children('li')[this.nextSelect];
            $(nextDom).addClass('active').siblings().removeClass('active');
        },
        //设置值
        setValue(str){
            //给dom赋值
            str?this.getJQDom(this.KEYS.timeInputDomKey).html(str):this.getJQDom(this.KEYS.timeInputDomKey).html("");

            let hourDom = $("div [name="+this.KEYS.hourDomKey+"]");
            let minDom = $("div [name="+this.KEYS.minDomKey+"]");
            let secDom = $("div [name="+this.KEYS.secDomKey+"]");

            if(!str){
                let h = new Date().getHours()>=10?new Date().getHours():"0"+new Date().getHours();
                let m = new Date().getMinutes()>=10?new Date().getMinutes():"0"+new Date().getMinutes();
                let s = new Date().getSeconds()>=10?new Date().getSeconds():"0"+new Date().getSeconds();
                str = h + ":" + m + ":" + s;
            }
            let currentHour = str.split(':')[0];
            let currentMin = str.split(':')[1];
            let currentSec = str.split(':')[2];
            //小时
            let hourHtml = "";
            for(let i =0;i<24;i++){
                let tmp = i<10?"0"+i:i;
                if(i == currentHour){
                    hourHtml += "<li class='active'>"+ tmp +"</li>";
                }else{
                    hourHtml += "<li>"+ tmp +"</li>";
                }
            }
            //分钟
            let minHtml = "";
            for(let i =0;i<60;i++){
                let tmp = i<10?"0"+i:i;
                if( i == currentMin){
                    minHtml += "<li class='active'>"+tmp+"</li>";
                }else{
                    minHtml += "<li>"+ tmp +"</li>";
                }
            }
            //秒
            let secHtml = "";
            for(let i =0;i<60;i++){
                let tmp = i<10?"0"+i:i;
                if( i == currentSec){
                    secHtml += "<li class='active'>"+ tmp +"</li>";
                }else{
                    secHtml += "<li>"+ tmp +"</li>";
                }
            }
            $(hourDom).html($(hourHtml));
            $(minDom).html($(minHtml));
            $(secDom).html($(secHtml));
        },
        //获取值
        getValue(){
            return this.getJQDom(this.KEYS.timeInputDomKey).html();
        },
        //获取当前的时分秒索引
        getCurrentHMSIndex(){
            let res = this.getValue();
            if(!res){
                let h = new Date().getHours()>=10?new Date().getHours():"0"+new Date().getHours();
                let m = new Date().getMinutes()>=10?new Date().getMinutes():"0"+new Date().getMinutes();
                let s = new Date().getSeconds()>=10?new Date().getSeconds():"0"+new Date().getSeconds();
                return [parseInt(h),parseInt(m),parseInt(s)];
            }
            return [parseInt(res.split(':')[0]),parseInt(res.split(':')[1]),parseInt(res.split(':')[2])];
        },
        //获取jq对象
        getJQDom(key){
            return $("div [name="+key+"]");
        },
        clearTimeStr(){
            if(this.$attrs.checkIsOff && this.$attrs.checkIsOff()){
                this.state.showError = true;
            }
            this.setValue();
            this.getJQDom(this.KEYS.timeInputDomKey).html("");
        }
    },
    mounted(){
        this.setValue();
        //为3个ul添加滚动事件
        this.getJQDom(this.KEYS.hourDomKey).get(0).addEventListener("scroll",(e)=>{
            this.scrollFun($(e.target));
        },false)
        this.getJQDom(this.KEYS.minDomKey).get(0).addEventListener("scroll",(e)=>{
            this.scrollFun($(e.target));
        },false)
        this.getJQDom(this.KEYS.secDomKey).get(0).addEventListener("scroll",(e)=>{
            this.scrollFun($(e.target));
        },false)
    },
    beforeDestroy(){
        this.getJQDom(this.KEYS.hourDomKey).removeEventListener("scroll",this.scrollHandle);
        this.getJQDom(this.KEYS.minDomKey).removeEventListener("scroll",this.scrollHandle);
        this.getJQDom(this.KEYS.secDomKey).removeEventListener("scroll",this.scrollHandle);
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
    display: inline-block;
    margin: 5px 20px;
    vertical-align: middle;
    position: relative;
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
.timeContent .searchBar .clearTime{
    right: 10px;
    position: absolute;
    top: 12px;
    color: #c0c4cc;
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
    display: none;
    width: 199px;
    height: auto;
    margin: 0 auto;
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
    width: 46px;
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
