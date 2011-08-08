$('textarea').whatYouSimple();

var div = $('div.textarea');
var pre = $('pre');

function display(){
	var html = htmlentities(div.html());
	pre.html(html);	
}

$('menu a').click(display);
