
let KEYS = {
    INITATTRIBUTE(data,currentNode,isOrigin){
        if(data && data instanceof Array && data.length != 0){
            data.forEach(element=>{
                element.__tmpId = Math.ceil(Math.random()*10000000000000);
                element.hasChildren = false;
                element["children"] = [];
                // element[this.childrenKey] = [];
                element.cls = "fa-caret-right";
                element['level'] = isOrigin?1:currentNode.level + 1;
                element.expand = false;
                element.parentId = -1;
                element.color = "";
            })
            return data;
        }
        return [];
    },
    ACTIONKEY:{
        OPEN:"open",
        UPDATECHILDREN:"updateChilden",
        CHECK:"check",
        SELECTEDITEM:"selectedItem"
    }
}

export default KEYS;