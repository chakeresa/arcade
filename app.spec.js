var shell = require('shelljs');
var request = require('supertest');
var app = require('./app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  describe('Test the root path', () => {
    test('should return 200', () => {
      return request(app).get('/')
        .then(
          response =>{
            expect(response.statusCode).toBe(200)
          }
        )
    })
  })

  describe('Test the games index path', () => {
    test('should return 200', () => {
      return request(app).get('/api/v1/games')
        .then(
          response => {
            expect(response.statusCode).toBe(200)
          }
        )
    })

    test('should return all games', () => {
      return request(app).get('/api/v1/games')
        .then(
          response => {
            expect(response.body.length).toBe(4),
            expect(Object.keys(response.body[0])).toContain('title'),
            expect(Object.keys(response.body[0])).toContain('price'),
            expect(Object.keys(response.body[0])).toContain('releaseYear'),
            expect(Object.keys(response.body[0])).toContain('active'),
            expect(Object.keys(response.body[0])).toContain('StoreId')
          }
        )
    })
  })
})