const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {
  // Get all notes for a user
  router.get('/user/:userId/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.readForUser(req, res)
  })

  // Create a note for a user
  router.post('/user/:userId/note', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await validator.create(req)
    await controller.createForUser(req, res)
  })

}