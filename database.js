const mongoose = require("mongoose");
const { mongoURI } = require("./bin/config");

mongoose
	.connect(mongoURI)
	.then((db) => console.log("Db is connected"))
	.catch((error) => console.error(error));

module.exports = mongoose;
