
let KEYS = {
    INITATTRIBUTE(data,currentNode,isOrigin){
        if(data && data instanceof Array && data.length != 0){
            data.forEach(element=>{
                element.__tmpId = Math.ceil(Math.random()*10000000000000);
                element.__hasChildren = false;
                element.__children = [];
                element.__cls = "fa-caret-right";
                element.__level = isOrigin?1:currentNode.level + 1;
                element.__expand = false;
                element.__parentId = -1;
                element.__color = "";
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