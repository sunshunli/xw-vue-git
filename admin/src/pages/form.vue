

<template>
    <div>
        <le-form ref="form1">
            sub
            
            <v-input ref="i1" type="text" msg="正整数11" vType='number' on></v-input>

            继续验证：<v-input vType="number" msg="正整数22" on required></v-input>

            LeRadioList
            <le-radio-list ref="r1" display-name="name" msg="单选框必填" display-value="code" on></le-radio-list>

            LeDatePicker
            <le-date-picker></le-date-picker>

            LeCheckboxList
            <le-checkbox-list @change='changecks' ref='cl1' display-name="name" msg="复选框必填1" display-value="code" on></le-checkbox-list>

            <le-button value="提交" @click="submit"></le-button>
        </le-form>
    </div>
</template>

<script>
export default {
    name:"FormValidate",
    data(){
        return {}
    },
    methods:{
        submit(){
            let res = this.$refs["form1"].validate();
            res.then(d=>{
                debugger
            }).catch(e=>{
                debugger
            })
        },
        changecks(data){
            console.log("11");
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
        
    }
}
</script>

<style scoped>

</style>
