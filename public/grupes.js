var grupes=[]
var htmlAdgr = $('.htmlAdgr').html();
var htmlChatGur = $('.htmlChatGur').html()



function openwGrup(id, open) {
	var uu = grupes.filter((i)=>i.id===id)[0];
	if (uu == null) { return; }
	if ($("#cg" + id).length == 0) {
		var uhh = $(uhtml);
        uhh.find(".co,.muted ,.u-msg").remove();
        uhh.find('.u-topic').html(uu.grName);
        uhh.find(".ustat").remove();
		uhh.find(".u-pic").css({ 'background-image': 'url("' + uu.pic + '")', "width": "24px", "height": "24px" });
		var hds = $("<div id='cg" + id + "' onclick='' style='width:99%;padding: 1px 0px;' class='cc noflow nosel   hand break'></div>");
        if($("#grubesAll .addGruMsg").length>0){
            hds.insertAfter("#grubesAll .addGruMsg");
        }else{
            hds.appendTo("#grubesAll")
        }
		$("#cg" + id).append(uhh).find('.uzr').css("width", "99%").attr('onclick', "grubrOpn('" + id + "',true);").find('.u-msg').addClass('dots');
        grubrOpn(id ,true);
	}
}
function grubrOpn(id){
    $('.wGr').hide();
    $("#cg" + id+">.uzr").css("border","")
    $('.dpnl').hide();
    $('.bgg.border.corner.active').hide();
    var uu = grupes.filter((i)=>i.id===id)[0];
    if($('.chatGrupe.g'+uu.id).length== 0){
    var h = $(htmlChatGur);
    h.addClass('g'+uu.id)
    h.find('.d2,.footer').off().click(function(){
        $('.wGr').hide();
    });
    h.find('.grupeName').text(uu.grName)
    h.find('.plusUser').attr('onclick','addNewUsInGr('+JSON.stringify(uu.id)+')');
    h.find('.usersGurpe').attr('onclick','allUsInGr('+JSON.stringify(uu.id)+')');
    h.find('.leaveGrupe').attr('onclick','leaveGrupe('+JSON.stringify(uu.id)+')');
    h.find('.closeGrupe').attr('onclick','closeGrupe('+JSON.stringify(uu.id)+')');
    h.find('button.sndGr').attr('onclick','sendMsgGrupe('+JSON.stringify(uu.id)+')');
    h.find('textarea').attr('id',uu.id).keyup(function(e){
        if (e.keyCode == 13) { e.preventDefault(); sendMsgGrupe($(this).attr('id')) }
    });
    h.find('.emo').addClass('emo' + id);
    $('body').append(h)
    }else{
        $('.chatGrupe.g'+uu.id).show();
    }
    $(window).resize();
    emopop('.emo' + id);
    $('.g'+id+' .d2').scrollTop($('.g'+id+' .d2')[0].scrollHeight)
}







function addGruMsg(){
    $('.addNewGr').remove()
    var h = $(htmlAdgr)
    h.append('<div id="usersMsgGr" style="max-height: 300px;" class="break" ></div>');
    h.show()
    h.addClass('addNewGr')
    h.find('.dpnl.bg.tab-content').hide();
    h.find('button').attr('onclick','nextAddGru($(this).attr("class"))');
    h.find('.usAll').keyup(function(){
        var v = $(".addNewGr .usAll").val()
        $(".addNewGr #usersMsgGr .uzr").css('display', '');
        $.each($.grep(users, function(value) {
            value.idreg = value.idreg.toString()
            return (value.topic.split("Ù€").join("").toLowerCase().indexOf(v.split("Ù€").join("").toLowerCase()) == -1) && (value.idreg.indexOf(v)!=0 && value.idreg.indexOf(v)!=1) ;
        }), function(i, e) { $(".addNewGr #usersMsgGr .u" + e.id).css('display', 'none')});
    })
    h.find('input').change(function(){
        var t = $(this)
        if(t.val().length>0){
            t.attr('badinput',true)
        }else{
            t.attr('badinput',false)
        }
    })
    $('body').append(h)
};

function nextAddGru(c){
    var cl = c.match(/c\d/)[0]
    if(cl==='c3'&&$('.addNewGr .gruName').val().length>0){
        $('.addNewGr .c3').removeClass('c3').addClass('c4');
        $(".addNewGr .aXBtI.Wic03c.c1").animate({width: '0px'},function(){$(this).hide()});
        $(".addNewGr .aXBtI.Wic03c.c1 .i9lrp.mIZh1c").animate({width: '0px'},function(){
            $(this).hide();
            $(".addNewGr .aXBtI.Wic03c.c2 .i9lrp.mIZh1c").show().animate({width: '85%'});
            $(".addNewGr .aXBtI.Wic03c.c2").off().show().animate({width: '85%'},function(){
                $('.addNewGr #usersMsgGr').html('').append(getUsersG(users.filter((i)=>i.id!==myid),'input',false,false,true))
            });
        });
    }else if(cl==='c4'&&alluinmsg.length>0){
        $('.addNewGr .c4').removeClass('c4').addClass('c5');
        send('addGrMsg',{cmd:"addGr",data:JSON.stringify({users:alluinmsg,grName:$('.addNewGr .gruName').val()})})
        $('.addNewGr').remove();
        alluinmsg = [];
    }
}
                        
function addMsgsGur(d){
    switch(d.cmd){
        case "addGr":
            grupes.push(d.data)
            openwGrup(d.data.id, false)
            break;
        case "jogr":
            $(".not"+d.id).remove()
            var not = $($("#not").html()).first();
            not.addClass('not'+d.id)
            not.attr('onclick','')
            var user = d.us;
            if (user != null) {
                var uh = $('<div class="fl borderg corner uzr" style="width:100%;"></div>');
                uh.append("<img src='" + user.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
            	uh.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots corner u-topic fl'>" + user.topic + '<span class="fr" style="color:grey;font-size:70%!important;">'+user.idreg+'</span>'+ "</div>");
            	uh.find('.u-topic').css({ "background-color": user.bg, 'color': user.ucol });
            	var ico = getico(user);
            	if (ico != '') {
            		uh.find('.u-ico').attr('src', ico);
            	}
            	not.append(uh);
            }
            not.append("<div   style='width:100%;display:block;padding:0px 5px;' class='break fl'>المستخدم قام بدعوتك للإنظمام الى محادثه جماعية  " + emo(d.grn) +'<br><label onclick="send(\'addGrMsg\',{cmd:\'jogr\',data:JSON.stringify({uid:\''+myid+'\',ty:true,gid:\''+d.id+'\'})});$(\'.not'+d.id+'\').remove()" style="padding: 5px  6px 6px 6px;margin: 2px;border: 1px solid;border-radius: 5px;width: 45%;background-color: #1da001;color: white;"  class="btn fr "> الانضمام </label><label onclick="send(\'addGrMsg\',{cmd:\'jogr\',data:JSON.stringify({uid:\''+user.id+'\',ty:false,gid:\''+d.id+'\'})});$(\'.not'+d.id+'\').remove()" style="padding: 5px  6px 6px 6px;margin: 2px;border: 1px solid;border-radius: 5px;width: 45%;background-color: #e40000;color: white;"  class="btn fr "> رفض الانضمام </label>'+"</div>");
            not.css('margin-left', '+=' + notpos); notpos += 2;
            if (notpos >= 6) { notpos = 0; }
            $('.dad').append(not);
            break;
        case "msg":
            var data = d.data.us
            var um = $(umsg)
            d.data.msg = emo(d.data.msg)
            um.find(".u-pic").css('background-image', 'url("' + data.pic + '")')
            um.find(".u-topic").html(data.topic).css("color", data.ucol).css("background-color", data.bg);
            um.find(".u-msg").html(d.data.msg + '&nbsp;').css("color", data.mcol);
            var ico = getico(data);
            if (ico != '') { um.find('.u-ico').attr('src', ico) };
            if ($('.g'+d.data.gid+' .d2>.uzr').length >= 50) {
                $('.g'+d.data.gid+' .d2>.uzr').first().remove();
            }
            um.appendTo($('.g'+d.data.gid+' .d2'))
            if ($(".chatGrupe.g" + d.data.gid).css("display") == 'none' && ($(".dpnl").is(":visible") == false || !$('#grubesAll').hasClass('active'))) {  hl($('.btnClAlGr'), 'warning'); }
            if ($(".g" + d.data.gid).css("display") == 'none') { $("#cg" + d.data.gid+">.uzr").css("border","2px solid #FFC89D"); }else{
                $('.g'+d.data.gid+' .d2').scrollTop($('.g'+d.data.gid+' .d2')[0].scrollHeight)
            }
            break;
        case "u+":
            var grup = grupes.filter((i)=>i.id===d.gid)[0]
            grup.users.push(d.us)
            break;
        case "u-":
            var grup = grupes.filter((i)=>i.id===d.gid)[0]
            grup.users = grup.users.filter((i)=>i!==d.us);
            allUsInGr(d.gid)
            break;
        case "clos":
            grupes = grupes.filter((i)=>i.id!==d.data)
            $("#cg" + d.data).remove();
            $('.g'+d.data).remove();
            break;
        case "addGr":
            break;
        case "addGr":
            break;
        case "addGr":
            break;
    }
}
                        
function sendMsgGrupe(da){
    send('addGrMsg',{cmd:"msg",data:JSON.stringify({msg:$('#'+da).val(),gid:da})})
    $('#'+da).val('')
}
function addNewUsInGr(da){
    var d = grupes.filter((i)=>i.id===da)[0]
    $('.g'+d.id+' .wGr').hide();
    var uss = users.filter((i)=>d.users.indexOf(i.id)<0)
    $('.g'+d.id+' .addUsrtGru>.break').html('').append(getUsersG(uss.filter((i)=>i.id!==myid),'label',d.id,'addUsersJoin',(myid===d.adminGrup? true:false)));
    $('.g'+d.id+' .addUsrtGru').show();
}
function allUsInGr(da){
    var d = grupes.filter((i)=>i.id===da)[0];
//    if(){
//        console.log('admin')
//    } setpower

    $('.g'+d.id+' .wGr').hide();
    var uss = users.filter((i)=>d.users.indexOf(i.id)>=0)
    $('.g'+d.id+' .usersInGru>.break').html('').append(getUsersG(uss,'label',d.id,'removUsers',(myid===d.adminGrup? true:false)));
    $('.g'+d.id+' .usersInGru').show();
}
                        
var alluinmsg = []
                                                    
                                                    
var usersMsgGr =$('.usersMsgGr').html();
            
function getUsersG(us,ilt,gid,fuda,ad){
    us = us.sort(function(a,e){
		var av = parseInt(getpower(a.power).rank || 0);
		var bv = parseInt(getpower(e.power).rank || 0);
        if (av == bv) {
            return (a.topic).localeCompare(e.topic)
        }
        return av < bv ? 1 : -1;

    })
    var htr =$('<div></div>')
    for(var i = 0;i<us.length;i++){
        var u = getuser(us[i].id);
        if (!u.s || (u.s && getpower(u.power).rank <= power.rank)) { 
        
        var input = '<input onchange="changeUser($(this))"      type="checkbox" class="" >'
        var h = $(usersMsgGr);
        h.find('.u-topic').html(us[i].topic+ '<span class="fr" style="color:grey;font-  size:70%!important;">'+us[i].idreg+'</span>')
        h.attr('v',getpower(u.power).rank).addClass('u'+us[i].id)
        h.find('.u-pic').css('background-image','url('+us[i].pic+')');
        var ico = getico(us[i]);
        if (ico != '') {
            h.find('.u-ico').attr('src', ico);
        }
        if(ad){
        if(ilt==='input')h.find('label').css('background-color','').attr("class",'').html(input)
        h.find(ilt).attr('id',us[i].id)
        if(fuda){
            h.find(ilt).attr('onclick',fuda+'(`'+us[i].id+'`,`'+(gid?gid:0)+'`)')
            if(fuda==='addUsersJoin'){
                h.find(ilt).removeClass('fa-minus').addClass('fa-user-plus')
            }else if(fuda==='removUsers'&&us[i].id===myid){
                h.find('label').remove();
            }
        }
        }else{
            h.find('label').remove()
        }
        $(htr).append(h)
    }
    }
    return htr;
}
function changeUser(t){
    var t =$(t)
    var i =t.is(":checked");
    if(i){
        alluinmsg.push(t.attr("id"))
    }else{
        alluinmsg.splice(alluinmsg.indexOf(t.attr("id")), 1);
    }
}
function addUsersJoin(d,gid){
    $('.g'+gid+' .wGr').hide();
    send('addGrMsg',{cmd:"addUsersJoin",data:JSON.stringify({id:d,gid:gid})})
}
function removUsers(d,gid){
    $('.g'+gid+' .wGr').hide();
    send('addGrMsg',{cmd:"removUsers",data:JSON.stringify({id:d,gid:gid})})
}
function leaveGrupe(da){
    $(".chatGrupe.g"+da).hide();
}
function closeGrupe(da){
    var d = grupes.filter((i)=>i.id===da)[0]
    $('.g'+d.id+' .wGr').hide();
    var p = confirm('هل انت متاكد من حذف المجموعه ( '+d.grName+' )')
    if(p)send('addGrMsg',{cmd:"closeGrupe",data:d.id})                            
}
