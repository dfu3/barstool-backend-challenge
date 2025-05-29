const mdb = require('../../lib/mongodb');

exports.currentStatus = function (req, res) {

  if (mdb.readyState != mdb.ReadyStates.connected) {
    return res.status(503).send({
    status: 'DB Not Connected'
    })
  }

  return res.status(200).send({
    status: 'OK'
  })
}
