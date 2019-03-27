
<template>
    <div></div>
</template>

<script>

import Config from "./config.js";

export default {
    name:"LeTimePicker",
    data(){
        return {
            validataComponentType:"TimePicker",
            state:{
                showError:false
            },
            selectDay:"",
            isShowPicker:false
        }
    }
}
</script>

<style scoped>

</style>

