(function($) {
  $.fn.checkbox = function() {
		$(this).css({position: 'absolute', left: '-9999px'}).each(function() {
			var input = $(this);
			if (input.next('span.checkbox').length < 1) {
				var span = $('<span class="checkbox" style="display:inline-block"></span>');
				input.after(span);
				if (input.is(':checked')) span.addClass('checked');
				if (input.is(':disabled')) span.addClass('disabled');

				span.click(function() {
					if (!span.is('.disabled')) {
						if (input.is(':checked')) {
							input.removeAttr('checked');
							span.removeClass('checked');
						} else {
							input.attr('checked', true);
							span.addClass('checked');
						}
						input.change();
						return false;
					}
				});

				input.parent('label').add('label[for="' + input.attr('id') + '"]').click(function() {
					span.click();
					return false;
				});

				input.change(function() {
					if (input.is(':checked')) span.addClass('checked');
					else span.removeClass('checked');
				})

				.keydown(function(e) {
					if (input.parent('label').length && (e.which == 13 || e.which == 32)) span.click();
				})
				.focus(function() {
					if (!span.is('.disabled')) span.addClass('focused');
				})
				.blur(function() {
					span.removeClass('focused');
				});

				input.live('refresh', function() {
					if (input.is(':checked')) span.addClass('checked');
						else span.removeClass('checked');
					if (input.is(':disabled')) span.addClass('disabled');
						else span.removeClass('disabled');
				})
			}
		});
	}
})(jQuery)
