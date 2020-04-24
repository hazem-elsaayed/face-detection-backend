const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

// console.log(db.select('*').from('users'));

app = express();
port = 3030;

app.use(express.json());
app.use(cors());

//Root endpoint
app.get('/', (req, res) => res.send(`It's working`));

//Sign-in End Point
app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//Register End Point
app.post('/register', (req, res) => {
  register.handelRegister(req, res, db, bcrypt);
});

//Profile End Point
app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});

//Updating Entries End Point
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(process.env.PORT || port, () =>
  console.log(`server is working at port ${process.env.PORT}`)
);
