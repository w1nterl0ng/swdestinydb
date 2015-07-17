(function app_tip(tip, $) {

var cards_zoom_regexp = /card\/(\d\d\d\d\d)$/;

function display_card_on_element(card, element, event) {

	var image = card.imagesrc && card.type_code !== "plot" ? '<div class="card-thumbnail card-thumbnail-3x card-thumbnail-'+card.type_code+'" style="background-image:url('+card.imagesrc+')"></div>' : "";
	
	var content = image
	+ '<h4 class="card-name">' + app.format.name(card) + '</h4>' 
	+ '<div class="card-info">' + app.format.info(card) + '</div>' 
	+ '<div class="card-traits">' + app.format.traits(card) + '</div>'
	+ '<div class="card-text">' + app.format.text(card) + '</div>'
	+ '<p class="card-faction" style="text-align:right;clear:right">' + app.format.pack_faction(card) + '</p>';
	
	$(element).qtip(
			{
				content : {
					text : content
				},
				style : {
					classes : 'qtip-bootstrap qtip-agot2db card-content'
				},
				position : {
					my : 'left center',
					at : 'right center',
					viewport : $(window)
				},
				show : {
					event : event.type,
					ready : true,
					solo : true
				}/*,
				hide : {
					event: 'unfocus'
				}*/
			}, event);
}
	
/**
 * @memberOf tip
 * @param event
 */
tip.display = function display(event) {
	var code = $(this).data('code');
	var card = app.data.cards.findById(code);
	if (!card) return;
	display_card_on_element(card, this, event);
};

/**
 * @memberOf tip
 * @param event
 */
tip.guess = function guess(event) {
	var href = $(this).attr('href');
	if(href.match(cards_zoom_regexp)) {
		var code = RegExp.$1;
		var generated_url = Routing.generate('cards_zoom', {card_code:code});
		var card = app.data.cards.findById(code);
		if(card && href === generated_url) {
			display_card_on_element(card, this, event);
		}
	}
}

$(function() {

	if(!Modernizr.touch) {
		$('body').on({
			mouseover : tip.display,
			focus : tip.display
		}, 'a.card-tip');
		
		$('body').on({
			mouseover : tip.guess,
			focus : tip.guess
		}, 'a:not(.card-tip)');
	}

});

})(app.tip = {}, jQuery);
