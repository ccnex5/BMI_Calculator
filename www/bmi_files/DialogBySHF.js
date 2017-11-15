;(function ($) {
    //default values
    var PARAMS;
    var DEFAULTPARAMS = { Title: "素材家园", Content: "", Width: 400, Height: 300, URL: "", ConfirmFun: new Object, CancelFun: new Object };
    var ContentWidth = 0;
    var ContentHeight = 0;
    $.DialogBySHF = {
        //show dialog
        Alert: function (params) {
            Show(params, "Alert");
        },
        //show confirm
        Confirm: function (params) { Show(params, "Confirm"); },
        //show url
        Dialog: function (params) { Show(params, "Dialog") },
        //close window
        Close: function () {
            $("#DialogBySHFLayer,#DialogBySHF").remove();
        }

    };
    //init
    function Init(params) {
        if (params != undefined && params != null) {
            PARAMS = $.extend({},DEFAULTPARAMS, params);
        }
        ContentWidth = PARAMS.Width - 10;
        ContentHeight = PARAMS.Height - 40;
    };    
    //show window
    function Show(params, caller) {
        Init(params);
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        //在屏幕中显示的位置（正中间）
        var positionLeft = (screenWidth - PARAMS.Width) / 2 + $(document).scrollLeft();
        var positionTop = (screenHeight - PARAMS.Height) / 2 + $(document).scrollTop();
        var Content = [];
        Content.push("<div id=\"DialogBySHFLayer\"></div>");
        Content.push("<div id=\"DialogBySHF\" style=\"width:" + PARAMS.Width + "px;height:" + PARAMS.Height + "px;left:" + positionLeft + "px;top:" + positionTop + "px;\">");
        Content.push("    <div id=\"Title\"><span>" + PARAMS.Title + "</span><span id=\"Close\">&#10005;</span></div>");
        Content.push("    <div id=\"Container\" style=\"width:" + ContentWidth + "px;height:" + ContentHeight + "px;\">");
        if (caller == "Dialog") {
            Content.push("<iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" src=\"" + PARAMS.URL + "\" ></iframe>");
        }
        else {
            var TipLineHeight = ContentHeight - 60;
            Content.push("        <table>");
            Content.push("            <tr><td id=\"TipLine\" style=\"height:" + TipLineHeight + "px;\">" + PARAMS.Content + "</td></tr>");
            Content.push("            <tr>");
            Content.push("                <td id=\"BtnLine\">");
            Content.push("                    <input type=\"button\" id=\"btnDialogBySHFConfirm\" value=\"OK\" />");
            if (caller == "Confirm") {
                Content.push("                    <input type=\"button\" id=\"btnDialogBySHFCancel\" value=\"Cancel\" />");
            }
            Content.push("                </td>");
            Content.push("            </tr>");
            Content.push("        </table>");
        }
        Content.push("    </div>");
        Content.push("</div>");
        $("body").append(Content.join("\n"));
        SetDialogEvent(caller);
    }
    //set popup window
    function SetDialogEvent(caller) {
        //add close button
        $("#DialogBySHF #Close").click(function () { $.DialogBySHF.Close();});
         //add ese button close
        $(window).keydown(function(event){
            var event = event||window.event;
            if(event.keyCode===27){
                $.DialogBySHF.Close();
            }
        });
        //resize window
        $(window).resize(function(){
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();           
            var positionLeft = parseInt((screenWidth - PARAMS.Width) / 2+ $(document).scrollLeft());
            var positionTop = parseInt((screenHeight - PARAMS.Height) / 2+ $(document).scrollTop());
            $("#DialogBySHF").css({"top":positionTop+"px","left":positionLeft+"px"});
        });
        $("#DialogBySHF #Title").DragBySHF($("#DialogBySHF"));
        if (caller != "Dialog") {
            $("#DialogBySHF #btnDialogBySHFConfirm").click(function () {
                $.DialogBySHF.Close();
                if ($.isFunction(PARAMS.ConfirmFun)) {
                    PARAMS.ConfirmFun();
                }
            })
        }
        if (caller == "Confirm") {
            $("#DialogBySHF #btnDialogBySHFCancel").click(function () {
                $.DialogBySHF.Close();
                if ($.isFunction(PARAMS.CancelFun)) {
                    PARAMS.CancelFun();
                }
            })
        }
    }
})(jQuery);
//drag layer
(function ($) {
    $.fn.extend({
        DragBySHF: function (objMoved) {
            return this.each(function () {
                //mouse position
                var mouseDownPosiX;
                var mouseDownPosiY;
                //moving object init posotion
                var objPosiX;
                var objPosiY;
                //moving object
                var obj = $(objMoved) == undefined ? $(this) : $(objMoved);
                // move?
                var status = false;

                //mouse move and calculate position
                var tempX;
                var tempY;

                $(this).mousedown(function (e) {
                    status = true;
                    mouseDownPosiX = e.pageX;
                    mouseDownPosiY = e.pageY;
                    objPosiX = obj.css("left").replace("px", "");
                    objPosiY = obj.css("top").replace("px", "");
                }).mouseup(function () {
                    status = false;
                });
                $("body").mousemove(function (e) {
                    if (status) { 
                        tempX = parseInt(e.pageX) - parseInt(mouseDownPosiX) + parseInt(objPosiX);
                        tempY = parseInt(e.pageY) - parseInt(mouseDownPosiY) + parseInt(objPosiY);
                        obj.css({ "left": tempX + "px", "top": tempY + "px" }); 
                    }
                    //oversize?
                    //distance to right
                    var dialogRight = parseInt($(window).width())-(parseInt(obj.css("left"))+parseInt(obj.width()));
                    //distance to bottom
                    var dialogBottom = parseInt($(window).height())-(parseInt(obj.css("top"))+parseInt(obj.height()));
                    var maxLeft = $(window).width()-obj.width();
                    var maxTop = $(window).height()-obj.height();
                    if(parseInt(obj.css("left"))<=0){
                          obj.css("left","0px"); 
                    }
                    if(parseInt(obj.css("top"))<=0){
                        obj.css("top","0px"); 
                    }
                    if(dialogRight<=0){
                        obj.css("left",maxLeft+'px'); 
                    }                    
                }).mouseup(function () {
                    status = false;
                }).mouseleave(function () {
                    status = false;
                });
            });
        }
    })
})(jQuery);