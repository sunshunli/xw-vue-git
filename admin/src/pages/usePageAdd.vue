

<template>
    <div class="searchContent">
        <div class="navbar clearfix">
            <h1 class="al-title ng-binding" id="crumbsTitle">页面推广</h1>
            <ul class="breadcrumb al-breadcrumb" id="crumbs"><li>XW-VUE-GIT</li><li>UsePage</li><li>Add</li></ul>
        </div>
           
        <le-form ref="form1" style="width:600px">

            <v-input label="推广地址"  msg="推广地址必填" ref="tgdz" type="text" on required></v-input>

            <v-input label="原地址" ref="ydz" msg="原地址必填" on required></v-input>

            <v-input label="失效默认地址"  ref="sxdz" msg="失效默认地址必填" vtype="text" on required></v-input>

            <le-date-time-picker label="开始时间" msg="开始时间必填" ref="dt1" on required></le-date-time-picker>
            
            <le-date-time-picker label="结束时间" msg="结束时间必填" ref="dt2" on required></le-date-time-picker>

            <le-radio-list label="性别" ref="sex" display-name="name" msg="单选框必填" display-value="code" on required></le-radio-list>

            <le-checkbox-list label="爱好" @change='changecks' ref='hobby' display-name="name" msg="复选框必填1" display-value="code" on required></le-checkbox-list>
        

            <le-local-select label="模糊搜索" multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select> 

            <le-upload msg='图片必须上传' :options="uploadOptions" label="文件上传"></le-upload>    

            <le-local-select ref="s2" display-name="name" msg="下拉框必填" display-value="code" @change="reloadTree"></le-local-select>  
            <le-asyn-tree displayName="name" :asynOptions="asynOptions" ref="tree1" :itemClick="itemClick" checkbox></le-asyn-tree>

            <le-button value="Form提交" @click="submit('form1')"></le-button>
        </le-form>
    </div>
</template>

<script>
import Unit from "../core/tool/commonUtil.js";
export default {
    name:"demoValidate",
    data(){
        return {
            changecks:true,
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
                    var that =this;
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
        submit(){
            let res = this.$refs["form1"].validate();
            res.then(d=>{
                var that = this;
                var param1 = {
                    tanentId: 12,
                    siteId: '9f746cfa-b5e8-49ab-82d6-86cbedce8119',
                    proxyUri:that.$refs['tgdz'].$children[0].vValue,
                    targetUrl: that.$refs['ydz'].$children[0].vValue,
                    defaultUrl: that.$refs['sxdz'].$children[0].vValue,
                    beginTimeWapper: that.$refs['dt1'].$children[0].getValue(),
                    endTimeWapper: that.$refs['dt2'].$children[0].getValue(),

                    sex:that.$refs['sex'].$children[0].setValue('1'),
                    hobby:that.$refs['hobby'].$children[0].getValue(),
                    localSelect:that.$refs['s1'].$children[0].getValue(),
                    curSelectTreeItem : that.selectNode
                };
                
                Unit.http('/spread/siteSpread/add',"post",param1).then(d=>{
                    console.log(d)
                    var that = this;
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
            console.log(item)
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
                var that = this;
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
            {name:"aaa",code:"1"},
            {name:"aaa1",code:"1"},
            {name:"aaa2",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ];

        this.ajax.getFetch("/auth/dict/getdictmap?keys=MallType,TreeType").then(d=>{
            var that = this;
            var _TreeType = [];
            for(var item in d.data.TreeType){
                _TreeType.push({code:item,name:d.data.TreeType[item]})
            }
            that.$refs["s2"].getCurrentComponent().init(Unit.object.cloneObj(_TreeType));
            that.$refs["s2"].setValue(_TreeType[0]);
            that.$refs["tree1"].init(d.data);
            that.selectNode = d.data[0];
        }).catch(e=>{
            this.alert.showAlert("error",e.data);
        })

        this.$refs["s1"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["sex"].getCurrentComponent().init(Unit.object.cloneObj(data));
        this.$refs["hobby"].getCurrentComponent().init(Unit.object.cloneObj(data));

        this.$refs['sex'].$children[0].setValue('1');
        this.getTreeData(17)
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
