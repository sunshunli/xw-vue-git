

<template>
    <div style="text-align:left;">
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

        <v-input label="年龄" type="text" msg="正整数11" vType='number'></v-input>
        <v-input label="身份证号码" vType="number" msg="正整数22"></v-input>
        <le-date-picker label="日期组件" ref="d1" msg="日期不允许为空"></le-date-picker>
        <le-time-picker label="时间组件" ref="t1" msg="时间不允许为空"></le-time-picker>
        <le-date-time-picker label="时间日期组件" ref="dt1" msg="日期and时间不允许为空"></le-date-time-picker>           
        <le-local-select label="模糊搜索" multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code"></le-local-select> 
        <le-radio-list label="性别" ref="r3" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list>
        <le-checkbox-list label="爱好" @change='changecks' ref='cl3' display-name="name" msg="复选框必填1" display-value="code" on required></le-checkbox-list> 
        

        <le-form ref="form1" style="width:600px">
            
            <v-input label="年龄" type="text" msg="正整数11" vType='number' on></v-input>

            <v-input label="身份证号码" vType="number" msg="正整数22" on required></v-input>

            <le-radio-list label="性别" ref="r2" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list>

            <le-checkbox-list label="爱好" @change='changecks' ref='cl2' display-name="name" msg="复选框必填1" display-value="code" on required></le-checkbox-list>
           
            <le-date-picker label="日期组件" ref="d1" msg="日期不允许为空" on required></le-date-picker>

            <le-time-picker label="时间组件" ref="t1" msg="时间不允许为空"  on required></le-time-picker>

            <le-date-time-picker label="时间日期组件" ref="dt1" msg="日期and时间不允许为空" on required></le-date-time-picker>           

            <le-local-select label="模糊搜索" multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select> 

            <le-button value="Form提交" @click="submit"></le-button>
        </le-form>

        <le-dialog title="弹出层" width="500" height="500" confirm-text="Save" cancel-text="Close" ref='dialog' @click="save">
            <le-form ref="form2">
            
                <v-input label="年龄" type="text" msg="正整数11" vType='number' on></v-input>

                <v-input label="身份证号码" vType="number" msg="正整数22" on required></v-input>

                <le-radio-list label="性别" ref="r1" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list>

                <le-checkbox-list label="爱好" @change='changecks' ref='cl1' display-name="name" msg="复选框必填1" display-value="code" on required></le-checkbox-list>
            
                <le-date-picker label="日期组件" ref="d1" msg="日期不允许为空" on required></le-date-picker>

                <le-time-picker label="时间组件" ref="t1" msg="时间不允许为空"  on required></le-time-picker>

                <le-date-time-picker label="时间日期组件" ref="dt1" msg="日期and时间不允许为空" on required></le-date-time-picker>           

                <le-local-select label="模糊搜索" multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select> 

                <le-button value="Form提交" @click="submit"></le-button>
            </le-form>
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
        },
        save(){
            let res = this.$refs["form2"].validate();
            res.then(d=>{
                debugger
            }).catch((error)=>{
                debugger
            })
        }
    },
    mounted(){
        let data = [
            {name:"aaa",code:"1"},
            {name:"aaa1",code:"1"},
            {name:"aaa2",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ]
        this.$refs["r1"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["cl1"].getCurrentComponent().init(Unit.object.cloneObj(data));

        this.$refs["r2"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["cl2"].getCurrentComponent().init(Unit.object.cloneObj(data));

        this.$refs["r3"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["cl3"].getCurrentComponent().init(Unit.object.cloneObj(data));


        this.$refs["s1"].getCurrentComponent().init(Unit.object.cloneObj(data));

        this.$refs["d1"].getCurrentComponent().setValue("2019-04-23");
        // this.$refs["t1"].getCurrentComponent().setValue("20:40:59");
        this.$refs["dt1"].getCurrentComponent().setValue("2018-06-21 21:41:51");
    }
}
</script>

<style scoped>

</style>
