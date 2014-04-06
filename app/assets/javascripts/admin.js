$(document).ready(function(){
	$("#addVideo").click(function(){
		$("#formVideos").append("<div class='form-group col-md-4'><label for='1idea' class='sr-only'>Video 1 - Link</label><input id='1idea' placeholder='Video 1 - Link' type='textfield' name='vid1link' class='form-control'></div><div class='form-group col-md-4'><label for='1desc' class='sr-only'>Video 1 - Title</label><input id='1desc' placeholder='Video 1 - Title' type='textfield' name='1description' class='form-control'></div><div class='form-group col-md-4'><label for='2idea' class='sr-only'>Video 1 - Length</label><input id='1idea' placeholder='Big Idea #2- Idea' type='textfield' name='2idea' class='form-control'></div>")
	})
});