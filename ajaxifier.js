function ajaxify(element) {
	if (!history.pushState) return false; // Will not work, so fall back to default

	var self = this;

	console.log(this);

	element = element || document.body;

	$(element).on('click', '[data-ajaxlinks] a,a[data-ajaxlinks]', function(e) {
		e.preventDefault();
		self.call( $(this).attr('href') );
	});

	var pushstate = function(state, title, url) {
		history.pushState(state, title, url);
	}

	var refreshContent = function(data) {
		var $res = $('<html>').html(data);
		$res.find('[data-ajaxified]').each(function() {
			var $element = $(this);
			var ajaxified_handle = $element.data('ajaxified');

			$('[data-ajaxified=' + ajaxified_handle + ']').replaceWith($element);
		});

		var $title = $res.find('head title');
		console.log($title);
		if ($title.length > 0) {
			$('head title').text($title.text());
		}
		return $res;
	}

	$(window).on('popstate', function(e, f) {
		var oldstate = e.originalEvent.state;
		if (oldstate.href) {
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
					pushstate({'href':href, 'data':d}, '', href);
				}
			}
		})
	};


	return true;
}

ajaxify();

