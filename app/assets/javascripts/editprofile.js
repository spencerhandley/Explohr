(function ($) {
	var addForms = function(button, form, container){
		var $addBtn = $(button),
			$form = $(form),
			$container = $(container)
			index = 0;

		$addBtn.click(function () {
			var $clone = $form.clone();
			$clone.each(function () {
				var $this = $(this);
				$fields = $this.find('input'),
				console.log($fields)
				$fields.each(function () {
					var $this = $(this);
					$this.prop('name', $this.prop('name').replace(index, index + 1)); 
				})
			});
			$form = $clone;
			$container.append($clone);
			index++;
		});
	};

	addForms("#addOutsideCourse", "#outdoorEdEduForm", "#outdoorEdFormContainer");
	addForms("#addTradEdu", "#tradEduForm", "#tradFormContainer")
	addForms("#addCertificate", "#certificateForm", "#certificateFormContainer")
	addForms("#addTeachingExperience", "#teachingForm", "#teachingFormContainer")
	addForms("#addGuidingCo", "#guidingCoForm", "#guidingCoFormContainer")
	addForms("#addTrip", "#tripsForm", "#tripsFormContainer")
	addForms("#addSponsor", "#sponsorForm", "#sponsorFormContainer")
	addForms("#addRoute", "#rockClimbingForm", "#rockClimbingFormContainer")





})(jQuery);
$(document).ready(function(){


	$("#IAA").on('change', function(){
		var IamA = $(this).val();
		if(IamA == "professional") {
			$(".checkboxes").toggle();
		}else {
			$(".checkboxes").toggle();
		}
	});

	$("input[name='general[educator]']").click(function(){
		$("#educator").toggle();
	});
	$("input[name='general[guide]']").click(function(){
		$("#guide").toggle();
	});
	$("input[name='general[athlete]']").click(function(){
		$("#athlete").toggle();
	});
		
	$('#generalTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});

	$('#educationTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	$('#certsTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	$('#sportsTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	
	//var clickToggle = function(name, tab){
	//	$("input[name='" + name + "']").click(function(){
	//		$('"'+ tab + '"').toggle();
	//	});
	//}

	//clickToggle('rockClimbing', '#rcTab')
	var toggleTab = function(list, tab){
		checkBox = "input[name='sportsList[" + list + "]']";
		console.log(checkBox)
		$(checkBox).click(function(){
			$(tab).toggle();
			//locals.list = true
		});
	};

	toggleTab("rockClimbing", "#rcTab");
	toggleTab("mountainBiking", "#mbTab");
	toggleTab("running", "#runTab");
	toggleTab("roadCycling", "#cycTab");
	toggleTab("kayaking", "#kayTab");
	toggleTab("supb", "#supbTab");
	toggleTab("surfing", "#surfTab");
	toggleTab("skiing", "#skiTab");
	toggleTab("snowboarding", "#sbTab");
	toggleTab("mountaineering", "#moutTab");
	toggleTab("hiking", "#hikeTab");
	toggleTab("yoga", "#yogaTab");
	toggleTab("triathalon", "#triTab");
	toggleTab("swimming", "#swimTab");
	toggleTab("windSurf", "#windTab");
	toggleTab("kiteSurf", "#kiteTab");
	toggleTab("scuba", "#scubaTab");
	toggleTab("canoe", "#canoeTab");
	toggleTab("raft", "#raftTab");
	toggleTab("iceClimb", "#iceTab");

	$(".climbDate").datepicker();
	$(".datePick").datepicker();




});