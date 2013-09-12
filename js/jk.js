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

function drawCenterMarker(region){
	var imageURL='http://jspace.com.au/gmap/img/markers/arrow.png';
		
	if(!markersArray[0] || makersArray[0].getTitle()!=region.name){	
		pos = new google.maps.LatLng(region.latitude,region.longtitude);
		var marker = new google.maps.Marker({
			map: map,
			title: region.name,
			icon: 'http://jspace.com.au/gmap/img/markers/arrow.png',
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
	var imageURL='http://jspace.com.au/gmap/img/markers/marker'+index+'.png';
	var marker = new google.maps.Marker({
		map: map,
		title: place.name,
		icon: image,
		animation: google.maps.Animation.DROP,
		position: place.geometry.location
	});
	
	markersArray.push(marker);	//store the marker in the markersArray
}

/*
 * Re-zoom the map to a suitable size which can show all markers
 */
function zoomToFit(){
	bounds = new google.maps.LatLngBounds ();

	for(var i=0;i<markersArray.length;i++){
		bounds.extend (markersArray[i].getPosition());
	}
	map.fitBounds (bounds);
}


