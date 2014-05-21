(function(){
	var $listing = $('.listing')
	,   $applicantFlowBtn = $('.applicant-flow-button');

	console.log($(".listing:first").attr('data-listing'))
	$(".listing:first").toggleClass("listing-active").toggleClass("listing");
	var cat = $(".listing-active").attr('data-listing');
	$(".applicant").each( function() {
	 	if(cat == $(this).attr('data-listing')) {
			$(this).fadeIn(200);
		} else {
			$(this).fadeOut(200);
		}
	 })




	$listing.on("click", function() {
		var cat = $(this).attr('data-listing');
		 $(".listings > div").each( function(){
		 	if ( $(this).hasClass("listing-active") ) {
		 		$(this).removeClass("listing-active");
				$(this).addClass("listing");
		 	}
		 });
		 $(".applicant").each( function() {
		 	if(cat == $(this).attr('data-listing')) {
				$(this).fadeIn(200);
			} else {
				$(this).fadeOut(200);
			}
		 })

		$(this).toggleClass("listing-active").toggleClass("listing");
	});


})();