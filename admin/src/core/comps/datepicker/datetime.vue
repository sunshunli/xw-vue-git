

<template>
    <div>
        <div class="timeDateGroup">
            <div class="timeContent">
                <i class="fa fa-clock-o clock"></i>
                <input type="text" class="timeInput dateInput"/>
                <span class="line"></span>
                <input type="text" class="timeInput"/>
                <i class="fa fa-times-circle clearTime"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LeDateTimePicker",
    data(){
        return {
            
        }
    },
    computed:{

    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style scoped>

.timeDateGroup{
    width: 500px;
    height: auto;
    border: 1px solid red;
    margin: 0 auto;
}

.timeDateGroup .timeContent{
    width: 448px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    text-align: left;
    padding: 0 10px;
    color: #dcdfe6;
    margin: 20px auto;
    position: relative;
    background-color: #fff;
}

.timeDateGroup .timeContent .timeInput{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 38px;
    line-height: 38px;
    outline: none;
    padding: 0 26px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 193px;
    position: relative;
    border-left: 0;
    margin: 0 -3px;
    text-align: center;
}

.timeDateGroup .timeContent .dateInput{
    border-left: 1px solid #dcdfe6;
    border-right: 0;
}

.timeDateGroup .timeContent .line{
    border: 1px solid #dcdfe6;
    width: 1px;
    height: 26px;
    border-radius: 1px;
    position: absolute;
    display: block;
    top: 12px;
    left: 215px;
}

.timeDateGroup .timeContent .clock{
    font-weight: 100;
    color: #dcdfe6;
    font-size: 18px;
    vertical-align: middle;
    margin-right: 5px;
}

.timeDateGroup .timeContent .fa-times-circle {
    position: absolute;
    right: 11px;
    top: 17px;
    font-size: 16px;
}

.timeDateGroup .timeContent .clearDate{
    left: 199px;
}

</style>
