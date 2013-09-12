var region = region;
var map;	//map object
var markersArray=[];	//for storing markers for referencing purpose
var infoArray=[];
var results = wineries;
var itinerary = itinerary;
var mapContainer = document.getElementById('map')
var itineraryContainer = document.getElementById('itinerary');

/*
 * create a map base on user input location, and then
 * add it to a specific container in the html file.
 */
function createMap(){
	pos = new google.maps.LatLng(region.latitude,region.longtitude);
	map = new google.maps.Map(mapContainer, {
		mapTypeId: google.maps.MapTypeId.ROADMAP,	//the default map type
		zoom: 17,	//the default zoom level
		center: pos
	});
}

/*
 * draw a marker in the center of the search region
 */
function drawCenterMarker(){
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
	pos = new google.maps.LatLng(result.location.lat,result.location.lon);
	var marker = new google.maps.Marker({
		map: map,
		title: result.name,
		icon: imageURL,
		animation: google.maps.Animation.DROP,
		position: pos
	});	
	setMarkerInfo(marker,index);
	markersArray.push(marker);	//store the marker in the markersArray
}

/*
 * draw all markers on the map for a list of search results
 */ 
function drawAllMarkers(){
	for(var i=0;i<results.length;i++){
		drawMarker(results[i],i);
	}
}

function setMarkerInfo(marker,index){
		var info = new google.maps.InfoWindow();
		var content = results[index].name;
			content += '<br />Address: ' + results[index].location.address;
			info.setContent(content);
		infoArray.push(info);
		google.maps.event.addListener(marker, 'click', function(){ 
			clearInfo();
			info.open(map,this);
			map.setCenter(this.getPosition());	//Re-center the map
		});
	
}

/*
 * remove all markers from the map
 */ 
function clearMarkers() {
	if (markersArray){
		for(var i=1;i<markersArray.length;i++){
			markersArray[i].setMap(null);
		}
	}
}

function clearInfo(){
	if (infoArray) {
		for(var i=0;i<infoArray.length;i++){
			infoArray[i].close();
		}
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
 * input: results - result list, itinerary - itinerary list, container - the html container for displaying full itinerary information
 * returns DirectionRenderer object in the end
 */
function getFullItinerary(){
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(itineraryContainer);
	
	var start = markersArray[itinerary[0].resultId+1].getPosition();
	var end = markersArray[itinerary[itinerary.length-1].resultId+1].getPosition();
	var waypoints = [];
	for(var i=1;i<itinerary.length-1;i++){
		var waypoint = {
			location:markersArray[itinerary[i].resultId+1].getPosition(),
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
		}else{
			itineraryErrorHandler(status);
		}
	});
	return directionsDisplay;
}

/*
 * remove itinerary from the map
 */
function clearItinerary(){
	 getFullItinerary().setMap(null);
}

/*
 * itinerary request error handler
 */
function itineraryErrorHandler(status){
	switch(status){
		case google.maps.DirectionsStatus.NOT_FOUND:
			alert("At least one of the locations could not be found.");
		break;
		case google.maps.DirectionsStatus.ZERO_RESULTS:
			alert("No route could be found.");
		break;
		case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED:
			alert("Max waypoints (8) exceeded.");
		break;
		case google.maps.DirectionsStatus.INVALID_REQUEST:
			alert("Invalid request.");
		break;
		case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
			alert("Over query limit. Please wait for a while and try again.");
		break;
		case google.maps.DirectionsStatus.REQUEST_DENIED:
			alert("Your itinerary request has been denied.");
		break;
		case google.maps.DirectionsStatus.UNKNOWN_ERROR:
			alert("Unknown error.");
		break;
	}
}


