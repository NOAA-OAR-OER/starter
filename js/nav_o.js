$(document).ready(function(){

	// dropdown menu

	$('.mainmenu .menu-item').has('.submenu').addClass('has-submenu');
	if ( $(window).width() > 991 ) {
		$('.mainmenu .menu-item').mouseenter(function(){
			$(this).find('.submenu').stop().fadeIn(250);
		});
		$('.mainmenu .menu-item').mouseleave(function(){
			$(this).find('.submenu').stop().fadeOut(250);
		});
	} else {
		$('.mainmenu .menu-item.has-submenu').click(function(){
			$(this).find('.submenu').stop().slideToggle(250);
			return false;
		});
	}

	// responsive menu

	$('.menu-toggle').click(function(){
		$(this).next('.mainmenu').slideToggle(250);
		return false;
	});

	// entry animation 

	wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 50,
		mobile: false,
		live: true
    })
    wow.init();

});