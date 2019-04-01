const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const subjects = require('./routes/api/subjects');
const lessons = require('./routes/api/lessons');
const books = require('./routes/api/books');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

// Password middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/subjects', subjects);
app.use('/api/books', books);
app.use('/api/lessons', lessons);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}!`));
