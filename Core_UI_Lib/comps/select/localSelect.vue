<template>

    <div style="position:relative" class="form-item selectContent">
        <label class="form-item-label" :class="$attrs.on!=undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div searchMulSelect" :class="state.successIcon" @click.stop="focusInput">
			<!--选中的标签-->
			<div class="tags" :class="{readonlyIcon:readonlyFlag}" @mouseenter="showArr" @mouseleave="hideArr">
                <i :class="inputIcon" class="fa fa-chevron-down icon-del" @click.stop="clear"></i>

				<left-section :readonly="readonlyFlag" :display-name="displayName" :data="leftArray" :notice-parent="noticeFromLeft"></left-section>
				
				<input ref="inputdom" @click.stop="clickInput" :readonly=" !inputFlag || readonlyFlag" type="text" class="searchMsg" @input="inputChange" v-model="searchName" />
			
                <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            </div>

            <!--下拉弹出框-->
            <buttom-section :show-buttom="showButtom" :display-name="displayName" :searchKey="searchName" :data="buttomArray" :notice-parent="noticeFromButtom"></buttom-section>
        </div>
    </div>
</template>

<script>
    import tool from '../leCompsTool.js';
    import LeftSection from "./left.vue";
    import ButtomSection from "./buttom.vue";

    const getItemByDisplayValue = (data,displayValue,value)=>{
        let res = null;
        data.forEach(item=>{
            if(item[displayValue] != null && item[displayValue] != undefined && item[displayValue].toString() == value){
                res = item;
            }
        })
        return res;
    }

  export default {
    name: 'LeLocalSelect',
    props:["multiple","displayName","displayValue","value","dataSource","readonly","enabledInput"],
    components: {LeftSection,ButtomSection},
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data () {
        return {
            validataComponentType:"Radio",
            state:{
                successIcon:"",
                showError:false,
            },
            searchName:"",
            data:[],
            showButtom:false,
            inputIcon:'',
        }
    },
    computed:{
        /**
         * @description 根据输入关键字来搜索
         * @returns 查询后的Array
         */
        buttomArray(){
            if(this.searchName != ""){
                return this.data.filter(item=>{
                    return item[this.displayName].indexOf(this.searchName) != -1;
                })
            }
            return this.data;
        },
        leftArray(){
            return tool.object.getCheckedItems(this.data).items;
        },
        readonlyFlag(){
            if(this.readonly == undefined){
                return false;
            }
            if(this.readonly === ""){
                return true;
            }
            if(this.readonly === false){
                return false;
            }
            return true;
        },
        //是否允许模糊查询，默认不开启
        inputFlag(){
            if(this.enabledInput == undefined){
                return false;
            }
            if(this.enabledInput == ""){
                return true;
            }
            if(this.enabledInput == false){
                return false;
            }
            return true;
        }
    },
    watch:{
        value(val){
            this.setValue(val);
        },
        dataSource(val){
            if(val && val.length >0){
                this.init(val);
                this.setValue(this.value);
            }
        }
    },
    methods:{
        /**
         * @description 点击整体div，触发焦点到input框上面(输入框初始宽度不够)
         * @returns
         */
        focusInput(){
            if(this.readonlyFlag){
                return;
            }
            this.$refs["inputdom"].focus();
            this.clickInput();
        },
        /**
         * @description 输入框的点击事件
         * @returns
         */
        clickInput(){
            if(this.readonlyFlag){
                return;
            }
            if(this.data.length != 0){
                this.showButtom = true;
            }
        },
        /**
         * @description 搜索框的change事件，并且需要动态改变input框的宽度
         * @returns
         */
        inputChange(){
            let offsetWidth = parseInt(this.$refs["inputdom"].offsetWidth);
            this.$refs["inputdom"].style.width = (offsetWidth + 5) + "px";
        },
        /**
         * @description 设置数据源
         * @param data 设置数据源, 必须在组件上面配置displayName 和 displayValue
         * @returns 
         */
        init(data){
            let tmp = tool.object.cloneObj(data);
            this.data = tool.object.addPrimaryAndCk(tmp);
        },
        /**
         * @description 组件验证以及分发change事件
         * @returns
         */
        onEmit(){
            let selectedItems = this.getSelectedItems();
            if(selectedItems.vals.length != 0){
                let vals = selectedItems.vals.join(',');
                this.$emit("input",vals);
                this.$emit("change",vals);
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            }
        },
        /**
         * @description buttom组件发来的更新通知,更新数据源
         * @returns
         */
        noticeFromButtom(item){
            //多选
            if(this.multiple != undefined){
                item.ck = !item.ck;
                item.cls = !item.ck?"":"active fa fa-check"
            }else{
                //单选
                this.data.forEach(el=>{
                    el.ck = false;
                    el.cls = "";
                })
                item.ck = true;
                item.cls = "active fa fa-check";

                this.showButtom = false;
            }
            this.searchName = "";
            this.onEmit();
        },
        /**
         * @description left组件发来的更新通知，更新数据源
         * @returns
         */
        noticeFromLeft(item){
            if(this.readonlyFlag){
                return;
            }
            item.cls = "";
            item.ck = false;
            this.onEmit();
        },
        /**
         * @description 点击其他地方的时候,隐藏buttom组件并重置边框样式
         */
        bodyClick(){
            this.showButtom = false;
        },
        /**
         * @description 获取所选项
         * @returns items:所选的对象数组，vals:所选的值集合
         */
        getSelectedItems(){
            return tool.object.getCheckedItems(this.data,this.displayValue);
        },
        /**
         * @description 获取选中项的displayValue的集合
         * @returns {String} 逗号分隔的字符串
         */
        getValue(){
            if(this.data.length ==0){
                return "";
            }
            return this.getSelectedItems().vals.join(',');
        },
        /**
         * @description 设置选中项
         * @param {ids} displayValue的集合, 逗号分隔, 如果传入空，则重置所有
         */
        setValue(ids){
            ids?ids = ids.toString():ids="";
            //重置
            this.data.forEach(item=>{
                item.cls = "";
                item.ck = false;
            })
            ids && ids.split && ids.split(',').forEach(val=>{
                let tmp = getItemByDisplayValue(this.data,this.displayValue,val);
                if(tmp){
                    tmp.cls = "active fa fa-check";
                    tmp.ck = true;
                }
            })
        },
        /**
         * @description 清空
         * @returns 
         */
        clear(){
            if(this.readonlyFlag){
                return;
            }
            this.searchName = "";
            this.$emit("input","");
            this.showButtom = false;
            window.setTimeout(()=>{
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },0)
        },
        hideArr(){
            this.inputIcon = "";
        },
        showArr(){
            if(this.leftArray.length > 0){
                this.inputIcon = "fa-times-circle";
            }else{
                this.inputIcon = "";
            }
        },
    },
    mounted(){
        /**
         * @description 添加事件监听
         * @returns
         */
        document.body.addEventListener("click",this.bodyClick,false);
        //在有数据的清空下，直接初始化数据源以及设置值   
        if(this.dataSource && this.dataSource.length >0){
            this.init(this.dataSource);
        }
        this.setValue(this.value);
    },
    beforeDestroy(){
        /**
         * @description 在组件销毁之前，取消事件监听
         * @returns
         */
        document.body.removeEventListener("click",this.bodyClick);
    }
  }
</script>
<style scoped>
    .blueborder{
        border-color:#409eff !important;
    }
    
    .selectContent{
        position: relative;
        text-align: left;
        margin-bottom: 22px;
        display: inline-block;
    }
    
    .selectContent label{
        text-align: right;
        color: #606266;
        display: inline-block;
    }

    .medium .selectContent label{
        display: inline-block;
    }

    .searchMulSelect{
		position: relative;
	    background-color: #fff;
	    background-image: none;
	    border-radius: 4px;
	    border: 1px solid #dcdfe6;
	    box-sizing: border-box;
	    color: #606266;
	    outline: none;
	    display: inline-block;
	    font-size: inherit;
	    height: 40px;
	    line-height: 40px;
	    padding: 0 5px;
	    width:180px;
        cursor: pointer;
        margin: 0;
        vertical-align: middle;
	}
	
	.searchMulSelect input:focus{
		border-color: #409EFF;
	}
	
	.searchMulSelect .tags{
		width: 100%;
        height: 100%;
        position: absolute;
        line-height: normal;
        white-space: normal;
        z-index: 1;
        top: 0;
        left: 0;
	}

    .searchMulSelect .tags.readonlyIcon{
        background-color: #f1f1f1;
    }
	
	.searchMulSelect .searchMsg{
		outline: none;
	    margin-left: 5px;
	    color: #666;
	    font-size: 14px;
	    border:none;
	    padding: 0 5px;
	    height: 100%;
        line-height: 100%;
	    background-color: transparent;
	    width: 40px;
	    vertical-align: top;
    }
    
    .tags .icon-del{
        position: absolute;
        top: 12px;
        right: 8px;
        color: #c0c4cc;
        font-weight: normal;

    }

    .searchMulSelect.fa-check-circle-o {
        border: 1px solid #67c23a;
    }

    .searchMulSelect.fa-times-circle-o {
        border: 1px solid #f56c6c;
    }

    .form-item .form-item-div{
        width: 100%;
            flex: 1;
        min-width: 130px;
    }

    .promptMsg{
        font-size: 12px;
        color: #f56c6c;
        line-height: 20px;
        text-align: left;
        position: absolute;
        margin: 0;
    }

    /* .tags .fa-angle-down:hover::before{
            content: "\F057";
    } */

    .searchMulSelect .fa-chevron-down.fa-times-circle:before{
        content: "\F057";
    }


</style>