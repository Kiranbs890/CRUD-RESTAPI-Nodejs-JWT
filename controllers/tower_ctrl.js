const {
	tower,
	Sequelize
} = require("../models");

const redis = require('redis');
// make a connection to the local instance of redis
const client = redis.createClient(6379);

client.on("error", (error) => {
	console.error(error);
});

const getPagination = (page, size) => {
	const limit = size ? +size : 2;
	const offset = page ? page * limit : 0;

	return {
		limit,
		offset
	};
};
const getPagingData = (data, page, limit) => {
	const {
		count: totalItems,
		rows: tutorials
	} = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return {
		totalItems,
		tutorials,
		totalPages,
		currentPage
	};
};
const Op = Sequelize.Op;
let self = {};

self.getAll = async (req, res) => {
	let data;
	let condition = null;
	const {
		page,
		size
	} = req.query;

	const {
		limit,
		offset
	} = getPagination(page, size);

	if (req.query['show-with-offices']) {
		condition = {
			offices: {
				[Op.or]: {
					[Op.gt]: 0,
					[Op.ne]: null
				}
			}
		};
	}
	try {
		// Check the redis store for the data first
		const redisData = 'Data';
		client.get(redisData, async (err, data) => {
			if (data) {
				return res.status(200).send({
					error: false,
					message: `${redisData} from the cache`,
					data: JSON.parse(data)
				})
			} else {
				data = await tower.findAndCountAll({
						where: condition,
						limit,
						offset
					})
					client.setex(redisData, 1440, JSON.stringify(data));
					const response = getPagingData(data, page, limit);
					res.send(response);
			}
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}

self.get = async (req, res) => {
	try {
		let id = req.params.id;
		let data = await tower.findOne({
			// attributes:["id","name","location","floors","offices"],
			where: {
				id: id
			}
		});
		return res.json({
			status: "ok",
			data: data
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}

self.search = async (req, res) => {
	try {
		let text = req.query.text;
		let data = await tower.findAll({
			attributes: ["id", "name", "location", "floors", "offices"],
			include: [{
				model: tower,
				as: 'tower',
				attributes: ["id", "name"]
			}],
			where: {
				[Op.or]: {
					name: {
						[Op.like]: "%" + text + "%"
					},
					//search by name of tower
					'$tower.name$': {
						[Op.like]: "%" + text + "%"
					}
				}
			}
		});
		return res.json({
			status: "ok",
			data: data
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}

self.save = async (req, res) => {
	try {
		let body = req.body;
		let data = await tower.create(body);
		return res.json({
			status: "ok",
			data: data
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}

self.update = async (req, res) => {
	try {
		let id = req.params.id;
		let body = req.body;
		let data = await tower.update(body, {
			where: {
				id: id
			}
		});
		return res.json({
			status: "ok",
			data: data
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}

self.delete = async (req, res) => {
	try {
		let id = req.params.id;
		let data = await tower.destroy({
			where: {
				id: id
			}
		});
		return res.json({
			status: "ok",
			data: data
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: error
		})
	}
}


module.exports = self;