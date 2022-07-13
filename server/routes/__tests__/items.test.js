import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/items')
// db object with methods
// a collection of exported functions
// vi.mock('../../db', () => ({
//   getAllItems: vi
//     .fn()
//     .mockReturnValue(Promise.resolve(JSON.stringify([1, 2, 3]))),
// }))

vi.spyOn(db, 'getAllItems')
vi.spyOn(db, 'getItemsByUserId')

afterAll(() => {
  vi.restoreAllMocks()
})

describe('GET /api/items', () => {
  it('returns an array of items', async () => {
    db.getAllItems.mockReturnValue(
      Promise.resolve([
        { id: 1, itemName: 'Hummus' },
        { id: 2, itemName: 'Scones' },
        { id: 3, itemName: 'Chicken Empanadas' },
      ])
    )

    const res = await request(server).get('/api/items')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
    expect(res.body[1].itemName).toBe('Scones')
  })
})

describe('GET /api/items/userId', () => {
  it('returns items from the user', async () => {
    db.getItemsByUserId.mockReturnValue(
      Promise.resolve([{ userId: 1, itemsId: 1, itemName: 'Hummus' }])
    )

    const res = await request(server).get('/api/items/1')

    expect(res.status).toBe(200)
  })
})
