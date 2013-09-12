/*
List all venues that meet the criteria.
This should include the name, a short description.
When this is clicked on more details should be expanded.

This should include website, address, open hours/days, wine types, star rating.
When clicked on again, collapse 

*/
	var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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

	function loadResults(mode) {
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
			
			html += '<strong>Wine Varieties: </strong>' + wineries[i].wineVariety + '<br>';
			html += '<strong>Wine Types: </strong>' + wineries[i].wineType + '<br>';
			html += '<strong>Wine Sizes: </strong>' + wineries[i].wineSize + '<br>';
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
				alert(i[0] + '-' + i[1]);
			});
		} else if (mode == 'itinerary') {
			$('#results').sortable();
        	//$('#results').disableSelection();
			$('.removeBtn').on('click', function(event) {
				var i = $(this).attr('id').split('-');				
				$('#panel-'+i[1]).hide('slow', function(){ ('#panel-'+i[1]).remove(); });
			});
		}
		$(function() {
			$('span.stars').stars();
		});
	}