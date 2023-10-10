const Package = require('../models/package');
const User = require('../models/user');
const nodemailer = require('nodemailer');

module.exports = {
	// GET /
	async landingPage (req, res, next) {
		// find all packages
		let packages = await Package.paginate({});
		// render page/file
		res.render('index', {
			title:
				'DM-DMZ Guesthouse - The best choice accommodation',
			description:
				'DM-DMZ Guesthouse - Get the best choice accomodation in & around Clarens, Free State, South Africa. We provide quality accommodation services to our customers.',
			canonical: '/',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'home',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			packages
		});
	},

	// POST subscription/
	async subscribe (req, res, next) {
		// send DM-DMZ Guesthouse an email
		const subscribeData = `
		  	<h1>You Have a New Customer Newsletters Subscription!</h1>
		  	<h2>Customer data:</h2>
		  	<ul>
		  		<li>${req.body.firstName}</li>
			    <li>${req.body.email}</li>
		  	</ul>  
		  	<h3>Message</h3>
		  	<p>You Have A New Subscriber, add customer to maillist and keep them in the loop.</p>
	  	`;
      
		// send customer an email
		const subscribeDataCustomer = `
				<img src="" width="150"/>

		  	<h1>Welcome To DM-DMZ Guesthouse Newsletter!</h1>

		  	<p>Hello ${req.body.firstName},</p>

		  	<p><b>Thank you for subscribing!</b></p>

		  	<p>We are all about providing the best choice accomodation in & around Clarens, Free State, South Africa.</p>

		  	<p>Our main job is to cator you with the best possible accomodation services at the best price.</p>

		  	<p>We will be keeping you in the loop of what any new offerings and specials happening at DM-DMZ Guesthouse.</p>

				<p>Happy Vacations!,<br>DM-DMZ Guesthouse Newsletters</p>

				<p><small><a href="https://www.dmzguesthouse.co.za/contact-us">Unsubscribe</a> | <a href="https://www.dmzguesthouse.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.dmzguesthouse.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.dmzguesthouse.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender dmz guesthouse
		let smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'subscribe@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email sender user
		let smtpTransportCustomer = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'subscribe@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options dmz guesthouse
		const mailOptions = {
			from:
				'"New Newsletters Subscriber" <subscribe@dmzguesthouse.co.za>',
			to: 'subscribe@dmzguesthouse.co.za',
			subject: 'New Customer Subscriber',
			html: subscribeData
		};

		// email options user
		const mailOptionsCustomer = {
			from:
				'"DM-DMZ Guesthouse Newsletter" <subscribe@dmzguesthouse.co.za>',
			to: req.body.email,
			subject: 'Welcome to DM-DMZ Guesthouse Newsletter',
			html: subscribeDataCustomer
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsCustomer);

		await smtpTransportCustomer.sendMail(mailOptionsCustomer);

		req.session.success = 
      `G'day ${req.body.firstName}, 
      thank you for subscribing to DM-DMZ Guesthouse newsletter. We have sent you an email!`;
		res.redirect('/');
	},

	// GET /about-us
	async getAbout (req, res, next) {
		res.render('about', {
			title: 'About Us - DM-DMZ Guesthouse',
			description:
				'About DM-DMZ Guesthouse - We Provide Online Car Searchers & Car Lovers With The Best Cars For Sale Deals, And Other Motoring Services In South Africa',
			canonical: '/about-us',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'about',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// GET /gallery
	async getGallery (req, res, next) {
		res.render('gallery', {
			title: 'About Us - DM-DMZ Guesthouse',
			description:
				'DM-DMZ Guesthouse - Check out our gallery',
			canonical: '/gallery',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'about',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// GET /contact-us
	async getContact (req, res, next) {
		res.render('contact', {
			title: 'Contact Us - DM-DMZ Guesthouse',
			description:
				'Contact DM-DMZ-Guesthouse - Are You Looking To Book With US? Feel Free To Contact Us Today',
			canonical: '/contact-us',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'contact',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},
	
	// POST /contact-us
	async postContact (req, res, next) {
		// send DM-DMZ Guesthouse an email
		const contactData = `
		  	<h1>New Customer Enquiry From DM-DMZ Website</h1>
		  	<h2>Customer Details:</h2>
		  	<ul>
			    <li>Name: <b>${req.body.name}</b></li>
			    <li>Email: <b>${req.body.email}</b></li>
			    <li>Contact Nr: <b>${req.body.contactNr}</b></li>
			    <li>Subject: <b>${req.body.subject}</b></li>
		  	</ul>  
		  	<h3>Message</h3>
		  	<p>${req.body.message}</p>
	  	`;
		// send user an email
		const contactDataUser = `
				<img src="" width="150"/>

		  	<h1>Thank you for contacting DM-DMZ Guesthouse!</h1>

		  	<p>Hello ${req.body.name}!,</p>

		  	<p><b>We have received your enquiry. Do not reply to this message!</b></p>

		  	<p>A reply will be sent to you as soon as your enquiry has been reviewed.</p>

				<p>Happy Vacations,<br>DM-DMZ Guesthouse Contact Team</p>

				<p><small><a href="https://www.dmzguesthouse.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.dmzguesthouse.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.dmzguesthouse.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender dmz guesthouse
		let smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'contact@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email sender user
		let smtpTransportUser = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'contact@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options dmz guesthouse
		const mailOptions = {
			from: '"Contact Us - DM-DMZ Guesthouse" <contact@dmzguesthouse.co.za>',
			to: 'contact@dmzguesthouse.co.za',
			subject: 'New Customer Enquiry',
			html: contactData
		};

		// email options user
		const mailOptionsUser = {
			from:
				'"DM-DMZ Guesthouse - Contact Us Team" <contact@dmzguesthouse.co.za>',
			to: req.body.email,
			subject: 'Enquiry Recieved - DM-DMZ Gusethouse',
			html: contactDataUser
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsUser);

		await smtpTransportUser.sendMail(mailOptionsUser);

		req.session.success = `G'day ${req.body
			.name}, your enquiry has been sent successfully!`;
		res.redirect('/');
	},

  // GET /booking
	async getBooking (req, res, next) {
		res.render('booking', {
			title: 'Booking - DM-DMZ Guesthouse',
			description: 'DM-DMZ Guesthouse Bookings',
			canonical: '/booking',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'booking',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// GET /terms-of-service
	async getTerms (req, res, next) {
		res.render('terms', {
			title: 'Terms Of Service - DM-DMZ Guesthouse',
			description: 'DM-DMZ Guesthouse Terms Of Service',
			canonical: '/terms-of-service',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'terms',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

  // POST /booking
	async postBooking (req, res, next) {
		// send DM-DMZ Guesthouse an email
		const contactData = `
		  	<h1>New Customer Enquiry From DM-DMZ Website</h1>
		  	<h2>Customer Details:</h2>
		  	<ul>
			    <li>Name: <b>${req.body.name}</b></li>
			    <li>Email: <b>${req.body.email}</b></li>
			    <li>Contact Nr: <b>${req.body.contactNr}</b></li>
			    <li>Subject: <b>${req.body.subject}</b></li>
		  	</ul>  
		  	<h3>Message</h3>
		  	<p>${req.body.message}</p>
	  	`;
		// send user an email
		const contactDataUser = `
				<img src="" width="150"/>

		  	<h1>Thank you for contacting DM-DMZ Guesthouse!</h1>

		  	<p>Hello ${req.body.name}!,</p>

		  	<p><b>We have received your enquiry. Do not reply to this message!</b></p>

		  	<p>A reply will be sent to you as soon as your enquiry has been reviewed.</p>

				<p>Happy Vacations,<br>DM-DMZ Guesthouse Contact Team</p>

				<p><small><a href="https://www.dmzguesthouse.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.dmzguesthouse.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.dmzguesthouse.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender dmz guesthouse
		let smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'booking@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email sender user
		let smtpTransportUser = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'booking@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options dmz guesthouse
		const mailOptions = {
			from: '"Contact Us - DM-DMZ Guesthouse" <contact@dmzguesthouse.co.za>',
			to: 'booking@dmzguesthouse.co.za',
			subject: 'New Customer Enquiry',
			html: contactData
		};

		// email options user
		const mailOptionsUser = {
			from:
				'"DM-DMZ Guesthouse - Bookings" <booking@dmzguesthouse.co.za>',
			to: req.body.email,
			subject: 'Booking Recieved - DM-DMZ Gusethouse',
			html: contactDataUser
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsUser);

		await smtpTransportUser.sendMail(mailOptionsUser);

		req.session.success = `G'day ${req.body
			.name}, your Booking has been successfully received! An Email has been sent to you.`;
		res.redirect('/booking');
	},

	// GET /legal-disclaimer
	async getDisclaimer (req, res, next) {
		res.render('disclaimer', {
			title: 'Legal Disclaimer - DM-DMZ Guesthouse',
			description: 'DM-DMZ Guesthouse Legal Disclaimer',
			canonical: '/legal-disclaimer',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'disclaimer',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// GET /privacy-policy
	async getPrivacy (req, res, next) {
		res.render('privacy', {
			title: 'Privacy Policy - DM-DMZ Guesthouse',
			description: 'DM-DMZ Guesthouse Privacy Policy',
			canonical: '/privacy-policy',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'privacy',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},
  
  // GET /site-map
	async getSiteMap (req, res, next) {
		// find all packages
		let packages = await Package.find({}).sort({ _id: -1 });

		res.render('site-map', {
			title: 'Site Map - DM-DMZ Guesthouse',
			description: 'DM-DMZ Guesthouse Site Map',
			canonical: '/site-map',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'site-map',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			packages
		});
	}
};
