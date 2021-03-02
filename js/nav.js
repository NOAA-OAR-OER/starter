$(document).ready(function(){
	
	if ( $(window).width() > 991 ) {
		$('.submenu').width($('.mainmenu .container').width());
		$('.mainmenu .menu-item').mouseenter(function(){
			$(this).find('.submenu').stop().fadeIn(250);
		});
		$('.mainmenu .menu-item').mouseleave(function(){
			$(this).find('.submenu').stop().fadeOut(250);
		});
		
		$('.menu-item .dropdown').removeAttr('data-hover');
	}	

	
	$('li.dropdown').on('click', function() {
		var $el = $(this);
		if ($el.hasClass('open')) {
			var $a = $el.children('a.dropdown-toggle');
			if ($a.length && $a.attr('href')) {
				location.href = $a.attr('href');
			}
		}
	});
	
});