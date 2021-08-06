const auth = require("./routeAuth.js");
const common = require("./routeCommon.js");
const api = require("./routeApi.js");

module.exports = function routes(app) {
	app.use("/authenticate", auth);
	app.use("/api", api);
	app.use("/", common);
};
