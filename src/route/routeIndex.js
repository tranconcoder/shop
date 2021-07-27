import auth from "./routeAuth.js";
import common from "./routeCommon.js";
import api from "./routeApi.js";

export default function routes(app) {
	app.use("/authenticate", auth);
	app.use("/api", api);
	app.use("/", common);
}
