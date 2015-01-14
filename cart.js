$(document).ready(function () {
	// Add slide cart
	$('#J_cart').slidecart({
		top: 87,
		panelWidth: 307,
		height: document.body.clientHeight - 87,
		mask: true,
		tags: 2,
		// position: 'left',
		setSingleTag: [ function () {
			$(this).css({
				backgroundColor: '#FF8C00'
			}).data({ game: 'seer' });
		}, function () {
			$(this).css({
				backgroundColor: '#4682B4'
			}).data({ game: 'more' });
		} ],
		setItemsArea: function () {
			for(var i = 0; i < 10; i++) {
				var items = $(document.createElement("div")).addClass('item-sample').appendTo($(this));
				items.item({
					timeDft: "2014-12-13~2015-01-12",
					gameNameTxt: function () {
						$(this).text('赛尔号').attr({
							'game_id': 16,
							'r_id': 12318
						});
					},
					ItemNameTxt: function () {
						$(this).text('添加的事件');
					}					
				});
			}
		}
	}).addClass('slidecart-test');
});
