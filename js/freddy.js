/*
List all venues that meet the criteria.
This should include the name, a short description.
When this is clicked on more details should be expanded.

This should include website, address, open hours/days, wine types, star rating.
When clicked on again, collapse 

*/
	function loadResults(mode) {
		$('#results').html("");	
		for (var i = 0; i < wineries.length; i++) {
			var html = '<li class="panel panel-default" draggable="true" id="panel-'+i+'">';
			html += '<div class="panel-heading">';
			html += '<h2 class="panel-title">';
			
			if (mode == 'searchResults') {
				html += '<span class="pull-right">' + '<button id="add-'+i+'" type="button" class="addBtn btn btn-small btn-success"><i class="icon-plus-sign"></i> Add to Itinerary</button>' + '</span>';
			} else if (mode == 'itinerary') {
				html += '<span class="pull-right">' + '<button id="remove-'+i+'" type="button" class="removeBtn btn btn-small btn-danger"><i class="icon-remove-sign"></i> Remove from Itinerary</button>' + '</span>';
			}
			
			html += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#results" href="#collapse-'+i+'">';
			html += '<h2> '+ wineries[i].name + '</h2>' + wineries[i].descriptionShort;			
			html += '</a>';
			html += '</h2>';
			html += '</div>'
			html += '<div id="collapse-'+i+'" class="panel-collapse collapse">';
			html += '<div class="panel-body">';			
			html += '<button id="showOnMap-'+i+'" type="button" class="showOnMap btn btn-small btn-primary pull-right">';
			html += '<i class="icon-map-marker"></i> Show on Map</button>';			
			//html += '<strong>' + wineries[i].name + '</strong><br>';
			html += '<i class="icon-globe icon-small"></i> ' + wineries[i].website + '<br>';
			
			html += '<strong>Tour Available:</strong> '+wineries[i].tourAvailability+'<br>';
			html += '<strong>Tour Available:</strong> '+wineries[i].tourAvailability+'<br>';
			
			html += '<strong>Address:</strong> ' + wineries[i].location.address + '<br>';
			html += '<strong>Region:</strong> ' + wineries[i].location.region + '<br>';		
			
			html += '<strong><i class="icon-time icon-small"></i> Opening Hours:</strong><br>';
			html += '<strong>Mon:</strong> '+wineries[i].openDays[0].mon+'<br>';
			html += '<strong>Tues:</strong> '+wineries[i].openDays[0].tues+'<br>';
			html += '<strong>Wed:</strong> '+wineries[i].openDays[0].wed+'<br>';
			html += '<strong>Thurs:</strong> '+wineries[i].openDays[0].thurs+'<br>';
			html += '<strong>Fri:</strong> '+wineries[i].openDays[0].fri+'<br>';
			html += '<strong>Sat:</strong> '+wineries[i].openDays[0].sat+'<br>';
			html += '<strong>Sun:</strong> '+wineries[i].openDays[0].sun+'<br>';		
			html += '</div></div></li>';		
			$('#results').append(html);
		}
		if (mode == 'searchResults') {
			$('.addBtn').on('click', function(event) {
				alert($(this).attr('id'));
			});
		} else if (mode == 'itinerary') {
			$('#results').sortable();
        	$('#results').disableSelection();
			$('.removeBtn').on('click', function(event) {
				var i = $(this).attr('id').split('-');
				
				$('#panel-'+i[1]).hide('slow', function(){ ('#panel-'+i[1]).remove(); });
			});
		}
	}