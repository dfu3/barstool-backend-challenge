const { validate, Validator } = require('app/api/common')
const { body } = validate

class NoteValidator extends Validator {
  async create(req) {
    const validations = [
      body('title').exists().isLength({ min: 1, max: 128 }),
      body('message').exists().isLength({ min: 1, max: 2048 })
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new NoteValidator()