(function(window,undefined){require(["libs/modernizr.custom"],function(){require(["polyfiller"],function(){$.webshims.setOptions({extendNative:false,waitReady:false,addCacheBuster:"?view=unrender&amp;v=10"});$.webshims.polyfill("es5");});});var $=jQuery,projectInit={immediate:function(){var $body=$("body");$body.addClass("js-on");$body.removeClass("js-off");},domReadyOnce:function(){},everyDomReady:function(context){require(["fb-modules/jquery.tabtree"],function(){$("div.accordion-box",context).tabtree({buttonSel:"h3",handleDisplay:false,panelSel:"div",toggleButton:true,multiSelectable:true,hideStyle:"visibility",defaultSelected:-1,expand:function panelSlide(e,ui){ui.panel.stop().children().first().slideParentDown({hideStyle:"visibility"});},collapse:function panelSlide(e,ui){ui.panel.stop().children().first().slideParentUp({hideStyle:"visibility"});},init:function(e,ui){ui.panels.each(function(){$(this).children().first().slideParentUp({hideStyle:"visibility"});});}});$("div.text-box",context).tabtree({buttonSel:"ol.toc a"});$("#stage",context).tabtree({buttonSel:"ol.toc a",panelSel:".teaser",expand:function(e,ui){var handler=$(ui.instance.element).find(".handler");var h3=$(ui.instance.buttons[ui.instance.selectedIndexes]).text();var p=$(ui.instance.panels[ui.instance.selectedIndexes]).find("p").html();handler.find("h3").text(h3);handler.find("p").html(p);var top=0;top+=ui.instance.buttons.eq(ui.instance.selectedIndexes).closest("li").prevAll().outerHeights();var height=handler.outerHeight();var nextElm=ui.instance.buttons.eq(ui.instance.selectedIndexes).closest("li").next();nextElm.animate({"margin-top":(height-ui.instance.buttons.eq(ui.instance.selectedIndexes).closest("li").outerHeight())+"px"},200);handler.animate({"top":top+"px"},200);$(ui.instance.buttons[ui.instance.selectedIndexes]).closest("li");},collapse:function(e,ui){ui.instance.buttons.closest("li").css("margin-top","0");},init:function(e,ui){var handler=$(ui.instance.element).find(".handler");var h3=$(ui.instance.buttons[ui.instance.selectedIndexes]).text();var p=$(ui.instance.panels[ui.instance.selectedIndexes]).find("p").html();handler.find("h3").text(h3);handler.find("p").html(p);var top=0;top+=ui.instance.buttons.eq(ui.instance.selectedIndexes).closest("li").prevAll().outerHeights();var height=handler.outerHeight();var nextElm=ui.instance.buttons.eq(ui.instance.selectedIndexes).closest("li").next();nextElm.css({"margin-top":(height-ui.instance.buttons.eq(ui.instance.selectedIndexes).closest("li").outerHeight())+"px"});handler.css("top",top+"px");$("ol.toc").removeClass("notplaced").addClass("placed");}});});require(["fb-modules/ui.scroller"],function(){$("div.teaser-switcher:not(* .gallery)",context).scroller({atoms:".teaser"});});require(["modules/aperto.stickySidebar"],function(){$(".stickySidebar").stickySidebar();});$("#navFunctionsPrint").find("a").bind("click",function(e){e.preventDefault();window.print();});require(["fb-snippets/jquery.imgpreload","fb-snippets/jquery.objscale","fb-modules/ui.cOverlay","fb-modules/ui.scroller","fb-snippets/urlIndex","fb-modules/showbox","fb-modules/ui.gallery"],function(){$("div.article-teaser-switcher .image-wrapper a:not(.gallery *)").showbox({addKeyNav:true,widthElementSel:".showbox",positionType:"constrainHorizontalView",structure:'<div class="showbox">'+'<div class="showbox-box">'+'<div class="showbox-head">'+'<h1 class="showbox-title"></h1>'+"</div>"+'<div class="content-box"><div class="multimedia-box-wrapper"><span class="prev overlay-control"><span /></span> <span class="next overlay-control"><span /></span><div class="multimedia-box"></div></div><div class="text-content"></div><span class="showbox-toolbar">'+' <span class="current-index" /> / <span class="item-length" />'+"</span></div>"+' <a role="button" class="close-button" href="#"></a>'+"</div>"+"</div>",getTextContent:function(opener,content,ui){var imageWrapper=opener.closest(".image-wrapper");content["text-content"]=imageWrapper.find("span.source").clone().html();content["showbox-title"]=imageWrapper.find("h3").text();},animShow:function(jElm,ui){delete ui.posCSS.height;jElm.css(ui.posCSS).css({visibility:"visible"});}});$("div.gallery",context).galleryshowbox({scroller:"div.article-teaser-switcher",addScroller:"gallery",scrollerOpts:{prevLink:"div.pager div.prev span",nextLink:"div.pager div.next span",hidingWrapper:"div.rack",moveWrapper:"div.rack-design",atoms:"div.teaser"},showboxOpts:{setInitialContent:{"showbox-title":"Titel der Galerie","prev-btn":"zurück","next-btn":"vor","close-button":"schließen","play-pause":"Play"},mask:true,playTitle:"Diashow abspielen",playText:"Play",pauseText:"Pause",pauseTitle:"Diashow anhalten",widthElementSel:".showbox",positionType:"constrainHorizontalView",positionOpts:{cleanCSS:false,margin:[30,20]},animShow:function(jElm,ui){delete ui.posCSS.height;jElm.css(ui.posCSS).css({visibility:"visible"});},getTextContent:function(opener,content,ui){var imageWrapper=opener.closest(".image-wrapper");content["text-content"]=imageWrapper.find("span.source").clone().html();content["showbox-title"]=imageWrapper.find("h3").text();},structure:'<div class="showbox">'+'<div class="showbox-box">'+'<div class="showbox-head">'+'<h1 class="showbox-title"></h1>'+"</div>"+'<div class="content-box"><div class="multimedia-box-wrapper"><span class="prev overlay-control"><span /></span> <span class="next overlay-control"><span /></span><div class="multimedia-box"></div></div><div class="text-content"></div><span class="showbox-toolbar">'+' <span class="current-index" /> / <span class="item-length" />'+"</span></div>"+' <a role="button" class="close-button" href="#"></a>'+"</div>"+"</div>"},galleryOpts:{openerSel:"div.image-wrapper a",openerWrapper:"div.image-wrapper",getTextContent:function(opener,content,ui){var imageWrapper=opener.closest(".image-wrapper");content["text-content"]='<h2 class="caption">'+imageWrapper.find("h3").text()+'</h2><p><span class="source">'+imageWrapper.find("span.source").html()+"</span></p>";}}});require(["Addon_Printlink","Addon_Clearfields","Addon_RichtextAccordion","Addon_FlyoutMenu","Addon_MaxHeight"],function(){$("#navFunctions").materna_init_printlink();$(document).materna_init_Clearfields();if($("input[name=templateQueryString]").length){require(["Addon_Autosuggest"],function(){$(document).ready(function(){$.materna_init_autosuggest();});});}if($("input[name=schulungsmaterialSearchString]").length){require(["Addon_Autosuggest_Schulungsmaterial"],function(){$(document).ready(function(){$.materna_init_autosuggest_schulungsmaterial();});});}if($(".GlossarEntry").length){require(["Addon_GlossarPopup"],function(){$.init_glossarylink();});}$("#navPrimary").materna_init_FlyoutMenu();if($("a.lupe").length){require(["Addon_Lightbox","Addon_Lightbox_a11y"],function(){if($(".photogalleryDocuments a").length){$("a.lupe, .photogalleryDocuments a").lightBox();}else{$("a.lupe").each(function(){$(this).lightBox({"hasNavigation":"false"});});}});}if(jQuery(".accordion").size()>0){var container=jQuery(".accordion").parent();var accordions=container.find(".accordion");accordions.each(function(){var el=jQuery(this);var headlines=el.find(".accordionHeader");var contents=el.find(".accordionBody");headlines.each(function(){$(this).removeClass("open").removeClass("close").addClass("close");$(this).nextAll(".accordionBody").each(function(){$(this).removeClass("open").removeClass("close").addClass("close");});});headlines.click(function(){var content=$($(this).nextAll(".accordionBody")[0]);var headline=$(this);if(headline.hasClass("open")){headline.removeClass("open").addClass("close");content.removeClass("open").addClass("close");}else{headline.removeClass("close").addClass("open");content.removeClass("close").addClass("open");}});});}if($(".startaccordion").length){$(".startaccordion").each(function(){$(this).materna_RichtextAccordion({control:$(this).prop("tagName")});});}if($("#content .teaserZweispaltig").length){if($("#content .teaserZweispaltig.keinTeasertext").length){require(["Addon_MaxHeight"],function(){$("#wrapperDivisions").find("#content .teaserZweispaltig").gsb_maxHeight({boxes:".teaser"});});}else{require(["Addon_MaxHeight"],function(){$("#wrapperDivisions").find("#content .teaserZweispaltig").gsb_maxHeight({boxes:".teaser",elementsPerRow:2});});}}if($(".accordeon_openAll .accordeon_openAll_button").length>0){var accordionButtonOpenAll=$(".accordeon_openAll .accordeon_openAll_button");accordionButtonOpenAll.click(function(event){event.preventDefault();if($(".accordionControl, .accordionHeader").length>0){$(".accordionControl, .accordionHeader").each(function(){if(($(this).hasClass("closed")||$(this).hasClass("close"))&&accordionButtonOpenAll.hasClass("actionOpen")){$(this).click();}else{if($(this).hasClass("open")&&accordionButtonOpenAll.hasClass("actionClose")){$(this).click();}}});}if($(this).text()==ALLES_OEFFNEN_TEXT){$(this).text(ALLES_SCHLIESSEN_TEXT);$(this).removeClass("actionOpen");$(this).addClass("actionClose");}else{$(this).text(ALLES_OEFFNEN_TEXT);$(this).removeClass("actionClose");$(this).addClass("actionOpen");}});}if($("input[name=idInstanceAnswerWebsiteF01a]").length>0&&$("input[name=instanceText_WebsiteF01b]").length>0){var radioSonstiges=$("input[name=idInstanceAnswerWebsiteF01a]");$("input[name=instanceText_WebsiteF01b]").each(function(){$(this).attr("readonly","readonly");});radioSonstiges.change(function(event){var selectedValue=$("input[name=idInstanceAnswerWebsiteF01a]:checked").val();if(selectedValue=="26634"){$("input[name=instanceText_WebsiteF01b]").each(function(){$(this).removeAttr("readonly");});}else{$("input[name=instanceText_WebsiteF01b]").each(function(){$(this).attr("readonly","readonly");});}});}});});require(["//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"],function(webfont){webfont.load({google:{families:["Droid Sans","Droid Serif"]}});});}};require(["libs/jquery.ui.widget","libs/jquery.ui.core","libs/iepp-cfg","init/cfg"],function(){projectInit.immediate();$(function(){projectInit.domReadyOnce();projectInit.everyDomReady(document);});});require(["Addon_JQuery_Modal"],function(){if($("#umfrageTeaser").length==1){var umfrageId=$("#umfrageTeaser").data("docid");var cookie=getCookie(umfrageId);if(cookie==""){$("#umfrageTeaser").modal({escapeClose:false,clickClose:false,showClose:false});setCookie(umfrageId,"1",28);}$("#umfrageTeaser").find(".takePart").focus();}});function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/";}function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" "){c=c.substring(1);}if(c.indexOf(name)==0){return c.substring(name.length,c.length);}}return"";}}(this,void 0));