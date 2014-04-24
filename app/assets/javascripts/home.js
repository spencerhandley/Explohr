var socket = io.connect('http://localhost');
	socket.on('news', function (data) {
		console.log(data);
	socket.emit('my other event', { my: 'data' });
});

$(document).ready(function(){
	
	var paralax = function(top){
    var scrolled = $(window).scrollTop();
     $(top).css('top', -(scrolled / 2) + 'px');
	}
	$(window).scroll(function(e){
		paralax(".profileTop");
		paralax(".top");

	});

	



	$("#moreClasses").click(function(){
		$("#secondRow").toggleClass("hidden");
		if ($("#secondRow").hasClass("hidden")) {
 			return
		 }else {
		 	$("#moreClasses").html("Hide")
		 }
	});
});

