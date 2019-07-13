exports.addTrips = function(app, pool) {

	app.get('/addTrips', newTrip);

	function newTrip(req, res) {

		const query = req.query;
		console.log("this is exports is working: " + query.location);

		storeTripInfo(query.packing, query.location, query.prepare, query.itinerary, query.goal, query.start, query.end, query.camper, function(err, response) {


			if (err || response == null) {
				console.log("storeTripInfo broke: " + err);
			}
			else {

				console.log("I get to the end" + JSON.stringify(response));

				res.send(JSON.stringify(response));

			}
		});
	}


	function storeTripInfo(packing, loc, prepare, itinerary, goal, start, end, campers, callback) {
		// body...
		console.log("packing: " + packing);
		console.log("location: " + loc);
		console.log("prepared: " + prepare);
		console.log("itinerary: " + itinerary);
		console.log("goals: " + goal);
		console.log("startDate: " + start);
		console.log("endDate: " + end);
		console.log("campers: " + campers);

		var sql = "INSERT INTO trips (packingList, location, preparedList, itinerary, goals, startDate, endDate, campers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

		var param = [packing, loc, prepare, itinerary, goal, start, end, campers]

		pool.query(sql, param, function(err, res) {

			if(err) {
				console.log("Something broke", err);
				callback(err, null);
			}

			callback(null, res)
		});
	}
}