$(function(){
	
	$("dd.answer")
		.hide();
	
	$("dl.faq")
		.append("<dd class='answer-tab-wrap'><a class='answer-tab'>Answer</a></dd>");
		
	$(".answer-tab")
		.click(function(){
			$(this)
				.parent()
				.parent()
				.find("dd.answer")
				.slideToggle();
		});
});


