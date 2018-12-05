<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>

        <a @click="e=>{this.SET('aaaaa')}">Change</a>
      </li>
    </ul>
    <input type="button" @click="search" value="search" />

    <table-list :ref="tk" :options="optionsTable"></table-list>

    <file-upload fname="excel" vtype="doc,docx,img" completed-callback="uploadCb" url="/api/order/upload/otherrefund/upload.jhtm"></file-upload>
  </div>
</template>

<script>
  import TableList from "../core/comps/table/tableList.vue";
  import AuthHOC from "../components/authHOC/authHoc"
  import commonUtil from '../core/tool/commonUtil';
  import AjaxUtil from "../core/tool/ajaxService";
  import FileUpload from "../core/comps/upload/upload.vue";

  export default {
    extends:AjaxUtil,
    name: 'HelloWorld',
    components: {TableList,FileUpload},
    // mixins: [AuthHOC],
    data () {
      return {
        uploadName:"excel",
        tk:"abc",
        msg: 'Welcome to Your Vue.js',
        optionsTable:{
            actions :[
                  {key:"edit",val:"修改",action:this.cCount},
                  {key:"run",val:"Run"}
              ],
              showCk:true,
              map:[
                  {key:"describe",val:"测试用例描述"},
                  {key:"operator",val:"操作人"},
                  {key:"runTime",val:"操作时间",type:"time"},
                  {key:"before",val:"提交方式",convert:this.cCount},
                  {key:"before.isBefore",val:"isBefore"},
                  {key:"items.length",val:"个数",action:this.aCount},
              ],
              getUrl:()=>{
                  return "/api/at/list?describe=";
              },
              pageOption:{
                  sizeKey:"size",
                  indexKey:"index",
                  index:1,
                  size:10
              },
              analysis:(data)=>{
                  return {
                      data:data.data.data,
                      count:data.data.count
                  };
              }
          },
        data1:{
            name:"xxxxx"
        }
      }
    },
    methods:{
      uploadCb:function(data){

      },
      RESET:function (e) {
          this.data1 = e;
      },
      aCount:function(row,item){
        debugger
          // alert(row.__tmpId);
      },
      cCount:function(item,row){
          console.log(row.before.beforeType);
          return row.before.beforeType;
      },
      search:function(){
        let tk = this.$refs[this.tk];
        tk.search(tk.getParams().index);
      }
    },
    mounted:function () {
      this.getFetch("/api/at/list?describe=")
    },
    created(){

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .red{
    color:red;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
