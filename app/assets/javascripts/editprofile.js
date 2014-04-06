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

	$("input[name='sportsList[rockClimbing]']").click(function(){
		$("#rcTab").toggle();
	});
	$("input[name='sportsList[mountainBiking]']").click(function(){
		$("#mbTab").toggle();
	});
	$("input[name='sportsList[running]']").click(function(){
		$("#runTab").toggle();
	});
	$("input[name='sportsList[roadCycling]']").click(function(){
		$("#cycTab").toggle();
	});
	$("input[name='sportsList[kayaking]']").click(function(){
		$("#kayTab").toggle();
	});
	$("input[name='sportsList[supb]']").click(function(){
		$("#supbTab").toggle();
	});
	$("input[name='sportsList[surfing]']").click(function(){
		$("#surfTab").toggle();
	});
	$("input[name='sportsList[skiing]']").click(function(){
		$("#skiTab").toggle();
	});
	$("input[name='sportsList[snowboarding]']").click(function(){
		$("#sbTab").toggle();
	});
	$("input[name='sportsList[mountaineering]']").click(function(){
		$("#moutTab").toggle();
	});
	$("input[name='sportsList[hiking]']").click(function(){
		$("#hikeTab").toggle();
	});
	$("input[name='sportsList[yoga]']").click(function(){
		$("#yogaTab").toggle();
	});
	$("input[name='sportsList[triathalon]']").click(function(){
		$("#triTab").toggle();
	});
	$("input[name='sportsList[swim]']").click(function(){
		$("#swimTab").toggle();
	});
	$("input[name='sportsList[windSurf]']").click(function(){
		$("#windTab").toggle();
	});
	$("input[name='sportsList[kiteBoard]']").click(function(){
		$("#kiteTab").toggle();
	});
	$("input[name='sportsList[fish]']").click(function(){
		$("#fishTab").toggle();
	});
	$("input[name='sportsList[scuba]']").click(function(){
		$("#scubaTab").toggle();
	});
	$("input[name='sportsList[canoe]']").click(function(){
		$("#canoeTab").toggle();
	});
	$("input[name='sportsList[raft]']").click(function(){
		$("#raftTab").toggle();
	});
	$("input[name='sportsList[iceclimb]']").click(function(){
		$("#iceTab").toggle();
	});
	$("input[name='sportsList[skate]']").click(function(){
		$("#skateTab").toggle();
	});
	$("input[name='sportsList[snowshoe]']").click(function(){
		$("#snowshoeingTab").toggle();
	});
	$("input[name='sportsList[bmx]']").click(function(){
		$("#bmxTab").toggle();
	});
	$(".climbDate").datepicker();
	$(".datePick").datepicker();




});