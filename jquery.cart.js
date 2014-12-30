/**
 * @fileOverview slide cart plugin
 * @name cart.js
 * @author Young Lee   youngleemails@gmail.com
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */
(function($) {
	$.fn.slideShow = function (dir, speed, fn) {
		return this.each(function() {
			$(this).show('slide', { direction: dir }, speed, fn);
		});
	};
	$.fn.slideHide = function (dir, speed, fn) {
		return this.each(function() {
			$(this).hide('slide', { direction: dir }, speed, fn);
		});
	};
	$.widget('uicart.slidecart', {
		options: {
			position: 'right',
			top: 0,
			bottom: 0,
			height: $(document.body).height(),
			handlerWidth: 35,
			panelWidth: 250,
			containerPos: null,
			handlerPos: null,
			panelPos: null,
			handlerBackground: '#000000',
			panelBackground: '#383838',
			mask: true,
			maskOpacity: 0.5
		},
		_create: function () {
			this._setConPos(this.options.position);
			this.element.css($.extend({
				position: 'absolute',
				zIndex: 7
			}, this.options.containerPos));
			this._cartHandler = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: 9,
					background: this.options.handlerBackground
				}, this.options.handlerPos))
				.addClass('cart-handler')
				.appendTo(this.element);
			this._innerPanel = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: 8,
					background: this.options.panelBackground
				}, this.options.panelPos))
				.addClass('inner-panel')
				.appendTo(this.element)
				.hide();
			this._addHook(this._cartHandler, 'click', this._innerPanel);
		},
		_setConPos: function (pos) {
			switch (pos) {
			case 'right':
				this.options.containerPos = {
					top: this.options.top,
					bottom: this.options.bottom,
					right: 0,
					width: this.options.handlerWidth + this.options.panelWidth,
					height: this.options.height
				};
				this.options.handlerPos = {
					marginLeft: this.options.panelWidth,
					padding: 0,
					width: this.options.handlerWidth,
					height: this.options.height
				};
				this.options.panelPos = {
					margin: 0,
					paddingLeft: this.options.handlerWidth,
					width: this.options.panelWidth,
					height: this.options.height
				};
				break;
			case 'left':
				this.options.containerPos = {
					top: this.options.top,
					bottom: this.options.bottom,
					left: 0,
					width: this.options.handlerWidth + this.options.panelWidth,
					height: this.options.height
				};
				this.options.handlerPos = {
					marginRight: this.options.panelWidth,
					padding: 0,
					width: this.options.handlerWidth,
					height: this.options.height
				};
				this.options.panelPos = {
					margin: 0,
					paddingLeft: this.options.handlerWidth,
					width: this.options.panelWidth,
					height: this.options.height
				};
				break;
			default:    // right
				this.options.containerPos = {
					top: this.bottom.top,
					bottom: this.options.bottom,
					right: 0,
					width: this.options.handlerWidth + this.options.panelWidth,
					height: this.options.height
				};
				this.options.handlerPos = {
					marginLeft: this.options.panelWidth,
					padding: 0,
					width: this.options.handlerWidth,
					height: this.options.height
				};
				this.options.panelPos = {
					margin: 0,
					paddingLeft: this.options.handlerWidth,
					width: this.options.panelWidth,
					height: this.options.height
				};
				break;
			}
		},
		_addHook: function (anchor, event, folddiv) {
			var mask = document.createElement('div'),
				that = this;
			$(mask).css({
				position : "absolute",
				backgroundColor: 'black',
				opacity : this.options.maskOpacity,
				top : this.options.top,
				bottom: this.options.bottom,
				width : $(document).width(),
				left: 0,
				right: 0,
				zIndex : 5
			}).hide().appendTo(document.body);
			anchor.on(event, function () {
				$(this).toggleClass('unfold');
				if ($(this).hasClass('unfold')) {
					if (that.options.mask) {
						$(mask).css({
							height : $(document).height() - (that.options.top + that.options.bottom)
						}).fadeIn('normal');
					}
					folddiv.slideShow(that.options.position, 'normal');
				} else {
					if (that.options.mask) {
						$(mask).fadeOut("normal");
					}
					folddiv.slideHide(that.options.position, 'fast');
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
