$(document).ready(function () {
	$('#J_cart').slidecart({
		// location: 'right'
		// buttonNum: 2
	}).addClass('slidecart-test');
	$('.cart-handler').click(function () {
		$('.inner-panel').show('2000');
	});
});
