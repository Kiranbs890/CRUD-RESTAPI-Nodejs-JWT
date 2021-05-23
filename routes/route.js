
const tower_ctrl = require("../controllers/tower_ctrl");
const user_ctrl = require("../controllers/user_ctrl");

var VerifyToken = require('../config/verifyToken');
module.exports = function(express) {
	const route = express.Router();

	//user route
	route.post("/user/register",user_ctrl.register);
	route.post("/user/login",user_ctrl.login);

	//tower route
	route.get("/tower", VerifyToken,tower_ctrl.getAll);
	route.get("/tower/:id", VerifyToken,tower_ctrl.get);
	route.get("/tower_search", VerifyToken,tower_ctrl.search);
	route.post("/tower", VerifyToken,tower_ctrl.save);
	route.put("/tower/:id", VerifyToken,tower_ctrl.update);
	route.delete("/tower/:id", VerifyToken,tower_ctrl.delete);
	return route;
};