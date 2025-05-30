let should
let agent
let mockData
let noteService

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
  noteService = require('app/modules/note')
})

describe('api', () => {
  describe('note', () => {
    describe('GET /user/:userId/notes', () => {
      let auth
      let userId

      before(async () => {
        auth = await mockData.mockAuthAndUser()
        userId = auth.user

        // Seed a couple of notes
        await noteService.create({
          userId,
          title: 'Note 1',
          message: 'First message'
        })

        await noteService.create({
          userId,
          title: 'Note 2',
          message: 'Second message'
        })
      })

      it('should return all notes for the user', async () => {
        const res = await agent
          .client()
          .get(`/user/${userId}/notes`)
          .set('authorization', auth.token)
          .expect(200)
          .promise()

        should.exist(res)
        res.should.be.Array()
        res.length.should.be.aboveOrEqual(2)
        res.forEach(note => {
          note.userId.should.equal(userId)
          should.exist(note.title)
          should.exist(note.message)
        })
      })

      it('should return 403 if another user tries to access notes', async () => {
        const otherAuth = await mockData.mockAuthAndUser()

        await agent
          .client()
          .get(`/user/${userId}/notes`)
          .set('authorization', otherAuth.token)
          .expect(403)
          .promise()
      })
    })
  })
})