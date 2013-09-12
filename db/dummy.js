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
		"name": "Hunterwine",
		"descriptionShort": "Best wine in Hunter Valley",
		"website": "www.hunterwine.com.au",
		"openDays": [
			{
				"mon": "10:00-22:00",
				"tues": "10:00-22:00",
				"wed": "10:00-22:00",
				"thurs": "10:00-22:00",
				"fri": "10:00-22:00",
				"sat": "10:00-22:00",
				"sun": "10:00-22:00"	
			}
		],
		"location": [
			{
				"address": "hv road 2",
				"region": "Hunter Valley"
			}
		],
		"tourAvailability": "Yes",
		"tastingPrice": "Paid",
		"madeAt": [
			"Locally", "Different Location"
		],
		"wineSize": [
			"Small", "Medium"
		],
		"wineType": [
			"Dessert", "Fortified", "Sparkling"
		],
		"wineVariety": [
			"Blend", "Cabernet Sauvignon", "Chardonnay"
		],
		"price": [
			"$10 - $20", "$21 - $30", "$31 - $40"
		],
		"rating": 3
	}
];