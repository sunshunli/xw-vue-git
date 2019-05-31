<template>
    <div class = "form-item current">
        <label class="form-item-label" :class="$attrs.on != undefined && $attrs.required!=undefined?'requireed':''">{{$attrs.label}}</label>
        <div class = "form-item-div dataTimePicker" :class="state.successIcon">
            <!-- 日期 -->
            <i class="icon-date fa fa-calendar"></i>
            <div class = "date-box">
                <!-- 展示文字的地方 -->
                <div class = "dateTimeText" @click="showDateTimePickerHandle">
                    {{dateTimeStr}}
                </div>
                <!-- 展开日期下拉 -->
                <div class="picker-box" v-show="showDateTimePicker">
                    <div class="picker-header" style = "height:300px;">
                        <div class = "ipt" >
                            <le-date-picker :ref='dateKey' is-datetime-picker></le-date-picker>
                        </div>
                        <div class = "ipt" style = "margin-left:10px;">
                            <le-time-picker :ref='timeKey'></le-time-picker>
                        </div>
                    </div>
                    <div class = "picker-bottom" style = "border-top:1px solid #f2f2f2;background:#fff;height:40px">
                        <button @click.stop="getDateTimeStr">
                            确定
                        </button>
                        <button class = "text" @click.stop="getNow">
                            此刻
                        </button>
                        <div style ="clear:both;"></div>
                    </div>
                </div>
            </div>
            <!-- 时间 -->
            <i class="fa fa-times-circle clearTime" @click="clear"></i>
            <p class="promptMsg" v-show="state.showError">{{msg?msg:"未设置日期时间控件的错误提示信息"}}</p>
        </div>
    </div>
</template>
<script>

import LeDatePicker from "./date.vue";
import LeTimePicker from "./time.vue";

export default {
    name:"LeDateTimePicker",
    props:["msg"],
    components: {LeDatePicker,LeTimePicker},
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data(){
        return {
            validataComponentType:"DateTimePicker",
            dateKey:_idSeed.newId(),
            timeKey:_idSeed.newId(),
            dateTimeStr:"",
            showDateTimePicker:false,
            state:{
                showError:false,
                successIcon:''
            },
        }
    },
    methods:{
        getDateTimeStr(){
            let dateComp = this.$refs[this.dateKey];
            let timeComp = this.$refs[this.timeKey];
            let dataStr = dateComp.getValue();
            let timeStr = timeComp.getValue();
            if(!dataStr || !timeStr){
                this.dateTimeStr =  "";
            }else{
                this.dateTimeStr = dataStr + " " + timeStr;
                dateComp.closePicker();
                timeComp.closePicker();
                this.showDateTimePicker = false;
            }
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        },
        showDateTimePickerHandle(){
            this.showDateTimePicker = true;
            this.$refs[this.dateKey].showPicker();
        },
        clear(){
            this.dateTimeStr = "";
            this.showDateTimePicker = false;
            this.setValue("");
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        },
        initDateAndTime(){
            let y = new Date().getFullYear();
            let m = parseInt(new Date().getMonth() + 1)>10?(new Date().getMonth() + 1):"0"+(new Date().getMonth() + 1);
            let d = parseInt(new Date().getDate())>10?(new Date().getDate()):"0"+(new Date().getDate());
            let hh = new Date().getHours()>=10?new Date().getHours():"0"+new Date().getHours();
            let mm = new Date().getMinutes()>=10?new Date().getMinutes():"0"+new Date().getMinutes();
            let ss = new Date().getSeconds()>=10?new Date().getSeconds():"0"+new Date().getSeconds();
            this.$refs[this.dateKey].setValue(y + "-" + m + "-" + d);
            this.$refs[this.timeKey].setValue(hh + ":" + mm + ":" + ss);
        },
        getNow(){
            this.initDateAndTime();
            this.getDateTimeStr();
        },
        getValue(){
            return this.dateTimeStr;
        },
        setValue(str){
            if(!str){
                this.initDateAndTime();
                this.dateTimeStr = "";
            }else{
                this.dateTimeStr = str;
                this.$refs[this.dateKey].setValue(str.split(' ')[0]);
                this.$refs[this.timeKey].setValue(str.split(' ')[1]);
            }
        }
    },
    mounted(){
        this.initDateAndTime();
    }
}   
</script>
<style scoped>

    .dataTimePicker{
        display:inline-block;
        width: 290px;
        height: auto;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        box-sizing: border-box;
        position:relative;

    }
    .current .dataTimePicker{
       /* border: 1px solid #409EFF!important; */
        box-sizing: content-box;
        display: inline-block;
        /* margin: 10px 20px; */
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
        width: 87%;

        /* border:none; */
    }
    .dataTimePicker .date-box{
        width: 87%;
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
        right: 2%;
        color: #c0c4cc;
        font-weight: normal;
        cursor: pointer;
    }

    .dataTimePicker /deep/ .dataPicker .picker-box{
        left: 0;
    }

    .ipt .form-item /deep/ .form-item-div .form-item-input{
        text-align: center;
    }
   

    /* 日期 */
     .picker-box {
        width: 330px;
        box-sizing: border-box;
        margin-top: 1px;
        left:-100px;
        position: absolute;
        background:#fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index:10000;
        margin-bottom: 30px;
    }
    /* 选择器头部 */
    .picker-header {
        width: 100%;
        line-height: 1.8em;
        display:flex;
    }
    .picker-header .ipt{
        display: inline-block;
        /* width: 140px; */
        width: 50%;
        margin: 10px;
        margin-left: 0px;
        position: relative;
        margin-right: 0;
    }

    .picker-bottom button{
        float:right;margin-right:10px;font-size:12px;line-height:20px;margin-top:10px;background:#fff;
        outline: none;
        border:1px solid #dcdfe6;
        border-radius:3px;

    }
    .picker-bottom button.text{
        border:0px solid #fff;
        color:#409EFF;
        
    }


    .form-item{
        width: 32%;
        float: left;
        text-align: left;
        margin:0 0 22px 0;
        margin-top: -2px;
    }

    .form-item .form-item-label{
        width: 47%;
        margin-right: 1%;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: normal;
        padding: 0;
        box-sizing: border-box;
        margin-bottom: 0;
    }

    form .form-item .form-item-label{
        width: 17%;
    }

    .medium .form-item .form-item-label{
        height: 40px;
        line-height: normal;
        font-size: 14px;
    }
    .small .form-item .form-item-label{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }
    .mini .form-item .form-item-label{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }
    .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        width: 49.7%;
        vertical-align: text-bottom;
    }

    form  .form-item .form-item-div{
        width:80%;
    }

    .requireed::before{
        content: "*";
        color: #f56c6c;
        font-size: 12px;
        margin-right: 2px;
    }
    .form-item .form-item-input{
        width: 100%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8% 0 4%;
        color: #606266;
        outline: none;
    }
    .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }
    .medium .form-item .form-item-input{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .small .form-item .form-item-input{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }
    .mini .form-item .form-item-input{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }

    .form-item .promptMsg{
        font-size: 12px;
        color: #f56c6c;
        line-height: 20px;
        text-align: left;
        position: absolute;
        top: 42px;
        left: -1px;
    }

    .fa-check-circle-o.dataTimePicker{
        border: 1px solid #67c23a;
    }

    .fa-times-circle-o.dataTimePicker{
        border: 1px solid #f56c6c;
    }

    .fa-times-circle-o:before{
        content:'';
    }

    .fa-check-circle-o:before{
        content:'';
    }

    .picker-header .ipt .form-item{ 
        width: 100%;
    }

   .dataTimePicker .medium .form-item .form-item-input{
        width: 100%;
        border: 1px solid yellowgreen;
    }


</style>