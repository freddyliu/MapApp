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