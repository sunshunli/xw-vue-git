

export default  {
    selectDataSource:{
        isSearchDataSource:[
            {name:"",value:"yes"}
        ],
        isRequiredDataSource:[
            {name:"",value:"yes"}
        ],
        isOnDataSource:[
            {name:"",value:"yes"}
        ],
        fieldTypes:[
            {name:"text",value:"text"},
            {name:"select",value:"select"},
            {name:"radioList",value:"radioList"},
            {name:"checkboxList",value:"checkboxList"},
            {name:"asynTree",value:"asynTree"},
            {name:"textarea",value:"textarea"},
            {name:"upload",value:"upload"},
            {name:"datepicker",value:"datepicker"},
            {name:"timepicker",value:"timepicker"},
            {name:"dateTimepicker",value:"dateTimepicker"}
        ],
        valiTypes:[
            {name:"数字或小数",value:"decimals"},
            {name:"数字",value:"number"},
            {name:"email",value:"email"},
            {name:"url",value:"url"},
            {name:"id",value:"身份证"},
            {name:"phone",value:"手机号"},
            {name:"password",value:"密码"},
            {name:"正整数",value:"positive"},
            {name:"正小数",value:"positiveDecimals"},
            {name:"负小数",value:"negativeDecimals"},
            {name:"负数",value:"negative"},
            {name:"汉字",value:"characters"}
        ],
    },
    defaultCol:{
        key:"",
        label:"",
        tip:"",
        placeholder:"",
        type:"",
        valiType:"",
        displayName:"",
        displayValue:"",
        errorMsg:"",
        isSearch:false,
        isRequired:false,
        isOn:false,
        fieldTypes:[],
        valiTypes:[],
        isRequiredDataSource:[],
        isSearchDataSource:[]
    },
    cols:[]
}