const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

// DB config
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

const users = require('./routes/api/users');
const subjects = require('./routes/api/subjects');
const lessons = require('./routes/api/lessons');
const patterns = require('./routes/api/patterns');
const schedules = require('./routes/api/schedules');
const books = require('./routes/api/books');
const courses = require('./routes/api/courses');
const calendars = require('./routes/api/calendars');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Password middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/subjects', subjects);
app.use('/api/calendars', calendars);
app.use('/api/books', books);
app.use('/api/schedules', schedules);
app.use('/api/patterns', patterns);
app.use('/api/lessons', lessons);
app.use('/api/courses', courses);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}!`));
