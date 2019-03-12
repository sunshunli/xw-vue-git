

import LeButton from "./button/button.vue";
import LeCheckboxList from "./checkbox/checkboxList.vue";
import LeRadioList from "./radio/radioList.vue";
import VInput from "./input/vInput.vue";
import AutoComplete from "./input/autoComplete.vue";
import LocalSelect from "./select/localSelect.vue";
import TableList from "./table/tableList.vue";
import FileUpload from "./upload/upload.vue";
import LeAsynTree from "./tree/asynTree.vue";
import LeForm from "../comps/input/form.vue";

import ValidataHOC from "./validataHOC.js";

export default{
    install:function(Vue){
        Vue.component('LeButton',LeButton);
        Vue.component('LeCheckboxList',LeCheckboxList);
        Vue.component('LeRadioList',ValidataHOC(LeRadioList));
        Vue.component('VInput',ValidataHOC(VInput));
        Vue.component('AutoComplete',AutoComplete);
        Vue.component('LocalSelect',LocalSelect);
        Vue.component('TableList',TableList);
        Vue.component('FileUpload',FileUpload);
        Vue.component('LeAsynTree',LeAsynTree);
        Vue.component('LeForm',LeForm);
    }
}


//父类
var Parent = function(){

    this.msg = "";
    this.showMsgTag = false;
    this.validataFn = function(){

    }

    this.showMsg = function(flag){
        this.showMsgTag = flag;
    }
}

//input
var SubInput = function(){
    Parent.apply(this,[]);

    this.validataFn = function(){
        //todo
    }
}

//radio
var SubRadio = function(){
    Parent.apply(this,[]);

    this.validataFn = function(){
        //todo
    }
}