
$(document).ready(function () {
	var deleteItem = function (type, wha){
		console.log("hey!")
		var that = wha
		var id = $(wha).data("id")
		var user =  $(".container").data("user")
		console.log("id:" + id)
		console.log("user:" + user)
		$.ajax({
			type: "POST",
			url: "/company/" + user + "/" + type + "/" + id + "/delete"
		})
		var liItem = $(wha).parents("li")
		liItem.hide()
	}	

	$(".delExp").click(function(){
	 	deleteItem("exp", this)})
	$(".delTrad").click(function(){
	 	deleteItem("trad", this)})
	$(".delSpon").click(function(){
	 	deleteItem("spon", this)})
	$(".delOutdoor").click(function(){
	 	deleteItem("outdoor", this)})
	$(".delCert").click(function(){
	 	deleteItem("cert", this)})

	$("#areasOfExpertise").popover()
	$("#fieldDays").popover()
	$(".aboutField").popover()
$("#expType").on("change", function(){
	var type = $(this).val();
	if(type == "expiditionary") {
		$("#expFormCont").html()
	}
})



})
