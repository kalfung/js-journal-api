import app from './app.js'
import request from 'supertest'

describe("App Test", () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })
    test('GET /categories', async () => {
        const res = await request(app).get('/categories')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(4)
        expect(res.body[0].name).toBeDefined()
        expect(res.body[0].name).toBe('Food')
    })

})