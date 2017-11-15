/**
 * Created by Administrator on 2016/11/25.
 */
setTimeout(function(){

    var n =0;

    var u,end,start,g,g2;

    var w0 = 50;

    var w1 = 10.4;

    var w2=52;

    var heightVal =$("div[data-page='profile1']").find(".row").eq(1).find(".number").attr("initial-value"); //150-140

    var widthVal =$("div[data-page='profile1']").find(".row").eq(2).find(".number").attr("initial-value"); //550-300 /2.5 /10 保留最后一们小数

    var ageVal = $("div[data-page='profile1']").find(".row").eq(0).find(".number").attr("initial-value"); //30-18
    var  mouVal=$("div[data-page='profil']")



    $('.ruler .main').eq(0).css({
        '-webkit-transform':'translateX(-'+Math.ceil(parseInt(ageVal*w0))+'px)'
    }).attr('value',Math.ceil(ageVal*w0));

    $('.ruler .main').eq(1).css({
        '-webkit-transform':'translateX(-'+parseInt(heightVal*w1)+'px)'
    }).attr('value',heightVal*w1);

    $('.ruler .main').eq(2).css({
        '-webkit-transform':'translateX(-'+parseInt(widthVal*w2)+'px)'
    }).attr('value',widthVal*w2);



    for( var i =0 ; i < $('.ruler').length; i++){
        var liW = $('.ruler').eq(i).find("li").width();
        var size =  $('.ruler').eq(i).find('li').size();
    }

    $('body').on('touchcancel,touchend,touchmove,touchstart',function(e){
        e.preventDefault();
    })

    $('.selectize li').on('touchstart',function(){
        $(this).addClass("hover").siblings("li").removeClass("hover");
    })

    $('.selectize li').on('touchsend',function(){
        $(this).removeClass("hover");
    })


    $('.ruler ul').on("touchstart",function(e){
        var  initial = $(this).attr('data-initial');
        e.stopPropagation();
        v = parseInt($(this).parent(".main").attr('value'));

        if($(this).closest('.ruler').hasClass("ruler-weight")){
            start = 0;
            end = '-1458';
            g = 52;
        }else if($(this).closest('.ruler').hasClass("ruler-age")){
            start = 0;
            end = '-1600';
            g = 50;

        }else{
            start = 0;
            end = '-623';
            g = 10.4;
        }


        if(initial == 'true'){
            startX = e.originalEvent.changedTouches[0].pageX+v;
            $(this).attr('data-initial','false');
        }else{
            startX = e.originalEvent.changedTouches[0].pageX-v;
        }
    });



    $('.ruler ul').on("touchmove",function(e){

        var number = parseInt($(this).closest(".row").find('.number').attr('value'));

        moveX = e.originalEvent.changedTouches[0].pageX;

        X = moveX - startX;

        if(X>0){
            var vv = $(this).parent(".main").attr('value');

            if(vv >=start){

                start = X>start ? start : X;

                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+start+'px)'
                }).attr('value',start);
            }else{
                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+X+'px)'
                }).attr('value',X);
            }

            if($(this).closest('.ruler').hasClass("ruler-weight")){
                var val = (number-20+Math.abs(vv/g)/0.4).toFixed(1);//.replace('.0','');
                $(this).closest(".row").find('.number').text(val);
            }else{
                $(this).closest(".row").find('.number').text(Math.ceil(number-(vv/g)-10));

                if($(this).closest('.ruler').hasClass("ruler-age")){
                    var ageVal = $(this).closest(".row").find('.number').text();
                    $(this).closest(".row").find('.number').text(parseInt(ageVal-2))
                }
            }

        }else{

            var vv = $(this).parent(".main").attr('value');

            if($(this).parent(".main").attr('value') <=end){
                end = X< end ? end : X;
                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+end+'px)'
                }).attr('value',end);
            }else{
                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+X+'px)'
                }).attr('value',X);
            }

            if($(this).closest('.ruler').hasClass("ruler-weight")){

                var val = (number-20+Math.abs(vv/g)/0.4).toFixed(1);

                if(val == '100.1'){val=100;}

                $(this).closest(".row").find('.number').text(val);

            }else{
                $(this).closest(".row").find('.number').text(Math.ceil(number+Math.abs(vv/g)-10));

                if($(this).closest('.ruler').hasClass("ruler-age")){
                    var ageVal = $(this).closest(".row").find('.number').text();
                    $(this).closest(".row").find('.number').text(parseInt(ageVal-2))
                }
            }
        }
        e.preventDefault();
    });


    $('.ruler ul').on("touchend",function(e){

        e.stopPropagation();

        moveEndX = e.originalEvent.changedTouches[0].screenX;

        X = moveEndX - startX;

        var arr = new Array();

        if($(this).closest('.ruler').hasClass("ruler-age")){

            var value=  Math.abs($(this).parent(".main").attr("value"));

            var value2 = Math.round(Math.abs(value)/100)*100;

            if(value > value2){
                value2+=50;
            }

            $(this).parent(".main").css({
                '-webkit-transform':'translateX(-'+value2+'px)'
            }).attr('value','-'+value2);
        }


        $(this).closest(".page").find(".number").each(function(){
            var txt = $(this).text();
            arr.push(txt);
        });

        var arrayJoin = arr.join('##');

        $(this).closest(".page").find('input[type="hidden"]').val(arrayJoin);

    });

},100);