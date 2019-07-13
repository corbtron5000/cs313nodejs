exports.updateTrips = function(app, pool) {

	app.get("/updateTrips", updateTrip);

	function updateTrip(req, res) {

		const query = req.query;
		console.log("This is the query location: " + query.location);

		updateSelectedTrip(query.packing, query.location, query.prepare, query.itinerary, query.goal, query.start, query.end, query.camper, query.id, function(err, response) {


			if (err || response == null) {
				console.log("storeTripInfo broke: " + err);
			}
			else {

				console.log("I get to the end" + JSON.stringify(response));

				res.send(JSON.stringify(response));

			}
		});
	}

	function updateSelectedTrip(packing, loc, prepare, itinerary, goal, start, end, campers, id, callback) {
		console.log("packing: " + packing);
		console.log("location: " + loc);
		console.log("prepared: " + prepare);
		console.log("itinerary: " + itinerary);
		console.log("goals: " + goal);
		console.log("startDate: " + start);
		console.log("endDate: " + end);
		console.log("campers: " + campers);
		console.log("id: " + id);

		var sql = "UPDATE trips SET packingList=($1), location=($2), preparedList=($3), itinerary=($4), goals=($5), startDate=($6), endDate=($7), campers=($8) WHERE id=($9)";

		var param = [packing, loc, prepare, itinerary, goal, start, end, campers, id];

		pool.query(sql, param, function(err, res) {

			if(err) {
				console.log("Something new broke", err);
				callback(err, null);
			}

			callback(null, res)
		});
	}
}