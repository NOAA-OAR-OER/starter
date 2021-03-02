(function($, window, document, undefined) {
    'use strict';
    window.onscroll = function() {scrollFunction();};
    function scrollFunction() {
        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
           $('#back-to-top').css("display","block");
        } else {
           $('#back-to-top').css("display","none");
        }
    }
    $('#back-to-top').click(function() {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
    });
})(jQuery, window, document);