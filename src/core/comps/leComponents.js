

import LeButton from "./button/button.vue";
import LeCheckboxList from "./checkbox/checkboxList.vue";
import VInput from "./input/vInput.vue";
import CInput from "./input/cInput.vue";
import LocalSelect from "./select/localSelect.vue";
import TableList from "./table/tableList.vue";
import FileUpload from "./upload/upload.vue";
import LeAsynTree from "./tree/asynTree.vue";

export default{
    install:function(Vue){
        Vue.component('LeButton',LeButton);
        Vue.component('LeCheckboxList',LeCheckboxList);
        Vue.component('VInput',VInput);
        Vue.component('CInput',CInput);
        Vue.component('LocalSelect',LocalSelect);
        Vue.component('TableList',TableList);
        Vue.component('FileUpload',FileUpload);
        Vue.component('LeAsynTree',LeAsynTree);
    }
}