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
	$.widget('uicart.slidecart', {
		options: {
			position: 'right',
			top: 0,
			bottom: 0,
			height: document.body.clientHeight,
			handlerWidth: 35,
			panelWidth: 250,
			notifyHgt: 40,
			BtnHgt: 100,
			containerPos: null,
			handlerPos: null,
			panelPos: null,
			handlerBackground: '#000000',
			panelBackground: '#383838',
			mask: false,
			maskZIndex: 70,
			maskOpacity: 0.5,
			tags: 1,
			extraInfo: true,
			unfold: false,
			setCommonTag: function () {
				$(this).css({
					float: 'left', width: 35, height: 90, backgroundColor: '#27408B', cursor: 'pointer'
				});
				var numInfo = $(document.createElement("div"))
						.css({ float: 'left', height: 35, width: 35, marginTop: 55 })
						.addClass("tag-info")
						.appendTo($(this));
				var numCon = $(document.createElement("div"))
						.css({ height: 18, width: 18, marginTop: 7, marginLeft: 7, borderRadius: 20 })
						.addClass('num-con')
						.appendTo(numInfo);
				var numSpan = $(document.createElement("span"))
						.css({ fontWeight: 'bold', color: '#F5F5F5', marginLeft: 5 })
						.addClass('num-span')
						.appendTo(numCon);
				return $(this);
			},
			commonTagEffect: function () {
				return $(this);
			},
			setSingleTag: [
				function () {
					$(this).css({
						backgroundColor: '#FF8C00'
					});
				} ],
			setItemsArea: function () {
				$(this).css({
					width: 240,
					height: document.body.clientHeight - 50,
					overflowY: 'auto',
					zIndex: 73,
					marginLeft: 5,
					marginTop: 50,
					backgroundColor: '#5E5E5E'
				});
			},
			setSelOpt: function () {
				$(document.createElement('option')).text('对选中数据做并集运算').attr({
					type: 'union'
				}).appendTo($(this));
				$(document.createElement('option')).text('对选中数据做交集运算').attr({
					type: 'intersect'
				}).appendTo($(this));
				$(document.createElement('option')).text('对选中数据做差集运算').attr({
					type: 'diff'
				}).appendTo($(this));
			},
			setFilter: function () {
				//TODO: 
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

			this._setHandler();    // Handler
			this._setPanel();    // Panel
			
			// var iarea = this._addItemsArea(this._innerPanel);    // Add items panel
			// var btn = this._addButton(this._innerPanel);    // Add submit button
			
			// Add hook			
			var hooks = this._addTag(this._cartHandler);    // Add tag
			this._addHook(hooks, 'click', this.element);
		},
		_reSize: function (element) {
			var that = this,
			    iWinHeight = document.body.clientHeight;
			$(window).resize(function () {
				element.css({ height: document.body.clientHeight - (iWinHeight - that.options.height) });
			});
		},    // DONE
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
		_setHandler: function () {
			this._cartHandler = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: this.options.maskZIndex + 3,
					background: this.options.handlerBackground
				}, this.options.handlerPos))
				.addClass('cart-handler')
				.appendTo(this.element);
			this._reSize(this._cartHandler);
			return this._cartHandler;
		},    // DONE
		_setPanel: function () {
			this._innerPanel = $('<div></div>')
				.css($.extend({
					position: 'absolute',
					zIndex: this.options.maskZIndex + 2,
					background: this.options.panelBackground
				}, this.options.panelPos))
				.addClass('inner-panel')
				.appendTo(this.element);
			this._reSize(this._innerPanel);
			this._setNotifyArea();
			this._setItemsArea();
			this._setBtnArea();
			return this._innerPanel;
		},    // DONE
		_setNotifyArea: function () {
			this._notifyArea = this._appendElement('div', 'notify-area', this._innerPanel);
			this._notifyArea.css({
				float: 'left',
				width: '100%',
				height: this.options.notifyHgt,
				backgroundColor: this.options.panelBackground
			});
			return this._notifyArea;
		},
		_setItemsArea: function () {
			this.itemArea = this._appendElement('div', 'item-area', this._innerPanel);
			this.itemArea.css({
				float: 'left',
				width: '100%',
				height: this.itemArea.parent().height() - this.options.notifyHgt - this.options.BtnHgt
			});
			this._setItemCon();
			return this.itemArea;
		},
		_setItemCon: function () {
			var margin_left = 5,
				margin_top = 5;
			this._itemCon = this._appendElement('div', 'item-con', this.itemArea);
			this._itemCon.css({
				float: 'left',
				height: this._itemCon.parent().height() - margin_top,
				width: this.options.panelWidth - (margin_left * 2),
				marginTop: margin_top,
				marginLeft: margin_left,
				overflowY: 'auto',
				zIndex: this.options.maskZIndex + 3,
				backgroundColor: '#5E5E5E'
			});
			this.options.setItemsArea.call(this._itemCon);
			return this._itemCon;
		},
		_setBtnArea: function () {
			this.btnArea = this._appendElement('div', 'btn-area', this._innerPanel);
			this.btnArea.css({
				float: 'left',
				width: '100%',
				height: this.options.BtnHgt,
				backgroundColor: '#DCDCDC'
			});
			this._setSubmitCtrl();
			this._setFilter();
			this._setSubmitBtn();
			return this.btnArea;
		},
		_setSubmitCtrl: function () {
			this.submitCtrl = this._appendElement('div', 'submit-ctrl', this.btnArea);
			this.submitCtrl.css({
				float: 'left',
				width: '100%',
				height: this.options.BtnHgt / 2
			});
			if (this.options.extraInfo)
				this._setExtraInfo();
			return this.submitCtrl;
		},
		
		_setExtraInfo: function () {
			var margin_left = 10,
				bottom = 10;
			this.extraInfo = this._appendElement('div', 'extra-info', this.submitCtrl);
			this.extraInfo.css({
				float: 'left',
				width: this.extraInfo.parent().width() - (margin_left * 2),
				marginLeft: margin_left,
				height: this.options.BtnHgt / 2 - bottom
			});
			this._setSelect();
			this._setUnfold();
			return this.extraInfo;
		},
		_setSelect: function () {
			this.selectArea = this._appendElement('div', 'select-area', this.extraInfo);
			this.selector = this._appendElement('select', 'selector', this.selectArea);
			this.selector.css({
				float: 'left',
				marginTop: 10,
				boxShadow: 'inset 1px 2px 5px 1px #e2e2e2',
				cursor: 'pointer',
				borderRadius: 3,
				height: 30,
				backgroundColor: 'white',
				width: 160
			});
			this.options.setSelOpt.call(this.selector);
			return this.selector;
		},
		_setUnfold: function () {
			var context = this;
			this.unfold = this._appendElement('div', 'unfold', this.extraInfo);
			this.unfold.css({
				float: 'right',
				marginTop: 10,
				cursor: 'pointer',
				borderRadius: 3,
				height: 30,
				border: '1px solid white',
				width: 30
			}).click(function () {
				var $extra = $(this).parent(),
					$filter = $extra.parent().next();
					$submit = $extra.parent().next().next(),
					$btnArea = $extra.parent().parent(),
					$itemArea = $btnArea.prev();

				if (context.options.unfold) {
					$itemArea.animate({ height: '+=220px' });
					$itemArea.children().animate({ height: '+=220px' });
					$filter.animate({ height: '-=220px' });
					$btnArea.animate({ height: '-=220px' });
					context.options.unfold = false;
				} else {
					$itemArea.animate({ height: '-=220px' });
					$itemArea.children().animate({ height: '-=220px' });
					$filter.animate({ height: '+=220px' });
					$btnArea.animate({ height: '+=220px' });
					context.options.unfold = true;
				}
			});
			return this.unfold;
		},
		_setFilter: function () {
			this.filter = this._appendElement('div', 'filter-info', this.btnArea);
			this.filter.css({
				float: 'left',
				width: '100%'
			});
			this.options.setFilter.call(this.filter);
			return this.filter;
		},
		_setSubmitBtn: function () {
			var margin_left = 10,
				bottom = 10,
				context = this;
			this.submitBtn = this._appendElement('div', 'submit-btn', this.btnArea);
			this.submitBtn.css({
				float: 'left',
				width: this.submitBtn.parent().width() - (margin_left * 2),
				marginLeft: margin_left,
				height: this.options.BtnHgt / 2 - bottom,
				backgroundColor: '#8B0000',
				cursor: 'pointer'
			}).click(function () {
				context._trigger('submit');
			});
			return this.submitBtn;
		},
		_addTag: function (handler) {    // Shall controll css from the outside
			var context = this;
			for(var i = 0; i < this.options.tags; i++) {
				var tagIns = $(document.createElement("div"))
						.addClass('tag-ins off')
						.appendTo(handler)
						.click(function () {
							context._trigger('refresh');
						});
				this.options.setCommonTag.call(tagIns);
				this.options.commonTagEffect.call(tagIns);
				if (this.options.setSingleTag[i] != null)
					this.options.setSingleTag[i].call(tagIns);
			}
			return $('.tag-ins');
		},
		_addItemsArea: function (panel) {
			this._itemsArea = $('<div></div>')
				.addClass('items-area')
				.appendTo(panel);
			this.options.setItemsArea.call(this._itemsArea);
			return $('.items-area');
		},
		_addButton: function (panel) {
			var btnAreaWidth = 140;
			this._panelBtn = $('<div></div>')
				.css({
					float: 'left',
					height: btnAreaWidth,
					width: this.options.panelWidth,
					marginLeft: 0,
					marginTop: - btnAreaWidth,
					backgroundColor: '#8B0000',
					bottom: this.options.bottom,
					left: 0,
					// cursor: 'pointer',
					zIndex: this.options.maskZIndex + 100,
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
		_appendElement: function (type, cls, con) {
			return $(document.createElement(type)).addClass(cls).appendTo(con);
		},
		destroy: function () {
			this._cartHandler.remove();
			this._innerPanel.remove();
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);
