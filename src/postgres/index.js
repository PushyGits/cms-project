
const addUser = (client, name, password, callback) => {
  client.query('INSERT INTO users(name, password) VALUES ($1, $2) RETURNING id', [name, password], (err, response) => {
    if (err) callback(err)
    if (response.command !== 'INSERT') callback(new Error(`Command failed: expected INSERT, received ${response.command}`))
    if (response.rowCount !== 1) callback(new Error(`Insert failed, expected rowCount 1, received ${response.rowCount}`))

    // Handle Response
    callback(null, response.rows[0])
  })
}

const getUser = (client, name, callback) => {
  client.query('SELECT name, password, id FROM users WHERE name = $1', [name], (err, response) => {
    if (err) callback(err)
    // Handle Response
    callback(null, response.rows[0])
  })
}

const addBlogpost = (client, user_id, title, standfirst, post, callback) => {
  client.query('INSERT INTO blogposts (user_id, title, standfirst, post, created, last_edited) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, user_id, title, standfirst, post, created, last_edited', [user_id, title, standfirst, post], (err, response) => {
    if (err) callback(err)
    // Handle Response
    callback(null, response.rows[0])
  })
}

const getBlogposts = (client, username, callback) => {
  const sql = `SELECT blogposts.id, user_id, title, standfirst, created, last_edited
                FROM blogposts
                INNER JOIN users
                ON blogposts.user_id=users.id
                WHERE name = $1`

  client.query(sql, [username], (err, response) => {
    if (err) callback(err)
    // Handle Response
    callback(null, response.rows)
  })
}

const getBlogpost = (client, id, callback) => {
  const sql = `SELECT id, user_id, title, standfirst, post, created, last_edited
                FROM blogposts
                WHERE id = $1`

  client.query(sql, [id], (err, response) => {
    if (err) callback(err)
    // Handle Response
    callback(null, response.rows)
  })
}

const editBlogpost = (client, id, post, title, standfirst, callback) => {
  const sql = `UPDATE blogposts SET post=$1, title=$2, standfirst=$3, last_edited=CURRENT_TIMESTAMP
                WHERE  id=$4
                RETURNING id, user_id, title, standfirst, post, created, last_edited`

  client.query(sql, [post, title, standfirst, id], (err, response) => {
    if (err) callback(err)
    // Handle Response
    callback(null, response.rows)
  })
}

const deleteBlogpost = (client, id, callback) => {
  const sql = 'DELETE FROM blogposts WHERE id = $1'

  client.query(sql, [id], (err, response) => {
    if (err) callback(err)
    callback(null, response)
  })
}

module.exports = {
  addUser,
  getUser,
  addBlogpost,
  getBlogposts,
  getBlogpost,
  editBlogpost,
  deleteBlogpost
}
