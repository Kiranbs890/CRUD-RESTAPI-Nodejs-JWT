import { Request, Response } from 'express';
import _ from 'lodash'
import { Op } from 'sequelize';
import TowerModel from '../models/tower';
import { redisClient } from '../utils/redis';
import { getPagination, getPagingData } from '../utils/helper';
import { app } from '../index'

export default class Tower {
  towerM = TowerModel;

  constructor() {
    this.towerM = TowerModel;
  }

  async getAll(req: Request, res: Response) {
    let data;
    let condition: any = null;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

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
    await new Promise((resolve, reject) => {
      redisClient.get('rediS-params', async (err, data) => {
        if (data) {
          if (JSON.parse(data).query.page != page || JSON.parse(data).query.size != size || JSON.parse(data).query['show-with-offices'] != req.query['show-with-offices']) {
            redisClient.del('rediS')
            redisClient.set('rediS-params', JSON.stringify({ query: req.query }));
          }
          return resolve(1)
        } else {
          redisClient.set('rediS-params', JSON.stringify({ query: req.query }));
        }
        return resolve(1)
      })
    })
    try {
      // Check the redis store for the data first
      redisClient.get('rediS', async (err, data) => {
        if (data) {
          return res.status(200).send({
            error: false,
            message: `Data from the redis`,
            data: JSON.parse(data)
          });
        } else {
          data = await TowerModel.findAndCountAll({
            where: condition,
            limit,
            offset
          }) as any;
          redisClient.setex('rediS', 1440, JSON.stringify(data));
          const response = getPagingData(data, page, limit);
          res.send(response);
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = await TowerModel.findOne({
        where: {
          id: id
        }
      });
      return res.json({
        status: 'ok',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { location, name, offices, rating } = req.query;
      let data = await TowerModel.findAll({
        where: {
          [Op.and]: _.compact([
            (location ? { location } : undefined),
            (name ? { name } : undefined),
            (offices ? { offices } : undefined),
            (rating ? { rating } : undefined)
          ])
        }
      });
      return res.json({
        status: 'ok',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  async save(req: Request, res: Response) {
    try {
      let body = req.body;
      let data = await TowerModel.create(body);
      if (process.env.NODE_ENV !== 'test') {
        redisClient.del('rediS', function (err, reply) {
          console.log(reply);
        });
        app.get('client').emit('onSave', 'New tower added.');
      }
      return res.json({
        status: 'ok',
        data: data
      });
    } catch (error) {
      console.log('******************', error)
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let body = req.body;
      let data = await TowerModel.update(body, {
        where: {
          id: id
        }
      });
      if (process.env.NODE_ENV !== 'test') {
        app.get('client').emit('onUpdate', 'Tower updated.');
      }
      return res.json({
        status: 'ok',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = await TowerModel.destroy({
        where: {
          id: id
        }
      });
      if (process.env.NODE_ENV !== 'test') {
        app.get('client').emit('onDelete', 'Tower deleted.');
      }
      return res.json({
        status: 'ok',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }
}
