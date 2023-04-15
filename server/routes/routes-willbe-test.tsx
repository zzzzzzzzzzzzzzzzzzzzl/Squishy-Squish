// import request from 'supertest'
// import App from '../../client/components/App'

// describe('GET /', () => {
//   test('returns 200 status code and leaderboard data on success', async () => {
//     const response = await request(App).get('/')
//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('leaderboard')
//   })

//   test('returns 500 status code and error message on failure', async () => {
//     const getReadData = jest.fn(() => {
//       throw new Error('Failed to fetch leaderboard data')
//     })
//     jest.doMock('../dataService', () => ({ getReadData }))

//     const response = await request(App).get('/')
//     expect(response.status).toBe(500)
//     expect(response.body).toEqual({ error: 'Failed to fetch leaderboard data' })

//     jest.dontMock('../dataService')
//   })
// })
