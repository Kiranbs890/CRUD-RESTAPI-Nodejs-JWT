const {
	tower,
	Sequelize
} = require("../models");

const Op = Sequelize.Op;
let self = {};

self.getAll = async (req,res) => {
	try{
		let data = await tower.findAll({
			//attributes:["id","name","location","floors","offices","rating"],
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.get = async (req,res) => {
	try{
		let id = req.params.id;
		let data = await tower.findOne({
			// attributes:["id","name","location","floors","offices"],
			where:{
				id:id
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.search = async (req,res) => {
	try{
		let text = req.query.text;
		let data = await tower.findAll({
			attributes:["id","name","location","floors","offices"],
			include:[
				{
					model:tower,
					as:'tower',
					attributes:["id","name"]
				}
			],
			where:{
				[Op.or]:{
					name:{
						[Op.like]:"%"+text+"%"
					},
					//search by name of tower
					'$tower.name$':{
						[Op.like]:"%"+text+"%"
					}
				}
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.save = async (req,res) => {
	try{
		let body = req.body;
		let data = await tower.create(body);
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.update = async (req,res) => {
	try{
		let id = req.params.id;
		let body = req.body;
		let data = await tower.update(body,{
			where:{
				id:id
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.delete = async (req,res) => {
	try{
		let id = req.params.id;
		let data = await tower.destroy({
			where:{
				id:id
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}


module.exports = self;