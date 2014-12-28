/**
 * @fileOverview slide cart plugin
 * @name cart.js
 * @author Young Lee   youngleemails@gmail.com
 * @license GPL
 */
(function($) {
	$.widget('uicart.slidecart', {
		options: {
			location: 'right',    // left, right, top, bottom
			handlerBackground: '#000000',
			panelBackground: '#FFFF00',
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
			},
			slideIn: function () {
				//TODO: 
				return ;
			},
			slideOut: function () {
				//TODO: 
				return ;
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
					position: 'relative',
					zIndex: 8,
					background: this.options.panelBackground
				}, { margin: '0 0 0 35', padding: '0 0 0 0', width: 300, height: '100%' }))
				.addClass('inner-panel')
				.appendTo(this.element)
				.hide();
		},
		destroy: function () {
			this._cartHandler.remove();
			this._innerPanel.remove();
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);
