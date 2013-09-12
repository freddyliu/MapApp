/*
Search venues by AND/OR price, variety, type, size, open day, location made at, tour availability, tasting price, star rating.

ie. <<Element>> IS / ISN'T <<type/range>>

Search using ALL/ANY of the follwing rules

Open day IS sunday
Wine type IS semillon
price IS $10-$20

`price per bottle: "less than $10", "$10 - $20", "$21 - $30", "$31 - $40", "$41 - $50", "$51 - $60", "$61 - $70", "more than $70"
`variety: Blend, Cabernet Sauvignon, Chardonnay, Moscato, Pinot Noir, Riesling, Rose, Sauvignon Blanc, Semillon, Shiraz, Verdelho, Merlot, Other
`type: Dessert, Fortified, Sparkling, Red, White, Organic
`size: Micro, Small, Medium, Large
`Made at: Locally, Different location
`tour availability: Yes/No
`tasting price: Free/Paid
*/

var wineries = [
	{ 
		"id": 0,
		"name": "Hunterwine",
		"descriptionShort": "Best wine in Hunter Valley",
		"website": "www.hunterwine.com.au",
		"openDays": {
				"mon": "10:00-22:00",
				"tues": "10:00-22:00",
				"wed": "10:00-22:00"
		},
		"location": {			
				"address": "203 Hunter Rd, Hunter Valley NSW 2333 ",
				"region": "Hunter Valley",
				"lat": -32.656135,
				"lon": 151.351319			
		},
		"tourAvailability": "yes",
		"tastingPrice": "paid",
		"madeAt": {
			"local": undefined
		},
		"wineSize": {
			"small": undefined
		},
		"wineType": {
			"dessert": undefined, 
			"fortified": undefined,
			"sparkling": undefined
		},
		"wineVariety": {
			"blend": undefined, 
			"cabernet-sauvignon": undefined, 
			"chardonnay": undefined
		},
		"price": {
			"$10 - $20": undefined, 
			"$21 - $30": undefined, 
			"$31 - $40": undefined
		},
		"rating": 3
	},
	{ 
		"id": 1,
		"name": "Fred's Wine",
		"descriptionShort": "Best wine to get you drunk",
		"website": "www.blah.com.au",
		"openDays": {
				"thurs": "10:00-22:00",
				"fri": "10:00-22:00",
				"sat": "10:00-22:00",
				"sun": "10:00-22:00"	
		},
		"location": {			
				"address": "203 Hunter Rd, Hunter Valley NSW 2333 ",
				"region": "Hunter Valley",
				"lat": -32.656122,
				"lon": 151.331019			
		},
		"tourAvailability": "yes",
		"tastingPrice": "free",
		"madeAt": {
			"local": undefined
		},
		"wineSize": {
			"medium": undefined
		},
		"wineType": {
			"red": undefined, 
			"white": undefined
		},
		"wineVariety": {
			"semillon": undefined, 
			"shiraz": undefined
		},
		"price": {
			"$31 - $40": undefined
		},
		"rating": 3
	},
	{ 
		"id": 2,
		"name": "Jack's Wine",
		"descriptionShort": "Best wine to get you silly",
		"website": "www.asdfasdf.com.au",
		"openDays": {
				"fri": "10:00-22:00",
				"sat": "10:00-22:00",
				"sun": "10:00-22:00"	
		},
		"location": {			
				"address": "203 Hunter Rd, Hunter Valley NSW 2333 ",
				"region": "Hunter Valley",
				"lat": -32.756314,
				"lon": 151.351119			
		},
		"tourAvailability": "no",
		"tastingPrice": "paid",
		"madeAt": {
			"diff": undefined
		},
		"wineSize": {
			"large": undefined
		},
		"wineType": {
			"organic": undefined
		},
		"wineVariety": {
			"rose": undefined
		},
		"price": {
			"$10 - $20": undefined, 
			"$21 - $30": undefined, 
			"$31 - $40": undefined
		},
		"rating": 3
	}
];

//dummy region JSON data
var region ={
		'name' : 'Hunter Valley',
		'latitude' : -32.750020,
		'longtitude' : 151.266700
	};
	
var itinerary= [
	{
		'resultId': 0
	},
	{
		'resultId': 2
	}
];
