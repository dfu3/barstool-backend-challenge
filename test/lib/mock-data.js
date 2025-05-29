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
          .client(authA)
          .put(`/dev/user/${authB.user}`)
          .send({ email: 'unauthorized@hax.com' })
          .expect(403)
          .promise()
      })

      it('should allow userB to update their own data', async () => {
        const newEmail = 'legit@update.com'

        const res = await agent
          .client(authB)
          .put(`/dev/user/${authB.user}`)
          .send({ email: newEmail })
          .expect(200)
          .promise()

        should.exist(res)
        res.email.should.equal(newEmail)
      })
    })
  })
})
