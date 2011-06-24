(function($) {
	
	$.fn.whatYouSimple = function(options) {
		
		var defaults = {controls: {
							b: {name: 'Bold', title: 'Bold', html: '<b>b</b>', 'class': false},
							i: {name: 'Italic', title: 'Italic', html: '<i>i</i>', 'class': false},
							u: {name: 'Underline', title: 'Underlined', html: '<u>u</u>', 'class': false},
							del: {name: 'StrikeThrough', title: 'Strike Through', html: '<del>s</del>', 'class': false},
							a: {name: 'CreateLink', title: 'Create Link', html: '<b>a</b>', 'class': false, message: 'URL'},
							unlink: {name: 'Unlink', title: 'Remove	Link', html: '<b><del>a</del></b>', 'class': false},
							sub: {name: 'Subscript', title: 'SubScript', html: '<sub>s</sub>', 'class': false},
							sup: {name: 'Superscript', title: 'SuperScript', html: '<sup>s</sup>', 'class': false},
							hr: {name: 'InsertHorizontalRule', title: 'Horizontal Rule', html: '_', 'class': false},
							undo: {name: 'Undo', title: 'Undo', html: '&larr;', 'class': false},
							redo: {name: 'Redo', title: 'Redo', html: '&rarr;', 'class': false}
							},
						div: {'class': 'whatyousimple'}
						};
		
		options = $.extend(true, defaults, options);
		
		return this.each( function() {
			
			var wrapper = $('<div>', {'class': options.div['class']});
			var menu = $('<menu>');
			var ul = $('<ul>');
			
			$.each(options.controls, function(key, value) {
				var li = $('<li>');
				var attributes = {'data-control': key, href: '', title: value.title, html: value.html};
				if(value['class']){
					attributes['class'] = value['class'];
				}
				var a = $('<a></a>', attributes);
				a.click(clicked);
				li.append(a);
				ul.append(li);
			});
			
			menu.append(ul);
			
			var div = $('<div>', {'class': 'textarea', contentEditable: true});
			div.html($(this).val());
			
			wrapper.append(menu);
			wrapper.append(div);
			
			$(this).replaceWith(wrapper);
				
			function clicked(e){
				
				e.preventDefault();
				
				control = $(this).attr('data-control');

				if(control == 'a'){
					
					var url = prompt(options.controls.a.message, 'http://');
		
					if(url){
						document.execCommand('CreateLink', false, url);
					}
				}
				else{
					document.execCommand(options.controls[control].name, false, false);
				}
			}
		});
	};
	
})(jQuery);
