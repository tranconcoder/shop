import auth from "./routeAuth.js";
import common from "./routeCommon.js";

export default function routes(app) {
	app.use("/authenticate", auth);
	app.use("/", common);
}
