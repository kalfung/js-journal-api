import app from '../app.js'
import request from 'supertest'

const validNames = ['Food', 'Gaming', 'Coding', 'Other']

describe('POST /entries', () => {
    let res

    beforeAll(async () => {
        res = await request(app).post('/entries').send({
            category: 'Food',
            content: 'Lalafells make excellent dumplings!'       
        })
    })
    
    test('Returns a JSON body with _id', () => {
        expect(res.status).toBe(201)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body._id).toBeDefined()
    })

    test('Category has _id and correct name', () => {
        expect(res.body.category).toBeDefined()
        expect(res.body.category._id).toBeDefined()
        expect(res.body.category.name).toBeDefined()
        expect(res.body.category.name).toBe('Food')
    })

    test('Entry has correct text content', () => {
        expect(res.body.content).toBeDefined()
        expect(res.body.content).toBe('Lalafells make excellent dumplings!')
    })
})

describe('GET /categories', () => {
    let res

    beforeEach(async () => {
        res = await request(app).get('/categories')
    })

    test('Returns JSON', () => {
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
    })
    
    test('Returns an array of 4 elements', () => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(4)
    })
    
    test('First category has a key "name" with value "Food"', () => {
        // expect(res.body[0]._id).toHaveLength(24)
        expect(res.body[0].name).toBeDefined()
        expect(res.body[0].name).toBe('Food')
    })

    test('Each category has a "name" and "_id"', () => {
        res.body.forEach(el => {
            expect(el._id).toBeDefined()
            expect(el._id).toHaveLength(24)
            expect(el.name).toBeDefined()
            expect(validNames).toContain(el.name)
        })
    })
})