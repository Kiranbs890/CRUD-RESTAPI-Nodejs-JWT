
import request from 'supertest'
import redis from 'redis'
// import express from 'express'

// const app = express();
import { app } from '../index'

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
        "name": "ssss",
        "location": "Diera",
        "floors": 15,
        "offices": 30,
        "rating": 7,
        "latitude": "10.9",
        "longitude": "111.6"
      }

      request(app)
        .post('/api/v1/tower')
        .send(data)
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjIxOTAxMDQ2LCJleHAiOjE2MjE5ODc0NDZ9.2RDYNSR8lCtxkuMJi55W7s227V3K6spWBfj5UrS1fKg')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
        });
    })
  })
})