const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const {
	getSignup,
	postSignup,
	getSignin,
	postSignin,
	getSignout,
	getProfile,
	updateProfile,
	getForgotPw,
	putForgotPw,
	getReset,
	putReset
} = require('../controllers/users');
const {
	asyncErrorHandler
} = require('../middleware');
const {
	isLoggedIn,
	isValidUserPassword,
	changeUserPassword
} = require('../middleware/users');

/* GET /sign-up */
router.get('/sign-up', asyncErrorHandler(getSignup));

/* POST /sign-up */
router.post('/sign-up', upload.single('image'), asyncErrorHandler(postSignup));

/* GET /login */
router.get('/sign-in', asyncErrorHandler(getSignin));

/* POST /login */
router.post('/sign-in', asyncErrorHandler(postSignin));

/* GET /logout */
router.get('/sign-out', getSignout);

/* GET /profile */
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));

/* PUT /profile */
router.put(
	'/profile',
	isLoggedIn,
	upload.single('image'),
	asyncErrorHandler(isValidUserPassword),
	asyncErrorHandler(changeUserPassword),
	asyncErrorHandler(checkCurrentEntryCars),
	asyncErrorHandler(updateProfile)
);

/* GET /forgot */
router.get('/forgot-password', getForgotPw);

/* PUT /forgot */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));

/* GET /reset/:token */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* PUT /reset/:token */
router.put('/reset/:token', asyncErrorHandler(putReset));

module.exports = router;
