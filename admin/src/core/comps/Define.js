let TREE_CONFIG = {
    /**
     * @description 初始化数据源，添加自定义属性，根节点__parentId:-1，初始化__level:1
     * @param data:需要初始化的数据源数组，必填
     * @param currentNode:当前节点，根节点时传入null
     * @param isRoot:是否根节点
     */
    ASYNINITATTRIBUTE(data,currentNode,isRoot){
        if(data && data instanceof Array && data.length != 0){
            data.forEach(element=>{
                element.__tmpId = _idSeed.newId();
                element.__hasChildren = false;
                element.__children = [];
                element.__cls = "fa-caret-right";
                element.__level = isRoot?1:currentNode.__level + 1;
                element.__expand = false;
                element.__parentId = isRoot?-1:currentNode.__tmpId;//根节点的__parentId:-1
                element.__color = "";
                element.__checkboxStatus = false;
            })
            return data;
        }
        return [];
    },
    /**
     * @description 每个操作的KEY
     * @param OPEN: 当前节点有children的情况下，展开事件
     * @param UPDATECHILDREN: 当前节点的无children的情况下，请求ajax事件
     * @param SELECTEDITEM: 当前项选中事件，执行callback
     * @param CHECKBOX: checkbox状态变化事件
     */
    ACTIONKEY:{
        OPEN:"open",
        UPDATECHILDREN:"updateChilden",
        SELECTEDITEM:"selectedItem",
        CHECKBOX:"checkbox"
    }
}

let BUTTON_CONFIG = {
    "down":{cls:"submit",iCls:"fa-cloud-download"},
    "upload":{cls:"submit",iCls:"fa-cloud-upload"},
    "create":{cls:"add",iCls:"fa-file"},
    "delete":{cls:"delete",iCls:"fa-trash-o fa-lg"},
    "submit":{cls:"submit",iCls:"fa-check"},
    "back":{cls:"back",iCls:"fa-rotate-left"},
    "search":{cls:"search",iCls:"fa-search"},
    "edit":{cls:"add",iCls:"fa-edit"},
    "play":{cls:"start",iCls:"fa-play"},
    "stop":{cls:"stop",iCls:"fa-stop"},
    "info":{cls:"info",iCls:"fa-info-circle"},
    "setting":{cls:"back",iCls:"fa-cog"},
    "default":{cls:"default",iCls:""}
}

let ALERT_CONFIG = {
    SHOW_ALERT_CLS_TYPE:{
        "success":{cls:"msgSucces",iCls:"fa fa-check-circle"},
        "warning":{cls:"msgWarning",iCls:"fa fa-exclamation-circle"},
        "info":{cls:"msgInfo",iCls:"fa fa-info-circle"},
        "error":{cls:"msgError",iCls:"fa fa-times-circle"},
        "default":{cls:"msgSucces",iCls:"fa fa-check-circle"}
    },
    SHOW_NOTICE_CLS_TYPE:{
        "success":{cls:"noticeSucces",iCls:"fa fa-check-circle"},
        "warning":{cls:"noticeWarning",iCls:"fa fa-exclamation-circle"},
        "info":{cls:"noticeInfo",iCls:"fa fa-info-circle"},
        "error":{cls:"noticeError",iCls:"fa fa-times-circle"},
        "default":{cls:"noticeSucces",iCls:"fa fa-check-circle"}
    },
    ALERT_CLOSE_TIME:2000,
    NOTICE_CLOSE_TIME:3000
}

let DATE_TIME_PICKER_CONFIG = {
    WEEK:["一","二","三","四","五","六","日"],
    HOUR:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""}],
    MINUTE:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}],
    SECOND:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}]

}

let INPUT_VALIDATA_TYPES = {
    TYPES:{
        //数字或小数
        decimals:'^[0-9]+\.{0,1}[0-9]{0,2}$',
        //只能输入数字
        number:'^[0-9]*$',
        //正整数
        positive:'(^[1-9]\d*$)',
        //正小数
        positiveDecimals:'^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$',
        //负小数
        negativeDecimals:'^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$',
        //负整数
        negative:'^\-[1-9][0-9]*$',
        //汉字
        characters:'^[\u4e00-\u9fa5],{0,}$',
        //emai
        email:'^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$',
        //url
        url:'^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$ ；^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$',
        //身份证
        id:'^\d{15}|\d{}18$',
        //手机号
        phone:'^[1][3,4,5,7,8][0-9]{9}$',
        //密码, 字母开头 长度6-18，只能包含字符 数字 和 下划线
        password:'^[a-zA-Z]\w{5,17}$'
    }
}

let DEFINE_KEY = {
    TREE_CONFIG:TREE_CONFIG,
    BUTTON_CONFIG:BUTTON_CONFIG,
    ALERT_CONFIG:ALERT_CONFIG,
    DATE_TIME_PICKER_CONFIG:DATE_TIME_PICKER_CONFIG,
    INPUT_VALIDATA_TYPES:INPUT_VALIDATA_TYPES
}

export default DEFINE_KEY;