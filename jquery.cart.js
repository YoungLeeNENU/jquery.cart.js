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
			tags: 1,
			setTagInfo: function () {
				return [ 0 ];    // 0 by default
			}
		},
		_create: function () {
			// Set css positions
			this._setConPos(this.options.position);

			// Fixed element 
			this.element.css($.extend({
				position: 'fixed',
				zIndex: this.options.maskZIndex + 1
			}, this.options.containerPos));
			this._reSize(this.element);

			// Handler
			this._cartHandler = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: this.options.maskZIndex + 3,
					background: this.options.handlerBackground
				}, this.options.handlerPos))
				.addClass('cart-handler')
				.appendTo(this.element);
			this._reSize(this._cartHandler);

			// Panel
			this._innerPanel = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: this.options.maskZIndex + 2,
					background: this.options.panelBackground
				}, this.options.panelPos))
				.addClass('inner-panel')
				.appendTo(this.element);
			this._reSize(this._innerPanel);
			
			// Add tag
			var hooks = this._addTag(this._cartHandler, this.options.tags, this.options.setTagInfo);

			// Add submit button
			// this._addButton(this._innerPanel);

			// Add trigger
			this._addHook(hooks, 'click', this.element);
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
		_addTag: function (handler, tNum, tfoo) {    // Shall controll css from the outside
			var info = tfoo();
			for(var i = 0; i < tNum; i++) {
				var hgtFrom = 90,
					hgtTo = 120,
					tinfo = info[i] === undefined ? 0 : info[i];
				var tagins = $('<div></div>')
						.addClass('tag-ins off')
						.css({
							width: this.options.handlerWidth,
							height: hgtFrom,
							borderBottom: '1px solid grey',
							backgroundColor: '#27408B',
							cursor: 'pointer'
						})
						// .hover(function () {
						// 	if (!$(this).parent().hasClass('unfold')) {
						// 		$(this).animate({ height: hgtTo }, 'slow');
						// 	}
						// }, function () {
						// 	if (!$(this).parent().hasClass('unfold')) {
						// 		$(this).animate({ height: hgtFrom }, 'slow');
						// 	}
						// })
						// .click(function () {
						// 	if ($(this).hasClass('off')) {
						// 		$(this).animate({ height: hgtTo }, 'normal');
						// 		$(this).removeClass('off');
						// 		$(this).addClass('on');
						// 	} else if ($(this).hasClass('on')) {
						// 		$(this).animate({ height: hgtFrom }, 'normal');
						// 		$(this).removeClass('on');
						// 		$(this).addClass('off');
						// 	}
						// })
						.appendTo(handler);
			}
			return $('.tag-ins');
		},
		addTag: function (handler, tNum, tfoo) {
			this._addTag(handler);    // Call from the outside
		},
		_addButton: function (panel) {
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
		addButton: function (panel) {
			this._addButton(panel);
		},    // Call from the outside
		_addHook: function (anchor, event, folddiv) {
			var mask = document.createElement('div'),
				that = this,
				queue = [];
			
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
			anchor.each(function () {
				$(this).on(event, function () {
					$(this).css({
						backgroundColor: '#FFD700'
					});
					if (queue.length > that.options.tags - 1)
						queue.shift();
					queue.push(this);
					if (queue.length === 1) {
						if (that.options.mask) {
							$(mask).css({
 								height : $(document).height() - (that.options.top + that.options.bottom)
							}).fadeIn('normal');
						}				
						folddiv.slideShow(that.options.position, that.options.panelWidth, 'normal');
					} else if ((queue[queue.length - 1] == queue[queue.length - 2])) {
						if (that.options.mask) {
							$(mask).fadeOut("normal");
						}
						folddiv.slideHide(that.options.position, that.options.panelWidth, 'fast');
						queue = [];
					} else if ((queue[queue.length - 1] != queue[queue.length - 2])) {
						//TODO: refresh panel
					}
				});
			});
		},    // DONE
		addHook: function (anchor, event, folddiv) {
			this._addHook(anchor, event, folddiv);
		},    // Call from the outside
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
