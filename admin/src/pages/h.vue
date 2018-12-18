
<template>
    <div>
        <div>Step 1:选择项目:
            <select v-model="project.selectProject">
                <option v-for="(item,index) in project.projects" :key="index" :value="item.value">{{item.name}}</option>
            </select>
            <!-- <local-select ref="ss" displayName="name" displayValue="value"></local-select> -->
        </div>

        <div>
            Step 2:配置属性
            <input type="button" value="添加字段" @click="add" />

            <div>
                <div>
                    
                </div>
            </div>
        </div>

        <input type="button" value = "Strat" @click="start()"/>
        <input type="button" value = "Stop" @click="stop()"/>

        <!-- <input type="text" v-model="path" />

        <input type="button" value="创建模块" @click="create" placeholder="自动创建view，api，store" /> -->
    </div>
</template>

<script>

let recorder = null;

import $ from "jquery";

export default {
    components:{},
    name:"H",
    data(){
        return {
            project:{
                selectProject:"",
                projects:[],
            },
            config:{
                fieldTypes:[
                    {name:"text",value:"text"},
                    {name:"select",value:"select"},
                    {name:"checkbox",value:"checkbox"},
                    {name:"datepicker",value:"datepicker"},
                ],
               cols:[
                   {name:"",key:"",fieldType:"",isConvert:false,displayName:"",displayValue:"",showSearch:false}
               ]
            },
            path:""
        }
    },
    computed:{

    },
    methods:{
        startUserMedia(stream){
            let audio_context = new AudioContext();
            let input = audio_context.createMediaStreamSource(stream);
            recorder = new Recorder(input);
            console.log('Recorder initialised.');
        },
        start(){
            recorder.clear();
            recorder.record();
            console.log('Recording...');
        },
        stop(){
            let that = this;
            recorder.stop();
            let params = {
                "param-data":"dtp=lenovo/leSumsung/android&ver=1.0.0&did=83102d26aaca24ba&uid=30323575&stm=0&key=a&ssm=true&vdm=music&rvr=&sce=cmd&ntt=wifi&aue=speex-wb;7&auf=audio/L16;rate=16000&dev=lenovo.rt.urc.lv.develop&ixid=1545031939343&pidx=1&over=1&rsts=0&spts=0&fpts=0&cpts=0&lrts=0",
                "appKey":"levoice001",
                "recognition":true,
                "saveFlag": false,
                voiceData:null
            }
            recorder && recorder.exportMonoWAV(function(blob) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(blob, 'utf-8');
                reader.onload = function (e) {
                    var buf = new Uint16Array(reader.result);
                    var buf2=[5,0,0,0];
                    var buf4=new Uint16Array(buf.length+4);
                        buf4[0]=5;
                        buf4[1]=0;
                        buf4[2]=0;
                        buf4[3]=0;
                    for(let i=0;i<buf.length;i++){
                        buf4[i+4]=buf[i];
                    }
                    params.voiceData =  new Blob([buf4]);

                    var formData = new FormData();
                    formData.append("param-data", params["param-data"]);
                    formData.append("voiceData", params.voiceData);
                    formData.append("appKey", params.appKey);
                    formData.append("recognition",params.recognition);
                    formData.append("saveFlag",params.saveFlag);

                    var request = new XMLHttpRequest();
                    var URL = "/api/voice/recognize";
                    request.open("POST", URL);
                    request.onreadystatechange=function() {
                        // updateStatus(request.responseText);
                        console.log("completed");
                    };
                    // var accountid = window.localStorage.getItem('accountid');
                    // var lenkey = window.localStorage.getItem('lenkey');
                    // var secrkey = window.localStorage.getItem('secrkey');
                    // request.setRequestHeader('channel','cloudasr');
                    // request.setRequestHeader('lenovokey',lenkey);
                    // request.setRequestHeader('secretkey',secrkey);
                    request.send(formData);
                }
            });
        },
        getProjects(){
            this.ajax.getFetch("/comp/getProjects").then(d=>{
                let result = [{name:"请选择",value:""}];
                d.data && d.data.split('\r\n').forEach(item => {
                    result.push({name:item.substring(item.lastIndexOf('/')+1),value:item});
                });
                this.project.projects = result;
                this.$refs['ss'].init(result);
            })
        },
        add(){

        },
        create(){
            if(!this.path || !this.selectProject){
                this.alert.showAlert("warning","必须输入项目和模块名称!");
                return;
            }
            this.ajax.postFetch("/comp/createModule",{moduleName:this.path,projectPath:this.selectProject}).then(d=>{
                this.alert.showAlert("success","新增成功!");
            },r=>{
                this.alert.showAlert("warning",r.data);
            }).catch(e=>{
                this.alert.showAlert("error",e);
            })
        }
    },
    mounted(){
        this.getProjects();

        navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
            __log('No live audio input: ' + e);
        });

    }
}
</script>
<style>

</style>
