module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll()
      .then(result => res.status(200).json(result))
  }

  const createUser = async (req, res, next) => {
    const result = await app.services.user.save(req.body);

    if (result.error) {
      return res.status(400).json(result);
    }
    res.status(201).json(user[0]);
  }

  return {
    findAll,
    createUser
  }
}