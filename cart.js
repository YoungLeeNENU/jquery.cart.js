$(document).ready(function () {
	// Add slide cart
	$('#J_cart').slidecart({
		top: 87,
		panelWidth: 280,
		height: document.body.clientHeight - 87,
		mask: true,
		tags: 2,
		setCommonTag: function () {    // Control the tags while use the plugin
			var hgtFrom = 90,
				hgtTo = 120;
			
			$(this).css({
				width: 35,
				height: hgtFrom,
				cursor: 'pointer'
			})
				// .hover(function () {
				//     if (!$(this).parent().hasClass('unfold')) {
				//         $(this).animate({ height: hgtTo }, 'slow');
				//     }
				// }, function () {
				//     if (!$(this).parent().hasClass('unfold')) {
				//         $(this).animate({ height: hgtFrom }, 'slow');
				//     }
				// })
				.click(function () {
				    if ($(this).hasClass('off')) {
				        $(this).animate({ height: hgtTo }, 'normal');
				        $(this).removeClass('off');
				        $(this).addClass('on');
				    } else if ($(this).hasClass('on')) {
				        $(this).animate({ height: hgtFrom }, 'normal');
				        $(this).removeClass('on');
				        $(this).addClass('off');
				    }
				});
			
			return $(this);
		},
		setSingleTag: [    // Set performance for single tag
			function () {
				$(this).css({ backgroundColor: '#FFA500' })
					.data({
						game: 'seer'
					});
		}, function () {
			$(this).css({ backgroundColor: '#436EEE' })
				.data({
					game: 'more'
				});			
		} ],
		setItemsArea: function () {
			$(this).css({
				width: 270,
				height: document.body.clientHeight - 50 - 87,
				// height: 300,
				overflowY: 'auto',
				// border: '1px solid black',
				zIndex: 73,
				marginLeft: 5,
				marginTop: 50,
				backgroundColor: '#5E5E5E'
			});
		}
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
