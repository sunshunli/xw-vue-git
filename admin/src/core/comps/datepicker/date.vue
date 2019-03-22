

<template>
    <div style="margin-top:100px;margin-left:500px;">
        <!-- 添加current激活input current样式  去掉则是默认样式 -->
        <div class="div-box current">
            <i class="icon-date fa fa-calendar"></i>
            <input type="text" class="date" />
        </div>
        <!-- 展开下拉 -->
        <div class="picker-box">
            <div class="picker-header">
                <button>
                    <i class="fa fa-angle-double-left"></i>
                </button>
                <button>
                    <i class="fa fa-angle-left"></i>
                </button>
                <div class="hearderText">
                    2019/03
                </div>
                <button>
                    <i class="fa fa-angle-right"></i>
                </button>
                <button>
                    <i class="fa fa-angle-double-right"></i>
                </button>
            </div>
            <div class="picker-body">
                <table>
                    <tr>
                        <th v-for="(item,index) in Weeks" :key="index">{{item}}</th>
                    </tr>
                    <tr>
                        <td class="disable">30</td>
                        <td>1</td>
                        <td class="current">2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                    </tr>
                    <tr>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td class="disable">1</td>
                        <td class="disable">2</td>
                        <td class="disable">3</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

const _tool = {
    getDays(year,month){
        let date = new Date(year,month,0);
        return date.getDate();
    },
    getWeek(year,month){
        let data = new Date(year,month,"01");
        return data.getDay();
    },
    getCurrentDays(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        return _tool.getDays(year,month);
    },
    /**
     * @description 组装日历面板上面的 5*7 = 35天所有数据源
     * @param year:年份
     * @param month:月份
     * @returns Array[]
     */
    getFullData(){
        
    }
}

import Week from "./config.js";

export default {
    name:"LeDatePicker",
    data(){
        return {

        }
    },
    computed:{
        Weeks(){
            return Week.data;
        }
    },
    methods:{

    },
    mounted(){
        let days = _tool.getCurrentDays();
    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;

    }

    body {
        height: 10000px;
    }

    /* 
        box 
    */
    .div-box {
        display: inline-block;
        position: relative;
        height: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid #aeaeae;
        box-sizing: content-box;
    }

    .div-box.current {
        border: 1px solid #409EFF!important;
        box-sizing: content-box;
    }
    .div-box input {
        border:0px solid #fff;
    }
    .div-box.current .icon-date{
        color:#409EFF;
    }

    /* 
        icon 默认
        */
    .icon-date {
        color: #cfcfcf;
        position: absolute;
        left: 0;
        z-index: 5;
        /*引入图片图片*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 5px;
        font-size: 20px;
    }

    /* 
        date选择器
        */
    .date {
        padding-left: 27px;
        outline: none;
        height: 30px;
    }

    .picker-box {
        width: 250px;
        border: 1px solid #aeaeae;
        box-sizing: border-box;
        margin-top: 4px;
    }


    /* 选择器头部 */
    .picker-header {
        display: flex;
        /* display: inline-block; */
        width: 100%;
        border-bottom: 1px solid #aeaeae;
        line-height: 1.8em;

    }

    .picker-header .hearderText {
        flex: 1;
        text-align: center;
    }

    .picker-header button {
        padding-left: 5px;
        padding-right: 5px;
        border: 0;
        background-color: transparent;
        outline: none;
    }


    /* 选择器部分 */
    .picker-body {
        width: 100%;
        padding: 6px;
        display: inline-block;
    }

    .picker-body table {
        text-align: center;
        width: 100%;
        line-height: 2em;
    }

    .picker-body table th {
        text-align: center;
    }

    .picker-body table td {
        cursor: pointer;
    }

    .picker-body table td.disable {
        background: #f0f0f0 !important;
        color: #cbcbcb !important;
    }

    .picker-body table td.current {
        background: #4fbba0 !important;
        color: #fff !important;
    }

    .picker-body table td:hover {
        background: #f55;
        color: #fff;
    }
</style>
