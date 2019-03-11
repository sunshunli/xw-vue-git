
import Util from "../../../core/tool/commonUtil.js";

function ValidataHOC(Component){
    return {
        methods:{
            validataFn(){
                if(this.$props.off == undefined){
                    return "aaa";
                }
                return null;
            }
        },
        mounted(){

        },
        props:Component.props,
        render(h){
            const slots = Object.keys(this.$slots);
            slots.reduce((arr, key) => arr.concat(this.$slots[key]), [])
            .map(vnode => {
                vnode.context = this._self
                return vnode
            })

            this.$set(this.$attrs, "abc", this.validataFn);

            return h(Component,{
                on: this.$listeners,
                props: this.$props,
                scopedSlots: this.$scopedSlots,
                attrs: this.$attrs
            },slots)
        }
    }
}

export default ValidataHOC