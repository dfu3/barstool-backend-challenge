const { Model } = require('app/modules/common')

class NoteModel extends Model {
  schema() {
    return {
      userId: {
        type: String,
        ref: 'User',
        required: true,
        index: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      },
      message: {
        type: String,
        required: true,
        trim: true
      }
    }
  }
}

module.exports = NoteModel