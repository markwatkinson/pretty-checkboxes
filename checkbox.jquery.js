(function($) {

  /*
   * Simple plugin to replace checkboxes and radio buttons with a <div>
   * element which can be styled, or given background images, or whatever
   */

  $.fn.prettyCheckbox = function(callback) {


   // helper
   function set_image() {
     var replacement = $(this).data('replacement'),
         checked = $(this).is(':checked');
     if (checked) {
       replacement.addClass('checked').removeClass('unchecked');
     } else {
       replacement.addClass('unchecked').removeClass('checked');
     }
     if (callback)
       callback.call(this, $(this).is(':checked'));
    }

    $(this).each(function() {
      var $el = $(this), // the original checkbox. We keep this, so the form
                         // still works properly, and we use it as the base
                         // is/isn't clicked element.
          // the new element
          replacement = $('<div class="checkbox" style="display: inline-block">'),
          // event handler, for the real checkbox. We'll trigger its click
          // event ourselves
          change = function() {
            var clicked = $(this).is(':checked');

            // the change event doesn't fire for radio buttons which change as
            // a result of other radio buttons being clicked
            // we have to do this ourselves.
            if ($(this).is(':radio')) {
              var group = $(this).attr('name');
              $('input[name=' + group + ']:radio').each(function() {
                set_image.call($(this));
              });
            }
            $el.attr('checked', clicked);
            set_image.call($el);
          },

          pseudo_click = function() {
            $el.trigger('click');
          };

      $el.change(change);
      $el.data('replacement', replacement);
      replacement.click(pseudo_click);

      var id, clickers = replacement;
      if ((id = $el.attr('id'))) {
        clickers = clickers.add($('label[for=' + id + ']'));
      }
      clickers.hover(function() {
        replacement.toggleClass('hover');
      });

      set_image.call($el);
      $(this).before(replacement).hide();
    });
  };
})(jQuery);
