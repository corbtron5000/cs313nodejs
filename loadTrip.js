exports.loadTrip = function(app, pool) {

	app.get("/loadTrip", loadSelectTrip);

	function loadSelectTrip(req, res) {
		var id = req.query.id;
		console.log("loadTrip is working with id: " + id);

		getTripInfo(id, function(err, response) {

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

	function getTripInfo(id, callback) {

		console.log("This id: " + id);

		var sql = "SELECT * FROM trips WHERE id = $1";

		var param = [id];

		pool.query(sql, param, function(err, res) {

			if(err) {
				console.log("Something broke", err);
				callback(err, null);
			}

			callback(null, res.rows)
		});

	}
}