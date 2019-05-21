<template>
	<div>
		<div class="selectList" v-show="data.length == 0?false:true">
			<ul>
				<li @click.stop="selectItem(item)" v-for="(item,index) in data" :key="index" :class="item.cls">{{item[displayName]}}</li>
			</ul>
		</div>
		<div class="selectList" v-show="searchKey && data.length == 0?true:false">
			<ul>
				<li style="text-align:center">无数据</li>
			</ul>
		</div>
	</div>
</template>

<script>

  export default {
    name: 'BottomSection',
    props:['data','noticeParent','searchKey','displayName'],
    data () {
		return {
			
		}
    },
    methods:{
      selectItem:function(item){
          this.noticeParent(item);
      }
    }
  }
</script>

<style scoped>
.fa-check:before {
    content: "\F00C";
    position: absolute;
    right: 10px;
}
.selectList li{
		width: 100%;
	font-size: 14px;
	padding: 0 20px;
	position: relative;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #606266;
	height: 34px;
	line-height: 34px;
	box-sizing: border-box;
	cursor: pointer;
}

.selectList li:hover{
	background-color: #f5f7fa
}

.selectList li i{
	display: inline-block;
	position: absolute;
	top: 0;
	right: 5px;
	width: 16px;
	height: 100%;
	font-size: 12px;
}

.selectList li.active{
	color: #409eff;
}

.selectList li.active i{
	color: #409eff;
}
</style>
