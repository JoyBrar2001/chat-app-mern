const getMessages = async (req, res) => {
  return res
    .status(200)
    .json({ "Id of user": req.params.id })
}

const sendMessage = async (req, res) => {
  return res
    .status(200)
    .json({ "Id of user": req.params.id })
}

module.exports = { getMessages, sendMessage };