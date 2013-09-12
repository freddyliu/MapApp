/*
List all venues that meet the criteria.
This should include the name, a short description.
When this is clicked on more details should be expanded.

This should include website, address, open hours/days, wine types, star rating.
When clicked on again, collapse 

*/
	var region = '';
	var itinerary = [];
	var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	
	function setCookie(name,value,exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=name + "=" + value;
	}
	
	function getCookie(name) {
		var value = document.cookie;
		var start = value.indexOf(" " + name + "=");
		if (start == -1) {
			start = value.indexOf(name + "=");
		}
		if (start == -1) {
			value = null;
		} else {
			start = value.indexOf("=", start) + 1;
			var end = value.indexOf(";", start);
			if (end == -1) {
				end = value.length;
			}
			value = unescape(value.substring(start,end));
		}
		return value;
	}
	
	$.fn.stars = function() {	
		return $(this).each(function() {
			// Get the value
			var val = parseFloat($(this).html());
			// Make sure that the value is in 0 - 5 range, multiply to get width
			val = Math.round(val * 2) / 2; /* To round to nearest half */
			var size = Math.max(0, (Math.min(5, val))) * 16;
			// Create stars holder
			var $span = $('<span />').width(size);
			// Replace the numerical value with stars
			$(this).html($span);
		});
	}

	function loadResults(wineries, mode) {
		$('#results').html("");
		for (var i = 0; i < wineries.length; i++) {
			if (mode == 'searchResults') {
				var index = (i+1) + '. ';
			} else if (mode == 'itinerary') {
				var index = alphabet[i] + '. ';
			}
			
			var html = '<li class="panel panel-default" draggable="true" id="panel-'+i+'">';
			html += '<div class="panel-heading">';
			html += '<h3 class="panel-title">';
			
			if (mode == 'searchResults') {
				html += '<span class="pull-right">' + '<button id="add-'+i+'" type="button" class="addBtn btn btn-small btn-success"><i class="icon-plus-sign"></i> Add to Itinerary</button>' + '</span>';
			} else if (mode == 'itinerary') {
				html += '<span class="pull-right">' + '<button id="remove-'+i+'" type="button" class="removeBtn btn btn-small btn-danger"><i class="icon-remove-sign"></i> Remove from Itinerary</button>' + '</span>';
			}
			
			html += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#results" href="#collapse-'+i+'">';
			html += '<h3>' + index + ' ' + wineries[i].name + '</h3>' + wineries[i].descriptionShort;
			html += '</a>';
			html += '</h3>';
			html += '</div>'
			html += '<div id="collapse-'+i+'" class="panel-collapse collapse">';
			html += '<div class="panel-body">';			
			html += '<button id="showOnMap-'+i+'" type="button" class="showOnMap btn btn-small btn-primary pull-right">';
			html += '<i class="icon-map-marker"></i> Show on Map</button>';			
			//html += '<strong>' + wineries[i].name + '</strong><br>';
			html += '<a href="http://'+wineries[i].website+'" target="_blank"><i class="icon-globe icon-small"></i> ' + wineries[i].website + '</a><br>';
			
			html += '<strong>Wine Varieties: </strong>';
			//html += wineries[i].wineVariety['blend'];
			for (var x in wineries[i].wineVariety) {
				if (wineries[i].wineVariety[x]) { html += x + ' '; } //wineVariety is eg "blend" : true, "chardonnay": undefined
			}
			html += '<br>';
			html += '<strong>Wine Types: </strong>';
			for (var x in wineries[i].wineType) {
				if (wineries[i].wineType[x]) { html += x + ' '; } //wineType is eg "dessert" : true, "white" : undefined
			}
			html += '<br>';
			html += '<strong>Wine Sizes: </strong>';
			for (var x in wineries[i].wineSize) {
				if (wineries[i].wineSize[x]) { html += x + ' '; } //wineSize is eg "micro" : true, "medium" : undefined
			}
			
			html += '<br>';
			html += '<strong>Prices: </strong>' + wineries[i].price + '<br>';			
			html += '<strong>Rating: </strong><span class="stars">'+wineries[i].rating+'</span><br>';			
			html += '<strong>Tour Available:</strong> '+wineries[i].tourAvailability+'<br>';
			html += '<strong>Tasting Price:</strong> '+wineries[i].tastingPrice+'<br>';
			
			html += '<strong>Address:</strong> ' + wineries[i].location.address + '<br>';
			html += '<strong>Region:</strong> ' + wineries[i].location.region + '<br>';		
			
			html += '<strong><i class="icon-time icon-small"></i> Opening Hours:</strong><br>';
			html += '<strong>Mon:</strong> '+wineries[i].openDays.mon+'<br>';
			html += '<strong>Tues:</strong> '+wineries[i].openDays.tues+'<br>';
			html += '<strong>Wed:</strong> '+wineries[i].openDays.wed+'<br>';
			html += '<strong>Thurs:</strong> '+wineries[i].openDays.thurs+'<br>';
			html += '<strong>Fri:</strong> '+wineries[i].openDays.fri+'<br>';
			html += '<strong>Sat:</strong> '+wineries[i].openDays.sat+'<br>';
			html += '<strong>Sun:</strong> '+wineries[i].openDays.sun+'<br>';		
			html += '</div></div></li>';		
			$('#results').append(html);
		}
		if (mode == 'searchResults') {
			$('.addBtn').on('click', function(event) {
				var i = $(this).attr('id').split('-');
				i = i[1];
				itinerary.push(wineries[i]);
				console.log(wineries[i]);
				console.log(itinerary);
				//alert(i[0] + '-' + i[1]);
			});
		} else if (mode == 'itinerary') {
			$('#results').sortable();
        	//$('#results').disableSelection();
			$('.removeBtn').on('click', function(event) {
				var i = $(this).attr('id').split('-');
				i = i[1];
				$('#panel-'+i).hide('slow', function(event) {
					('#panel-'+i).remove();
				});
				$('#results').html('Empty! <a href="freddy-229.html">Search again?</a>');
			});
		}
		$(function() {
			$('span.stars').stars();
		});
	}