const noteService = require('app/modules/note')


/**
 * @method readForUser
 * GET /user/:userId/notes
 */
exports.readForUser = async (req, res) => {
  const notes = await noteService.find({ userId: req.params.userId })
  res.status(200).send(notes)
}

/**
 * @method createForUser
 * POST /user/:userId/note
 */
exports.createForUser = async (req, res) => {
  const note = await noteService.create({
    ...req.body,
    userId: req.userId
  })
  res.status(201).send(note)
}