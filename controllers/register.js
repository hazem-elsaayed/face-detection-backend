
const handelRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password){
    return res.status(400).json('empty fields')
  }
  let hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        hash: hash,
      })
      .into('login')
      .returning('email')
      .then((email) => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: email[0],
            joined: new Date(),
          })
          .then((users) => res.json(users[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
}

module.exports = {
  handelRegister: handelRegister
}