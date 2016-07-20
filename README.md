# cms-project

[![Join the chat at https://gitter.im/PushyGits/cms-project](https://badges.gitter.im/PushyGits/cms-project.svg)](https://gitter.im/PushyGits/cms-project?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Recreating Wordpress

## features

### users can add/edit/delete a blog post

### people can create accounts to become users

### each user has a homepage with a list of blogposts

### login with custom dialogue box to see admin screen

### user can only add/edit/delete hers or his posts.


## Database setup

Two tables: one user can have many blogposts.

CREATE TABLE users (
  id serial primary key not null,
  name varchar(255) not null,
  password varchar(255) not null
);

CREATE TABLE blogposts (
  id serial primary key not null,
  user_id int not null REFERENCES users(id),
  post text not null,
  created timestamp not null,
  last_edited timestamp not null
);

## set up environment variables
create a .env file at the root of the project and add the following env variables. (you will need the correct urls).

```
export POSTGRES_TEST=test_db_url
export POSTGRES_DEV=dev_db_url
export POSTGRES_PRODUCTION=production_db_url

```
