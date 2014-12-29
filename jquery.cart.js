/**
 * @fileOverview slide cart plugin
 * @name cart.js
 * @author Young Lee   youngleemails@gmail.com
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */
(function($) {
	$.fn.slideLeftShow = function (speed, fn) {
		return this.each(function() {
			$(this).show('slide', { direction: 'left' }, speed, fn);
		});
	};
	$.fn.slideRightShow = function (speed, fn) {
		return this.each(function() {
			$(this).show('slide', { direction: 'right' }, speed, fn);
		});
	};
	$.fn.slideLeftHide = function (speed, fn) {
		return this.each(function() {
			$(this).hide('slide', { direction: 'left' }, speed, fn);
		});		
	};
	$.fn.slideRightHide = function (speed, fn) {
		return this.each(function() {
			$(this).hide('slide', { direction: 'right' }, speed, fn);
		});
	};
	$.widget('uicart.slidecart', {
		options: {
			location: 'right',    // left, right, top, bottom
			handlerBackground: '#000000',
			panelBackground: '#383838',
			setLocation: function (pos) {
				var rtval = new Object();
				switch (pos) {
				case 'left':
					rtval = { top: 0, left: 0, width: '35px', height: '100%' };
					break;
				case 'right':
					rtval = { top: 0, right: 0, width: '35px', height: '100%' };
					break;
				case 'top':
					rtval = { top: 0, right: 0, width: '100%', height: '35px' };
					break;
				case 'bottom':
					rtval = { bottom: 0, right: 0, width: '100%', height: '35px' };
					break;
				default:
					return { top: 0, right: 0, width: '35px', height: '100%' };
				}
				return rtval;
			}
		},
		_create: function () {
			this.element.css($.extend({
				position: 'absolute',
				zIndex: 7
			}, { top: 0, right: 0, width: 335, height: '100%' }));
			this._cartHandler = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: 9,
					background: this.options.handlerBackground
				}, { margin: '0 0 0 300', padding: '0 0 0 0', width: 35, height: '100%' }))
				.addClass('cart-handler')
				.appendTo(this.element);
			this._innerPanel = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: 8,
					background: this.options.panelBackground
				}, { margin: '0 0 0 0', padding: '0 0 0 35', width: 300, height: '100%' }))
				.addClass('inner-panel')
				.appendTo(this.element)
				.hide();
			this._addHook(this._cartHandler, 'click', this._innerPanel);
		},
		_addHook: function (anchor, event, folddiv) {
			var mask = document.createElement('div');
			$(mask).css({
				position : "absolute",
				backgroundColor: 'black',
				opacity : 0.5,
				top : 0,
				left : 0,
				width : $(document.body).width(),
				zIndex : 5
			}).hide().appendTo(document.body);
			anchor.on(event, function () {
				$(this).toggleClass('unfold');
				if ($(this).hasClass('unfold')) {
					// $('.cart-handler').toggle('slide', { direction: 'left' }, 'slow');
					$(mask).css({
						height : $(document).height()
					}).fadeIn('slow');					
					folddiv.slideRightShow('normal', function () {
						//TODO: 
					});
				} else {
					// $('.cart-handler').toggle('slide', { direction: 'left' }, 'normal');
					$(mask).fadeOut("slow");						
					folddiv.slideRightHide('fast', function () {
						//TODO: 
					});
				}
			});
		},
		destroy: function () {
			this._cartHandler.remove();
			this._innerPanel.remove();
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);
