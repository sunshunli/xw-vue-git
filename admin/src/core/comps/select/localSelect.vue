<template>

    <div style="position:relative">
        <div class="searchMulSelect" :class="borderCls" @click.stop="focusInput">
			<!--选中的标签-->
			<div class="tags">
				
				<left-section :display-name="displayName" :data="datas.leftArray" :notice-parent="noticeFromLeft"></left-section>
				
				<input ref="inputdom" @click.stop="clickInput" type="text" class="searchMsg" @input="inputChange" v-model="datas.searchName" />
			</div>
		</div>
		
		<!--下拉弹出框-->
		<bottom-section :display-name="displayName" :searchKey="datas.searchName" :data="datas.bottomArray" :notice-parent="noticeFromBottom"></bottom-section>
    
        <p class="text-center" v-show="state.showError">{{$attrs.msg}}</p>
    </div>
</template>

<script>
  import CommonUtil from '../../tool/commonUtil.js';
  import LeftSection from "./left.vue";
  import BottomSection from "./bottom.vue";

  export default {
    name: 'LeLocalSelect',
    props:["multiple","displayName","displayValue"],
    components: {LeftSection,BottomSection},
    data () {
        return {
            validataComponentType:"Radio",
            state:{
                showError:false,
            },
            borderCls:"",
            data:[],
            datas:{
                searchName:"",
                bottomArray:[],
                leftArray:[],
            }
        }
    },
    computed:{
        /**
         * @description 根据传递过来的数据源，深度clone一个源数据
         */
        originData(){
            let tmp = CommonUtil.object.cloneObj(this.data);
            if(tmp && tmp instanceof Array){
                return CommonUtil.object.addPrimaryAndCk(tmp);
            }
            return [];
        }
    },
    methods:{
        /**
         * @description 点击整体div，触发焦点到input框上面(输入框初始宽度不够)
         * @returns
         */
        focusInput(){
            this.$refs["inputdom"].focus();
            this.borderCls = "blueborder";
            this.clickInput();
        },
        /**
         * @description 输入框的点击事件
         * @returns
         */
        clickInput(){
            if(this.datas.searchName == ""){
                this.datas = {
                    searchName:"",
                    bottomArray:[],
                    leftArray:this.datas.leftArray
                }
            }else{
                this.datas.bottomArray = this.fliterOriginData();
            }
        },
        /**
         * @description 搜索框的change事件，并且需要动态改变input框的宽度
         * @returns
         */
        inputChange(){
            let offsetWidth = parseInt(this.$refs["inputdom"].offsetWidth);
            this.$refs["inputdom"].style.width = (offsetWidth + 5) + "px";
            this.datas.bottomArray = this.fliterOriginData();
        },
        /**
         * @description 根据输入关键字来搜索
         * @returns 查询后的Array
         */
        fliterOriginData(){
            return this.originData.filter(item=>{
                return item[this.displayName].indexOf(this.datas.searchName) != -1;
            })
        },
        /**
         * @description 设置数据源
         * @param data 设置数据源, 必须在组件上面配置displayName 和 displayValue
         * @returns 
         */
        init(data){
            this.data = data;
        },
        /**
         * @description 更新数据源，更新完后分发到2个子组件
         * @returns
         */
        updateDataSource(item){
            this.datas = {
                searchName:"",
                bottomArray:this.originData,
                leftArray:CommonUtil.object.getCheckedItems(this.originData).items
            }

            this.$emit("change",this.getSelectedItems());
        },
        /**
         * @description bottom组件发来的更新通知,更新数据源
         * @returns
         */
        noticeFromBottom(item){
            //多选
            if(this.multiple){
                if(item.ck){
                    item.ck = false;
                    item.cls = "";
                }else{
                    item.ck = true;
                    item.cls = "active";
                }
            }else{
                //单选
                this.originData.forEach(el=>{
                    el.ck = false;
                    el.cls = "";
                })
                item.ck = true;
                item.cls = "active";
            }
            this.updateDataSource(item);
        },
        /**
         * @description left组件发来的更新通知，更新数据源
         * @returns
         */
        noticeFromLeft(item){
            item.ck = false;
            item.cls = "";
            this.updateDataSource(item);
        },
        /**
         * @description 点击其他地方的时候,隐藏buttom组件并重置边框样式
         */
        bodyClick(){
            this.datas = {
                searchName:"",
                bottomArray:[],
                leftArray:CommonUtil.object.getCheckedItems(this.originData).items
            }
            this.borderCls = "";
        },
        /**
         * @description 获取所选项
         * @returns items:所选的对象数组，vals:所选的值集合
         */
        getSelectedItems(){
            return CommonUtil.object.getCheckedItems(this.originData,this.displayValue);
        },
        getValue(){
            return this.getSelectedItems().vals.join(',');
        },
        setValue(){
            
        },
        /**
         * @description 清空
         * @returns 
         */
        clear(){
            this.borderCls = "";
            this.data = [];
        }
    },
    mounted () {
        /**
         * @description 添加时间监听
         * @returns
         */
        document.body.addEventListener("click",this.bodyClick,false);
    },
    beforeDestroy () {
        /**
         * @description 在组件销毁之前，取消事件监听
         * @returns
         */
        document.body.removeEventListener("click",this.bodyClick);
    }
  }
</script>

<style>
    .blueborder{
        border-color:#409eff !important;
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
	    width: 280px;
        cursor: pointer;
        margin-left: 8px;
        margin-top: 8px;
	}
	
	.searchMulSelect input:focus{
		border-color: #409EFF;
	}
	
    .selectList{
		min-width: 280px;
	    transform-origin: center top 0px;
	    z-index: 2270;
	    position: absolute;
	    top: 48px;
	    left: 8px;
	    border: 1px solid #e4e7ed;
	    border-radius: 4px;
	    background-color: #fff;
	    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	    box-sizing: border-box;
	    margin: 5px 0;
	}
	
	.searchMulSelect .tags{
		max-width: 100%;
		position: absolute;
	    line-height: normal;
	    white-space: normal;
	    z-index: 1;
	    top: 5px; 
	}
	
	.searchMulSelect .searchMsg{
		outline: none;
	    margin-left: 5px;
	    color: #666;
	    font-size: 14px;
	    border:none;
	    padding: 0 5px;
	    height: 28px;
	    background-color: transparent;
	    width: 40px;
	    vertical-align: top;
	}

</style>
