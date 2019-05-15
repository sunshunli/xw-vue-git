

<template>
    <div>
        <le-button type="search" value="Search"></le-button>
        <le-button type="create" value="New"></le-button>
        <le-button type="edit" value="Modify"></le-button>
        <le-button type="info" value="info"></le-button>
        <le-button type="warning" value="warning"></le-button>
        <le-button type="enable" value="enable"></le-button>
        <le-button type="disable" value="disable"></le-button>
        <le-button type="publish" value="publish"></le-button>
        <le-button type="down" value="down"></le-button>
        <le-button type="upload" value="upload"></le-button>
        <le-button type="submit" value="submit"></le-button>
        <le-button type="back" value="back"></le-button>
        <le-button type="play" value="play"></le-button>
        <le-button type="stop" value="stop"></le-button>
        <le-button type="setting" value="setting"></le-button>
        <le-button type="default" value="default"></le-button>
        <le-form ref="form1">
            form
            
            <v-input type="text" msg="正整数11" vType='number' on></v-input>

            继续验证：<v-input vType="number" msg="正整数22" on required></v-input>

            LeDateTimePicker
            <le-date-time-picker ref="dt1" msg="日期and时间不允许为空" on></le-date-time-picker>
            LeRadioList
            <le-radio-list ref="r1" display-name="name" msg="单选框必填" display-value="code" on></le-radio-list>

            LeDatePicker
            <le-date-picker ref="d1" msg="日期不允许为空" on></le-date-picker>

            LeTimePicker
            <le-time-picker ref="t1" msg="时间不允许为空" on></le-time-picker>

            LeCheckboxList
            <le-checkbox-list @change='changecks' ref='cl1' display-name="name" msg="复选框必填1" display-value="code" on></le-checkbox-list>
            
            LeLocalSelect
            <le-local-select multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code"></le-local-select>

            <le-button value="Form提交" @click="submit"></le-button>
        </le-form>

        LeDialog
        <le-dialog title="弹出层" width="700" height="600" confirm-text="Save" cancel-text="Close" ref='dialog' :cb="submit">
            
        </le-dialog>
        <le-button value="open" @click="open"></le-button>
    </div>
</template>

<script>
import Unit from "../core/tool/commonUtil.js";
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
            {name:"aaa1",code:"1"},
            {name:"aaa2",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ]
        this.$refs["r1"].getCurrentComponent().init(rd);
        this.$refs["cl1"].getCurrentComponent().init(cd);

        this.$refs["s1"].getCurrentComponent().init(Unit.object.cloneObj(cd));

        this.$refs["d1"].getCurrentComponent().setValue("2019-04-23");
        // this.$refs["t1"].getCurrentComponent().setValue("20:40:59");
        this.$refs["dt1"].getCurrentComponent().setValue("2018-06-21 21:41:51");
    }
}
</script>

<style scoped>

</style>
