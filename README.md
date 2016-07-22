# cms-project

[![Join the chat at https://gitter.im/PushyGits/cms-project](https://badges.gitter.im/PushyGits/cms-project.svg)](https://gitter.im/PushyGits/cms-project?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Recreating Wordpress


##Why?
We want to create a simple wordpress-like functionality using pall the new technologies we learned this week (crazy!).
We ended up using handlebars for html, sass, Hapi and Joi for node backend and postgres as our db.
We also learned how to work together as a team using the github issues workflow and badges.

It a fun exercise for us to learn:

 * POSTGRES - a relational database
 * how to inquire SQL databases
 * TDDing database and server
 * Data structures
 * Build a server using Hapi
 * creating a simple login functionality using Joi and Hapi
 * Using various Hapi plugins
 * creating server side html with handlebars
 * More Node.js!!
 * working in a agile methodology, using github issues and github badges.


##What?
It a very basic wordpress like application which recieves a login with username and password and then lets you post posts for the duration of that session. you cannot post posts if your login info is incorrect.

###features
* users can add/edit/delete a blog post
* people can create accounts to become users
* each user has a homepage with a list of blogposts
* login with custom dialogue box to see admin screen
* user can only add/edit/delete hers or his posts.


##How?

We took an agile(ish) approach to development: starting by defining features, then breaking those features down into technical issues.

We broke into pairs to pair-program specific issues, using TDD. This allowed each pair to concentrate on separate elements of the project, without running into merge conflicts. TDD allowed us to have some confidence that the code elements worked, even when the different elements of the site did not interact.



##Two tables: one user can have many blogposts.


```
CREATE TABLE users (
  id serial primary key not null,
  name varchar(255) not null,
  password varchar(255) not null
);

CREATE TABLE blogposts (
  id serial primary key not null,
  user_id int not null REFERENCES users(id),
  post text not null,
  title varchar(255) not null,
  standfirst text not null,
  created timestamp not null,
  last_edited timestamp not null
);

```

## set up environment variables
create a .env file at the root of the project and add the following env variables. (you will need the correct urls).

```
export POSTGRES_TEST=test_db_url
export POSTGRES_DEV=dev_db_url
export POSTGRES_PRODUCTION=production_db_url

```
