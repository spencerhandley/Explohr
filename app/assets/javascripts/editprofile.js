(function ($) {
	var elem = document.getElementById('messagesContainer');
 	elem.scrollTop = elem.scrollHeight;

 // 	(function poll(){
	//     $.ajax({ url: window.location.pathname, success: function(data){
	//         //Update your dashboard gauge
	//         salesGauge.setValue(data.value);
	//     }, dataType: "json", complete: poll, timeout: 30000 });
	// })();



	var addForms = function(button, form, container){
		var $addBtn = $(button),
			$form = $(form).last(),
			$container = $(container)
			data = parseInt(document.getElementById("addRoute").getAttribute("data-i")),
			index = data,
		$rcForm = $("#rockClimbingForm")

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

	addForms("#addOutsideCourse", "#outdoorEdEduForm", "#outdoorEdFormContainer");
	addForms("#addWork", "#workForm", "#workFormContainer");
	addForms("#addTradEdu", "#tradEduForm", "#tradFormContainer")
	addForms("#addCertificate", "#certificateForm", "#certificateFormContainer")
	addForms("#addTeachingExperience", "#teachingForm", "#teachingFormContainer")
	addForms("#addGuidingCo", "#guidingCoForm", "#guidingCoFormContainer")
	addForms("#addTrip", "#tripsForm", "#tripsFormContainer")
	addForms("#addSponsor", "#sponsorForm", "#sponsorFormContainer")
	addForms("#addRoute", ".rockClimbingForm", "#rockClimbingFormContainer")
	addForms("#addMountRoute", ".mountaineeringForm", "#mountaineeringFormContainer")
	addForms("#addRiver", ".riverForm", "#riverFormContainer")
	addForms("#addRace", ".cyclingForm", "#cyclingFormContainer")


})(jQuery);
	$(document).ready(function(){
			if (document.cookie.indexOf('visited=true') == -1) {
	            // var fifteenDays = 1000*60*60*24*15;
	            // var expires = new Date((new Date()).valueOf() + fifteenDays);
		        document.cookie = "visited=true"
		        $("#editProfileModal").modal();
       		}
    $("#messageUser").click(function () {
    	$("#sendMessageModal").modal()
    })

	console.log(user);
	$(".editEduBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#educationTab a").tab("show");
	})
	$("#editCertBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#certsTab a").tab("show");
	})
	$("#editSponsorBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#sponsorTab a").tab("show");
	})
	$("#editWorkBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#workTab a").tab("show");
	})
	$("#editTeachingBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#educator a").tab("show");
	})
	$("#editRcBtn").click(function(e){
		e.preventDefault();
		$("#rcTab a").tab("show");
	})
	$("#editMountBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#moutTab a").tab("show");
	})
	$("#editCycleBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#cycTab a").tab("show");
	})
	$("#editRiverBtn").click(function(e){
		e.preventDefault();
		$("#generalTab").removeClass("active");
		$("#kayTab a").tab("show");
	})
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
	$('<div id="work"></div>Tab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	$('#sportsTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});



	$('#profileTabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});

	$('#profileTabs a[href="#profileBody"]').tab("show")
	
	$('#profileTabs a[href="#rightPanel"]').tab("show")





	$('#moreSports').tooltip()

	
	//var clickToggle = function(name, tab){
	//	$("input[name='" + name + "']").click(function(){
	//		$('"'+ tab + '"').toggle();
	//	});
	//}

	//clickToggle('rockClimbing', '#rcTab')
	var toggleTab = function(list, tab){
		checkBox = "input[name='sportsList[" + list + "]']";
		$(checkBox).click(function(){
			$(tab).toggle();
			count++
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

	var mkctr = function() {
		var count=$('#sportsUl > li:visible').length;
	    $('#count').html(count); 
	}

});
 