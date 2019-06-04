

<template>
    <div class="searchContent">
        <div class="navbar clearfix">
            <h1 class="al-title ng-binding" id="crumbsTitle">Navigation Management</h1>
            <ul class="breadcrumb al-breadcrumb" id="crumbs"><li>XW-VUE-GIT</li><li>UsePage</li></ul>
        </div>

        <div class="searchItem">
            <v-input label="年龄" type="text" msg="正整数11" vType='number'></v-input>
            <v-input label="身份证号码" vType="number" msg="正整数22"></v-input>
            <le-local-select label="模糊搜索" multiple ref="s1" display-name="name" msg="下拉框必填" display-value="code"></le-local-select>  
            <le-date-time-picker label="时间日期组件" ref="dt1" msg="日期and时间不允许为空"></le-date-time-picker>                       
            <le-time-picker label="时间组件" ref="t1" msg="时间不允许为空"></le-time-picker>
            <le-date-picker label="日期组件" ref="d1" msg="日期不允许为空"></le-date-picker>
        </div>

        <div class="leftBox">
            <le-asyn-tree displayName="name" :asynOptions="asynOptions" ref="tree1" :itemClick="itemClick" checkbox></le-asyn-tree>
        
        </div>

        <div class="rightBox">
            <div class="btnGroup">
                <le-button type="create" value="New" @click="open"></le-button>
                <le-button type="info" value="info" @click="getInfo"></le-button>
            </div>
            <table-list :ref="tk1" :options="options"></table-list>
        </div>


        <le-dialog title="弹出层" height="500" confirm-text="Save" cancel-text="Close" ref='dialog' @click="save">
            <le-form ref="form2" style="width:600px">
            
                <v-input label="名称" ref="name" type="text" on required></v-input>

                <v-input label="链接" ref="link" msg="包含 协议头 https:" on required></v-input>

                 <v-input label="描述" ref="desc" vtype="text"></v-input>

                <v-input label="排序" ref="order" vType="number" msg="提示：大于0的整数" on required></v-input>

                <le-local-select label="是否新窗口打开" ref="s3" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select>
             
                <le-local-select label="是否显示" ref="s4" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select>
             
                <le-local-select label="是否外链" ref="s5" display-name="name" msg="下拉框必填" display-value="code" on required></le-local-select>

                <le-upload msg='图片必须上传' :options="uploadOptions" label="文件上传"></le-upload>                
            </le-form>
        </le-dialog>


    </div>
</template>

<script>
import Unit from "../core/tool/commonUtil.js";
export default {
    name:"demoValidate",
    data(){
        return {
            tbListParams:{},
            selectNode:null,
            showDialogFlag:false,
            asynOptions:{
                getUrl:d=>{
                    if(this.tbListParams.type !== "" && this.tbListParams.type !== null && this.tbListParams.type !== undefined){
                        return "/tree/category/querytreenode?type="+this.tbListParams.type + "&parentId="+this.tbListParams.parentId
                         +"&parentCode="+this.tbListParams.parentCode + "&searchkeys=&sortParam=Order_ASC,CreateTime_DESC"
                    }   
                },
                analysis:d=>{
                    return d.data;
                }
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
                }
            },
            tk1:'demoTableList',
            options:{
                showCk:true,
                getUrl:()=>{
                    if(this.tbListParams.type !== "" && this.tbListParams.type !== null && this.tbListParams.type !== undefined){
                        return "/tree/category/querytreenode?type="+this.tbListParams.type + "&parentId="+this.tbListParams.parentId
                         +"&parentCode="+this.tbListParams.parentCode + "&searchkeys=&sortParam=Order_ASC,CreateTime_DESC"
                    }   
                },
                actions:[
                    {key:"edit",val:"Modify",type:'edit'},
                    {key:"delete",val:"delete",type:'delete',action:this.deleteItem},
                ],
                map:[
                    {key:'name',val:'名称名称名称名称'},
                    {key:'descriptions',val:'分类名称描述'},
                    {key:'level',val:'分类层级'},
                    {key:'createBy',val:'创建时间创建时间'},
                    {key:'col0',val:'链接'},
                    {key:'order',val:'排序'},
                    {key:'code',val:'编码'},
                ],
               
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"currentPage",
                    index:1,
                    size:10
                },
                analysis:(data)=>{
                    if(data.data.length !== 0){
                        return {
                            data:data.data,
                            count:data.data.length
                        };
                    }
                }
            }
        }
    },
    methods:{
        search(){
            let tk = this.$refs[this.tk1];
            tk.search(tk.getParams().index);
        },
        //树的方法
        itemClick(item){
            console.log(item);
            this.selectNode = item;
            this.tbListParams = {
                parentId : item.iD,
                parentCode : item.code,
                type : 17,
            };
            this.search();
        },
        getTreeData(type){
             this.ajax.getFetch("/tree/category/querytreenode?type="+type).then(d=>{
                this.$refs["tree1"].init(d.data);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
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
        getInfo(){
            this.$refs['dialog'].open();
            var item = this.$refs[this.tk1].getCheckedItems();
            console.log(item);
            this.ajax.getFetch("/tree/category/querytreenode?type=17&parentId="+this.selectNode.id+'&code='+item.data[0].code).then(d=>{
                var that = this;
                var data = d.data[0];
                that.$refs['name'].getCurrentComponent().setValue(data.name);
                that.$refs['link'].getCurrentComponent().setValue(data.col0);
                that.$refs['desc'].getCurrentComponent().setValue(data.descriptions);
                that.$refs['order'].getCurrentComponent().setValue(data.order);
                that.$refs['s3'].getCurrentComponent().setValue(data.col1);
                that.$refs['s4'].getCurrentComponent().setValue(data.col2);
                that.$refs['s5'].getCurrentComponent().setValue(data.col4);

            });
        },
        save(){
            let res = this.$refs["form2"].validate();
            res.then(d=>{
                var that = this;
                var param1 = {
                    name: that.$refs['name'].$children[0].vValue,
                    descriptions: that.$refs['desc'].$children[0].vValue,
                    parentId:that.selectNode.id,
                    siteId: that.selectNode.id,
                    tenantId: 1,
                    col0: that.$refs['link'].$children[0].vValue,
                    col1: that.$refs['s3'].$children[0].leftArray[0].code,
                    col2: that.$refs['s4'].$children[0].leftArray[0].code,
                    col3: {},
                    col4: that.$refs['s5'].$children[0].leftArray[0].code,
                    order: 1,
                    type: 17
                    // name: 'zhouuzouzo',
                    // descriptions: '',
                    // parentId: '3ec36007-78af-4530-a931-07e4ff228fb5',
                    // siteId: '3ec36007-78af-4530-a931-07e4ff228fb5',
                    // tenantId: 1,
                    // col0: '',
                    // col1: 1,
                    // col2: 0,
                    // col3: {},
                    // col4: 0,
                    // order: 2,
                    // type: 17
                };
                that.ajax.postFetch("/site/siteMap/add",param1).then(d=>{
                    that.getTreeData(17);
                }).catch(e=>{
                    ththatis.alert.showAlert("error",e.data);
                })
            }).catch((error)=>{
                console.log(error)
            })
        },
        deleteItem(item){
            console.log(item)
        }
    },
    mounted(){
        let data = [
            {name:"aaa",code:"1"},
            {name:"aaa1",code:"1"},
            {name:"aaa2",code:"1"},
            {name:"bbb",code:"2"},
            {name:"ccc",code:"3"},
        ];

        let _newOpen=[{code:"1",name:'<是>'},{code:"0",name:'<否>'}];
        let _links=[{code:"1",name:'<是>'},{code:"0",name:'<否>'}];
        let _isShowOrHide = [{code:"1",name:'<否>'},{code:"0",name:'<是>'}];

        // this.$refs["d1"].getCurrentComponent().setValue("2019-04-23");
        // this.$refs["t1"].getCurrentComponent().setValue("20:40:59");
        // this.$refs["dt1"].getCurrentComponent().setValue("2018-06-21 21:41:51");
        // this.$refs["s1"].getCurrentComponent().init(Unit.object.cloneObj(data));

        // this.$refs["r1"].getCurrentComponent().init(Unit.object.cloneObj(data));
        // this.$refs["cl1"].getCurrentComponent().init(Unit.object.cloneObj(data));
       
       this.$refs["s3"].getCurrentComponent().init(Unit.object.cloneObj(_newOpen));
        this.$refs["s4"].getCurrentComponent().init(Unit.object.cloneObj(_links));
       this.$refs["s5"].getCurrentComponent().init(Unit.object.cloneObj(_isShowOrHide));
       

        this.getTreeData(17);

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

    .leftBox{
        border: 1px solid red;
        float: left;
        width: 20%;
        height: 100%;
        min-height: 500px;
    }
    .rightBox{
        border: 1px solid green;
        float: left;
        width: 78%;
        height: 100%;
         min-height: 500px;
    }

</style>
