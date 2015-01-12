/**
 * @fileOverview
 * @name jquery.cartitem.js
 * @author Young Lee   youngleemails@gmail.com
 * @license GNU GENERAL PUBLIC LICENSE Version 3 
 */
(function($) {
	$.widget('uicart.item', {
		options: {
            zIndexBasic: 100,
			timeDft: "0000-00-00 ~ 0000-00-00",
            ckboxSelected: function () {
                //TODO: 
            },
            gameNameTxt: function () {
                $(this).text("More");
            },
            ItemNameTxt: function () {
                $(this).text("Game Custom Item");
            },
            setItemTime: function () {
                $(this).click(function () {
                    //TODO: 
                });
            },
            setItemAdd: function () {
                $(this).click(function () {
                    var $timeArea = $(this).parent(),
                        $widget = $timeArea.parent();
                    $widget.animate({ height: '229px' }, 'fast');
                    $timeArea.animate({ height: '159px' }, 'fast');
                    $widget.find('.item-fold').animate({ marginTop: '192px' }, 'fast', function () {
                        $(this).show();
                    });
                });
            },
            setItemClose: function () {
                $(this).click(function () {
                    var $widget = $(this).parent().parent();
                    $widget.fadeOut('slow', function () {
                        $(this).remove();
                    });
                });
            },
            setItemFold: function () {
                $(this).click(function () {
                    var $fold = $(this),
                        $widget = $(this).parent().parent(),
                        $time = $widget.find('.time-area');
                    $fold.hide(function () {
                        $(this).animate({ marginTop: '62px' }, 'fast');
                    });
                    $widget.animate({ height: '100px' }, 'fast');
                    $time.animate({ height: '30px' }, 'fast');
                });
            }
		},
		_create: function () {
            var ckbox = this._setCheckBox(),
                itemOpArea = this._setItemOpArea(),
                gameName = this._setGameName(),
                itemName = this._setItemName(),
                itemTime = this._setItemTime(),
                itemAdd = this._setItemAdd(),
                itemClose = this._setItemClose(),
                itemFold = this._setItemFold();
            
            this.options.ckboxSelected.call(ckbox);
            this.options.gameNameTxt.call(gameName);
            this.options.ItemNameTxt.call(itemName);
            this.options.setItemTime.call(itemTime);
            this.options.setItemAdd.call(itemAdd);
            this.options.setItemClose.call(itemClose);
            this.options.setItemFold.call(itemFold);
		},
        _setCheckBox: function (con) {
            this.item = $(document.createElement("div")).addClass('item-ins').appendTo(this.element);
			this.checkboxCon = $(document.createElement("div")).addClass('checkbox-con').appendTo(this.item);
			this.checkbox = $(document.createElement("input")).attr({ type: 'checkbox' }).addClass('check-item').appendTo(this.checkboxCon);
            return this.checkbox;
        },
        _setItemOpArea: function () {
            this.opCon = $(document.createElement("div")).addClass('op-area').appendTo(this.item);
            return this.opCon;
        },
        _setGameName: function () {
			this.itemNameArea = $(document.createElement("div")).addClass('itemname-area').appendTo(this.item);
			this.itemGameCon = $(document.createElement("div")).addClass('itemgame-con').appendTo(this.itemNameArea);
			this.itemGame = $(document.createElement("span")).addClass('item-game').appendTo(this.itemGameCon);
            return this.itemGame;
        },
        _setItemName: function () {
			this.itemNameCon = $(document.createElement("div")).addClass('itemname-con').appendTo(this.itemNameArea);
			this.itemName = $(document.createElement("span")).addClass('item-name').appendTo(this.itemNameCon);
            return this.itemName;
        },
        _setItemTime: function () {
            this.itemTimeArea = $(document.createElement("div")).addClass('time-area').appendTo(this.item);
			this.itemTimeHead = $(document.createElement('div')).addClass('time-tag cur').appendTo(this.itemTimeArea);
			this.itemTimeDft = $(document.createElement('input')).attr({ type: 'text' }).val(this.options.timeDft).addClass('datepick').appendTo(this.itemTimeHead);
            return this.itemTimeDft;
        },
        _setItemAdd: function () {
			this.itemTAdd = $(document.createElement("div")).addClass('tag-con').appendTo(this.itemTimeArea);
			this.iconAdd = $(document.createElement("div")).addClass('icon').appendTo(this.itemTAdd);
			this.iconTimeAdd = $(document.createElement("div")).addClass('icon-timeadd').appendTo(this.iconAdd);
            
			this.itemClose = $(document.createElement("div")).addClass('time-close').appendTo(this.itemTAdd);
			this.iconClose = $(document.createElement("div")).addClass('icon').appendTo(this.itemClose);
			this.iconItemClose = $(document.createElement("div")).addClass('icon-timeclose').appendTo(this.iconClose);
            return this.itemTAdd;
        },
        _setItemClose: function () {
			this.itemClose = $(document.createElement("div")).addClass('item-close').appendTo(this.opCon);
			this.iconClose = $(document.createElement("div")).addClass('icon').appendTo(this.itemClose);
			this.iconItemClose = $(document.createElement("div")).addClass('icon-itemclose').appendTo(this.iconClose);
            return this.itemClose;
        },
        _setItemFold: function () {
            this.itemFold = $(document.createElement("div")).addClass("item-fold").appendTo(this.opCon).hide();
			this.iconFold = $(document.createElement("div")).addClass('icon').appendTo(this.itemFold);
			this.iconItemFold = $(document.createElement("div")).addClass('icon-itemfold').appendTo(this.iconFold);
            return this.itemFold;
        },
		destroy: function () {
            this.item.remove();
            $.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);
