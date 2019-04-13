<template>
    <div class = "current">
        <div class = "dataTimePicker">
            <!-- 日期 -->
            <i class="icon-date fa fa-calendar"></i>
            <div class = "date-box">
                <!-- 展示文字的地方 -->
                <div class = "dateTimeText" @click="showDateTimePickerHandle">
                    {{dateTimeStr}}
                </div>
                <!-- 展开日期下拉 -->
                <div class="picker-box" v-show="showDateTimePicker">
                    <div class="picker-header">
                        <div class = "ipt">
                            <le-date-picker :ref='dateKey' is-datetime-picker></le-date-picker>
                        </div>
                        <div class = "ipt">
                            <le-time-picker :ref='timeKey' is-datetime-picker></le-time-picker>
                        </div>
                        <input type="button" value="确定" @click="getDateTime"/>
                    </div>
                </div>
            </div>
            <!-- 时间 -->
            
            <i class="fa fa-times-circle clearTime"></i>
        </div>
    </div>
</template>
<script>

import LeDatePicker from "./date.vue";
import LeTimePicker from "./time.vue";

export default {
    name:"LeDateTimePicker",
    components: {LeDatePicker,LeTimePicker},
    data(){
        return {
            dateKey:Math.ceil(Math.random()*100000000000000),
            timeKey:Math.ceil(Math.random()*100000000000000),
            dateTimeStr:"",
            showDateTimePicker:false
        }
    },
    computed: {
    },
    methods:{
        getDateTime(){
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
        },
        showDateTimePickerHandle(){
            this.showDateTimePicker = true;
            this.$refs[this.dateKey].showPicker();
            this.$refs[this.timeKey].showPicker();
        }
    },
    mounted(){
        this.$refs[this.dateKey].setValue(new Date().getFullYear() +"-" + (new Date().getMonth() + 1) + "-" + new Date().getDate());
    }
}   
</script>
<style scoped>
   
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
        line-height: 1.8em;

    }
    .picker-header .ipt{
        display:inline-block;
        position:relative;
        width:140px;
        border-radius:3px;
        border:1px solid #aeaeae;
        height:30px;
        margin:10px;
        
    }

</style>