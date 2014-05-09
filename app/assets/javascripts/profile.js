
$(document).ready(function () {
	$(".delete").click(function (){
		var that = this
		var id = $(this).data("id")
		var user =  $(".container").data("user")
		console.log("id:" + id)
		console.log("user:" + user)
		$.ajax({
			type: "POST",
			url: "/company/" + user + "/trad/" + id + "/delete"
		})
		var liItem = $(this).parents("li")
		liItem.hide()
	})
})