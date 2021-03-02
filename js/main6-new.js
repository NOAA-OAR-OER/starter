(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#js-grid-lightbox-gallery').cubeportfolio({
        filters: '#js-filters-lightbox-gallery',
        loadMore: '#js-loadMore-lightbox-gallery',
        layoutMode: 'grid',
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
        defaultFilter: '*',
        animationType: 'fadeOut',
        gapHorizontal: 10,
        gapVertical: 10,
        gridAdjustment: 'responsive',
        caption: 'overlayBottom',
        displayType: 'default',
        displayTypeSpeed: 100,
        filterDeeplinking: false,
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true, //
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        plugins: {
            loadMore: {
                element: '#js-loadMore-lightbox-gallery',
                action: 'auto',
                loadItems: 9,
            },
        },
    });
})(jQuery, window, document);
