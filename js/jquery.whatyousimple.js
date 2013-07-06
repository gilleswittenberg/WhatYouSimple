(function ($) {
	$.fn.whatYouSimple = function (options) {

		var defaults = {
			controls: {
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
			div: {
				'class': 'whatyousimple'
			},
			cleanHtml: true
		};
		options = $.extend(true, defaults, options);

		return this.each(function () {
			var ul = $('<ul>');
			var menu = $('<menu>');
			var div;
			var wrapper = $('<div>', {'class': options.div['class']});

			$.each(options.controls, function(key, value) {
				var attributes = {'data-control': key, href: '', title: value.title, html: value.html};
				var a;
				var li = $('<li>');
				if(value['class']){
					attributes['class'] = value['class'];
				}
				a = $('<a></a>', attributes);
				a.click(clicked);
				li.append(a);
				ul.append(li);
			});

			menu.append(ul);

			div = $('<div>', {'class': 'textarea', contentEditable: true});
			div.html($(this).val());

			wrapper.append(menu);
			wrapper.append(div);

			$(this).replaceWith(wrapper);

			function clicked (e) {
				e.preventDefault();
				var control = $(this).attr('data-control');
				if (control === 'a') {
					var url = prompt(options.controls.a.message, 'http://');
					if (url) {
						document.execCommand('CreateLink', false, url);
					}
				}
				else{
					document.execCommand(options.controls[control].name, false, false);
				}
				if (options.cleanHtml) {
					$.whatYouSimple.cleanHtml(div);
				}
				return false;
			}
		});
	};

	$.whatYouSimple = {
		cleanHtml: function (elem, options) {
			var $elem, $html;
			var defaults = {
				//nodeTypes: ['b', 'i', 'u', 'strike', 'div', 'p'],
				whitelist: {
					attr: ['href'],
					style: ['font-weight:bold;', 'text-decoration:underline;']
				}
			};
			options = $.extend(true, defaults, options);

			function getAllowedStyles (styleStr) {
				var l, i, matches, regex, retArr;
				styleStr.replace(/\s/g, '');
				l = options.whitelist.style.length;
				for (i = 0; i < l; i++) {
					regex = whitelist.style[i];
					matches = styleStr.match(regex);
					if (matches.length > 0) {
						console.log(matches);
						retArr.push(matches[0]);
					}
				}
				return retArr.join(' ');
			}

			function cleanElem (elem) {
				var attr;
				var whitelist = ['href'];
				var $elem = $(elem);
				var attributes = elem.attributes;
				var i = attributes.length;
				while (i--) {
					attr = attributes[i];
					if ($.inArray(attr.name, whitelist) === -1) {
						if (attr.name === 'style') {
							$elem.attr('style', getAllowedStyles($elem.attr('style')));
						}
						$elem.removeAttr(attr.name);
					}
				}
			}

			function clean (elem) {
				cleanElem(elem);
				$.each($(elem).children(), function () {
					clean(this);
				});
			}

			$elem = $(elem);
			//console.log($elem);
			$html = $($elem.html());
			console.log($html);
			$.each($html, function () {
				clean(this);
			});
			$elem.html($html);
			return $html;
		}
	};
}(jQuery));
