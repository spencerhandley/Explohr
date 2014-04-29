$(document).ready(function() {
	$("#addQuestionaire").click(function() {
		$("#questionaire").modal();
	})
	var addForms = function(button, form, container){
		var $addBtn = $("#" + button),
			$form = $(form).last(),
			$container = $(container)
			data = parseInt(document.getElementById(button).getAttribute("data-i")),
			index = data,
		$rcForm = $(form)

		$addBtn.click(function () {
			var $clone = $form.clone();
			$clone.each(function () {
				var $this = $(this);
				$fields = $this.find('input'),
				$fields.each(function () {
					var $this = $(this);
					var old = $this.prop('name');
					$this.prop('name', old.replace(index.toString(), index + 1)); 
				})
			});
			$form = $clone;
			$container.append($clone);
			index++;
		});
	};
	addForms("addQuestion", "#questionForm", "#questionFormContainer");

});