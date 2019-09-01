

<template>
    <div class="searchContent">
        <div class="navbar clearfix">
            <h1 class="al-title ng-binding" id="crumbsTitle">页面推广</h1>
            <ul class="breadcrumb al-breadcrumb" id="crumbs"><li>XW-VUE-GIT</li><li>UsePage</li><li>Add</li></ul>
        </div>
           
        <le-form labelWidth="150" ref="form1" style="width:600px">

            <le-date-time-picker label="开始时间" msg="开始时间必填" v-model="form1.dt1" on></le-date-time-picker>
            
            <le-date-time-picker label="结束时间" msg="结束时间必填" v-model="form1.dt2" on></le-date-time-picker>

            <le-date-picker label="日期组件"  v-model="form1.d1" msg="日期不允许为空" on></le-date-picker>
            
            <le-time-picker label="时间组件" v-model="form1.t1" msg="时间不允许为空" on></le-time-picker>

            <le-local-select label="模糊搜索" :dataSource="dataSource" multiple v-model="form1.s1" display-name="name" msg="下拉框必填" display-value="code" on></le-local-select> 

            <le-date-time-picker label="开始时间" msg="开始时间必填" v-model="form1.dt1" on></le-date-time-picker>
            
            <le-date-time-picker label="结束时间" msg="结束时间必填" v-model="form1.dt2" on></le-date-time-picker>

            <le-date-picker label="日期组件"  v-model="form1.d1" msg="日期不允许为空" on></le-date-picker>
            
            <le-time-picker label="时间组件" v-model="form1.t1" msg="时间不允许为空" on></le-time-picker>

            <le-local-select label="模糊搜索" :dataSource="dataSource" multiple v-model="form1.s1" display-name="name" msg="下拉框必填" display-value="code" on></le-local-select> 

            <le-radio-list label="性别" :data-source="sexDataSource" v-model="form1.sex" display-name="name" msg="单选框必填" display-value="code" on></le-radio-list>

            <le-checkbox-list label="爱好" :data-source="favDataSource" @change='changecks' ref='hobby' v-model="form1.hobby" display-name="name" msg="复选框必填1" display-value="code" on></le-checkbox-list>
        
            <le-input label="推广地址" msg="推广地址必填" v-model="form1.tgdz" type="text" on required></le-input>

            <le-input label="原地址" msg="原地址必填" v-model="form1.ydz" on required></le-input>

            <le-input label="失效默认地址" msg="失效默认地址必填" v-model="form1.sxdz" vtype="text" on required></le-input>

            <le-upload msg='图片必须上传' v-model='form1.uploadSrc' :options="uploadOptions" label="文件上传"></le-upload>    

            <le-asyn-tree displayName="name" :asynOptions="asynOptions" ref="tree1" :itemClick="itemClick" checkbox></le-asyn-tree>

            <le-button value="Form提交" @click="submit('form1')"></le-button>
            <le-button value="返回" @click="back"></le-button>
        </le-form>
    </div>
</template>

<script>
import Unit from "../core/tool/commonUtil.js";
export default {
    name:"demoValidate",
    data(){
        return {
            dataSource:[],
            sexDataSource:[],
            favDataSource:[],
            form1:{
                tgdz:'',
                ydz:'',
                sxdz:'',
                dt1:'',
                dt2:'',
                d1:'',
                t1:'',
                sex:'',
                hobby:'',
                s1:'',
                s2:'',
                uploadSrc:""
            },
            selectNode:{},
            tbListParams:{
                type:'',
                parentId:'',
                parentCode:''
            },
			uploadOptions:{
				multiple:true,
                url:"/file/img/upload",
                completedCallback:(d)=>{
                    console.log(d);
                },
                vtype:"jpg,png,gif",
                fname:"file",
                analysis:(d)=>{
                    return d.data;
                },
                tbListParams:{
                    type:'',
                    parentId:'',
                    parentCode:''
                },
            },
            asynOptions:{
                getUrl:d=>{
                    let that =this;
                        return "/tree/category/querytreenode?type="+that.tbListParams.type + "&parentId="+that.tbListParams.parentId
                         +"&parentCode="+this.tbListParams.parentCode + "&searchkeys=&sortParam=Order_ASC,CreateTime_DESC"
                },
                analysis:d=>{
                    return d.data;
                }
            },
        }
    },
    methods:{
        changecks(data){
            console.log(data);
        },
        back(){
            this.$router.push({path:"/form"});
        },
        submit(){
            let res = this.$refs["form1"].validate();
            res.then(d=>{
                let that = this;
                let param1 = {
                    tanentId: 12,
                    siteId: '9f746cfa-b5e8-49ab-82d6-86cbedce8119',
                    proxyUri:that.form1.tgdz,
                    targetUrl: that.form1.ydz,
                    defaultUrl: that.form1.sxdz,
                    beginTimeWapper: that.form1.dt1,
                    endTimeWapper: that.form1.dt2,

                    date:that.form1.d1,
                    time:that.form1.t1,
                    sex:that.form1.sex,
                    hobby:that.form1.hobby,
                    localSelect:that.form1.s1,
                    curSelectTreeItem : that.selectNode,
                    imgUrl:that.form1.uploadSrc
                };
                console.log( '------form参数--------');
                console.log( param1);
                console.log( '------form参数--------');
                Unit.http('/spread/siteSpread/add',"post",param1).then(d=>{
                    console.log(d)
                    let that = this;
                    if(d.status == 200){
                        that.alert.showAlert('success',d.msg);
                        that.$router.push({path:'/usePage'})
                    }else{
                        that.alert.showAlert('error',d.msg);
                    }
                }).catch(e=>{
                    context.alert.showAlert("error",e.data?e.data:"<#接口异常,操作失败#>");
                });
            }).catch((error)=>{
                console.log(error)
            })
        },
        //树的方法
        itemClick(item){
            this.selectNode = item;
            this.tbListParams = {
                parentId : item.iD,
                parentCode : item.code,
                type : item.type,
            };
        },
        reloadTree(){
            this.selectTreeType = this.$refs['s2'].$children[0].leftArray[0].code;
            this.getTreeData(this.selectTreeType);
        },
        getTreeData(type){
             this.ajax.getFetch("/tree/category/querytreenode?type="+type).then(d=>{
                let that = this;
                that.$refs["tree1"].init(d.data);
                that.selectNode = d.data[0];
                 console.log(that.selectNode)
                that.itemClick(d.data[0]);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
    },
    mounted(){
        let data = [
            // {name:"aaa",code:"1"},
            // {name:"aaa1",code:"1"},
            // {name:"aaa2",code:"1"},
            // {name:"bbb",code:"2"},
            // {name:"ccc",code:"3"},
            {name:"1001",code:"001"},
            {name:"1002",code:"002"},
            {name:"1003",code:"003"},
            {name:"2000",code:"2002"},
            {name:"3000",code:"3003"},
        ];

        window.setTimeout(()=>{
            this.dataSource = Unit.object.cloneObj(data);
            this.sexDataSource = Unit.object.cloneObj(data);
            this.favDataSource = Unit.object.cloneObj(data);
            this.getTreeData(17)
        },0)
    }
}
</script>

<style scoped>
    .searchContent{
        min-width: 900px;
        min-height: 600px;
        overflow: scroll;
        padding: 20px;
        /* background: url("https://p2.lefile.cn/product/adminweb/2019/05/23/d7b50040-4f55-4a8e-aaf5-d5731edde5d1.jpg") 0 0 no-repeat; */
        background-size: 100% 100%;
    }

    .searchContent .searchItem{
        width: 100%;
        height: auto;
        float: left;
        border-bottom: 1px solid rgba(0,0,0,.12);
        box-shadow: 0 1px 0 0 hsla(0,0%,100%,.12);
        margin-bottom: 10px;
    }

    .searchContent .btnGroup{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-bottom: 10px;
        text-align: right;
        padding: 10px 0 ;
    }

     .navbar{
        height: 75px;
        border-bottom: 1px solid rgba(0,0,0,.12);
        box-shadow: 0 1px 0 0 hsla(0,0%,100%,.12);
        margin: 0 auto;
        margin-bottom: 30px;
    }

    .navbar h1.al-title {
        font-weight: 700;
        color: #000;
        float: left;
        width: auto;
        margin: 0;
        padding: 0;
        font-size: 24px;
        opacity: .9;
        padding-top: 17px;
        padding-bottom: 27px;
    }

    .navbar .al-breadcrumb {
        background: 0 0;
        color: #000;
        margin: 0;
        float: right;
        margin-top: 13px;
    }

    .navbar .al-breadcrumb li {
        font-size: 18px;
        font-weight: 400;
    }

    .navbar .breadcrumb>li, .pagination {
        display: inline-block;
    }
    
    .breadcrumb>li+li:before {
        padding: 0 5px;
        color: #ccc;
        /* content: "/\00a0"; */
        content: "/";
    }

	.formStyle{
		margin: 0 auto;
	}

</style>
