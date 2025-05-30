let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('PUT /dev/user/:id authorization', () => {
      let authA
      let authB

      before(async () => {
        // Create User A
        authA = await mockData.mockAuthAndUser()
        // Create User B
        authB = await mockData.mockAuthAndUser()
      })

      it('should not allow userA to update userB', async () => {
        await agent
          .client()
          .put(`/user/${authB.user}`)
          .set('authorization', authA.token)
          .send({ email: 'unauthorized@gmail.com' })
          .expect(403)
          .promise()
      })

      it('should allow userB to update their own data', async () => {
        const newEmail = 'authorized@gmail.com';
        const res = await agent
          .client()
          .put(`/user/${authB.user}`)
          .set('authorization', authB.token)
          .send({ email: 'authorized@gmail.com' })
          .expect(200)
          .promise()

        should.exist(res)
        res.email.should.equal(newEmail)
      })
    })
  })
})