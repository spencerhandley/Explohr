(function(){
	var $listing = $('.listing')
	,   $applicantFlowBtn = $('.applicant-flow-button');

	$listing.on("click", function() {
		 $(".listings > div").each( function(){
		 	if ( $(this).hasClass("listing-active") ) {
		 		$(this).removeClass("listing-active");
				$(this).addClass("listing");
		 	}
		 });

		$(this).toggleClass("listing-active").toggleClass("listing");
	});


	
})();