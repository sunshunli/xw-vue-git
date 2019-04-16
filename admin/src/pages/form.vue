

<template>
    <div>

        <le-form ref="form1">
            form
            
            <v-input ref="i1" type="text" msg="正整数11" vType='number' on></v-input>

            继续验证：<v-input vType="number" msg="正整数22" on required></v-input>

            LeDateTimePicker
            <le-date-time-picker ref="dt1" msg="日期and时间不允许为空" on></le-date-time-picker>
            LeRadioList
            <le-radio-list ref="r1" display-name="name" msg="单选框必填" display-value="code" on></le-radio-list>

            LeDatePicker
            <le-date-picker ref="d1" msg="日期不允许为空" on></le-date-picker>
            <le-date-picker ref="d2" msg="日期不允许为空" on></le-date-picker>

            LeTimePicker
            <le-time-picker ref="t1" msg="时间不允许为空" on></le-time-picker>
            <le-time-picker ref="t2" msg="时间不允许为空" on></le-time-picker>
            
            <p style="text-align:left">----------------新的时间选择器-----------------------</p>
            <le-time-picker1 ref="t1" msg="时间不允许为空" on></le-time-picker1>
            <le-time-picker1 style="float:right;position:relative" ref="t2" msg="时间不允许为空" on></le-time-picker1>
            <p style="text-align:left">----------------新的时间选择器-----------------------</p>
           

            LeCheckboxList
            <le-checkbox-list @change='changecks' ref='cl1' display-name="name" msg="复选框必填1" display-value="code" on></le-checkbox-list>
            
            <le-button value="Form提交" @click="submit"></le-button>
        </le-form>

        LeDialog
        <le-dialog title="弹出层" width="700" height="600" confirm-text="Save" cancel-text="Close" ref='dialog' :cb="submit">
            
        </le-dialog>
        <le-button value="open" @click="open"></le-button>
    </div>
</template>

<script>
export default {
    name:"FormValidate",
    data(){
        return {
            showDialogFlag:false
        }
    },
    methods:{
        submit(){
            let res = this.$refs["form1"].validate();
            res.then(d=>{
                debugger
            }).catch((error)=>{
                debugger
            })
        },
        changecks(data){
            console.log("11");
        },
        dialogCb(){
            console.log(this.$refs['dialog'].showDialog);
        },
        open(){
            this.$refs['dialog'].open();
        }
    },
    mounted(){
        let rd = [
            {name:"aaa",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ]
        let cd = [
            {name:"aaa",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ]
        this.$refs["r1"].getCurrentComponent().init(rd);
        this.$refs["cl1"].getCurrentComponent().init(cd);

        this.$refs["d1"].getCurrentComponent().setValue("2019-04-23");
        // this.$refs["t1"].getCurrentComponent().setValue("20:40:59");
        // this.$refs["dt1"].getCurrentComponent().setValue("2018-06-21 21:41:51");
    }
}
</script>

<style scoped>

</style>
