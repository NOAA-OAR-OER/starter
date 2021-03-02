
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		document.getElementById("back-to-top").style.display = "block";
	} else {
		document.getElementById("back-to-top").style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0; // Safari
	document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
}