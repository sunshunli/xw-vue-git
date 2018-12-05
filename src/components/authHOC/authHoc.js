
import Util from "../../core/tool/commonUtil.js";

function AuthHOC(Component){
    return {
        mounted (){
            
        },
        props:Component.props,
        render(h){
            // let uname = Util.cookie.getCookie("uname");
            // if(!uname){
            //     this.$router.push({path:"login"});
            //     return h();
            // }
            
            const slots = Object.keys(this.$slots);
            slots.reduce((arr, key) => arr.concat(this.$slots[key]), [])
            .map(vnode => {
                vnode.context = this._self
                return vnode
                })
            return h(Component,{
                on: this.$listeners,
                props: this.$props,
                scopedSlots: this.$scopedSlots,
                attrs: this.$attrs
            },slots)
        }
    }
}

export default AuthHOC