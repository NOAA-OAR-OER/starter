(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#js-grid-lightbox-gallery').cubeportfolio({
        filters: '#js-filters-lightbox-gallery',
        loadMore: '#js-loadMore-lightbox-gallery',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        mediaQueries: [{
                width: 1200,
                cols: 6
            }, {
                width: 992,
                cols: 5
            }, {
                width: 768,
                cols: 3
            }, {
                width: 480,
                cols: 2
            }, {
                width: 320,
                cols: 1
            },
        ],
        defaultFilter: '*',
        search: '#js-search',        
        animationType: 'fadeOut',
        gapHorizontal: 10,
        gapVertical: 10,
        gridAdjustment: 'responsive',
        caption: '',
        displayType: '',
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePageInline
		singlePageInlineDeeplinking: true,
        singlePageInlineDelegate: '.cbp-singlePageInline',
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

                })
                .fail(function() {
                    t.updateSinglePageInline('AJAX Error! Please refresh the page!');
            });
        },
        plugins: {
            sort: {
                element: '#js-sort',
             }
        },         
    });
})(jQuery, window, document);
