const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { asyncErrorHandler} = require('../middleware');
const { isLoggedIn } = require('../middleware/users');
const {
	packagesIndex,
	packageNew,
	packageCreate,
	packageShow,
	packageEdit,
	packageUpdate,
	packageDestroy
} = require('../controllers/packages');

/* GET packages Index /packages */
router.get(
	'/',
	asyncErrorHandler(packagesIndex)
);

/* GET packages New /packages/add-a-package */
router.get('/add-a-package', isLoggedIn, packageNew);

/* POST packages Create /packages */
router.post(
	'/add-a-package',
	isLoggedIn,
	upload.array('images', 3),
	asyncErrorHandler(packageCreate)
);

/* GET packages show /packages/:slug */
router.get('/:slug', asyncErrorHandler(packageShow));

/* GET packages edit /packages/:id/edit */
router.get(
	'/:id/edit',
	isLoggedIn,
	packageEdit
);

/* PUT packages update /packages/:id */
router.put(
	'/:id',
	isLoggedIn,
	upload.array('images', 3),
	asyncErrorHandler(packageUpdate)
);

/* DELETE packages destroy /packages/:id */
router.delete(
	'/:id',
	isLoggedIn,
	asyncErrorHandler(packageDestroy)
);

module.exports = router;
