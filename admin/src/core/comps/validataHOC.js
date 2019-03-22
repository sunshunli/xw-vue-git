
import KEYS from "../comps/input/config.js";

function ValidataHOC(Component){
    return {
        methods:{
            //因为HOC没有直接return 当前的Component，所以在界面上面引用的时候，组件返回的是HOC组件, 要拿到具体的子组件必须调用这个方法
            getCurrentComponent(){
                return this.$children[0];
            },
            //校验是否开启验证, 默认关闭，如需要开启 加on标识
            checkIsOff(){
                if(this.$attrs.on != undefined){
                    return true;
                }
                return false;
            },
            //正则验证方法
            verify(val){
                var reg = KEYS[this.$attrs.vType];
                reg = new RegExp(reg);
                if (!reg.test(val)) {
                    return false;
                }
                return true;
                
            },
            //获取验证结果
            getVerifyResult(){
                let currentComp = this.$children[0];
                let value = currentComp.getValue();
                let isSuccess = this.getIsSuccess();
                //验证是否必填
                if(this.$attrs.required != undefined && value == ""){
                    isSuccess = false;
                }
                return {
                    success:isSuccess,
                    value:value,
                    msg:this.$attrs.msg
                }
            },
            getIsSuccess(){
                let currentComp = this.$children[0];
                //input验证
                if(currentComp.validataComponentType == "Input"){
                    return !currentComp.state.showError;
                }
                //其他非空组件验证，radioList，checkboxList，selectList
                else{
                    return currentComp.getValue()?true:false;
                }
            },
            setIsSuccess(value){
                let currentComp = this.$children[0];
                //设置input错误信息的隐藏和显示
                if(currentComp.validataComponentType == "Input"){
                    if(value){
                        currentComp.state = {
                            borderCls:"inputGreenIcon",
                            successIcon:"icon-duihao",
                            showError:false,
                        }
                    }else{
                        currentComp.state = {
                            borderCls:"inputRedIcon",
                            successIcon:"icon-cuo",
                            showError:true,
                        }
                    }
                }
                //其他非空组件，radioList，checkboxList，selectList错误信息的隐藏和显示
                else{
                    currentComp.state.showError = !value;
                }
                
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

            if(!this.checkIsOff()){
                console.log("当前组件不需要验证");
            }else{
                //通过HOC添加验证需要的方法，具体验证的业务逻辑都在HOC里面执行，当前Vue组件只需要调用即可
                if(Component.data().validataComponentType && Component.data().validataComponentType == "Input"){
                    this.$set(this.$attrs, "verify", this.verify);
                }
                //传递是否显示错误信息的方法
                this.$set(this.$attrs, "getIsSuccess", this.getIsSuccess);
                this.$set(this.$attrs, "setIsSuccess", this.setIsSuccess);
                this.$set(this.$attrs, "getVerifyResult", this.getVerifyResult);
            }
            //检测验证开关，通过attrs传递下去
            this.$set(this.$attrs, "checkIsOff", this.checkIsOff);

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