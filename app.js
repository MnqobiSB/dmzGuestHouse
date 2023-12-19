// init .env file - turn it off in production
// require('dotenv').config();

//require needed dependencies
const createError = require('http-errors');
const engine = require('ejs-mate');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');

// require routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const packagesRouter = require('./routes/packages');

const app = express();

mongoose.connect(process.env.DATABASEURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("We're Connected to the DB!");
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// configure passport and sessions
app.use(
	session({
		secret: 'I am gamer devloper!!!)',
		resave: false,
		saveUninitialized: true
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

// User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(mongoSanitize());

// set local variables middleware
app.use(function (req, res, next) {
	//require moment
	app.locals.moment = require('moment');
	//access logged in user
	res.locals.currentUser = req.user;
	// set default page title
	res.locals.title = 'DMZ Guest House';
	// set success flash message
	res.locals.success = req.session.success || '';
	delete req.session.success;
	// set error flash message
	res.locals.error = req.session.error || '';
	delete req.session.error;
	// continue on to next function in middleware chain
	next();
});

// mount routes
app.use('/', indexRouter);
app.use('/admin', usersRouter);
app.use('/packages', packagesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
	console.log(err);
	req.session.error = err.message;
	res.redirect('back');
});

module.exports = app;
