
const addUser = (client, name, password, callback) => {
  client.query('INSERT INTO users(name, password) VALUES ($1, $2) RETURNING id', [name, password], (err, response) => {
    if (err) callback(err)
    if (response.command !== 'INSERT') callback(new Error(`Command failed: expected INSERT, received ${response.command}`))
    if (response.rowCount !== 1) callback(new Error(`Insert failed, expected rowCount 1, received ${response.rowCount}`))

    // Handle Response
    callback(null, { userId: response.rows[0].id })
  })
}

module.exports = {
  addUser
}
