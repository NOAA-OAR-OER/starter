/*
Useage:
    In HTML:
    <script>
        let currentFilter=".{filtername}"; (default=*)
        let columns="5"; (default=4 - between 4 and 8 - others and 7 default)
    </script>
    Reverts to defaults if args not supplied
*/
(function($, window, document, undefined) {
    'use strict';
    let xlColumns='4'
    let lgColumns='4'
    let mdColumns='3'
    let smColumns='2'
    let xsColumns='1'
    var currentFilter = (typeof currentFilter === 'undefined') ? '*' : currentFilter;
    if(typeof columns !== 'undefined') {
        console.log(columns)
        switch (columns) {
            case '8':
                xlColumns='8'
                lgColumns='8'
                mdColumns='4'
                smColumns='2'
                xsColumns='1'
            break;
            case '6':
                xlColumns='6'
                lgColumns='6'
                mdColumns='4'
                smColumns='2'
                xsColumns='1'
            break;
            case '5':
                xlColumns='5'
                lgColumns='5'
                mdColumns='4'
                smColumns='2'
                xsColumns='1'
            break;            
            case '4':
                xlColumns='4'
                lgColumns='4'
                mdColumns='3'
                smColumns='2'
                xsColumns='1'
            break;
        }
    }
    // init cubeportfolio
    $('#js-grid-lightbox-gallery').cubeportfolio({
        filters: '#js-filters-lightbox-gallery',
        loadMore: '#js-loadMore-lightbox-gallery',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        mediaQueries: [{
				width: 1200, //xl
				cols: xlColumns
			}, {
				width: 992, //lg
				cols: lgColumns
			}, {
				width: 768, //md
				cols: mdColumns
			}, {
				width: 480, //sm
				cols: smColumns
			}, {
				width: 320, //xs
				cols: xsColumns
			},
        ],
        defaultFilter: currentFilter,
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
        singlePageInlineCallback: function(url, element) {
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