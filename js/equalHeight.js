// equalHeight, copyright (c) by Jesper "Toelli" Tollinen
// Distributed under an Private license: http://codecanyon.net/user/toelli/portfolio

(function ( $ ) {

	var allObjects = [];
	var eqObjArr = [];
	
	$(document).ready(function() {

		// Jquery function init
		$.fn.equalHeight = function(options) {
			
			// function settings and defaults
	        var settings = $.extend({
	            perRow: false,
	            perParent: null
	        }, options);
			
			eQualizeHeight(this, settings);
			jsOBJs=this;
			jsOBJs.perRow = settings.perRow;
			jsOBJs.perParent = settings.perParent;
			allObjects.push(jsOBJs);

		};

		$.equalHeight = {
		 refresh: function () {
		    equalHeightRestart();
		 }
		};
		
		// Get inline eqHeight elements
		$('[data-eqHeight]').each(function() {
			eqObjArr.push($(this).data("eqheight"));
		});
		if(eqObjArr.length > 0) {
			eqObjArr = $.unique(eqObjArr);
			$(eqObjArr).each(function() {
				if($('[data-eqheight="' + this + '"]').length > 0) {
					settings = {};
					settings.perRow = false;
					if($('[data-eqheight="' + this + '"]').data("perrow")) {
					  settings.perRow = $('[data-eqheight="' + this + '"]').data("perrow");  
					}
					settings.perParent = null;
					if($('[data-eqheight="' + this + '"]').data("perparent")) {
					  settings.perParent = $('[data-eqheight="' + this + '"]').data("perparent");  
					}
					eQualizeHeight($('[data-eqheight="' + this + '"]'), settings);
					allObjects.push($('[data-eqheight="' + this + '"]'));
				}
			});
		}	
		
		// Re-do equal height on all objects - responsive fix
		var width = $(window).width();
		$(window).resize(function () {
			if(width != $(window).width()) {
				width = $(window).width();
				equalHeightRestart();
			}
		});

	});

	function equalHeightRestart() {
		$(allObjects).each(function() {
			settings = {};
			settings.perRow = false;
			if(this.perRow) {
				settings.perRow = this.perRow;  
			} else {
				if($(this).data("perrow")) {
				  settings.perRow = $(this).data("perrow");  
				}
			}
			settings.perParent = null;
			if(this.perParent) {
				settings.perParent = this.perParent;  
			} else {
				if($(this).data("perparent")) {
				  settings.perParent = $(this).data("perparent");  
				}
			}

			eQualizeHeight(this, settings);
		});
	}

	function eQualizeHeight(obj, settings) {

		$(obj).height("");
		var highestHeight = -1;
		var rowCounter = 1;
		var	objOffset = null;
		var objArr = [];
		
		if(settings.perParent != null) {
			$(settings.perParent).each(function() {
				parent = this;
				obj.each(function(index, element) {
					if($(parent).find(element).length > 0) {
						if($(this).height() && highestHeight < $(this).height()) {
							highestHeight = $(this).height();
						}
						objArr.push(element);
					}
				});
				$(objArr).each(function() {
					$(this).height(highestHeight);
				});
				highestHeight = -1;
				objArr = [];
			});
		} else if(settings.perRow) {
			obj.each(function(index, element) {
				if($(this).height() && $(this).is(":visible")) {
					this.newRow = false;
					if(objOffset == null) objOffset = $(this).offset().top;
					if(objOffset != $(this).offset().top) {
						objOffset = $(this).offset().top;
						this.newRow = true;
					}
					if(this.newRow) {
						$(objArr).each(function() {
							$($(this)).height(highestHeight);
						});
						highestHeight = -1;
						objArr = [];
					}
					if(highestHeight < $(this).height()) {
						highestHeight = $(this).height();
					}
					$(this).height(highestHeight);
					objArr.push($(this));
				}
			});
			$(objArr).each(function() {
				$($(this)).height(highestHeight);
			});
		} else {
			obj.each(function() {
				if($(this).height() && $(this).is(":visible")) {
					if(highestHeight < $(this).height()) {
						highestHeight = $(this).height();
					}
				}
			});
			$(obj).height(highestHeight);
			
		}
	}

	// Sometimes image heights is not fully rendered on doucment.ready
	// This will re-calculate equalized objects and restart equalHeight when page is fully loaded
	if (typeof $(window).on == 'function') { 
	  $(window).on('load', function() {
		equalHeightRestart();
	  });
	} else {
	  $(window).load(function() {
		equalHeightRestart();
	  });
	}
	

}( jQuery ));