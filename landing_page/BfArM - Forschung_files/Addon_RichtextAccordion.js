/*!
 * jQuery-Funktion zum Einbau eines Akkordeons
 *
 * HTML-Struktur:
 *
 *  <div class="someClass">
 *
 *    <h3 class="startaccordion">Ueberschrift 1</h3>
 *  
 *    Content
 *
 *    <h3>Ueberschrift 2</h3>
 *
 *    Content2
 *  
 *    <h3 class="endaccordion">Ueberschrift 3</h3>
 *  
 *    Content3
 *  
 *    <h3>Ueberschrift 4</h3>
 *  
 *    Content4
 *
 *    <h3 class="startaccordion">Ueberschrift 5</h3>
 *
 *    Content5
 *
 *    <h3>Ueberschrift 6</h3>
 *
 *    Content6
 *  
 *  </div>
 *
 * Erlaeuterung: Nur Ueberschrift 4 und Content4 sind nicht Teil eines Accordions.
 *               Insgesamt 2 Accordions: a) 1-3 und b) 5-6
 *
 * Aufruf:
 *
 *  jQuery('.someClass').materna_RichtextAccordion({options});
 */
;(function($){
   if(!$.materna){
      $.materna = {};
   };
  
   var base = {};
  
   $.materna.RichtextAccordion = function(el, options) {
      var $el = base.$el = $(el);
     
      options = base.options = $.extend({}, $.materna.RichtextAccordion.defaultOptions, options);
      base.el = el;
      base.$el.data("materna.RichtextAccordion", base);
      base.init = function(){
         var controlElems;

         // Put your initialization code here
         controlElems = base.controlElems = $el.nextUntil("p.endaccordion", options.control).andSelf();
         if(controlElems.length > 0){      
            controlElems.addClass('closed accordionControl').attr('title', 'Details einblenden').toggle(
               //"open" state
               function(){
                  $(this).removeClass('closed').addClass('open').attr('title', 'Details ausblenden');
                  $(this).nextUntil(options.control + ", .endaccordion + *").show().attr('aria-expanded', 'true').children().show();
               },
               //"closed" state
               function(){
                  $(this).removeClass('open').addClass('closed').attr('title', 'Details einblenden');
                  $(this).nextUntil(options.control + ", .endaccordion + *").hide().attr('aria-expanded', 'false');
               }
            ).attr({
               role : 'button',
               tabindex : '0'
            }).keydown(function(event) {
               if(event.keyCode == '13'){
                  $(this).trigger('click');
               }
            });
           
            //all non-control siblings to a control element ...until another .startaccordion or an .endaccordion is encountered
             controlElems.each(function(){
                  if($(this).hasClass('open') || $(this).hasClass('closed')){     
                    var div=$('<div></div>').attr('aria-expanded', 'false').append($(this).nextUntil(options.control + ", p.endaccordion")).hide();
                    $(this).after(div);                    
                  }
            });
           controlElems.last().next().next().hide();
         }
      }
     
      // Run initializer
      base.init();
   };
   $.materna.RichtextAccordion.defaultOptions = {
      control : "h3"
   };
   $.fn.materna_RichtextAccordion = function(options){
      return this.each(function(){ $.materna.RichtextAccordion(this, options) });
   };
})(jQuery);