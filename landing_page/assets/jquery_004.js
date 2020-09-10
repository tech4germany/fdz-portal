(function($){function numsort(a,b){return a-b;}var uniqueID=0;define(["fb-snippets/ui.a11y.ext","libs/jquery.ui.widget"],function(){$.widget("ui.tabtree",{options:{buttonSel:"a",panelSel:false,focusOnExpand:true,focusSel:true,createPanelwrapper:false,toggleButton:false,multiSelectable:false,createPanelTabRelation:false,selectEvents:"ariaclick",bindStyle:"bind",bindContext:false,defaultSelected:0,slideShow:false,restartSlideShow:true,activeButtonClass:"js-selected",activePanelClass:"js-expanded",handleDisplay:true,hideStyle:"display",interceptClick:true,addAria:true},_createPanelAPI:function(button,panel){var that=this;if(!panel[0]){console.log("kein valider tabtree button",button);}$.data(panel[0],"tabtreepanel",{instance:this,button:button,expand:function(e){that.expand(button,e);},collapse:function(e){that.collapse(button,e);}});$.data(button[0],"tabtreebutton",{instance:this,panel:panel,expand:function(e){that.expand(button,e);},collapse:function(e){that.collapse(button,e);}});},_create:function(){var that=this,o=this.options,elem=this.element,isSelectedArray=o.defaultSelected.length,isHTMLSelected;this.selectedIndexes=[];this.slideShowtimer=null;this.buttons=$(o.buttonSel,elem[0]);this.panels=(o.panelSel)?$(o.panelSel,this.element[0]).each(function(i){var button=$(that.buttons[i]),panel=$(this);button.controlsThis(panel);if(o.createPanelTabRelation){panel.labelWith(button);}that._createPanelAPI(button,panel);}):this.buttons.map(function(){var button=$(this),idRef=button.getHrefHash(),panel;if(!idRef||idRef=="#"){console.log("kein valider tabtree button: ",button);}panel=$(idRef);if(o.createPanelTabRelation){panel.labelWith(button);}button.attr({"aria-controls":idRef.replace("#","")});that._createPanelAPI(button,panel);return panel[0];});this.panels=$($.unique(this.panels.get()));if(o.createPanelwrapper){this.panels.wrap('<div class="a11y-panelwrapper" />');}isHTMLSelected=!!this.buttons.filter("."+o.activeButtonClass)[0];this.buttons.each(function(i){var initAction;if(isHTMLSelected){initAction=($(this).hasClass(o.activeButtonClass))?"expand":"collapse";}else{if(isSelectedArray){initAction=($.inArray(i,o.defaultSelected)!==-1)?"expand":"collapse";}else{initAction=(o.defaultSelected===i)?"expand":"collapse";}}that[initAction].call(that,this,{type:"init"});});if(o.addAria){this.buttons.attr({role:"button"});if(this.buttons[0]&&$.nodeName(this.buttons[0],"a")){this.buttons.each(function(){var jElm=$(this);this.setAttribute("data-href",jElm.attr("href"));if($.support.waiAria){jElm.removeAttr("href");}});}}this.panels.attr({role:"group"}).addClass("a11y-js-overflow");uniqueID++;if(o.bindStyle==="live"){this.buttons.context=(o.bindContext)?$(o.bindContext,this.element)[0]:this.element[0];this.buttons.selector=".tabtree-button_"+uniqueID;this.buttons.addClass("tabtree-button_"+uniqueID);if(!this.buttons.context){console.log(o.bindContext+" not found in tab-module");}}if(o.selectEvents){this.buttons[o.bindStyle](o.selectEvents,function(e){var action=(o.toggleButton)?"toggle":"expand";clearInterval(that.slideShowtimer);that[action].call(that,this,e);return false;});}if(o.interceptClick&&(!o.selectEvents||o.selectEvents.indexOf("click")==-1)){this.buttons[o.bindStyle]("click",function(){clearInterval(that.slideShowtimer);if(o.focusOnExpand){that.focusPanel.call(that,$("#"+$(this).attr("aria-controls")),1);}return false;});}if(o.slideShow&&isFinite(o.slideShow)){this.slideShowtimer=setInterval(function(){that.showPrevNext.call(that,1);},o.slideShow);this.element.inOut(function(){clearInterval(that.slideShowtimer);},function(){if(o.restartSlideShow){clearInterval(that.slideShowtimer);that.slideShowtimer=setInterval(function(){that.showPrevNext.call(that,1);},o.slideShow);}});}if($.fn.lazyImgLoader){this.element.lazyImgLoader({e:"tabtreeexpand",visible:this.panels.filter("."+o.activePanelClass)});}this._trigger("init",{type:"init"},this.ui());},getPrevNext:function(dir){var index=this.buttons.index(this.buttons.filter("."+this.options.activeButtonClass)[0])+dir;if(index<0){index=this.buttons.length-1;}else{if(index>=this.buttons.length){index=0;}}return{button:this.buttons.get(index),panel:this.panels.get(index)};},showPrevNext:function(dir){var data=this.getPrevNext(dir);this.expand(data.button,{type:"show-"+dir});},toggle:function(button,e){var action=($(button).hasClass(this.options.activeButtonClass))?"collapse":"expand";this[action](button,e);},selectIndexes:function(indexes,e){if(!$.isArray(indexes)){indexes=[indexes];}var that=this;$.each(indexes,function(i,index){var button=that.buttons.get(index);if(button){that.expand(button,e);}});$.each(this.selectedIndexes,function(i,index){if($.inArray(index,indexes)==-1&&$.inArray(""+index,indexes)==-1){var button=that.buttons.get(index);if(button){that.collapse(button,e);}}});},collapse:function(button,e,_panel,_opener){e=e||{type:"collapse"};button=$(button);if(!button.hasClass(this.options.activeButtonClass)&&e.type!="init"){return false;}var panel=_panel||this.getPanel(button),buttons=this.getButtons(panel),type=(e.type=="init")?"collapseinit":"collapse",that=this,o=this.options,uiObj={button:buttons,panel:panel};if(!o.multiSelectable){uiObj.expandElements=_opener||{panel:$([]),button:$([])};}this.removeIndex(panel);if(this._trigger(type,e,$.extend({},this.ui(),uiObj))===false){this.addIndex(panel);return undefined;}this.setState(buttons,uiObj.panel,"inactive");if(o.handleDisplay===true||(e.type=="init"&&o.handleDisplay)){if(o.hideStyle==="visibility"){uiObj.panel.parent().css({overflow:"hidden",height:0}).end().css({visibility:"hidden"});}else{uiObj.panel.hide();}}uiObj.button=button;$.ui.SR.update();return uiObj;},addIndex:function(index){if(!isFinite(index)&&index.jquery){index=this.panels.index(index[0]);}if($.inArray(index,this.selectedIndexes)===-1){this.selectedIndexes.push(index);this.selectedIndexes.sort(numsort);}},removeIndex:function(index){if(!isFinite(index)&&index.jquery){index=this.panels.index(index[0]);}this.selectedIndexes=$.grep(this.selectedIndexes,function(num,i){return(index!==num);});},expand:function(button,e){e=e||{type:"expand"};button=$(button);if(e.type!="init"&&button.hasClass(this.options.activeButtonClass)){return false;}var type=(e.type=="init")?"expandinit":"expand",that=this,o=this.options,uiObj={},panel=this.getPanel(button),buttons=this.getButtons(panel),collapseButton=this.buttons.filter("."+o.activeButtonClass),posStyle,panelWrapper;uiObj.button=buttons;uiObj.panel=panel;if(!o.multiSelectable){uiObj.collapseElements={button:collapseButton,panel:this.getPanel(collapseButton)};}if(e.type!="init"&&this._trigger("beforeexpand",e,$.extend({},this.ui(),uiObj))===false){return;}this.addIndex(panel);if(e.type!="init"&&!o.multiSelectable){collapseButton.each(function(){that.collapse.call(that,this,e,false,{button:buttons,panel:panel});});}this.setState(buttons,panel,"active");if(o.handleDisplay===true||(e.type=="init"&&o.handleDisplay=="initial")){if(o.hideStyle==="visibility"){panel.parent().css({overflow:"",height:""}).end().css({visibility:""});}else{panel.show();}}$.ui.SR.update();if(o.addToHistory&&e.type!=="init"&&e.type!=="hashHistoryChange"){$.hashHistory.add("tab-"+panel.getID());}this._trigger(type,e,$.extend({},this.ui(),uiObj));if(/click|hashHistoryChange/.test(e.type)&&o.focusOnExpand){that.focusPanel(panel);}return undefined;},collapseAll:function(e){var that=this;$.each(this.selectedIndexes,function(i,index){that.collapse.call(that,that.buttons[index],e);});},getButtons:function(panel){return this.buttons.filter("[aria-controls="+panel.getID()+"]");},getPanel:function(button){return this.panels.filter("#"+button.attr("aria-controls"));},setState:function(button,panel,state){var o=this.options,set=(state=="active")?{c:"addClass",index:"-1",aria:"true"}:{c:"removeClass",index:"0",aria:"false"};if((!o.toggleButton)){button.attr({"tabindex":set.index,"aria-disabled":set.aria})[set.c]("ui-disabled");}else{button.attr({"tabindex":"0"});}button[set.c](o.activeButtonClass).attr("aria-expanded",set.aria);panel[set.c](o.activePanelClass).attr("aria-expanded",set.aria);},focusPanel:function(panel){var o=this.options,focusElem=(o.focusSel===true||!o.focusSel)?panel.firstExpOf("focusPoint"):$(o.focusSel,panel);focusElem.setFocus({context:(panel[0].parentNode||{}).parentNode});return undefined;},ui:function(){return{instance:this,panels:this.panels,buttons:this.buttons,selectedIndexes:this.selectedIndexes};}});});})(jQuery);