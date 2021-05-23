const {
	users,
	Sequelize
} = require("../models");

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
let self = {};
self.register = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		let data = await users.create({
			username: req.body.username,
			password: hashedPassword
		});
		var token = jwt.sign({
			id: data.id
		}, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});
		return res.json({
			status: "ok",
			data: {
				auth: true,
				token: token
			}
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}

self.login = async (req, res) => {

	try {
		let data = await users.findOne({
			where: {
				username: req.body.username
			}
		});
		if (!data) return res.status(404).send('No user found.');
		const passwordIsValid = await bcrypt.compare(req.body.password, data.password);
		if (!passwordIsValid) return res.status(401).send({
			auth: false,
			token: null
		});

		var token = jwt.sign({
			id: data.id
		}, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});
		return res.json({
			status: "ok",
			data: {
				auth: true,
				token: token
			}
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}



module.exports = self;