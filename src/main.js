import express from "express";
import handlebars from "express-handlebars";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import route from "./route/routeIndex.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

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

//Database
import dbConnect from "./resources/config/db/index.js";
dbConnect();

// Routes
route(app);

// Server listening
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
