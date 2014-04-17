var Explohr = Explohr || {};

(function ($) {
	var KEYCODE_ESC = 27,
		$document = $(document),
		$editProfileBtn = $("#editProfileBtn"),
		$editProfileDialog = $("#editProfileDialog");

	Explohr.Dialog = function (ele) {
		var dialog = this,
			$ele = $(ele);

		dialog.$ele = $ele;
		dialog.$content = $ele.find('.dialog-content');

		$ele.bind('click.dialog', function (e) {
			if ($(e.target).is($ele)) dialog.close();
		});
	};

	$.extend(Explohr.Dialog.prototype, $.eventEmitter);

	Explohr.Dialog.prototype.close = function () {
		var dialog = this;

		$document.unbind('keyup.dialog');
		dialog.$ele.removeClass('open');
		dialog.emit('close');

		return dialog;
	};

	Explohr.Dialog.prototype.open = function () {
		var dialog = this;

		$document.bind('keyup.dialog', _.debounce(function (e) {
			if (e.keyCode === KEYCODE_ESC) dialog.close();
		}, 100));

		dialog.$ele.addClass('open');
		dialog.emit('open');

		return dialog;
	};

	$editProfileBtn.click(function () {
		$editProfileDialog.addClass("open");
	});
})(jQuery);
