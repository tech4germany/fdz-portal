(function($){var controlState={};$.each({disable:["-1","true","addClass"],enable:["0","false","removeClass"]},function(name,sets){controlState[name]=function(){var jElm=$(this);if(!jElm.is("span, div")){jElm.attr({tabindex:sets[0],"aria-disabled":sets[1]});}jElm[sets[2]]("ui-disabled");};});$.createUrlIndex=function(anchors,obj){var o=obj.options;if(!o.nextImgBtn){o.nextImgBtn=".next";}if(!o.prevImgBtn){o.prevImgBtn=".prev";}o.srcAttribute=o.srcAttribute||"href";obj.uniqueUrls=[];obj.uniqueOpeners=[];anchors.each(function(){var url=$(this).attr(o.srcAttribute);if(url&&$.inArray(url,obj.uniqueUrls)===-1){obj.uniqueUrls.push(url);obj.uniqueOpeners.push(this);}});obj.nextBtn=$(o.nextImgBtn,obj.element);obj.prevBtn=$(o.prevImgBtn,obj.element);obj.playPauseBtn=$(".play-pause",obj.element);if($.support.waiAria){obj.nextBtn.add(obj.prevBtn).add(obj.playPauseBtn).each(function(){if($.nodeName(this,"a")){$(this).removeAttr("href").attr({tabindex:"0"});}});}obj.currentIndexDisplay=$(".current-index",obj.element).html("1");obj.lengthDisplay=$(".item-length",obj.element).html(obj.uniqueUrls.length);obj.play=function(delay,playAgain){if(obj.isPlaying){return;}obj.isPlaying=true;obj.playPauseBtn.addClass("ui-isplaying").html(o.pauseText);if(o.pauseTitle){obj.playPauseBtn.attr({title:o.pauseTitle});}slideShowLoad((delay)?o.slideshowDelay:0,(playAgain!==undefined)?playAgain:true);};obj.pause=function(){if(!obj.isPlaying){return;}obj.isPlaying=false;obj.playPauseBtn.addClass("ui-isplaying").html(o.playText);if(o.playTitle){obj.playPauseBtn.attr({title:o.playTitle});}clearTimeout(obj.slideshowTimer);};obj.playPauseToggle=function(time,playAgain){obj[(obj.isPlaying)?"pause":"play"](time,playAgain);return false;};obj.isPlaying=false;if(obj.uniqueUrls.length>1){obj.nextBtn.bind("ariaclick",function(e){obj.loadNext(e);return false;});obj.prevBtn.bind("ariaclick",function(e){obj.loadPrev(e);return false;});obj.playPauseBtn.bind("ariaclick",function(){obj.playPauseToggle(undefined,true);return false;});if(o.addKeyNav){obj.element.bind("keydown",function(e){var prevent;switch(e.keyCode){case $.ui.keyCode.LEFT:prevent=obj.loadPrev(e);break;case $.ui.keyCode.RIGHT:prevent=obj.loadNext(e);break;case $.ui.keyCode.SPACE:obj.playPauseToggle();break;}return prevent;});}}else{if(o.controlsWrapper){$(o.controlsWrapper,obj.element).addClass("ui-disabled");}obj.playPauseBtn.each(controlState.disable);}function slideShowLoad(time,playAgain){clearTimeout(obj.slideshowTimer);obj.slideshowTimer=setTimeout(function(){if(!obj.loadNext({type:"slideshow"})){if(o.carousel||playAgain){obj.loadIndex(0,{type:"slideshow"});}else{obj.pause();}}},time||0);}obj.uniqueOpeners=$(obj.uniqueOpeners);obj.updateIndex=function(url){var extendUI={disable:$([]),enable:$([])};obj.currentUrl=url;obj.currentIndex=$.inArray(url,obj.uniqueUrls);obj.currentAnchor=obj.uniqueOpeners.filter(":eq("+obj.currentIndex+")");obj.currentIndexDisplay.html(String(obj.currentIndex+1));if(obj.currentIndex===0){if(!o.carousel){extendUI.disable=obj.prevBtn.each(controlState.disable);}obj._trigger("indexStartEndReachedChange",{type:"indexStartReached"},obj.ui(extendUI));}else{if(obj.prevBtn.hasClass("ui-disabled")){extendUI.enable=obj.prevBtn.each(controlState.enable);obj._trigger("indexStartEndReachedChange",{type:"indexStartReachedChanged"},obj.ui(extendUI));}}if(obj.uniqueUrls.length<=obj.currentIndex+1){if(!o.carousel){obj.pause();extendUI.disable=obj.nextBtn.each(controlState.disable);}obj._trigger("indexStartEndReachedChange",{type:"indexEndReached"},obj.ui(extendUI));}else{if(obj.nextBtn.hasClass("ui-disabled")){extendUI.enable=obj.nextBtn.each(controlState.enable);obj._trigger("indexStartEndReachedChange",{type:"indexEndReachedChanged"},obj.ui(extendUI));}}};obj.loadIndex=function(index,e){if(typeof index==="string"&&index*1!==index){index=$.inArray(index,obj.uniqueUrls);}if(index===obj.currentIndex||index===-1){return false;}var nextAnchor=obj.uniqueOpeners.filter(":eq("+index+")"),oldAnchor=obj.currentAnchor,url,urlPart,type;if(nextAnchor[0]){url=nextAnchor.attr(o.srcAttribute);urlPart=url.split("?")[0];type=nextAnchor.attr("type")||"";type=[type,type.split("/")];e=e||{type:"loadIndex"};obj.updateIndex(url);obj.element.addClass("loading");if(obj.mask){obj.mask.addClass("loading-mask");}o.hideContentAnim(obj,e,{oldAnchor:oldAnchor,index:index,opener:nextAnchor,content:obj.content});if(o.addLiveRegion){$("div.content-box",obj.element).attr({"aria-busy":"true"});}$.each($.createUrlIndex.mmContent.types,function(name,mmHandler){if(mmHandler.filter(url,nextAnchor,urlPart,type)){mmHandler.load(url,nextAnchor,obj,function(url,width){var uiEvent={oldAnchor:oldAnchor,index:index,opener:nextAnchor,instance:obj};uiEvent.content=obj.content;obj.options.getTextContent(nextAnchor,obj.content,obj);o.showContentAnim(obj,obj.content["multimedia-box"],e,uiEvent);obj._trigger("indexchange",e,uiEvent);obj.element.queue(function(){obj.element.removeClass("loading");if(obj.mask){obj.mask.removeClass("loading-mask");}obj.element.dequeue();});if(obj.isPlaying){slideShowLoad(o.slideshowDelay);}if(o.addLiveRegion){$("div.content-box",obj.element).attr({"aria-live":"polite","aria-busy":"false"});}});return false;}return undefined;});return true;}return false;};obj.loadNext=function(e){var retVal=obj.loadIndex(obj.currentIndex+1,e);if(retVal===false&&o.carousel){retVal=obj.loadIndex(0,e);}return retVal;};obj.loadPrev=function(e){var retVal=obj.loadIndex(obj.currentIndex-1,e);if(retVal===false&&o.carousel){retVal=obj.loadIndex(obj.uniqueOpeners.length-1,e);}return retVal;};};$.createUrlIndex.mmContent={types:{},add:function(name,obj){this.types[name]=obj;}};var imgReg=/\.jpg$|\.jpeg$|\.gif$|\.png$/i;$.createUrlIndex.mmContent.add("img",{filter:function(url,opener,urlPart,type){if(type[1][0]==="image"||opener.is(".img, .image, .picture")){return true;}return(imgReg.test(urlPart));},load:function(url,opener,ui,fn){var inst=ui.instance||ui;$.imgPreLoad.loadNow(url,function loadImg(e){var imgWidth=this.width,jElm=$(this);if(ui.extras){ui.extras.mm=jElm;}inst.content={"multimedia-box":jElm};fn(url,imgWidth);});}});})(jQuery);