// ajaxify
// version 0.0.1
// (c) 2014 Dominik Deobald <http://www.deobald.org>
// released under the MIT license

function ajaxify(element) {
	if (!history.pushState) return false; // Will not work, so fall back to default

	var self = this;

	console.log(this);

	element = element || document.body;

	$(element).on('click', '[data-ajaxlink] a,a[data-ajaxlink]', function(e) {
		e.preventDefault();
		self.call( $(this).attr('href') );
	});

	$(element).on('submit', 'form[data-ajaxform]', function(e) {
		e.preventDefault();
		self.call( $(this).attr('action'), $(this).attr('method'), $(this).serializeArray() );
	});

	var pushstate = function(state, title, url) {
		history.pushState(state, title, url);
	}

	var refreshContent = function(data) {
		var $res = $('<div>').html(data);

		$res.find('[data-ajaxified]').each(function() {
			var $element = $(this);
			var ajaxified_handle = $element.data('ajaxified');

			$('[data-ajaxified=' + ajaxified_handle + ']').replaceWith($element);
		});

		var $title = $res.find('title:first');
		if ($title.length) document.title = $title.text();
		return $res;
	}

	$(window).on('popstate', function(e, f) {
		var oldstate = e.originalEvent.state;
		if (oldstate && oldstate.href) {
			refreshContent(oldstate.data);
		}
	});

	self.call = function(href, method, data, toolRequest) {
		method = (method == 'POST') ? method : 'GET';
		data = data || {};
		toolRequest = toolRequest || false;

		var state = {};

		$('[data-ajaxified]').each(function() {
			var $this = $(this);
			var key = $(this).data('ajaxified');
			var version = $(this).data('ajaxifystate');
			if (key && version) state[key] = version;
		});
		
		$.ajax({
			'url': href,
			'type': method,
			'headers': {
				'X-Ajaxify': JSON.stringify(state)
			},
			'data': data,
			'complete': function(x,t) {
				// Completed
			},
			'error': function() {
				// Error
			},
			'dataType': 'html',
			'success': function(d) {
				var $res = refreshContent(d);
				if (!toolRequest) {
//					console.log(
					if (method.toLowerCase() == 'get' && data.length > 0) {
						var ioq = href.indexOf('?');
						if (ioq != -1) href = href.substr(0, ioq - 1);
						href += '?' + $.param(data);
					}
					pushstate({'href':href, 'data':d}, null, href);
				}
			}
		})
	};


	return true;
}

ajaxify();

