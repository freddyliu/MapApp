var map;	//map object
var markersArray=[];	////for storing markers for referencing purpose

/*
 * create a map base on user input location, and then
 * add it to a specific container in the html file.
 */
function createMap(region, container){
	pos = new google.maps.LatLng(region.latitude,region.longtitude);
	map = new google.maps.Map(container, {
		mapTypeId: google.maps.MapTypeId.ROADMAP,	//the default map type
		zoom: 17,	//the default zoom level
		center: pos
	});
}

/*
 * draw a marker in the center of the search region
 */
function drawCenterMarker(region){
	var imageURL='http://jspace.com.au/gmap/img/markers/arrow.png';
	if(!markersArray[0] || makersArray[0].getIcon()!=imageURL){	
		pos = new google.maps.LatLng(region.latitude,region.longtitude);
		var marker = new google.maps.Marker({
			map: map,
			title: region.name,
			icon: imageURL,
			position: pos
		});
		markersArray.unshift(marker);
	}
}

/*
 * for a given result, draw a marker on the map
 * input: result - the result object, index - index of the result object in the result list
 */
function drawMarker(result, index){
	var imageURL='http://jspace.com.au/gmap/img/markers/marker'+(index+1)+'.png';
	pos = new google.maps.LatLng(result.location.lat,result.location.long);
	var marker = new google.maps.Marker({
		map: map,
		title: result.name,
		icon: imageURL,
		animation: google.maps.Animation.DROP,
		position: pos
	});	
	markersArray.push(marker);	//store the marker in the markersArray
}

/*
 * draw all markers on the map for a list of search results
 */ 
function drawAllMarkers(results){
	for(var i=0;i<results.length;i++){
		drawMarker(results[i],i);
	}
}

/*
 * Re-zoom the map to a suitable size which can show all markers
 * Note: default travel mode: driving
 */
function zoomToFit(){
	bounds = new google.maps.LatLngBounds ();
	for(var i=0;i<markersArray.length;i++){
		bounds.extend (markersArray[i].getPosition());
	}
	map.fitBounds (bounds);
}

/*
 * show a full itinerary which go through all the markers
 */
function showFullItinerary(results, itinerary){
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(getElementByID('result'));
	
	var start = markersArray[itinerary[0].reusltId+1].getPosition();
	var end = markersArray[itinerary[itinerary.length-1].resultId+1].getPosition();
	var waypoints = [];
	for(var i=1;i<itinerary.length-1;i++){
		var waypoint = {
			location:markersArray[itinerary[i].reusltId+1].getPosition(),
			stopover:true
		}
		waypoints.push(waypoint);
	}
	var request = {
		origin:start,
		destination:end,
		waypoints :waypoints,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}


