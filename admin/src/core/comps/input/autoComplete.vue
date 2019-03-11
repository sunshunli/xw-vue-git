<template>
    <div>
        <input type="text" v-model='val' v-on:input="changeEvent" />
    </div>
</template>

<script>
import $ from "jquery";
import CommonUtil from "../../tool/commonUtil.js";
const Ctl = function(){

    this.promises = [];

    this.add = function(key,promise){
        this.promises.push({key:key,promise:promise});
    }

    this.doAjax=function(){
        let val = this._vue.val;
        let _promise = this._vue.ajax.getFetch(this._vue.getUrl() + this._vue.val);
        this.add(val,_promise);
    }

    this.setInstance = function(instance){
        this._vue = instance;
    }

    this.doIt = function(){
        CommonUtil.object.throttle(this.doAjax,this);
    }
}

let ctl = new Ctl();

export default {
    name:"ChangeInput",
    props:["getUrl"],
    data(){
        return {
            val:"",
        }
    },
    methods:{
        changeEvent(e){
            ctl.doIt();
            window.setTimeout(d=>{
                this.$emit("change",ctl.promises[ctl.promises.length -1]);
            },100)
        }
    },
    mounted(){
        ctl.setInstance(this);
    },
    beforeDestroy(){
        ctl = null;
    }
}
</script>

<style>

</style>
