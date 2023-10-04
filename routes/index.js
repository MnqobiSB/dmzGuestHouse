const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
	landingPage,
	subscribe,
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
router.get('/gallery', asyncErrorHandler(getTerms));

/* GET /about-us */
router.get('/about-us', asyncErrorHandler(getTerms));

/* GET /contact */
router.get('/contact', asyncErrorHandler(getTerms));

/* POST /contact */
router.post('/contact', asyncErrorHandler(postContact));

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
