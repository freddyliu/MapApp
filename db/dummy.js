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
				"wed": "10:00-22:00",
				"thurs": "10:00-22:00",
				"fri": "10:00-22:00",
				"sat": "10:00-22:00",
				"sun": "10:00-22:00"
		},
		"location": {			
				"address": "203 Hunter Rd, Hunter Valley NSW 2333",
				"region": "Hunter Valley",
				"lat": -32.656135,
				"long": 151.351019			
		},
		"tourAvailability": "yes",
		"tastingPrice": "paid",
		"madeAt": "local",
		"wineSize": {
			"micro": undefined,
			"small": true,
			"medium": true,
			"large": undefined	
		},
		"wineType": {			
			"dessert": true,
			"fortified": true,
			"sparkling": true,
			"red": true,
			"white": undefined,
			"organic": undefined
		},
		"wineVariety": {
			"blend": true,
			"cabernet sauvignon": true,
			"chardonnay": true,
			"moscato": undefined,
			"pinot noir": undefined,
			"riesling": undefined,
			"rose": undefined,
			"sauvignon blanc": true,
			"semillon": undefined,
			"shiraz": true,
			"verdelho": undefined,
			"merlot": undefined,
			"other": undefined
		},
		"price": "$10 - $20",
		"rating": 3
	},
];

//dummy region JSON data
var region ={
		'name' : 'Hunter Valley',
		'latitude' : -32.700000,
		'longtitude' : 151.266700
<<<<<<< HEAD
	};
	
var itinerary= [
	{
		'resultId': 0
	},
	{
		'resultId': 2
	}
];
=======
	};
>>>>>>> changed data again, output is now able to output henry's preferred format
