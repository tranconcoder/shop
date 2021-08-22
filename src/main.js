const express = require("express");
const handlebars = require("express-handlebars");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const route = require("./route/routeIndex.js");
const path = require("path");

const app = express();
const PORT = 3000;

//Static file in path: src/resources/public
app.use("/static", express.static(path.join(__dirname, "resources/public")));

//POST Method [body]
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Morgan
app.use(morgan("tiny"));
//HandleBars
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		helpers: {},
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Routes
route(app);

// Server start
(async function start() {
	//Database
	const dbConnect = await require("./resources/config/db/index.js");
	await dbConnect();

	// Server listening
	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`);
	});
})();
