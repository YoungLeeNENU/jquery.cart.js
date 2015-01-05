/**
 * @fileOverview slide cart plugin
 * @name cart.js
 * @author Young Lee   youngleemails@gmail.com
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */
// cart container
(function($) {
	$.fn.slideShow = function (dir, offset, speed, easing, fn) {
		var prop = new Object();
		prop[dir] = 0;
		return this.animate(prop, speed, easing, fn);
	};    // DONE
	$.fn.slideHide = function (dir, offset, speed, easing, fn) {
		var prop = new Object();
		prop[dir] = -offset;
		return this.animate(prop, speed, easing, fn);
	};    // DONE
	$.fn.reSize = function (element) {
		var that = this,
			iWinHeight = document.body.clientHeight;
		$(window).resize(function () {
			return element.css({ height: document.body.clientHeight - (iWinHeight - that.options.height) });
		});
	};    // PENDING
	$.widget('uicart.slidecart', {
		options: {
			position: 'right',
			top: 0,
			bottom: 0,
			height: document.body.clientHeight,
			handlerWidth: 35,
			panelWidth: 250,
			containerPos: null,
			handlerPos: null,
			panelPos: null,
			handlerBackground: '#000000',
			panelBackground: '#383838',
			mask: false,
			maskZIndex: 70,
			maskOpacity: 0.5,
			handlerButtons: 1,
			panelButtons: 1
		},
		_create: function () {
			this._setConPos(this.options.position);
			
			this.element.css($.extend({
				position: 'fixed',
				zIndex: this.options.maskZIndex + 1
				// border: '1px solid black'    // test
			}, this.options.containerPos));
			this._reSize(this.element);
			
			this._cartHandler = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: this.options.maskZIndex + 3,
					background: this.options.handlerBackground
				}, this.options.handlerPos))
				.addClass('cart-handler')
				.appendTo(this.element);
			this._reSize(this._cartHandler);
			
			this._innerPanel = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: this.options.maskZIndex + 2,
					background: this.options.panelBackground
				}, this.options.panelPos))
				.addClass('inner-panel')
				.appendTo(this.element);
			this._reSize(this._innerPanel);
			
			// this._createButton(this._innerPanel);
			
			this._addHook(this._cartHandler, 'click', this.element);
		},
		_reSize: function (element) {
			var that = this,
			    iWinHeight = document.body.clientHeight;
			$(window).resize(function () {
				element.css({ height: document.body.clientHeight - (iWinHeight - that.options.height) });
			});
		},
		_setConPos: function (pos) {
			switch (pos) {
			case 'right':
				this.options.containerPos = {
					top: this.options.top,
					bottom: this.options.bottom,
					right: -this.options.panelWidth,
					width: this.options.handlerWidth + this.options.panelWidth,
					height: this.options.height
				};
				this.options.handlerPos = {
					marginLeft: 0,
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
					left: -this.options.panelWidth,
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
			default:    // right
				this.options.containerPos = {
					top: this.options.top,
					bottom: this.options.bottom,
					right: -this.options.panelWidth,
					width: this.options.handlerWidth + this.options.panelWidth,
					height: this.options.height
				};
				this.options.handlerPos = {
					marginLeft: 0,
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
			}
		},    // DONE
		_createButton: function (panel) {
			this._panelBtn = $('<div></div>')
				.css({
					height: this.options.handlerWidth,
					width: this.options.panelWidth,
					marginLeft: - this.options.handlerWidth,
					marginTop: this.options.height - this.options.handlerWidth,
					backgroundColor: '#DCDCDC',
					bottom: this.options.bottom,
					left: 0,
					cursor: 'pointer'
				})
				.addClass('panel-btn')
				.appendTo(panel);
		},
		_addHook: function (anchor, event, folddiv) {
			var mask = document.createElement('div'),
				that = this;
			$(mask).css({
				position : "fixed",
				backgroundColor: 'black',
				opacity : this.options.maskOpacity,
				top : this.options.top,
				bottom: this.options.bottom,
				width : $(document).width(),
				left: 0,
				right: 0,
				zIndex: that.options.maskZIndex
			}).hide().appendTo(document.body);
			anchor.on(event, function () {
				$(this).toggleClass('unfold');
				if ($(this).hasClass('unfold')) {
					if (that.options.mask) {
						$(mask).css({
 							height : $(document).height() - (that.options.top + that.options.bottom)
						}).fadeIn('normal');
					}
					folddiv.slideShow(that.options.position, that.options.panelWidth, 'normal');
				} else {
					if (that.options.mask) {
						$(mask).fadeOut("normal");
					}
					folddiv.slideHide(that.options.position, that.options.panelWidth, 'fast');
				}
			});
		},
		addHook: function (anchor, event, folddiv) {
			this._addHook(anchor, event, folddiv);
		},
		destroy: function () {
			this._cartHandler.remove();
			this._innerPanel.remove();
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);

// item in the cart
(function($) {
	$.widget('uicart.cartitems', {
		options: {
			liNum: 1
		},
		_create: function () {
			for(var i = 0; i < this.options.liNum; i++) {
				this.item = $('<div></div>')
					.addClass('cart-item')
					.css({
						height: 100,
						// width: "100%",
						marginLeft: 10,
						marginRight: 10,
						padding: 0,
						borderBottom: '1px solid grey'
					})
					.appendTo(this.element);
			}
		},
		destroy: function () {
			//TODO: 
		}
	});
})(jQuery);

// filter info
(function($) {
	$.widget('uicart.infopanel', {
		
	});
})(jQuery);
