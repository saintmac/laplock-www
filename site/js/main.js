jQuery(document).ready(function($){
	//open the lateral panel
	$('.cd-btn').on('click', function(event){
		event.preventDefault();
		$('.cd-panel').addClass('is-visible');
	});
	//clode the lateral panel
	$('.cd-panel').on('click', function(event){
		if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) { 
			$('.cd-panel').removeClass('is-visible');
			event.preventDefault();
		}
	});

	//open mailing
	$('.mail').on('click', function(event){
		event.preventDefault();
		$('#footer').addClass('is-visible');
		$('.bg-hover').addClass('is-visible');
	});
	//clode mailing
	$('.bg-hover').on('click', function(event){
			
			$('#footer').removeClass('is-visible');
			$('.bg-hover').removeClass('is-visible');
			event.preventDefault();
			
	});
	setTimeout(function() {
		$('.mail').click()
	}, 15000);


});
