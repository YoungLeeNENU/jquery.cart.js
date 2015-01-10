/**
 * @fileOverview
 * @name jquery.cartitem.js
 * @author Young Lee   youngleemails@gmail.com
 * @license GNU GENERAL PUBLIC LICENSE Version 3 
 */
(function($) {
	$.widget('uicart.item', {
		options: {
			timeDft: "2014-12-11 ~ 2015-01-10"
		},
		_create: function () {
			var that = this;
			this.item = $(document.createElement("div"))
				.addClass('item-ins')
				.css({
					height: 100,
					width: 274,
					marginLeft: 10,
					marginRight: 10,
					marginTop: 5,
					padding: 0,
					border: '1px solid #FE9D1F',
					backgroundColor: '#F5F6FA'
				})
				.appendTo(this.element);
			this.checkboxCon = $(document.createElement("div"))
				.css({ float: 'left', height: '100%', width: 24, backgroundColor: '#FE9D1F' })
				.addClass('checkbox-con')
				.appendTo(this.item);
			this.checkbox = $(document.createElement("input"))
				.attr({ type: 'checkbox' })
				.css({ marginLeft: 6, marginTop: 40 })
				.addClass('check-item')
				.appendTo(this.checkboxCon);
			this.itemNameArea = $(document.createElement("div"))
				.css({
					height: 61,
					width: 214,
					// float: 'right',
					// backgroundColor: '#D2B48C',
					borderBottom: '1px solid #DDD',
					// border: '1px solid #F4A460',
					padding: 0,
					marginLeft: 30,
					// marginRight: 6,
					marginTop: 6
				})
				.addClass('itemname-area')
				.appendTo(this.item);
			this.itemGameCon = $(document.createElement("div"))
				.css({
					height: 20,
					width: 214,
					borderBottom: '1px solid #DDD'
					// backgroundColor: '#A52A2A'
				})
				.addClass('itemgame-con')
				.appendTo(this.itemNameArea);
			this.itemGame = $(document.createElement("span"))
				.css({
					fontSize: 14,
					color: '#5E5E5E'
				})
				.text('Game Name')
				.addClass('item-game')
				.appendTo(this.itemGameCon);
			this.itemNameCon = $(document.createElement("div"))
				.css({
					// border: '1px solid #F4A460',
					// backgroundColor: '#cd5c5c',
					marginTop: 8,
					marginBottom: 10,
					height: 24,
					width: '100%'
				})
				.addClass('itemname-con')
				.appendTo(this.itemNameArea);
			this.itemName = $(document.createElement("span"))
				.css({
					fontSize: 24,
					fontWeight: 'bold',
					color: '#5E5E5E'
					// marginLeft: 10
				})
				.text('Game Custom Item')
				.addClass('item-name')
				.appendTo(this.itemNameCon);
			this.itemTimeHead = $(document.createElement('div'))
				.css({
					position: 'absolute',
					height: 22,
					width: 184,
					// backgroundColor: '#696969',
					border: '1px solid #696969',
					color: 'white',
					borderRadius: 4,
					marginLeft: 30,
					marginTop: 5,
					cursor: 'pointer',
					opacity: 0.6
				})
				.addClass('time-tag cur')
				.appendTo(this.item);
			this.itemTimeDft = $(document.createElement('input'))
				.attr({ type: 'text' })
				.css({ border: 0, height: 22, width: 154, borderRadius: 4 })
				.val(this.options.timeDft)
				.addClass('datepick')
				.appendTo(this.itemTimeHead)
				.click(function () {
					console.log($(this));
					$(this).datepick({
						rangeSelect: true,
						monthsToShow: 2,
						monthsToStep: 2,
						monthsOffset: 2,
						shortCut : false,
						maxDate: new Date(),
						onShow: function () {
							var refreshTime = that.options.timeDft;
							that.itemTimeDft(refreshTime);
						},
						onClose: function () {
							
						}
					});
				});
			this.itemTimeAdd = $(document.createElement("div"))
				.css({
					position: 'relative',
					height: 18,
					width: 18,
					// backgroundColor: '#696969',
					border: '1px solid #696969',
					color: 'white',
					marginLeft: 220,
					borderRadius: 4,
					cursor: 'pointer',
					marginTop: 7,
					opacity: 0.6
				})
				.addClass('tag-con')
				.appendTo(this.item)
				.click(function () {
					$(this).parent().animate({ height: '220px' });
			});;
			this.itemClose = $(document.createElement("div")).addClass('item-close').appendTo(this.item)
				.click(function () {
					$(this).parent().fadeOut('slow', function () {
						$(this).remove();
					});
				});
			this.iconAdd = $(document.createElement("div")).addClass('icon').appendTo(this.itemTimeAdd);
			this.iconTimeAdd = $(document.createElement("div")).addClass('icon-timeadd').appendTo(this.iconAdd);
			this.iconClose = $(document.createElement("div")).addClass('icon').appendTo(this.itemClose);
			this.iconItemClose = $(document.createElement("div")).addClass('icon-itemclose').appendTo(this.iconClose);
		},
		additem: function () {
			this._create();
		},
		destroy: function () {
			//TODO: 
		}
	});
})(jQuery);
