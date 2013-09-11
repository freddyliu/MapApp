/*
List all venues that meet the criteria.
This should include the name, a short description.
When this is clicked on more details should be expanded.

This should include website, address, open hours/days, wine types, star rating.
When clicked on again, collapse 

*/

var wineries = [
	{ 
		"name": "Hunterwine",
		"descriptionShort": "Best wine in Hunter Valley",
		"website": "www.hunterwine.com.au",
		"openHours": [
				{
					"monFri": "10:00-22:00",
					"sat":	"11:00-23:00"
				}
		],
		"location": [
				{
					"address": "hv road 2",
					"region": "Hunter Valley"
				}
		],
		"wine": "white red",
		"rating": 3
	},
	{
		"name": "Sydney Empire",
		"descriptionShort": "Sydney's King of Wines",
		"website": "www.sydneyempirewine.com.au",
		"openHours": [
				{
					"monFri": "10:00-22:00",
					"sat":	"11:00-23:00"
				}
		],
		"location": [
				{
					"address": "William Street",
					"region": "Sydney"
				}
		],
		"wine": "red",
		"rating": 3
	},
	{
		"name": "Freddy Intern",
		"descriptionShort": "Intern wine, nice stuff",
		"website": "www.internwine.com.au",
		"openHours": [
				{
					"monFri": "10:00-22:00",
					"sat":	"11:00-23:00"
				}
		],
		"location": [
				{
					"address": "Hurstville way",
					"region": "Hurstville"
				}
		],
		"wine": "white",
		"rating": 3
	},
	{
		"name": "Jack Intern",
		"descriptionShort": "Intern wine, nice stuff",
		"website": "www.internwine.com.au",
		"openHours": [
				{
					"monFri": "10:00-22:00",
					"sat":	"11:00-23:00"
				}
		],
		"location": [
				{
					"address": "Eastwood way",
					"region": "Eastwood"
				}
		],
		"wine": "white",
		"rating": 3
	},
	{
		"name": "Henry Wine",
		"descriptionShort": "Intern wine, nice stuff",
		"website": "www.internwine.com.au",
		"openHours": [
				{
					"monFri": "10:00-22:00",
					"sat":	"11:00-23:00"
				}
		],
		"location": [
				{
					"address": "Maroubra Road",
					"region": "Maroubra"
				}
		],
		"wine": "white red",
		"rating": 3
	}
];

	if (Modernizr.draganddrop) {
		var dragDrop = true;
	} else {
		var dragDrop = false;
	}	
	
		
	function load() {
		$('#results').html("");	
		for (var i = 0; i < wineries.length; i++) {
			var html = '<li class="panel panel-default" draggable="true" id="panel-'+i+'">';
			html += '<div class="panel-heading">';
			html += '<h2 class="panel-title">';
			html += '<span class="pull-right">' + '<button id="'+i+'" type="button" class="saveBtn btn btn-small btn-success"><i class="icon-plus-sign"></i> Add to Itinerary</button>' + '</span>';
			html += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#results" href="#collapse-'+i+'">';
			html += '<h2> '+ wineries[i].name + '</h2>' + wineries[i].descriptionShort;			
			
			html += '</a>';
			html += '</h2>';
			html += '</div>'
			html += '<div id="collapse-'+i+'" class="panel-collapse collapse">';
			html += '<div class="panel-body">';
			
			html += '<button id="showOnMap-'+i+'" type="button" class="showOnMap btn btn-small btn-primary pull-right">';
			html += '<i class="icon-map-marker"></i> Show on Map</button>';
			
			html += wineries[i].name + '<br>';
			html += wineries[i].website + '<br>';
			html += 'Address: ' + wineries[i].location[0].address + '<br>';
			html += 'Region: ' + wineries[i].location[0].region + '<br>';
			
			html += 'Opening hours (Mon-Fri): ' + wineries[i].openHours[0].monFri + '<br>';
			html += 'Opening hours (Sat): ' + wineries[i].openHours[0].sat + '<br>';
			
			html += 'Wine: ' + wineries[i].wine + '<br>';
			html += 'Rating: ' + wineries[i].rating + '<br>';
			
			
			html += '</div></div></li>';		
			$('#results').append(html);
		}
		$('.saveBtn').on('click', function(event) {
			alert($(this).attr('id'));
		});
		
	}