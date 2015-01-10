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
			setCommonTag: function () {
				var hgtFrom = 90,
					hgtTo = 120;
				
				$(this).css({
					width: 35,
					height: hgtFrom,
					borderBottom: '1px solid grey',
					backgroundColor: '#27408B',
					cursor: 'pointer'
				});
				
				return $(this);
			},
			setSingleTag: [ function () {
				$(this).css({
					backgroundColor: '#FF8C00'
				});
			} ],
			setItemsArea: function () {
				$(this).css({
					width: 240,
					height: document.body.clientHeight - 50,
					// height: 300,
					overflowY: 'auto',
					// border: '1px solid black',
					zIndex: 73,
					marginLeft: 5,
					marginTop: 50,
					backgroundColor: '#5E5E5E'
				});
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
			
			var hooks = this._addTag(this._cartHandler);    // Add tag
			var iarea = this._addItemsArea(this._innerPanel);    // Add items panel 
			var btn = this._addButton(this._innerPanel);    // Add submit button
			
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
		_addTag: function (handler) {    // Shall controll css from the outside
			for(var i = 0; i < this.options.tags; i++) {
				var hgtFrom = 90,
					hgtTo = 120;
				var tagIns = $('<div></div>')
						.addClass('tag-ins off')
						.appendTo(handler);
				this.options.setCommonTag.call(tagIns);
				if (this.options.setSingleTag[i] != null)
					this.options.setSingleTag[i].call(tagIns);
			}
			return $('.tag-ins');
		},
		addTag: function (handler, tNum, tfoo) {
			this._addTag(handler);    // Call from the outside
		},
		_addItemsArea: function (panel) {
			this._itemsArea = $('<div></div>')
				.addClass('items-area')
				.appendTo(panel);
			this.options.setItemsArea.call(this._itemsArea);
			return $('.items-area');
		},
		_addButton: function (panel) {
			var btnAreaWidth = 50;
			this._panelBtn = $('<div></div>')
				.css({
					height: btnAreaWidth,
					width: this.options.panelWidth,
					marginLeft: 0,
					marginTop: - btnAreaWidth,
					backgroundColor: '#8B0000',
					bottom: this.options.bottom,
					left: 0,
					// cursor: 'pointer',
					zIndex: this.options.maskZIndex + 10,
					cursor: 'pointer'
				})
				.addClass('panel-btn')
				.appendTo(panel);
			// this._submitBtn = $('<div></div>')
			// 	.css({
			// 		width: this.options.panelWidth - 30,
			// 		height: this.options.handlerWidth + 10,
			// 		marginLeft: 15,
			// 		backgroundColor: '#8B0000',
			// 		cursor: 'pointer'
			// 	})
			// 	.addClass('submit-btn')
			// 	.appendTo(this._panelBtn);
			// this._submitBtn.appendTo(this._panelBtn.appendTo(this._panelBtn));
			return $('.panel-btn');
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
				nwidth : $(document).width(),
				left: 0,
				right: 0,
				zIndex: that.options.maskZIndex
			}).hide().appendTo(document.body);
			anchor.each(function () {
				$(this).on(event, function () {
					var queueSize = that.options.tags == 1 ? 2 : that.options.tags;    // queueSize >= 2 
					if (queue.length > queueSize - 1)
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
