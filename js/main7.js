(function($, window, document, undefined) {
    'use strict';

    var grid = $('#js-grid-lightbox-gallery');

    function initCBP() {
        grid.cubeportfolio({
            filters: '#js-filters-lightbox-gallery',
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
            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title'
        });
    }

    initCBP();

    $(document).ready(function() {
        $('#tab-container').easytabs()
            .bind('easytabs:before', function(event, $clicked, $targetPanel, settings) {
                if($targetPanel.find('.cbp').length) {
                    grid.cubeportfolio('destroy');
                }
            })
            .bind('easytabs:after', function(event, $clicked, $targetPanel, settings) {
                if($targetPanel.find('.cbp').length) {
                    initCBP();
                }
            });
    });
})(jQuery, window, document);
