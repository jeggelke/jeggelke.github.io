// Using JQuery selectors to add onFocus and onBlur event handlers

$(document).ready( function() {

  // Add the "focus" value to class attribute 
  $('ul.radio li').focusin( function() {
    $(this).addClass('focus');
  }
  );

  // Remove the "focus" value to class attribute 
  $('ul.radio li').focusout( function() {
    $(this).removeClass('focus');
  });

$('.demo-next-button').click(function(){
	if (validateEmail() == false){
		alert('Please provide a valid email address.');
		$('input[type="email"]').addClass('red-color');
	}
	if($(demoFields).val() && $('select[name="agencytype"]').val() && validateEmail()){
	$("#demo-info").addClass('hidden');
	$('#principle-1').removeClass('hidden');
	$('#principle-1 div:first-of-type').removeClass('hidden');
	addCheckmark('#nav-demo');
	$('#nav-p-1, #nav-p1-section-1').removeClass('disabled');
	$('#nav-p1-section-1').addClass('clickable');
	saveDemo();
	$('input[type="email"]').removeClass('red-color');
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	} else {alert('All fields must be completed in order to begin the checklist.')}
})

function validateEmail()
{
 var x = $('input[type="email"]').val();
 var atpos=x.indexOf("@");
 var dotpos=x.lastIndexOf(".");
 if (atpos<1 || dotpos<atpos+2 || dotpos+3>=x.length)
  {
//    alert("Not a valid e-mail address");
    return false;
  } else {return true;}
}

$("#nav-demo").click(function(){
	$('.group, .subgroup').addClass('hidden');
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	$('#demo-info').removeClass('hidden');
})

$('.sections').on('click', '.nav-button', function(){
	var thisID = $(this).attr('id');
	checkIfDone(thisID, moveToNextSection);
	updateProgressBar();
//	$('html, body').animate({ scrollTop: 0 }, 'fast');
	
//	window.history.replaceState(null, null, "#" + nextSection);
});

$('.sections').on('click', '.submit-button', function(){
	event.preventDefault();
	var thisID = $(this).attr('id');
	checkIfDone(thisID, submitForm);
//	this.form.submit();
//	window.history.replaceState(null, null, "#" + nextSection);
});

var submitForm = function(thisId){
	$('#'+thisId).parent().parent().parent().parent().parent().submit()
}

var moveToNextSection = function(id){
	var nextSection = $('#'+id).data('next-section-id');
	var nextSectionContainer = '#' + nextSection + '-container';
	var thisSection = $('#'+id).data('this-section-id');
	var thisSectionContainer = '#' + thisSection + '-container';
	var navItem = '#' + $('#'+id).data('nav-entry');
	$(nextSectionContainer).removeClass('hidden');
	$(thisSectionContainer).addClass('hidden');
	$(navItem).parent().next().children().removeClass('disabled');
	addCheckmark(navItem);	
}	

var checkIfDone = function(id, func){

	var numberOfFields = $('#'+id).parent().children('fieldset').length;
	var count = 0;
	var count2 = 0;
	var numberOfChecks = function() {
		var idCheck = $('#'+id).parent().children('fieldset').children('ul').children('li').children('input[type="radio"]');
		$.each( idCheck, function(){
			if ($(this).prop('checked')) {
				count = count +1;
			} else {$(this).parent().parent().addClass('red-color')}
		})
		$.each( idCheck, function(){
			if ($(this).prop('checked')) {
				$(this).parent().parent().removeClass('red-color')
			}
		})
	}
	numberOfChecks();
		if (count == numberOfFields){
			if ($('#'+id).parent().parent().is(':last-child')){
				moveToNextPrinciple('#'+id);
			}
			moveToNextSection(id);
			func(id);
			saveRadioFields();
			$('html, body').animate({ scrollTop: 0 }, 'fast');
		} else {
				alert('All questions must be completed in order to save and advance the form.');
				$('html, body').animate({ scrollTop: $('.red-color').parent().offset().top }, 'fast');				
			}
		}

var moveToNextPrinciple = function(thisId){
	var parentPrinciple = $(thisId).parent().parent().parent();
	$(parentPrinciple).addClass('hidden');
	$(parentPrinciple).next().removeClass('hidden');
	var navPrinciple = '#' + $(parentPrinciple).data('nav-item');
	addCheckmark(navPrinciple);
	var nextPrinciple = $(navPrinciple).parent().next().children('.prin-nav');
	nextPrinciple.removeClass('disabled');
	var nextSection = $(nextPrinciple).parent().children('ul').children('li:first-child').children('.nav-link');
	nextSection.removeClass('disabled');
	nextSection.addClass('clickable');
}

$('#sidebar').on('click', '.prin-nav', function(event){
	event.preventDefault();	
})

$('#sidebar').on('click', '.nav-section.clickable', function(event){
	event.preventDefault();
	$('#demo-info').addClass('hidden');
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	var thisHref = $(this).attr('href');
	var divToGo = '';
	if (thisHref == '#demo-info') {
		divToGo = '#demo-info';
	} else {
		divToGo = thisHref + '-container';
	};
	var principleDiv = $(this).parent().parent().prev('.prin-nav').attr('href');
	$('.group, .subgroup').addClass('hidden');		
	$(divToGo).removeClass('hidden');
	$(principleDiv).removeClass('hidden');
	})
//show/hide previous responses on scoring page
$('#previous-responses').on('click', 'a', function(){
    event.preventDefault();
	$(this).parent().children('.question-responses').toggle()
})
//prevent form from submitting with enter key
$(window).keydown(function(event){
  if(event.keyCode == 13) {
    event.preventDefault();
    return false;
  }
});
if (localStorage.getItem('p1q1')){
	overlay();
	setTimeout(function(){loadDemo();loadRadioFields();updateProgressBar();overlay();}, 2000);
} else if (localStorage.getItem('firstname')) {loadDemo();}


});

var loadRadioFields = function(){
	var input_name = '';
	var input_id = '';
	$.each( $(radioFields), function() {
		input_id = $(this).attr('id');
		input_name = $(this).attr('name');
		var thisName = localStorage.getItem(input_name);
		if (thisName){
		var targetId = '#'+thisName + input_name;
		$(targetId).prop('checked', true);
		var navSidebarSection = '#' + $(targetId).parent().parent().parent().parent().children('.nav-button, .submit-button').data('nav-entry');
		addCheckmark(navSidebarSection);
		$(navSidebarSection).removeClass('disabled');
		$(navSidebarSection).parent().parent().parent().children('.prin-nav').removeClass('disabled');		
		$(navSidebarSection).parent().next().children().removeClass('disabled');
		$(navSidebarSection).parent().next().children().addClass('clickable');
		if ($(navSidebarSection).parent().is('li:last-child')) {
			$(navSidebarSection).parent().parent().parent().next().children('.prin-nav').removeClass('disabled');
			$(navSidebarSection).parent().parent().parent().next().children('ul').children('li:first-child').children('.nav-link').removeClass('disabled');
			$(navSidebarSection).parent().parent().parent().next().children('ul').children('li:first-child').children('.nav-link').addClass('clickable');
			
		}
		}		
});	
principleCheckmarks();
}

/** JSON file **/ 
// ID of the Google Spreadsheet
 var spreadsheetID = "16g6H2Wy9W6iU76DD697leFy5FzAG5SRX7M2rksOwOF0";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
 $.getJSON(url, function(data) {
 
  var entry = data.feed.entry;
  var principleSection = [];
  $(entry).each(function(){
    // Column names are name, age, etc.
    var principleNum = this.gsx$principlenum.$t;
    var sectionNum = this.gsx$sectionnum.$t;
    var questionNum = this.gsx$questionnum.$t;
    var questionText = this.gsx$questiontext.$t;
    createQuestions(principleNum, sectionNum, questionNum, questionText);
    principleSection.push({'id':'p'+ principleNum + 's' + sectionNum,'principleNum':'p' + principleNum, 'sectionNum':'-section-' + sectionNum});
  });

	var unique = {};
	var distinct = [];
	for( var i in principleSection ){
		if( typeof(unique[principleSection[i].id]) == "undefined"){
			distinct.push(principleSection[i]);
 		}
 		unique[principleSection[i].id] = 0;
	}
	addNavButtons(distinct);

 
 });
 
 var createQuestions = function(principleNum, sectionNum, questionNum, questionText) {
	var questionInput = document.createElement('fieldset');
	questionInput.class = 'radiogroup';
	var legendQuestionText = document.createElement('legend');
	legendQuestionText.innerHTML = questionNum + '. ' + questionText;
	var questionList = document.createElement('ul');
	questionList.className = "radio";

	$(questionInput).append(legendQuestionText);
	$(questionInput).append(questionList);
	questionListCreation('6', 'Always', questionInput, principleNum, questionNum, sectionNum, questionList);
	questionListCreation('4', 'Most of the Time', questionInput, principleNum, questionNum, sectionNum, questionList);
	questionListCreation('2', 'Some of the Time', questionInput, principleNum, questionNum, sectionNum, questionList);
	questionListCreation('0', 'Never', questionInput, principleNum, questionNum, sectionNum, questionList);
	questionListCreation('na', 'Not Applicable', questionInput, principleNum, questionNum, sectionNum, questionList);							
	$('#p' + principleNum + '-section-' + sectionNum).append(questionInput);
 } 
 
var questionListCreation = function(choice, inputLabel, questionInput, principleNum, questionNum, sectionNum, questionList) {
	var selectionLi = document.createElement('li');
	var selectionInput = document.createElement('input');
	var questionID = choice + 'p' + principleNum + 'q' + questionNum;
	$(selectionInput).attr({
		type: 'radio', 
		value: choice,
		id: questionID,
		'data-section': 'p' + principleNum + 's' + sectionNum,
		name: 'p' + principleNum + 'q' + questionNum
	});
	var selectionLabel = document.createElement('label');
	selectionLabel.setAttribute('for', questionID);
	selectionLabel.innerHTML = inputLabel;
	$(selectionLi).append(selectionInput);
	$(selectionLi).append(selectionLabel);
	$(questionList).append(selectionLi);
}

var addCheckmark = function(spanElement) {
	$(spanElement).addClass('completed clickable');
	$(spanElement).children('.status').addClass('glyphicon glyphicon-ok');
	$(spanElement).children('.status').attr('style', 'margin-right: 5px');
}

$(window).load(function(){
$('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 500
});
});//]]> 


var addNavButtons = function(sectionID){	
	for (i = 0; i < sectionID.length - 1; i++){
		var nextButton = document.createElement('div');
		$(nextButton).addClass('nav-button btn btn-primary btn-lg btn-block');
		$(nextButton).html('Save and Go to Next Section');
		var sectionNum = i + 1;
		var thisSectionID = sectionID[i].principleNum + sectionID[i].sectionNum;		
		var nextSectionID = sectionID[i+1].principleNum + sectionID[i+1].sectionNum;
		$(nextButton).attr('id', 'next-' + thisSectionID);
//		var nextPrincipleID = if (sectionID.[i]=){}sectionNum + 1;
		$(nextButton).data('next-section-id', nextSectionID);
		$(nextButton).data('this-section-id', thisSectionID);
		$(nextButton).data('nav-entry', 'nav-' + thisSectionID);
		$('#'+thisSectionID).append(nextButton);
		var saveText = document.createElement('p');
		$(saveText).html('<b>Return to this page to resume your progress.</b>');
		$(saveText).addClass('text-center');
		$('#' + thisSectionID).append(saveText);		
	}
		var thisSectionID = sectionID[i].principleNum + sectionID[i].sectionNum;
		var submitButton = document.createElement('input');
		$(submitButton).addClass('submit-button btn btn-danger btn-lg btn-block');		
		$(submitButton).attr('id', 'submit-button');
		$(submitButton).attr('type', 'submit');
		$(submitButton).attr('value', 'Save and Submit for Scoring');
		$(submitButton).data('nav-entry', 'nav-' + thisSectionID);
		$('#' + thisSectionID).append(submitButton);
}

// Saving data
var demoFields = 'fieldset input[type="text"], fieldset input[type="email"]';
var radioFields = 'fieldset input[type="radio"]';
var saveDemo = function(){
var input_name = '';
$.each( $(demoFields), function() {
input_name = $(this).attr('name');
if ($(this).val()) {
localStorage.setItem(input_name, $(this).val());
}
});
localStorage.setItem('agencytype', $('select[name="agencytype"]').val());
}

var loadDemo = function(){
var input_name = '';
$.each( $(demoFields), function() {
input_name = $(this).attr('name');
var thisName = localStorage.getItem(input_name);
$('fieldset input[name="' + input_name + '"]').val(thisName);

});
var agenceyType = localStorage.getItem('agencytype');
$('select[name="agencytype"]').val(agenceyType);
if (agenceyType){
addCheckmark('#nav-demo');
}
}


var saveRadioFields = function(){
	var input_name = '';
	var input_id = '';
	$.each( $(radioFields), function() {
		input_name = $(this).attr('name');
		input_id = $(this).attr('id');
		if ($(this).prop('checked')) {
			localStorage.setItem(input_name, $('#'+input_id).attr('value'));
		}
	});
}

var clearLocalFormData = function() {
	if (window.confirm("Do you really want to delete all of your responses? You will NOT be able to retrieve this information.")){
	localStorage.clear();
	$('.completed').removeClass('completed');
	location.reload();
	}
}

//Load confirmation questions
var loadConfirmationQuestions = function() {
	 $.getJSON(url, function(data) {
 
  var entry = data.feed.entry;
  for (i = 1; i < 5; i++){
	  var previousAnswers = document.createElement('div');	  
	  $(previousAnswers).attr('id', 'p' + i + '-questions-container');
	  $(previousAnswers).addClass('question-responses');
	  $(previousAnswers).html('<p><strong>Principle ' + i + '</strong></p>');
	  $('#previous-responses').append(previousAnswers);
  }
  $(entry).each(function(){
    // Column names are name, age, etc.
    var principleNum = this.gsx$principlenum.$t;
    var sectionNum = this.gsx$sectionnum.$t;
    var questionNum = this.gsx$questionnum.$t;
    var questionText = this.gsx$questiontext.$t;
    
    //add question text
    var questionContainer = document.createElement('div');
    $(questionContainer).attr('id', 'p' + principleNum + 'q' + questionNum + '-response') 
    $(questionContainer).addClass('question-container row');
    var qaContainer = document.createElement('div');
    $(qaContainer).addClass('col-sm-10 col-md-10 col-lg-10 qa-container vertical-align');
    var questionTextDiv = document.createElement('div');

    $(questionTextDiv).addClass('col-sm-9 col-md-9 col-lg-9 question-div vertical-align');
	var question = document.createElement('h4');
	$(question).addClass('col-sm-11 col-md-11 col-lg-11');
	var questionNumDiv = document.createElement('div');
	$(questionNumDiv).addClass('col-sm-1 col-md-1 col-lg-1');
	$(questionNumDiv).html(questionNum + ': ')
    $(question).html(questionText);
    $(questionTextDiv).append(questionNumDiv);
    $(questionTextDiv).append(question);
    
    //add question answer
    var answerTextDiv = document.createElement('div');
    $(answerTextDiv).addClass('col-sm-3 col-md-3 col-lg-3 text-center answer-div');
    var answer = document.createElement('div');
    var answerNum = window['p' + principleNum + 'q' + questionNum];
    var answerText = '';
    if (answerNum == '6'){
	    answerText = 'Always';
    } else if (answerNum == '4'){
	    answerText = 'Most of the Time';
    } else if (answerNum == '2'){
	    answerText = 'Some of the Time';
    } else if (answerNum == '0'){
	    answerText = 'Never';
    } else if (answerNum = 'na') {
	    answerText = 'Not Applicable';
    }
    $(answer).html(answerText);    
    $(answerTextDiv).append(answer);
    
    //append it all together
    $(questionContainer).append('<div class="col-sm-1 col-md-1 col-lg-1 white-bg"></div>');
    $(qaContainer).append(questionTextDiv);
    $(qaContainer).append(answerTextDiv);
    $(questionContainer).append(qaContainer);
    $(questionContainer).append('<div class="col-sm-1 col-md-1 col-lg-1 white-bg"></div>');
    $('#p' + principleNum + '-questions-container').append(questionContainer);
  });
    var totalSections = entry[entry.length - 1].gsx$sectionnum.$t;
    
 
 });
}

//Add checkmarks for principle nav
var principleCheckmarks = function(){
	$('.prin-nav').each(function(){
		var listOfSections = $(this).next().children().children().length;
		var numberOfCompletedSections = $(this).next().children().children('.completed').length;
		if (listOfSections == numberOfCompletedSections) {
			addCheckmark(this);

		}
	})
}

//Progress Bar

var updateProgressBar =  function(){
	var totalSections = $('.nav-section').length;
	var completedSections = $('.nav-section.completed').length;
	var percentageComplete = 100 * (completedSections / totalSections);
	var roundedPercentage = Math.round((percentageComplete + 0.00001) * 100) / 100;
	$('.progress-bar').attr('aria-valuenow', roundedPercentage);
	$('.progress-bar').css('width', roundedPercentage + '%');
	$('#number-of-completed-sections').html(completedSections);
	$('#total-number-of-sections').html(totalSections);
	
}

//Loading...

var overlay = function() {
	if ($('#overlay').length){
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}}
