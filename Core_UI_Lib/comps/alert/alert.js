
import "./alert.css";
import $ from "jquery";
import DEFINE_KEY from "../Define.js";

let _le_alert = {
    showMessage:(type,msg)=>{
        if(!type){
            type = "default";
        }
        if(!msg){
            msg = "NULL!";
        }
        let res = DEFINE_KEY.ALERT_CONFIG.SHOW_ALERT_CLS_TYPE[type];
        if(!res){
            res = DEFINE_KEY.ALERT_CONFIG.SHOW_ALERT_CLS_TYPE["default"];
        }

        let parentDiv = $("<div class='le_alert content'></div>");
        let html = "<div class='msgBox "+res.cls+"' style='opacity:1'>";
        html += "<i class='"+res.iCls+"'></i>";
        html += "<p>"+msg+"</p>";
        html += "</div>";

        $(parentDiv).append($(html));
        $("body").append($(parentDiv));

        $(parentDiv).css({'top':'-50px','opacity':0,'z-index':2018});
        $(parentDiv).animate({top:'16px',opacity:1},500,()=>{
            setTimeout(()=>{
                $(parentDiv).animate({top:'-50px',opacity:0,'z-index':0},500,()=>{
                    $(parentDiv).remove();
                })
            },DEFINE_KEY.ALERT_CONFIG.ALERT_CLOSE_TIME)
        })
    },
    showConfirm:(title,cb)=>{
        let parentDiv = $('<div class="le_alert MsgAlertBox"></div>');
        let html ='<div class="Alertcontent">'+
                  '<p>提示<i tag="le-show-confirm-close">×</i></p>'+
                  '<div class="msgContent clearfix">'+
                  '<i class="fa fa-exclamation-circle"></i>'+
                  '<p>'+title+'</p>'+
                  '</div>'+
                  '<div class="alert_btnGroup">'+
                  '<button class="confirm" tag="le-show-confirm-ok">确定</button>'+
                  '<button class="cancel" tag="le-show-confirm-close">取消</button>'+
                  '</div>'+
                  '</div>';
        $(parentDiv).append($(html));
        $("body").append($(parentDiv));
        $(".MsgAlertBox").show();

        $("body").off("click","i[tag=le-show-confirm-close]").on("click","i[tag=le-show-confirm-close]",function(){
            $(this).parents("div.MsgAlertBox").remove();
        })
        $("body").off("click",'button[tag=le-show-confirm-close]').on("click","button[tag=le-show-confirm-close]",function(){
            $(this).parents("div.MsgAlertBox").remove();
        })
        $("body").off("click",'button[tag=le-show-confirm-ok]').on("click","button[tag=le-show-confirm-ok]",function(){
            if(cb){
                cb();
            }
            $(this).parents("div.MsgAlertBox").remove();
        })
    },

    showNotify:(type,msg)=>{
        if(!type){
            type = "default";
        }
        if(!msg){
            msg = "NULL!";
        }
        let res = DEFINE_KEY.ALERT_CONFIG.SHOW_NOTICE_CLS_TYPE[type];
        if(!res){
            res = DEFINE_KEY.ALERT_CONFIG.SHOW_NOTICE_CLS_TYPE["default"];
        }
        let parentDiv = $('<div class="le_alert notice '+res.cls+'"></div>');
        let html ='<div class="noticeTs"><i class="'+res.iCls+'"></i>提示</div>'+
                  '<p>'+msg+'</p>'+
                  '<span class="closeBtn" tag="le-show-notify-close">×</span>';
        $(parentDiv).append($(html));
        $("body").append($(parentDiv));
        $(parentDiv).animate({right:'16px',top:'16px'},100,()=>{
            setTimeout(()=>{
                $(parentDiv).remove();
            },DEFINE_KEY.ALERT_CONFIG.NOTICE_CLOSE_TIME)
        })

        $("body").on("click","span[tag=le-show-notify-close]",function(){
            $(this).parents("div.notice").remove();
        })
    }
}


export default {
    install:function(Vue){
        Vue.prototype.alert = {
            showAlert:(type,msg)=>{
                _le_alert.showMessage(type,msg);
            },
            showConfirm:(title,cb)=>{
                _le_alert.showConfirm(title,cb);
            },
            showNotify:(type,msg)=>{
                _le_alert.showNotify(type,msg);
            }
        }
    }
};