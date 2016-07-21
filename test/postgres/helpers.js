
const dropTables = (client) => {
  // DROP TABLE
  client.query(`DROP TABLE IF EXISTS users, blogposts;`, err => {
    if (err) throw err
  })
}


const createUserTable = (client) => {
  //CREATE TABLE
  client.query(`CREATE TABLE users (
                id serial primary key not null,
                name varchar(255) not null,
                password varchar(255) not null
                );`, err => {
    if (err) throw err
  })
}

const createBlogPostsTable = (client) => {
  client.query(`CREATE TABLE blogposts (
                id serial primary key not null,
                user_id int not null REFERENCES users(id),
                post text not null,
                title varchar(255) not null,
                standfirst text not null,
                created timestamp not null,
                last_edited timestamp not null
                );`, err => {
    if (err) throw err
  })
}

module.exports = {
  dropTables,
  createUserTable,
  createBlogPostsTable
}
