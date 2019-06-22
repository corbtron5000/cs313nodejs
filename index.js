const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get("/result", function (req, res) {

	console.log("getting result form /result");
	var url = req.query;
	var type = url.mail;
	var mailWeight = url.weight
	console.log("type: " + type + " mailWeight: " + mailWeight);
	var sum = calculateMailTotalPrice(type, mailWeight);
	var newSum = sum.toFixed(2);
	console.log("the sum: " + newSum);

	var param = {price: newSum};
	res.render("pages/result", param); })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calculateMailTotalPrice(type, mailWeight) {

	var sum = 0.0;

	if (type == "stamp") {

		if (mailWeight == 1){
			sum = .55;
		} else {
			sum = .55 + (.15 * mailWeight);
		}
	}
	else if (type == "metered") {
		if (mailWeight == 1) {
			sum = .50;
		} else {
			sum = .50 + (.15 * mailWeight);
		}
	}
	else if (type == "large") {
		if (mailWeight == 1) {
			sum = 1.00;
		} else {
			sum = 1.00 + (.15 * mailWeight);
		}
	}
	else {
		if (mailWeight < 5) {
			sum = 3.66;
		}
		else if (mailWeight > 4 && mailWeight < 9) {
			sum = 4.39;
		}
		else if ( mailWeight > 8 && mailWeight < 13) {
			sum = 5.19;
		}
		else {
			sum = 5.71;
		}
	}

	return sum;

}