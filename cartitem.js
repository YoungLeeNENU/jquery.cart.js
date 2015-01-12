$(document).ready(function () {
	var gname = 'More';
	var iname = 'Game Custom Item';

	$('.cart-item').each(function () {
		$(this).item({
			timeDft: "2014-12-13~2015-01-12",
			gameNameTxt: function () {
				$(this).text(gname).attr({
					'game_id': 16,
					'r_id': 12318
				});
			},
			ItemNameTxt: function () {
				$(this).text(iname);
			}
		});
	});
});
