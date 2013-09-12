var region = region;	//the search region object
var map;	//map object
var markersArray=[];	//for storing markers for referencing purpose
var infoArray=[];	//for storing infowindows for referencing purpose
var results = wineries;		//search result array
var itinerary = itinerary;	//itinerary array
var directionsDisplay;
var mapContainer = document.getElementById('map')	//html container element for displaying map
var itineraryContainer = document.getElementById('itinerary_div');	//html container element for itinerary information

/*
 * create a map base on user input location, and then
 * add it to a specific container in the html file.
 */
function createMap(){
	if(!map){
		pos = new google.maps.LatLng(region.latitude,region.longtitude);
		map = new google.maps.Map(mapContainer, {
			mapTypeId: google.maps.MapTypeId.ROADMAP,	//the default map type
			zoom: 17,	//the default zoom level
			center: pos
		});
	}
}

/*
 * draw a marker in the center of the search region, and then
 * add it to the begining of the markersArray
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
	pos = new google.maps.LatLng(result.location.lat,result.location.long);
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

/*
 * add information window for a marker
 */ 
function setMarkerInfo(marker,index){
		var info = new google.maps.InfoWindow();
		//content which goes into each infowindow
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
 * hide all markers from the map
 */ 
function clearMarkers() {
	if (markersArray){
		for(var i=1;i<markersArray.length;i++){
			markersArray[i].setMap(null);
		}
	}
}

/*
 * destroy all markers in the markersArray EXCEPT the first one (center marker)
 */ 
function destroyMarkers() {
	clearMarkers();
	markersArray = [];
}
/*
 * hide all infowindows from the map
 */ 
function clearInfo(){
	if (infoArray) {
		for(var i=0;i<infoArray.length;i++){
			infoArray[i].close();
		}
	}
}

/*
 * destroy all infowindows in the infoArray
 */ 
function destroyInfo(){
	clearInfo();
	infoArray = [];
}

/*
 * Re-zoom the map to a suitable size which can show all markers
 * Note: default travel mode: driving
 */
function zoomToFit(){
	var bounds = new google.maps.LatLngBounds ();
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
	if(!itinerary || itinerary.length==0){
		//if the itinerary array is empty
		alert('There\'s nothing in your itinerary list yet.');
	}else if(itinerary.length==1){
		//if the itinerary array only have one item
		alert('There\'s only one item in your itnerary list.');
	}else{
		directionsDisplay = new google.maps.DirectionsRenderer({
			map: map,
		});
		var directionsService = new google.maps.DirectionsService();
		
		var start = results[itinerary[0]].location;
		start = new google.maps.LatLng(start.lat,start.long);
		var end = results[itinerary[itinerary.length-1]].location;
		end = new google.maps.LatLng(end.lat,end.long);
		var waypoints = [];
		for(var i=1;i<itinerary.length-1;i++){
			var loc = results[itinerary[i]].location;
			loc = new google.maps.LatLng(loc.lat,loc.long);
			var waypoint = {
				location:loc,
				stopover:true
			}
			waypoints.push(waypoint);
		}
		var request = {
			origin:start,
			destination:end,
			waypoints :waypoints,
			travelMode: google.maps.DirectionsTravelMode.DRIVING	//default travel method: driving
		};
		
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}else{
				itineraryErrorHandler(status);
			}
		});
	}
}

/*
 * show itinerary info in the 'itineraryContainer' html container
 */
function showItineraryInfo(){
	if(directionsDisplay){
		var html = '';
		html += '<div id="intinerary"><ul>Your Itinerary:';
		var letter = 'A';
		for(var i=0;i<itinerary.length;i++){
			html += '<li>'+letter+': '+results[itinerary[i]].name+'</li>';
			letter = String.fromCharCode(letter.charCodeAt(0) + 1);
		}
		html += '</ul></div>';
		
		itineraryContainer.innerHTML = html;
		directionsDisplay.setPanel(document.getElementById('intinerary'));
	}
}

/*
 * remove itinerary from the map
 */
function clearItinerary(){
	if(directionsDisplay){
		directionsDisplay.setMap(null);
	}
	itineraryContainer.innerHTML = '';
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


/*
 * adding the index of a winery in the result list to itinerary
 */
function addToItinerary(index){
	if(!inItinerary(index)){
		if(itinerary.length<10){
			itinerary.push(index);
		}else{
			alert('Max waypoints (8) exceeded.');
		}
	}else{
		alert('This is place is already in your itinerary.');
	}
}

/*
 * return true if the index of a winery in the result list is already in the itinerary
 */
function inItinerary(index){
	for(var i=0;i<itinerary.length;i++){
		if(itinerary[i]==index){
			return true;
		}
	}
	return false;
}

/*======================================================= app control =======================================================*/
function appShowAllMarkersOnMap(){
	createMap();
	destroyMarkers();
	destroyInfo();
	clearItinerary();
	drawCenterMarker();
	drawAllMarkers();
	zoomToFit();
}

function appShowIntinery(){
	createMap();
	clearItinerary();
	drawCenterMarker();
	destroyMarkers();
	getFullItinerary();
	showItineraryInfo();
}
/*======================================================= !app control =======================================================*/

