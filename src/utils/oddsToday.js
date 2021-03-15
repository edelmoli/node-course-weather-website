const http = require("https");


const oddsToday = (team, callback) => {

    console.log('begining oddsToday')

    var nowDate = new Date(); 
    var monthRequest =(nowDate.getMonth()+1)
    var dayRequest =(nowDate.getDate())

    if (monthRequest < 10) {
	    monthRequest = '0' + monthRequest
    }

    if (dayRequest < 10) {
	    dayhRequest = '0' + dayRequest
    }

    const dateRequest = nowDate.getFullYear()+'-'+ monthRequest +'-'+dayRequest; 

    const listMatches = []

    const path_date = "/api/v2/predictions?iso_date=" + dateRequest + "&market=classic&federation=UEFA"

    const options = {
        "method": "GET",
        "hostname": "football-prediction-api.p.rapidapi.com",
        "port": null,
        // "path": "/api/v2/predictions?iso_date=2021-03-11&market=classic&federation=UEFA",
        "path": path_date,
        "headers": {
            "x-rapidapi-key": "5e85f13e39msh1e2d88e0a05ba6bp131988jsn4d4346a8ed6f",
            "x-rapidapi-host": "football-prediction-api.p.rapidapi.com",
            "useQueryString": true
        }
    };

    const req = http.request(options, function (res) {
	    const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            // console.log(body.toString());
            const body_data = body.toString();
        
            const data1 = JSON.parse(body_data);
            if (data1.message) {
                return callback (data1.message)
            }
            // console.log('data : ' + data1.data[0].home_team);
            // console.log('body_data : ' + body_data);


	
            // const matches = data1.data.find((match) => match.home_team === 'Sporting Covilha')
            data1.data.forEach((element) => {
                if (element.home_team===team || element.away_team===team || !team) {
                    listMatches.push({
                        homeTeam: element.home_team,
                        awayTeam: element.away_team,
                        startDateTime: element.start_date,
                        result: element.result,
                        odd: JSON.stringify(element.odds)})

                    console.log(element.home_team + '   vs  ' + element.away_team + '  odds:  ' + element.odds.toString() + ' today starts at: ' + element.start_date + '  result:  ' + element.result)
                    
                    console.log('odds : ' + JSON.stringify(element.odds))
                    
                } 
            });

            if (listMatches.length>0) {
                callback (undefined, listMatches)
            } else {
                callback ('no matches found')
            }
            console.log(listMatches)
		// console.log('data example : ' + matches);
		// if (matches) {
		  
		//    console.log('Note not added because it is already in the list')
		// }


	    });
    });

    req.end();

// Estabas corriendo node app1.js desde el folder /note-app, no desde /weather-app
// El codigo de arriba funciona pero esto es con axios:


// const axios = require("axios")

// const url = "http://football-prediction-api.p.rapidapi.com/api/v2/predictions?iso_date=2020-11-21&market=classic&federation=UEFA"

// axios.get(url, {
//     headers: {
//       "x-rapidapi-key": "5e85f13e39msh1e2d88e0a05ba6bp131988jsn4d4346a8ed6f",
//       "x-rapidapi-host": "football-prediction-api.p.rapidapi.com",
//       useQueryString: true,
//     },
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });


}


module.exports = oddsToday