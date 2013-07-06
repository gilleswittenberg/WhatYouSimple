TestCase('cleanHtml', {
	'test removal of false elements': function () {
		var div = $('<div>');
		div.append('<p>', {'data-attr': 'd'});
		var r = $.whatYouSimple.cleanHtml(div.get(0));
		var a = $(r).find('[data-attr="*"]');
		var a2 = $(r).find('p');
		assertEquals('noo', a.length, 0);
		assertNotEquals('noo', a2.length, 0);
	}
});
