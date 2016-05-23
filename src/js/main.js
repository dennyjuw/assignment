(function() {

	'use strict';

	$(document).ready(function() {


		$('#header-user').on('click', function() { 
			$(this).find('.menu').toggleClass('open');
			return false;
		});

		$('#portfolio-link').on('click', function() {
			var $infoDiv = $(this).parent().parent().next();
			if ($infoDiv.is('.table-info')) {
				$infoDiv.toggleClass('open');
			}

			$(this).children().eq(0).toggleClass('fa-angle-down', 'fa-angle-up');
			return false;
		});

		$('.help-info a').on('click', function() {
			$(this).parent().find('.help-text').toggleClass('open');
			return false;
		});

		$('.help-text').on('click', function() {
			$(this).removeClass('open');
			return false;
		});
	});


})();


