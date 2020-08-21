module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users')
      .where(filter)
      .select();
  }
  const save = async (user) => {
    if (!user.name) return { error: 'Nome é um atributo obrigatório' };
    if (!user.email) return { error: 'email é um atributo obrigatório' };
    if (!user.passwd) return { error: 'passwd é um atributo obrigatório' };
    const userDb = await findAll({
      name: user.name
    })

    if(userDb && userDb.length) {
      return {
        error: 'Já existe um usuario com esse nome'
      }
    }
    return app.db('users').insert(user, '*')
  }

  return {
    findAll,
    save
  }
}