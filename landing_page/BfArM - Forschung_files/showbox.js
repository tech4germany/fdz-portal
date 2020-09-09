define(["fb-modules/ui.cOverlay"],function(){(function($){$.addOuterDimensions=function(jElm,dim,dir){var adds=(dir==="height")?["Top","Bottom"]:["Left","Right"];$.each(["padding","border","margin"],function(i,css){if(css!=="border"){dim+=parseInt(jElm.css(css+adds[0]),10)||0;dim+=parseInt(jElm.css(css+adds[1]),10)||0;}else{dim+=parseInt(jElm.css(css+adds[0]+"Width"),10)||0;dim+=parseInt(jElm.css(css+adds[1]+"Width"),10)||0;}});return dim;};$.fn.showbox=function(opts){opts=$.extend(true,{},$.fn.showbox.defaults,opts);opts.openerSel=this;var init=false;var scrollerUpdateTimer;if(typeof opts.getTextContent=="string"){if(!$.fn.showbox.getContentMethods[opts.getTextContent]){console.log("could not find opts.getTextContent: "+opts.getTextContent);opts.getTextContent=$.fn.showbox.getContentMethods.standard;}else{opts.getTextContent=$.fn.showbox.getContentMethods[opts.getTextContent];}}var lightbox=$(opts.structure).bind("coverlayinit",function(e,ui){var inst=ui.instance,o=inst.options;$.createUrlIndex(inst.openers,inst);inst.widthElement=(inst.element.is(o.widthElementSel))?inst.element:$(inst.options.widthElementSel,inst.element);inst.calcWidth=function(img,initialWidth){var width=initialWidth||img[0].width,elem=img;if(width=="auto"){return width;}if(!width){return false;}if(!elem.is||!elem.parent){if(inst.clonedOverlay.parent()[0]){elem=$("div.multimedia-box",inst.clonedOverlay);}else{elem=$("div.multimedia-box",inst.element);}}while(!elem.is(o.widthElementSel)&&elem[0]){width=$.addOuterDimensions(elem,width,"width");elem=elem.parent();}return width;};}).bind("coverlayindexchange",function(e,ui){var media=$("audio, video",ui.instance.element);if(media&&media.pause){media.pause();}if(ui.instance.scroller){var i=0;ui.instance.scroller.atomElem.removeClass("active-showbox-item");$(ui.instance.scroller.atomElem.eq(ui.index)).addClass("active-showbox-item");ui.instance.scroller.stageWidthUpdate();clearInterval(scrollerUpdateTimer);scrollerUpdateTimer=setInterval(function(){if(!ui.instance.scroller.stageWidthUpdate()){ui.instance.scroller.moveTo("centerTo"+ui.index);if(i<5){clearInterval(scrollerUpdateTimer);setTimeout(function(){if(ui.instance.scroller.stageWidthUpdate()){ui.instance.scroller.moveTo("centerTo"+ui.index);}},400);}}if(i>30){clearInterval(scrollerUpdateTimer);}i++;},90);}}).bind("coverlaybeforeshow",function(e,ui){if(!init){init=true;$("span.overlay-control",ui.instance.element).inOut(function(){$(this).addClass("over-control");},function(){$(this).removeClass("over-control");},{mouseDelay:200});if(opts.generateScroller){var teaser=opts.getScrollerTeaser(ui.instance);ui.instance.scroller=$(opts.scrollerTemplate).find("div.pg-rack-design").html(teaser).end().appendTo($("div.content-box",this)).scroller($.extend(opts.scrollerOpts,{atoms:teaser})).data("scroller");teaser.bind("click",function(e){ui.instance.loadIndex(teaser.index(this,e));return false;});ui.instance.scroller.element.clone().appendTo($("div.content-box",ui.instance.clonedOverlay));}}if(!ui.extras.mm){var inst=ui.instance,url=ui.extras.opener.attr("href"),urlPart=url.split("?")[0],type=ui.extras.opener.attr("type")||"";type=[type,type.split("/")];inst.mask.addClass("loading-mask").mask("show");$.each($.createUrlIndex.mmContent.types,function(name,mmHanlder){if(mmHanlder.filter(url,inst.currentOpener,urlPart,type)){mmHanlder.load(url,inst.currentOpener,ui,function(url,width){inst.options.getTextContent(inst.currentOpener,inst.content,inst);inst.fillContent();width=inst.calcWidth(ui.extras.mm,width);if(width){inst.widthElement.css({width:width});}inst.stopShow=false;inst.updateIndex(url);inst.show(e,ui.extras);inst._trigger("indexchange",e,{oldAnchor:null,index:inst.currentIndex,opener:inst.currentOpener,content:inst.content,instance:inst});inst.mask.removeClass("loading-mask");});return false;}return undefined;});inst.stopShow=true;}}).bind("coverlayshow",function(e,ui){var inst=ui.instance;if(inst.options.slideShowAutostart){inst.play(true);}}).bind("coverlayhide",function(e,ui){ui.instance.pause();$("div.content-box",ui.element).removeAttr("aria-live").removeAttr("aria-busy");}).cOverlay(opts);return(opts.returnOverlay)?lightbox:this;};$.fn.showbox.defaults={returnOverlay:false,mask:true,maskOpts:{fadeInTime:600},focusOnShow:"h1.showbox-title",addRole:"dialog",positionType:"centerHorizontalView",followScroll:true,widthElementSel:".content-box",structure:'<div class="showbox">'+'<div class="showbox-box">'+'<div class="showbox-head">'+'<h1 class="showbox-title"></h1>'+'<span class="showbox-toolbar">'+'<a role="button" class="prev prev-btn" href="#" /> <a role="button" class="next next-btn" href="#" />'+' <a class="play-pause" role="button" href="#" />'+' <span class="current-index" /> / <span class="item-length" />'+"</span>"+"</div>"+'<div class="content-box"><div class="multimedia-box-wrapper"><span class="prev overlay-control"><span /></span> <span class="next overlay-control"><span /></span><div class="multimedia-box"></div></div><div class="text-content"></div></div>'+' <a role="button" class="close-button" href="#"></a>'+"</div>"+"</div>",getTextContent:"standard",addKeyNav:true,addLiveRegion:true,showContentAnim:function(ui,img,e,extras){var contentBox=$("div.content-box",ui.element);contentBox.queue(function(){ui.fillContent();ui.widthElement.css({width:ui.calcWidth(img)});contentBox.fadeTo(300,1);contentBox.dequeue();});},hideContentAnim:function(ui){var contentBox=$("div.content-box",ui.element);contentBox.fadeTo(300,0);},animHide:function(jElm,data){var hiddenStyle=(data.instance.options.hideStyle=="visibility")?{visibility:"hidden"}:{display:"none"};jElm.css(hiddenStyle);var mm=$("div.multimedia-box",jElm);if(window.swfobject&&$("object",mm)[0]){swfobject.removeSWF($("object",mm).getID());}else{mm.empty();}},controlsWrapper:".showbox-toolbar",slideShowAutostart:false,slideshowDelay:4000,playTitle:"",playText:"play",pauseText:"pause",pauseTitle:"",generateScroller:false,scrollerOpts:{prevLink:"div.pg-prev span",nextLink:"div.pg-next span",hidingWrapper:"div.pg-rack",moveWrapper:"div.pg-rack-design"},getScrollerTeaser:function(inst){return inst.uniqueOpeners.closest("dl").clone();},scrollerTemplate:'<div class="photogroup-wrapper"><div class="pg-pager"><div class="pg-prev"><span> </span></div><div class="pg-next"><span> </span></div></div><div class="pg-rack"><div class="pg-rack-design"></div></div></div>'};$.fn.showbox.getContentMethods={standard:function(opener,content,ui){content["text-content"]=opener.prop("title")||"";},dl:function(opener,content,ui){var dl=opener.closest("dl"),dds=$("dd",dl),img=$("img",dl),extraContent="";if(content["multimedia-box"]&&content["multimedia-box"].attr){content["multimedia-box"].attr("alt",img.attr("alt"));}content["text-content"]="";dds.each(function(){var dd=$(this),html=dd.html();if(dd.is(".caption")){content["text-content"]+='<h2 class="caption">'+html+"</h2>";content["showbox-title"]=html;}else{if(dd.is(".longdesc")){content["text-content"]+='<p class="longdesc">'+html+"</p>";}else{if(!dd.is(".zoom")){extraContent+='<li class="'+this.className+'">'+html+"</li>";}}}});if(extraContent){content["text-content"]+='<ul class="sb-extra">'+extraContent+"</ul>";}}};$.ui.cOverlay.posMethods.constrainInsideView=function(overlay,e,extra,ui){var o=ui.options,doc=$(document),pos;if(!$.objScale){setTimeout(function(){throw ("please install the objScale plugin");},0);return{};}$.swap(overlay[0],{position:"absolute",visibility:"hidden",display:"block"},function(){var imgDim={},dim={};o.positionOpts.cleanCSS=false;pos=$.objScale.constrainObjTo(overlay,$(window),o.positionOpts);if(extra.mm.css&&extra.mm.attr&&extra.mm[0]){imgDim=$.objScale.getDim(extra.mm);imgDim=$.objScale.constrainObjTo(imgDim,{width:imgDim.width+pos.widthSubtraction,height:imgDim.height+pos.heightSubtraction});dim.width=imgDim.width;dim.height=imgDim.height;extra.mm.css(dim).attr(dim);overlay.css("width",ui.calcWidth(extra.mm,dim.width));pos=$.objScale.constrainObjTo(overlay,$(window),o.positionOpts);extra.mm.css({width:"auto",margin:"auto",display:"block"});}});pos.top+=doc.scrollTop();pos.left+=doc.scrollLeft();delete pos.widthSubtraction;delete pos.heightSubtraction;$.ui.cOverlay.posMethods.centerHorizontalView.addFollowScroll(ui.element,ui);return pos;};$.ui.cOverlay.posMethods.constrainHorizontalView=function(overlay,e,extra,ui){var o=ui.options,pos=$.ui.cOverlay.posMethods.constrainInsideView(overlay,e,extra,ui);pos.top=$(document).scrollTop();return pos;};})(jQuery);});