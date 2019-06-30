exports.trip = function(app, pool) {

	app.get('/campingtrips', getTrips);

	function getTrips(req, res) {

		const loc = req.query.location;

		console.log("this is exports is working: " + loc);

		getTripBasicInfo(loc, function (err, response) {
			console.log("This is still working. " + loc);
			// body...

			if (err || response == null) {
				console.log("getInfoFromDb broke: " + err);
			}
			else {

				console.log("I get to the end" + JSON.stringify(response));

				//res.status(200).json(response);
				res.send(JSON.stringify(response));

			}


		});

	}

	function getTripBasicInfo(loc, callback) {
		// body...
		console.log("This is in getTripBasicInfo: " + loc);

		var sql = "SELECT id, location, startDate, endDate FROM trips WHERE location = $1";

		var param = [loc];

		pool.query(sql, param, function(err, res) {

			if(err) {
				console.log("Something broke", err);
				callback(err, null);
			}

			callback(null, res.rows)

		});
	}
}