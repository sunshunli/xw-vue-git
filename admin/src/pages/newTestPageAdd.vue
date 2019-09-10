<template>
    <!-- 新页面必须包含在 le_comps_core_css里面内，如果新页面里面使用了form组件，则form组件的所有父节点中必须设置宽度和高度，否则form组件撑满页面-->
    <div class="le_comps_core_css le_new_page">
        <!-- 页面名称 le_page_name -->
        <h4 class="le_page_name">新的样式测试页面</h4>
        <le-form labelWidth='180' ref="saveForm">
            <div class="le_form_row_item">
                <le-input v-show="hideAllTag" labelWidth='150' tip="请输入身份证号码" label="身份证号码" :readonly="readonly" v-model="entity.id"></le-input>
                <le-button v-show="hideAllTag" type="create" value="显示提醒" @click="showAlert"></le-button>
            </div>
            <!-- <div class="clearfix">
                <div style="float:left;width:86%">
                    <le-input v-show="hideAllTag" labelWidth='150' tip="请输入身份证号码" label="身份证号码" :readonly="readonly" v-model="entity.id"></le-input>
                </div>
                <div style="float:left;margin-top:12px">
                    <le-button v-show="hideAllTag" type="create" value="显示提醒" @click="showAlert"></le-button>
                </div>
            </div> -->
            <div class="col4">
                <le-upload label="上传文件" :options="imgUploadOpt" v-model="files"></le-upload>
                <le-button type="create" value="获取文件路径" @click="getUrls"></le-button>
            </div>
            <le-textarea ref='textarea' @blur="changeTextarea($event)" @change='changeTextarea($event)' height="50" width="100%" labelWidth='150' tip="详细信息描述文案不能瞎写" placeholder="请输入详细地址" label="详细地址" :readonly="readonly" msg="详细地址必填" v-model="entity.content" on></le-textarea>
            <div class="col4">
                <le-date-picker @nextMonthChange="nextMonthChangeEvent" @prevMonthChange="prevMonthChangeEvent" @nextYearChange="nextYearChangeEvent" @change="changeDate" @prevYearChange="prevYearChangeEvent" v-show="hideAllTag" labelWidth='150' tip="输入当前之后的日期" on placeholder="请选择日期" label="开始日期组件" :readonly="readonly" msg="日期不允许为空" v-model="entity.date"></le-date-picker>
                <le-button v-show="hideAllTag" @click="showConfirm" type="create" value="测试按钮"></le-button>
                <le-time-picker @change="timeChangeEvent" v-show="hideAllTag" labelWidth='30' label="至" tip="输入当前之后的时间" on placeholder="请选择时间" :readonly="readonly" msg="时间不允许为空" v-model="entity.time"></le-time-picker>
            </div>
            <le-date-time-picker v-show="hideAllTag" @changeDateTime="update1" labelWidth='150' tip="输入当前之后的日期和事件" on placeholder="请选择日期时间" label="时间日期组件" :readonly="readonly" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>           
            <le-local-select v-show="hideAllTag" labelWidth='150' tip="职业选择2个" on label="选择职业" msg="职业必填" :readonly="readonly" :data-source="shops" multiple display-name="val" display-value="key" v-model='entity.job'></le-local-select> 
            <le-radio-list v-show="hideAllTag" labelWidth='150' tip="性别男或女" on label="性别" display-name="name" :readonly="readonly" :data-source="sex" ref='dialogSexRef' msg="性别必须选择" display-value="code" v-model="entity.sex"></le-radio-list>
            <le-checkbox-list v-show="hideAllTag" labelWidth='150' tip="请选择一个或多个爱好" on label="爱好" :readonly="readonly" :data-source="fav" display-name="name" msg="爱好必须选择" display-value="code" v-model="entity.fav"></le-checkbox-list>     
            
            <div class="col2">
                <le-date-time-picker v-show="hideAllTag" @changeDateTime="update1" labelWidth='130' tip="输入当前之后的日期和事件" on placeholder="请选择日期时间" label="时间日期组件123" :readonly="readonly" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>           
            </div>

            <le-editor labelWidth="130" height="300" on required msg = "pc端必填" label = " pc端:" :option = "editPcOption" ref = "pcEditor"></le-editor>

            <div class="col2 le_full_width">
                <le-date-time-picker v-show="hideAllTag" @changeDateTime="update1" labelWidth='100' tip="输入当前之后的日期和事件" on placeholder="请选择日期时间" label="时间日期组件" :readonly="readonly" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>           
                <le-local-select v-show="hideAllTag" labelWidth='100' tip="职业选择2个" on label="选择职业" msg="职业必填" :readonly="readonly" :data-source="shops" multiple display-name="val" display-value="key" v-model='entity.job'></le-local-select> 
            </div>

            <div class="col3 le_full_width">
                <le-local-select v-show="hideAllTag" labelWidth='100' tip="职业选择2个" on label="选择职业" msg="职业必填" :readonly="readonly" :data-source="shops" multiple display-name="val" display-value="key" v-model='entity.job'></le-local-select> 
                <le-radio-list v-show="hideAllTag" labelWidth='100' tip="性别男或女" on label="性别" display-name="name" :readonly="readonly" :data-source="sex" ref='dialogSexRef' msg="性别必须选择" display-value="code" v-model="entity.sex"></le-radio-list>
                <le-checkbox-list v-show="hideAllTag" labelWidth='40' tip="请选择一个或多个爱好" on label="爱好" :readonly="readonly" :data-source="fav" display-name="name" msg="爱好必须选择" display-value="code" v-model="entity.fav"></le-checkbox-list>     
            </div>
            
            <div class="le_new_page_btn_group">
                <le-button value="返回" type="back" @click="back"></le-button>
                <le-button value="确定1" :disabled='disabledFlag' type="save" @click="save"></le-button>
                <le-button value="确定2" :disabled='disabledFlag' type="save" @click="save"></le-button>
            </div>
        </le-form>
       
    </div>
</template>

<script>
export default {
    data(){
        return {
            files:"",
            imgUploadOpt:{
                multiple:true,
                url:"/file/img/upload",
                fname:"file",
                noResult:true,
                analysis:(d)=>{
                    return d.data;
                },
            },
            disabledFlag:true,
            entity:{
                age:"",
                id:"",
                content:"",
                data:"",
                time:"",
                datetime:"",
                job:"2",
                sex:"1",
                fav:"3,4",
                url:"",
                address:""
            },
            editPcOption:{
                 url:"/file/img/upload",
                 fname:"file",
                 analysis:(d)=>{
                    return d.data.data;
                },
            },
            tableOptions:{
                showCk:true,
                map:[
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"},
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"},
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"}
                ],
                 getUrl:()=>{
                    // if(this.searchModel.age == ""){
                    //     return "";
                    // }
                    return "/risk/limit/black/user/query/lst?isNeedAllCout=true&userName=&companyName="+this.searchModel.age+"&status=-1";
                },
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"pageNum",
                    index:1,
                    size:10
                },
                actions:[
                    {
                        key:"update",
                        val:"编辑",
                        action:this.search,
                    },
                    {
                        key:"remove",
                        val:"注销",
                        action:this.search,
                    }
                ]
            },
            shops:[
                {val:'lenovo',key:"1"},
                {val:'lecoo',key:"2"},
            ],
            sex:[
                {name:'男',code:'1'},
                {name:'女',code:'2'},
            ],
            fav:[
                {name:'工作',code:'1'},
                {name:'学习',code:'2'},
                {name:'生活',code:'3'},
            ],
            showDialog:false,
            readonly:false,
            hideAllTag:true
        }
    },
    methods:{
        getUrls(){
            console.log(this.files);
        },
        timeChangeEvent(val){
            debugger
        },
        changeDate(val){
            debugger
        },
        prevMonthChangeEvent(year,month,str){
            debugger
        },
        nextMonthChangeEvent(year,month,str){
            debugger
        },
        prevYearChangeEvent(year,month,str){
            debugger
        },
        nextYearChangeEvent(year,month,str){
            debugger
        },
        changeTextarea(val){
        },
        update1(){
            this.alert.showAlert("success","修改日期")
        },
        close(){
            this.showDialog = false;
        },
        add(){
            this.$router.push({path:'/'})
        },
        save(){
            let res = this.$refs.saveForm.validate();
            res.then(()=>{
                this.alert.showAlert("success","必填项全部填写了")
            }).catch((error)=>{
                this.alert.showAlert("error",'错误')
            })
        },
        showAlert(){
            this.alert.showNotify("error","请输入身份证号");
        },
        hideAll(){
            this.hideAllTag =! this.hideAllTag;
        },
        removeItem(){
            this.alert.showConfirm("删除",()=>{
                this.alert.showAlert("success","成功");
                this.alert.showNotify("success","成功")
            })
        },
        back(){
            this.$router.push({path:'/newTestPage'})
        },
        showConfirm(){
            this.alert.showConfirm("quedi",function(){})
        }
    },
    mounted(){
        let that =this;
        let tag = that.$route.query.tag;
        if(tag && tag == "detailInfo"){
            that.readonly = true
        }else{
            that.readonly = false
        }

        window.setTimeout(()=>{
            this.$refs['textarea'].getCurrentComponent().clear();
        },1000)
    }
}
</script>

<style scoped>
.le_new_page{
    width:1000px;
    margin:0 auto;
}
.title{
    font-size: 16px;
    text-align: left;
    padding: 10px 22px;
    border-bottom: 1px solid #eae4e4;
}
</style>