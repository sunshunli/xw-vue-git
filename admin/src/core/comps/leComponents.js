
import LeButton from "./button/button.vue";
import LeCheckboxList from "./checkbox/checkboxList.vue";
import LeRadioList from "./radio/radioList.vue";
import VInput from "./input/vInput.vue";
import LeLocalSelect from "./select/localSelect.vue";
import TableList from "./table/tableList.vue";
import LeUpload from "./upload/upload.vue";
import LeAsynTree from "./tree/asynTree.vue";
import LeLocalTree from "./tree/localTree.vue";
import LeForm from "../comps/form/form.vue";
import LeDatePicker from "../comps/datepicker/date.vue";
import LeTimePicker from "../comps/datepicker/time.vue";
import LeDateTimePicker from "../comps/datepicker/datetime.vue";
import LeDialog from "../comps/dialog/dialog.vue";

import ValidataHOC from "./validataHOC.js";

export default{
    install:function(Vue){
        Vue.component('LeButton',LeButton);
        Vue.component('LeCheckboxList',ValidataHOC(LeCheckboxList));
        Vue.component('LeRadioList',ValidataHOC(LeRadioList));
        Vue.component('VInput',ValidataHOC(VInput));
        Vue.component('LeLocalSelect',ValidataHOC(LeLocalSelect));
        Vue.component('TableList',TableList);
        Vue.component('LeUpload',ValidataHOC(LeUpload));
        Vue.component('LeAsynTree',LeAsynTree);
        Vue.component('LeLocalTree',LeLocalTree);
        Vue.component('LeDatePicker',ValidataHOC(LeDatePicker));
        Vue.component('LeTimePicker',ValidataHOC(LeTimePicker));
        Vue.component('LeDateTimePicker',ValidataHOC(LeDateTimePicker));
        Vue.component('LeDialog',LeDialog);
        Vue.component('LeForm',LeForm);
    }
}