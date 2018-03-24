/*!
 * @author Thomas <thansen@solire.fr>
 * @licence CC BY-NC 4.0 http://creativecommons.org/licenses/by-nc/4.0/
 *
 * Wrapper module for bootstrap datepicker
 *
 * https://github.com/eternicode/bootstrap-datepicker
 * to install : bower install bootstrap-datepicker#1.3.*
 * or add : "bootstrap-datepicker": "1.3.*" in your bower.json
 */
(function(window, document) {
  var factory = function($, ColumnFilter) {
    'use strict';

    $.fn.datepicker.defaults.format = 'dd/mm/yyyy';

    ColumnFilter.filter.rangeBase = $.extend(true, {}, ColumnFilter.filter.range);
    ColumnFilter.filter.range = {};
    $.extend(
      ColumnFilter.filter.range,
      ColumnFilter.filter.rangeBase,
      {
        separator: '~',
        dom: function (th) {
          ColumnFilter.filter.rangeBase.dom.call(this, th);

          this.elements.addClass('form-control input-sm');

          return this.elements;
        },
        bindEvents: function(){
          var self = this;

          self.elements.datepicker().on('changeDate', function(){
            self.search();
          });
        },
        format: function(value){
          return value.split('/').reverse().join('-');
        },
        request: function(){
          var
            self = this,
            search = []
          ;

          self.elements.each(function(){
            var value = $(this).val();
            value = self.options.format(value);
            search.push(value);
          });

          return search.join(self.options.separator);
        }
      }
    );
  };

  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables-columnfilter', 'datepicker'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables-columnfilter'), require('datepicker'));
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable.ColumnFilter);
  }
})(window, document);
