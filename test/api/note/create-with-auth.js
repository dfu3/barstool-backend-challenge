let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    describe('POST /note', () => {
      let auth

      before(async () => {
        auth = await mockData.mockAuthAndUser()
      })

      it('should create a note when logged in', async () => {
        const data = {
          title: 'Test Title',
          message: 'This is a test note message'
        }

        const res = await agent
          .client()
          .post('/note')
          .set('authorization', auth.token)
          .send(data)
          .expect(201)
          .promise()

        should.exist(res)
        res.title.should.equal(data.title)
        res.message.should.equal(data.message)
        res.userId.should.equal(auth.user)
      })

      it('should return 401 when not authenticated', async () => {
        await agent
          .client()
          .post('/note')
          .send({ title: 'No Auth', message: 'Missing token' })
          .expect(401)
          .promise()
      })
    })
  })
})