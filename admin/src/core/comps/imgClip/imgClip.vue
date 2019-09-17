<template>
    <div class = "imgClip">
        <span class="input-file">
            请选择 
            <input :ref = "fkey" @change="change" type="file" class="imgFile" />
        </span>
        <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
        <!-- 预览区域 -->
        <div>
            <div v-if = "isShowBox">
                <div>截取区域信息</div>
                <p>
                    <span>宽：{{boxState.width | toFix2}}</span>
                    <span>高：{{boxState.height | toFix2}}</span>
                    <span>X：{{boxState.left | toFix2}}</span>
                    <span>Y：{{boxState.top | toFix2}}</span>
                </p>
            </div>
            <div class="canvasContent" style = "display:inline-block;position:relative">
                <canvas width="0" height="0" :ref = "'originalImg'+fkey" @mouseup="eventState.pointCanZoom = false" @mousemove = "pointMouseMove"></canvas>
                
                <div ref = "box" 
                    class="box"
                    v-if = "isShowBox"
                    @mousedown = "boxMouseDown"
                    @mouseup = "boxMouseUp"
                    @mousemove = "boxMouseMove"
                    :style = "'top:' + boxTop + 'px;left:' + boxLeft + 'px;width:' + boxWidth + 'px;height:' + boxHeight + 'px'" >
                </div>
                <div v-if = "isShowBox">
                    <!-- 左上 -->
                    <div class = "block topLeft" 
                         :style = "'top:' + topLeftPoint.top + 'px;left:' + topLeftPoint.left + 'px;'"
                         @mousedown = "e => pointMouseDown(e,'topLeft')"
                         @mouseup = "pointMouseUp"
                    >
                    </div>
                    <!-- 右上 -->
                    <div class = "block topRight" 
                         :style = "'top:' + topRightPoint.top + 'px;left:' + topRightPoint.left + 'px;'"
                         @mousedown = "e => pointMouseDown(e,'topRight')"
                         @mouseup = "pointMouseUp"
                    >
                    </div>
                    <!-- 左下 -->
                    <div class = "block bottomLeft" 
                         :style = "'top:' + bottomLeftPoint.top+'px;left:' + bottomLeftPoint.left + 'px'"
                         @mousedown = "e => pointMouseDown(e,'bottomLeft')"
                         @mouseup = "pointMouseUp"
                    >
                    </div>
                    <!-- 右下 -->
                    <div class = "block bottomRight" 
                         :style = "'top:' + bottomRightPoint.top+'px;left:' + bottomRightPoint.left +'px'"
                         @mousedown = "e => pointMouseDown(e,'bottomRight')"
                         @mouseup = "pointMouseUp"
                         >
                    </div>
                </div>
            </div>
            <div v-show="isFileLoad" style="margin: 5px 0 10px 0;">
                <button class = "showClip" @click = "showClip">展示预览</button>
            </div>
            <canvas width="0" height="0" :ref = "'clipImg' + fkey"></canvas>
            <div v-show="isShowClip">
                <button class = "showClip" @click = "upload">提交</button>
            </div>
        </div>
        
    </div>
</template>
<script>
    import tool from "../leCompsTool.js"
    export default {
        props:["options"],
        data(){
            return {
                // 图片上传中
                showLoading:false,
                // 图片上传并完成渲染
                isShowBox:false,
                // 图片读取完毕
                isFileLoad:false,
                // 上传失败
                showError:false,
                // 生成预览图完成
                isShowClip:false,

                fileUrl:"",
                fkey:tool._idSeed.newId(),
                
                imgState : {
                    startX:0,
                    endX:0,
                    startY:0,
                    endY:0,
                    imgWidth:0,
                    imgHeight:0,
                    fileType:"",
                    fileName:"",
                },
                boxState:{
                    top:0,
                    left:0,
                    width:0,
                    height:0,
                },
                eventState  : {
                    // 标记选中的缩放点
                    pointTag:null,
                    // 判断框是否可以移动 ----mousedown则可以 mouseup则取消
                    boxCanMove:false,
                    // 判断缩放点是否可以缩放 ----mousedown则可以 mouseup则取消
                    pointCanZoom:false,
                    // 记录页面移动时候鼠标的x坐标
                    mouseX : null,
                    // 记录页面移动时候鼠标的y坐标
                    mouseY : null,
                    // 框选区域距离图片左侧的距离
                    currentBoxOffsetX : null,
                    // 框选区域距离图片顶部的距离
                    currentBoxOffsetY : null,
                    // 框选区域缩放前记录宽度
                    boxWidth:null,
                    // 框选区域缩放前记录高度
                    boxHeight:null,
                }

            }
        },
        filters:{
            toFix2(val){
                // debugger
                return val.toFixed(2)
            }
        },
        mounted(){
            
        },
        computed:{
            fname(){
                return this.options.fname;
            },
            url(){
                return this.options.url;
            },
            boxWidth(){
                return this.boxState.width;
            },
            boxHeight(){
                return this.boxState.height;
            },
            boxLeft(){
                return this.boxState.left;
            },
            boxTop(){
                return this.boxState.top;
            },
            topLeftPoint(){
                return {
                    top:this.boxState.top - 1,
                    left:this.boxState.left - 1,
                }
            },
            topRightPoint(){
                return {
                    top:this.boxState.top-1,
                    left:this.boxState.left + this.boxState.width - 3 ,
                }
            },
            bottomLeftPoint(){
                return {
                    top:this.boxState.top + this.boxState.height - 3,
                    left:this.boxState.left  -1 ,
                }
            },
            bottomRightPoint(){
                return {
                    top:this.boxState.top + this.boxState.height - 3,
                    left:this.boxState.left + this.boxState.width - 3 ,
                }
            }
        },
        methods:{
            // 重置状态
            reset(){
                this.imgState = {
                    startX:0,
                    endX:0,
                    startY:0,
                    endY:0,
                    imgWidth:0,
                    imgHeight:0,
                    fileType:"",
                    fileName:"",
                }
                this.imgHeight = 0;
                this.isShowBox = false
                this.isFileLoad = false;
                this.boxState = {
                    top:0,
                    left:0,
                    width:0,
                    height:0,
                };
                this.fileUrl = "";
                this.isShowClip = false;
                let canvas1 = this.$refs["originalImg" + this.fkey];
                let canvas2 = this.$refs["clipImg" + this.fkey];
                let cxt1 = canvas1.getContext("2d");
                let cxt2 = canvas2.getContext("2d");
                cxt1.clearRect(0,0,canvas1.width,canvas1.height)
                cxt2.clearRect(0,0,canvas2.width,canvas2.height)

                canvas1.width=0;
                canvas1.height=0;
                canvas2.width=0;
                canvas2.height=0;
            },
            // 重置eventState
            resetEventState(){
                this.eventState = {
                    // 标记选中的缩放点
                    pointTag:null,
                    // 判断框是否可以移动 ----mousedown则可以 mouseup则取消
                    boxCanMove:false,
                    // 记录页面移动时候鼠标的x坐标
                    mouseX : null,
                    // 记录页面移动时候鼠标的y坐标
                    mouseY : null,
                    // 框选区域距离图片左侧的距离
                    currentBoxOffsetX : null,
                    // 框选区域距离图片顶部的距离
                    currentBoxOffsetY : null,
                    // 框选区域宽度
                    boxWidth:null,
                    // 框选区域高度
                    boxHeight:null,
                }
            },
            // 图片改变事件
            change(e){
                this.reset();
                let _this = this;
                let dom = this.$refs[this.fkey];
                let file = dom.files[0];
                if (!e || !window.FileReader) return  // 看支持不支持FileReader
                this.showError = false;
                this.imgState.fileType = file.type;
                this.imgState.fileName = file.name;
                let reader = new FileReader()
                reader.readAsDataURL(file) // 转换成可用url
                
                reader.onload =  function(){
                    
                    _this.isFileLoad = true;
                    _this.fileUrl = this.result;
                    let img = new Image();
                    img.src = _this.fileUrl;
                    img.onload = () =>{
                        let canvas1 = _this.$refs["originalImg" + _this.fkey];
                        canvas1.width = img.width;
                        canvas1.height = img.height;
                        var cxt1 = canvas1.getContext("2d")
                        cxt1.drawImage(img,0,0);
                        // 绘画完成事件 -- 原图加载完毕
                        _this.imgState.imgWidth = _this.$refs["originalImg"+_this.fkey].clientWidth;
                        _this.imgState.imgHeight = _this.$refs["originalImg"+_this.fkey].clientHeight;
                        _this.imgState.startX = _this.$refs["originalImg"+_this.fkey].x;
                        _this.imgState.startY = _this.$refs["originalImg"+_this.fkey].y;
                        _this.imgState.endX = _this.$refs["originalImg"+_this.fkey].x + _this.imgState.imgWidth;
                        _this.imgState.endY = _this.$refs["originalImg"+_this.fkey].y + _this.imgState.imgHeight;
                        if(_this.isFileLoad && _this.imgState.imgWidth != 0 && _this.imgState.imgHeight != 0){
                            _this.isShowBox = true;
                            let height = 0;
                            let width = 0;
                            if(_this.options.xscale && _this.options.yscale){
                                if((_this.imgState.imgWidth / _this.options.xscale * _this.options.yscale) < _this.imgState.imgHeight){
                                    width = _this.imgState.imgWidth;
                                    height = _this.imgState.imgWidth / _this.options.xscale *  _this.options.yscale
                                }else{
                                    height = _this.imgState.imgHeight;
                                    width  =  _this.imgState.imgHeight / _this.options.yscale *  _this.options.xscale
                                }
                            }else{
                                width = _this.imgState.imgWidth
                                height = _this.imgState.imgHeight
                            }
                            _this.boxState = {
                                top:0,
                                left:0,
                                width:width,
                                height:height,
                            }
                        }
                    }
                    img.onerror = ()=>{
                        _this.showError = true;
                    }
                }
                reader.onerror = ()=>{
                    this.showError = true;
                }
            },

            // 框选区域的鼠标按下事件
            boxMouseDown(e){
                this.eventState.mouseX = e.clientX;
                this.eventState.mouseY = e.clientY;
                this.eventState.currentBoxOffsetX = this.boxState.left;
                this.eventState.currentBoxOffsetY = this.boxState.top;
                this.eventState.boxCanMove = true;
                // 必须在按下事件的回掉中掉用  
                this.$refs.box.addEventListener("mouseout",this.boxMouseUp)
            },
            // 框选区域鼠标移动事件
            boxMouseMove(e){
                if(this.eventState.boxCanMove){
                    let mouseOfsetX = e.clientX - this.eventState.mouseX;
                    let mouseOfsetY = e.clientY - this.eventState.mouseY;

                    // 边界检测
                    // 判断当前的位置是否到达边界 如果没有到达边界 则当移动的范围大于边界时候 则 直接到达边界  
                    // 解决移动过快导致当前偏移差+本次偏移量提前到达边界
                    if(this.boxState.top >= 0 && this.boxState.top + this.boxState.height <= this.imgState.imgHeight){
                        if((this.eventState.currentBoxOffsetY + mouseOfsetY) >= 0 
                        && (this.eventState.currentBoxOffsetY + mouseOfsetY) <=  this.imgState.imgHeight - this.boxState.height){
                            this.boxState.top = this.eventState.currentBoxOffsetY + mouseOfsetY;
                        }else{
                            if(mouseOfsetY <= 0){
                                this.boxState.top = 0;
                            }else{
                                this.boxState.top = this.imgState.imgHeight - this.boxState.height
                            }
                        
                        }
                        
                    }
                    if(this.boxState.left >= 0 && this.boxState.left + this.boxState.width <= this.imgState.imgWidth){
                        if((this.eventState.currentBoxOffsetX + mouseOfsetX) >= 0 
                        && (this.eventState.currentBoxOffsetX + mouseOfsetX) <=  this.imgState.imgWidth - this.boxState.width){
                            this.boxState.left = this.eventState.currentBoxOffsetX + mouseOfsetX;
                            return;
                        }else{
                            if(mouseOfsetX <= 0){
                                this.boxState.left = 0;
                            }else{
                                this.boxState.left = this.imgState.imgWidth - this.boxState.width
                            }
                        }
                        
                    }
                }
                if(this.eventState.pointCanZoom){
                    this.pointMouseMove(e);
                }
            },
            // 框选区域的鼠标抬起事件
            boxMouseUp(){
                this.resetEventState();
                this.$refs.box.removeEventListener("mouseout",this.boxMouseUp,false);
            },
            // 缩放点的鼠标按下事件
            pointMouseDown(e,tag){
                this.eventState.mouseX = e.clientX;
                this.eventState.mouseY = e.clientY;
                this.eventState.boxWidth = this.boxState.width;
                this.eventState.boxHeight = this.boxState.height;
                this.eventState.left = this.boxState.left;
                this.eventState.top = this.boxState.top;
                this.eventState.pointCanZoom = true;
                this.eventState.pointTag = tag;
            },
            // 缩放点的鼠标移动事件
            pointMouseMove(e){
                if(this.eventState.pointCanZoom){
                    // 鼠标移动的相对位置
                    let mouseOfsetX = e.clientX - this.eventState.mouseX;
                    let mouseOfsetY = e.clientY - this.eventState.mouseY;
                    // 放大的检测
                    // 判断右上右下 
                    /**
                     * 判断右下 -> 宽度大于1 宽度不能超过右侧 高度大于1 高度不能大于底部
                     * 判断右上 -> 宽度大于1 宽度不能超过釉侧 高度大于1 高度不能大于顶部
                     * 判断坐下 -> 宽度大于1 宽度不能超过左侧 高度大于1 高度不能大于底部
                     * 判断左上 -> 宽度大于1 宽度不能超过左侧 高度大于1 高度不能大于顶部
                     * =======================================================
                     *      包含右 则宽度大于1 宽度不能超过右侧
                     *      包含左 则宽度大于1 宽度不能超过左侧
                     *      包含上 则高度大于1 高度不能大于顶部
                     *      包含下 高度大于1 高度不能大于底部
                     */
                    if(this.options.xscale && this.options.yscale){
                        // 左上角顶点
                        if(this.eventState.pointTag == "topLeft"){
                            // 限制最少宽度1px
                            let width = this.eventState.boxWidth - mouseOfsetX;
                            // y移动距离计算
                            let scaleMouseOfsetY = mouseOfsetX / this.options.xscale * this.options.yscale;
                            // 计算高度
                            let height = this.eventState.boxHeight - scaleMouseOfsetY;
                            if( width > 0 && mouseOfsetX + this.eventState.left > 0
                                && height > 0 && scaleMouseOfsetY + this.eventState.top > 0){
                                    // 限制最少高度1px
                                    this.boxState.height = height;
                                    this.boxState.top = scaleMouseOfsetY + this.eventState.top;
                                    this.boxState.width = width;
                                    this.boxState.left = mouseOfsetX + this.eventState.left;    
                            }else{
                                this.pointMouseUp();
                            }
                        }
                        if(this.eventState.pointTag == "topRight"){
                            // 限制宽度最少1像素
                            let width = this.eventState.boxWidth + mouseOfsetX;
                            let scaleMouseOfsetY = -(mouseOfsetX / this.options.xscale * this.options.yscale);
                            let height = this.eventState.boxHeight - scaleMouseOfsetY;
                            if(width > 0 
                                && (width + this.eventState.left <= this.imgState.imgWidth)
                                && height > 0 
                                && scaleMouseOfsetY + this.eventState.top > 0
                            ){
                                this.boxState.height = height;
                                this.boxState.top = scaleMouseOfsetY + this.eventState.top;
                                this.boxState.width = width;
                            }else{
                                this.pointMouseUp();
                            }
                        }
                        if(this.eventState.pointTag == "bottomLeft"){
                            // 限制最少宽度1px
                            let width = this.eventState.boxWidth - mouseOfsetX;
                            let scaleMouseOfsetY = -(mouseOfsetX / this.options.xscale * this.options.yscale);
                            let height =  this.eventState.boxHeight + scaleMouseOfsetY;
                            if( width > 0 
                                && mouseOfsetX + this.eventState.left > 0
                                && this.eventState.boxHeight + scaleMouseOfsetY  > 0
                                && this.eventState.boxHeight + scaleMouseOfsetY + this.eventState.top <= this.imgState.imgHeight){
                                this.boxState.width = this.eventState.boxWidth - mouseOfsetX;
                                this.boxState.left = mouseOfsetX + this.eventState.left;
                                this.boxState.height = height;
                            }else{
                                this.pointMouseUp();
                            }
                        }
                        if(this.eventState.pointTag == "bottomRight"){
                            // 限制宽度最少1像素
                            let width = this.eventState.boxWidth + mouseOfsetX;
                            let scaleMouseOfsetY = mouseOfsetX / this.options.xscale * this.options.yscale;
                            let height =  this.eventState.boxHeight + scaleMouseOfsetY;
                            if(width > 0 
                               && (width + this.eventState.left <= this.imgState.imgWidth)
                               && this.eventState.boxHeight + scaleMouseOfsetY  > 0
                               && this.eventState.boxHeight + scaleMouseOfsetY + this.eventState.top <= this.imgState.imgHeight
                            ){
                                this.boxState.width = width;
                                this.boxState.height = height;
                            }else{
                                this.pointMouseUp();
                            }
                        }

                    }else{
                        if(this.eventState.pointTag && this.eventState.pointTag.indexOf("Right") != -1){
                            // 限制宽度最少1像素
                            if((this.eventState.boxWidth + mouseOfsetX) > 0 
                                && (this.eventState.boxWidth + mouseOfsetX + this.eventState.left <= this.imgState.imgWidth)){
                                this.boxState.width = this.eventState.boxWidth + mouseOfsetX;
                            }else{
                                this.pointMouseUp();
                            }
                            
                        }
                        if(this.eventState.pointTag && this.eventState.pointTag.indexOf("bottom") != -1){
                            // 限制最少高度1px
                            if((this.eventState.boxHeight + mouseOfsetY) > 0 
                                && (this.eventState.boxHeight + mouseOfsetY + this.eventState.top <= this.imgState.imgHeight)){
                                this.boxState.height = this.eventState.boxHeight + mouseOfsetY;
                            }else{
                                this.pointMouseUp();
                            }
                        }
                        if(this.eventState.pointTag && this.eventState.pointTag.indexOf("top") != -1){
                            // 限制最少高度1px
                            if((this.eventState.boxHeight - mouseOfsetY) > 0 
                                && mouseOfsetY + this.eventState.top > 0){
                                this.boxState.height = this.eventState.boxHeight - mouseOfsetY;
                                this.boxState.top = mouseOfsetY + this.eventState.top;
                            }else{
                                this.pointMouseUp();
                            }
                        }
                        if(this.eventState.pointTag && this.eventState.pointTag.indexOf("Left") != -1){
                            // 限制最少宽度1px
                            if((this.eventState.boxWidth - mouseOfsetX) > 0 
                                && mouseOfsetX + this.eventState.left > 0){
                                this.boxState.width = this.eventState.boxWidth - mouseOfsetX;
                                this.boxState.left = mouseOfsetX + this.eventState.left;
                            }else{
                                this.pointMouseUp();
                            }
                        }
                    }
                    

                }
            },
            // 点的抬起事件
            pointMouseUp(){
                this.resetEventState();
            },
            // 展示预览图
            showClip(){
                // 如果需要对图片进行操作 可以通过一个canvas3进行中介 处理图片的压缩、体积大小区域计算等
                if(!this.isShowBox){
                    return ;
                }
                this.isShowClip = false;
                // 原图canvas
                var canvas1 = this.$refs["originalImg" + this.fkey];
                // 展示图canvas
                var canvas2= this.$refs["clipImg" + this.fkey];
                canvas2.width=this.boxState.width;
                canvas2.height=this.boxState.height;
                var cxt1 = canvas1.getContext("2d");
                var cxt2=canvas2.getContext("2d");
                var dataImg = cxt1.getImageData(this.boxState.left,this.boxState.top,this.boxState.width,this.boxState.height);
                cxt2.putImageData(dataImg,0,0,0,0,canvas2.width,canvas2.height);
                this.isShowClip = true;
                console.log(canvas2.toDataURL("image/png"));

            },
            upload(){
                if(!this.isShowClip){
                    return ;
                }
                if(!this.url || !this.fname){
                    this.alert.showAlert("error","上传url和fname必须配置!");
                    return;
                }
                this.showLoading = true;
                var canvas2= this.$refs["clipImg" + this.fkey];
                let clipUrl = canvas2.toDataURL(this.imgState.fileType);
                function dataURLtoFile(dataurl, filename) {//将base64转换为文件
                    let arr = dataurl.split(',');
                    let mime = arr[0].match(/:(.*?);/)[1];
                    let bstr = atob(arr[1]);
                    let n = bstr.length;
                    let u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new File([u8arr], filename, {type: mime});
                    //转换成成blob对象
                    //return new Blob([u8arr],{type:mime});
                }
                let file = dataURLtoFile(clipUrl,this.imgState.fileName);
                let formData = new FormData();
                formData.append(this.fname,file);
                // 上传中。。。。。。。
                this.ajax.uploadFetch(this.url,formData).then((result) => {
                    let src = this.options.analysis?this.options.analysis(result):result;
                    if(this.options.callBack){
                        this.options.callBack(src);
                    }
                    this.alert.showAlert("success","上传成功");
                    this.showLoading = false;
                }).catch((err) => {
                    this.alert.showAlert("error","上传异常");
                    this.showLoading = false;
                });
            },
            
            

        }
    }
</script>
<style scoped>
    .imgClip .imgFile{
        cursor:pointer;
    }
    .imgClip .input-file {
        cursor:pointer;
        position: relative;
        display: inline-block;
        overflow: hidden;
        text-align: center;
        width: 50px;
        height: 26px;
        background-color: #2c7;
        border-radius: 4px;
        /* padding: 5px; */
        font-size: 12px;
        font-weight: normal;
        line-height: 26px;
        color: #fff;
        text-decoration: none;
    }
    .imgClip .input-file input[type="file"] {
        cursor:pointer;
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        font-size: 14px;
        background-color: #f00;
        opacity: 0;
        filter: alpha(opacity=0);
        width: 100%;
        height: 100%;
    }
    .imgClip .loading{width:24px;vertical-align: middle;vertical-align: baseline;}

    .imgClip .box{
        border:1px solid #aeaeae;
        position:absolute;
        box-sizing: border-box;
        z-index:1;
        cursor: move;
    }
    .imgClip .block{
        width:5px;
        height:5px;
        z-index:1;
        background:#333;
        z-index:9;
        position: absolute;
    }
    .imgClip .bottomLeft{
        cursor:sw-resize	;
    }
    .imgClip .bottomRight{
        cursor:se-resize	;
    }
    .imgClip .topLeft{
        cursor:nw-resize	;
    }
    .imgClip .topRight{
        cursor:ne-resize	;
    }
    .imgClip .showClip{
        cursor:pointer;
        position: relative;
        display: inline-block;
        overflow: hidden;
        text-align: center;
        width: 70px;
        height: 26px;
        background-color:#2c7;
        border-color:#2c7;
        border-radius: 4px;
        /* padding: 5px; */
        font-size: 12px;
        font-weight: normal;
        line-height: 26px;
        color: #fff;
        text-decoration: none;
    }

    .canvasContent{
        /* width: 300px;
        height: 300px;
        overflow: scroll; */
    }
</style>
