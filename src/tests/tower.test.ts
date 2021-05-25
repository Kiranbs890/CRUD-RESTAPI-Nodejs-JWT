
import request from 'supertest'
import redis from 'redis'
import { app } from '../index'

const acessToken = process.env.APP_TEST_ACESSTOKEN;
jest.mock('../utils/redis', () => ({
  // });
  createClient: jest.fn()
}))

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500))
})

describe('Testing Tower API', () => {
  describe('Save Functionality', () => {

    it('should save data to the database', () => {

      jest.spyOn(redis, 'createClient').mockImplementationOnce(jest.fn())


      const data = {
        "name": "New tower",
        "location": "Tecom",
        "floors": 15,
        "offices": 30,
        "rating": 7,
        "latitude": "10.9",
        "longitude": "111.6"
      }

      request(app)
        .post('/api/v1/tower')
        .send(data)
        .set('x-access-token',acessToken)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
        });
    })
  })

  describe('Update Functionality', () => {

    it('should update data to the database', () => {

      jest.spyOn(redis, 'createClient').mockImplementationOnce(jest.fn())


      const data = {
        "name": "Latifa Towers",
        "location": "World Trade Center",
        "floors": 100,
        "offices": 100,
        "rating": 7,
        "latitude": "10.9",
        "longitude": "111.6"
      }

      request(app)
        .put('/api/v1/tower/1')
        .send(data)
        .set('x-access-token',acessToken)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
        });
    })
  })

  describe('Delete Functionality', () => {

    it('should delete data to the database', () => {

      jest.spyOn(redis, 'createClient').mockImplementationOnce(jest.fn())


      request(app)
        .delete('/api/v1/tower/2')
        .set('x-access-token',acessToken)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
        });
    })
  })

})