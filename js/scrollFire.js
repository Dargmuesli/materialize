(function($) {
	Materialize.scrollFire = function(options) {
		var lastScrolledPixels = 0;
		var didScroll = false;
		
		window.addEventListener("scroll", function() {
			didScroll = true;
			
			var timer = setInterval(function() {
				clearInterval(timer);
				
				if (didScroll) {
					didScroll = false;
					
					var scrolledPixels = window.pageYOffset;
					
					for (var i = 0; i < options.length; i++) {
						var value = options[i];
						var selector = value.selector,
							offset = value.offset,
							downcallback = value.downScrollCallback,
							upcallback = value.upScrollCallback;
						var currentElement = document.querySelector(selector);
						
						if (currentElement !== null) {
							var elementOffset = currentElement.getBoundingClientRect().top + document.body.scrollTop;
							
							if (lastScrolledPixels < scrolledPixels) {
								if (elementOffset < offset && value.lastDirection != 'down') {
									downcallback();
									value.lastDirection = 'down';
								}
							} else {
								if (elementOffset > offset && value.lastDirection != 'up') {
									upcallback();
									value.lastDirection = 'up';
								}
							}
							
							lastScrolledPixels = scrolledPixels;
						}
					}
				}
			}, 100);
		});
	};
})(jQuery);
