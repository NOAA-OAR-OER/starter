(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#js-grid-lightbox-gallery').cubeportfolio({
        filters: '#js-filters-lightbox-gallery',
        layoutMode: 'grid',
        defaultFilter: '*',
        search: '#js-search',         
        animationType: 'fadeOut',
        gapHorizontal: 10,
        gapVertical: 10,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 3
		 }, {
            width: 400,
            cols: 2
			 }, {
            width: 350,
            cols: 1

        }, {
            width: 300,
            cols: 1,
            options: {
                caption: ''
            }
        }],
        caption: 'overlayBottom',
        displayType: 'default',
        displayTypeSpeed: 100,
        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        // singlePageInline
        singlePageInlineDelegate: '.cbp-singlePageInline',
		singlePageInlineDeeplinking: true,
        singlePageInlinePosition: 'below',
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url) {
            // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
            var t = this;
            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 30000
                })
                .done(function(result) {
                    t.updateSinglePageInline(result);
                    // console.log("cbp done", $('.video-js'))
                    var players = $('.video-js');
                    if(players.length) {
                        for(var i = 0; i < players.length; i++){
                            videojs(players[i]).ready(function() {
                                (this).videoJsResolutionSwitcher()
                            })
                        }
                    }
                })
                .fail(function() {
                    t.updateSinglePageInline('AJAX Error! Please refresh the page!')
            });
        },
        plugins: {
            sort: {
                element: '#js-sort',
             }
        },
    });
})(jQuery, window, document);
