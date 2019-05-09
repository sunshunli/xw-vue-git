let ASYNTREE_CONFIG = {
    /**
     * @description 初始化数据源，添加自定义属性，根节点__parentId:-1，初始化__level:1
     * @param data:需要初始化的数据源数组，必填
     * @param currentNode:当前节点，根节点时传入null
     * @param isRoot:是否根节点
     */
    INITATTRIBUTE(data,currentNode,isRoot){
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

let DEFINE_KEY = {
    ASYNTREE_CONFIG:ASYNTREE_CONFIG
}

export default DEFINE_KEY;