$(document).ready(function () {
	$('#J_cart').slidecart({
		position: 'right',
		top: 87,
		bottom: 0,
		height: document.body.clientHeight - 87,
		handlerWidth: 35,
		panelWidth: 280,
		handlerBackground: '#000000',
		panelBackground: '#5F5F5F',
		mask: true,
		maskOpacity: 0.4,
		handlerButtons: 2,
		panelButtons: 1
	}).addClass('slidecart-test');
	// $('#J_cartItems').find('.items').cartitems({
	// 	// liNum: 10
	// 	liNum: 3,
	// 	data: [{
	// 		'game_name': 'game1',
	// 		'items': [{
	// 			item_name: 'sample1',
	// 			r_id: 314
	// 		}, {
	// 			item_name: 'sample2',
	// 			r_id: 315
	// 		}]
	// 	}, {
	// 		'game_name': 'game2',
	// 		'items': [{
	// 			item_name: 'sample5',
	// 			r_id: 625
	// 		}]			
	// 	}]
	// });
});
