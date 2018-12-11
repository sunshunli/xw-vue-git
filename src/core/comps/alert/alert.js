
import $ from "jquery";

const _show_message_type = {
    "success":{cls:"msgSucces",iCls:"fa fa-check-circle"},
    "warning":{cls:"msgWarning",iCls:"fa fa-exclamation-circle"},
    "info":{cls:"msgInfo",iCls:"fa fa-info-circle"},
    "error":{cls:"msgError",iCls:"fa fa-times-circle"},
    "default":{cls:"msgSucces",iCls:"fa fa-check-circle"}
}

const _show_notify_type = {
    "success":{cls:"noticeSucces",iCls:"fa fa-check-circle"},
    "warning":{cls:"noticeWarning",iCls:"fa fa-exclamation-circle"},
    "info":{cls:"noticeInfo",iCls:"fa fa-info-circle"},
    "error":{cls:"noticeError",iCls:"fa fa-times-circle"},
    "default":{cls:"noticeSucces",iCls:"fa fa-check-circle"}
}

const _alert_colse_time = 2000;
const _notify_colse_time = 3000;


let _le_alert = {
    showMessage:(type,msg)=>{
        if(!type){
            type = "default";
        }
        if(!msg){
            msg = "NULL!";
        }
        let res = _show_message_type[type];
        if(!res){
            res = _show_message_type["default"];
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
            },_alert_colse_time)
        })
    },
    showConfirm:(title,cb)=>{
        let parentDiv = $('<div class="le_alert MsgAlertBox"></div>');
        let html ='<div class="Alertcontent">'+
                  '<p>提示:<i tag="le-show-confirm-close">×</i></p>'+
                  '<div class="msgContent clearfix">'+
                  '<i class="fa fa-exclamation-circle"></i>'+
                  '<p>'+title+'</p>'+
                  '</div>'+
                  '<div class="btnGroup">'+
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
        let res = _show_notify_type[type];
        if(!res){
            res = _show_notify_type["default"];
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
                // $(parentDiv).animate({right:'16px',top:'-100px'},500,()=>{
                //     $(parentDiv).remove();
                // })
            },_notify_colse_time)
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