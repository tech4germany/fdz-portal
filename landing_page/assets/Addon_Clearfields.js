define("Addon_Clearfields", function() {}),require(["jquery"], function(jQuery) {(function(jQuery) {
  if(!jQuery.materna) {
   jQuery.materna = {};
  };
  jQuery.materna.init_Clearfields = function(el, myFunctionParam, options) {
   // To avoid scope issues, use 'base' instead of 'this'
   // to reference this class from internal events and functions.
   var base = this;
   // Access to jQuery and DOM versions of element
   base.jQueryel = jQuery(el);
   base.el = el;
   // Add a reverse reference to the DOM object
   base.jQueryel.data("materna.init_Clearfields", base);
   base.init = function() {
    base.myFunctionParam = myFunctionParam;
    base.options = jQuery.extend({}, jQuery.materna.init_Clearfields.defaultOptions, options);
    // Put your initialization code here
    // attach events to search form input
      base.attachToField('f3496612d3494774','');
      base.attachToField('f3494916d3494774','');
      base.attachToField('f3494916d3496614','tt.mm.jjjj');
      base.attachToField('f3494916d3496616','tt.mm.jjjj');
      base.attachToField('f3496626d3496628','');
      base.attachToField('f3496630d3496628','');
      base.attachToField('f3496630d3496632','yyyy.MM.dd');
      base.attachToField('f3496630d3496634','yyyy.MM.dd');
    return;
   };
   base.attachToField = function(id, defaultValue) {
    var field = jQuery('#' + id);
    var input_text = field.attr('value');
    return jQuery(field).bind('focus', function() {
     if(input_text == defaultValue) {
      field.attr('value', '');
     }
    }).bind('blur', function() {
     if(field.attr('value') == '') {
      field.attr('value', input_text);
     }
     input_text = field.attr('value');
    });
   }
   // Run initializer
   base.init();
  };
  jQuery.materna.init_Clearfields.defaultOptions = {
   myDefaultValue : ""
  };
  jQuery.fn.materna_init_Clearfields = function(myFunctionParam, options) {
   return this.each(function() {(new jQuery.materna.init_Clearfields(this, myFunctionParam, options));
   });
  };
 })(jQuery);
});