
$(document).ready(function(){
	
	function parallax(){
    var scrolled = $(window).scrollTop();
     $('.profileTop').css('top', -(scrolled / 2) + 'px');
	}
	$(window).scroll(function(e){
	    parallax();
	});
	function parallax(){
    var scrolled = $(window).scrollTop();
     $('.top').css('top', -(scrolled / 2) + 'px');
	}
	$(window).scroll(function(e){
	    parallax();
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

