
const db = require('../helpers/database')
const dbMongo = require('../helpers/mongodb')

exports.getAll = async function getAll (page, limit, order) {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM users;"
  let data = await db.run_query(query)  
  return data
}

exports.getByUserId = async function getById (id) {
  let query = "SELECT * FROM users WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}


//get a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?"
   let values = [username]
   let user = await db.run_query(query, values)
  return user;
}

exports.getAllMongo =  async function getAllMongo (page, limite, order) {
  let data = await dbMongo.run_query('users', {})
  return data
}

exports.getByIdMongo =  async function getByIdMongo (id) {
  let data = await dbMongo.run_query('users', {'authorID': parseInt(id)})
  return data
}

exports.addMongo =  async function addMongo (document) {
  let status = await dbMongo.run_insert('users', document)
  return status
}