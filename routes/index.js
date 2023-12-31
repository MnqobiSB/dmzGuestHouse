const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
	landingPage,
	subscribe,
	getAbout,
	getGallery,
	getContact,
  postContact,
  getBooking,
  postBooking,
	getSiteMap,
	getTerms,
	getDisclaimer,
	getPrivacy
} = require('../controllers');

/* GET / - home page. */
router.get('/', asyncErrorHandler(landingPage));

/* POST / - subscribe newsletter */
router.post('/', asyncErrorHandler(subscribe));

/* GET /gallery */
router.get('/gallery', asyncErrorHandler(getGallery));

/* GET /about-us */
router.get('/about-us', asyncErrorHandler(getAbout));

/* GET /contact */
router.get('/contact-us', asyncErrorHandler(getContact));

/* POST /contact */
router.post('/contact-us', asyncErrorHandler(postContact));

/* GET /booking */
router.get('/booking', asyncErrorHandler(getBooking));

/* POST /booking */
router.post('/booking', asyncErrorHandler(postBooking));

// Website Laws
// ************

/* GET /terms-of-service */
router.get('/terms-of-service', asyncErrorHandler(getTerms));

/* GET /legal-disclaimer */
router.get('/legal-disclaimer', asyncErrorHandler(getDisclaimer));

/* GET /privacy-policy */
router.get('/privacy-policy', asyncErrorHandler(getPrivacy));

// Website SEO
// ************

/* GET /site-map */
router.get('/site-map', asyncErrorHandler(getSiteMap));

module.exports = router;
