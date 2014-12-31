$(document).ready(function () {
	$('#J_cart').slidecart({
		position: 'right',
		top: 87,
		bottom: 0,
		height: $(document).height() - 87,
		handlerWidth: 35,
		panelWidth: 280,
		handlerBackground: '#000000',
		panelBackground: '#5F5F5F',
		mask: true,
		maskOpacity: 0.4,
		handlerButtons: 2,
		panelButtons: 1
	}).addClass('slidecart-test');
});
