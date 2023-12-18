const Package = require('../models/package');
const User = require('../models/user');
const nodemailer = require('nodemailer');

module.exports = {
	// GET /
	async landingPage (req, res, next) {
		// find featured packages
		let packages = await Package.find({
			featuredPackage: true
		})
		.limit(3)
		.exec();
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
		  	<p>You Have A New Subscriber, add customer to mail-list and keep them in the loop.</p>
	  	`;
      
		// send customer an email
		const subscribeDataCustomer = `
				<img src="/iconx/tile310x150.png" width="150"/>

		  	<h1>Welcome To DM-DMZ Guesthouse Newsletter!</h1>

		  	<p>Hello ${req.body.firstName},</p>

		  	<p><b>Thank you for subscribing!</b></p>

		  	<p>We are all about providing the best choice accomodation in & around Clarens, Free State, South Africa.</p>

		  	<p>Our main job is to cator you with the best possible accomodation services at the best price.</p>

		  	<p>We will be keeping you in the loop of what any new offerings and specials happening at DM-DMZ Guesthouse.</p>

				<p>Get 20% Discount for Online Bookings</p>

				<p>Happy Vacations!</p>

				<p>DM-DMZ Guesthouse Newsletters</p>

				<p><small><a href="https://www.dm-dmzguesthouse.co.za/contact-us">Unsubscribe</a> | <a href="https://www.dm-dmzguesthouse.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.dm-dmzguesthouse.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.dm-dmzguesthouse.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender dmz guesthouse
		let smtpTransport = nodemailer.createTransport({
			host: 's38.registerdomain.net.za',
			port: 465,
			secure: true,
			auth: {
				user: 'subscribe@dm-dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email sender user
		let smtpTransportCustomer = nodemailer.createTransport({
			host: 's38.registerdomain.net.za',
			port: 465,
			secure: true,
			auth: {
				user: 'subscribe@dm-dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options dmz guesthouse
		const mailOptions = {
			from:'"New Newsletters Subscriber" <subscribe@dm-dmzguesthouse.co.za>',
			to: 'subscribe@dm-dmzguesthouse.co.za',
			subject: 'New Customer Subscriber',
			html: subscribeData
		};

		// email options user
		const mailOptionsCustomer = {
			from:'"DM-DMZ Guesthouse Newsletter" <subscribe@dm-dmzguesthouse.co.za>',
			to: req.body.email,
			subject: 'Welcome to DM-DMZ Guesthouse Newsletter',
			html: subscribeDataCustomer
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsCustomer);

		await smtpTransportCustomer.sendMail(mailOptionsCustomer);

		req.session.success = 
      `G'day ${req.body.firstName}, 
      thank you for subscribing to DM-DMZ Guesthouse newsletter!`;
		res.redirect('/');
	},

		// GET /gallery
		async getGallery (req, res, next) {
			res.render('gallery', {
				title: 'Gallery - DM-DMZ Guesthouse',
				description:
					'DM-DMZ Guesthouse - Check out our gallery',
				canonical: '/gallery',
				robots: 'index, follow',
				googlebot:
					'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
				page: 'gallery',
				// open graph properties start
				og_type: 'website',
				og_site_name: 'DM-DMZ Guesthouse',
				og_image: '/favicon.ico'
				// open graph properties end
			});
		},

			// GET /packages
	async getPackages (req, res, next) {
		res.render('package', {
			title: 'Packages - DM-DMZ Guesthouse',
			description:
				'DM-DMZ Guesthouse - Our room packages',
			canonical: '/packages',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'packages',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
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

				<p>Happy Vacations!</p>

				<p>DM-DMZ Guesthouse Contact Team</p>

				<p><small><a href="https://www.dm-dmzguesthouse.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.dm-dmzguesthouse.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.dm-dmzguesthouse.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender dmz guesthouse
		let smtpTransport = nodemailer.createTransport({
			host: 's38.registerdomain.net.za',
			port: 465,
			secure: true,
			auth: {
				user: 'contact@dm-dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email sender user
		let smtpTransportUser = nodemailer.createTransport({
			host: 's38.registerdomain.net.za',
			port: 465,
			secure: true,
			auth: {
				user: 'contact@dm-dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options dmz guesthouse
		const mailOptions = {
			from: '"Contact Us - DM-DMZ Guesthouse" <contact@dm-dmzguesthouse.co.za>',
			to: 'contact@dm-dmzguesthouse.co.za',
			subject: 'New Customer Enquiry',
			html: contactData
		};

		// email options user
		const mailOptionsUser = {
			from: '"DM-DMZ Guesthouse - Contact Us Team" <contact@dm-dmzguesthouse.co.za>',
			to: req.body.email,
			subject: 'Enquiry Recieved - DM-DMZ Guesthouse',
			html: contactDataUser
		};

		await smtpTransport.sendMail(mailOptions);

		await smtpTransportUser.sendMail(mailOptionsUser);

		req.session.success = `G'day ${req.body.name}, your enquiry has been received! A reply will be sent to you as soon as your enquiry has been reviewed.`;
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

  // POST /booking
	async postBooking (req, res, next) {
		// send DM-DMZ Guesthouse an email
		const bookingData = `
		  	<h1>New Customer Booking</h1>
		  	<h2>Customer Details:</h2>
		  	<ul>
			    <li>First Name     : <b>${req.body.firstName}</b></li>
					<li>Last Name      : <b>${req.body.lastName}</b></li>
					<li>Email          : <b>${req.body.email}</b></li>
					<li>Contact Number : <b>${req.body.contactNr}</b></li>
				</ul>

				<h2>Booking Details:</h2>
				<ul>
			    <li>Check-In       : <b>${req.body.checkInDate}</b></li>
			    <li>Check-Out      : <b>${req.body.CheckoutDate}</b></li>
			    <li>Package        : <b>${req.body.package}</b></li>
					<li>Secondary Package(opt): <b>${req.body.secondaryPackage}</b></li>
		  	</ul>  

				<h2>Personel Details:</h2>
				<ul>
			    <li>Nr of Adults   : <b>${req.body.adults}</b></li>
			    <li>Nr of Children : <b>${req.body.children}</b></li>
			    <li>Breakfast      : <b>${req.body.breakfast}</b></li>
		  	</ul>  
	  	`;
		// send user an email
		const bookingDataUser = `
				<img src="" width="150"/>

		  	<h1>Thank you for booking Accommodation at DM-DMZ Guesthouse!</h1>

		  	<p>Hello ${req.body.firstName} ${req.body.lastName}!,</p>

		  	<p><b>We have received your booking request.</b></p>

				<p><b>To complete your booking, kindly make a Full Payment Deposit to the following bank account:</b></p>

		  	<p>Bank   :  <br>Account Number:   <br>Reference: Email Address   </p>

		  	<h2>Customer Details Confirmation:</h2>
		  	<ul>
			    <li>First Name     : <b>${req.body.firstName}</b></li>
					<li>Last Name      : <b>${req.body.lastName}</b></li>
					<li>Email          : <b>${req.body.email}</b></li>
					<li>Contact Number : <b>${req.body.contactNr}</b></li>
				</ul>

				<h2>Booking Details:</h2>
				<ul>
			    <li>Check-In       : <b>${req.body.checkInDate}</b></li>
			    <li>Check-Out      : <b>${req.body.CheckoutDate}</b></li>
			    <li>Package        : <b>${req.body.package}</b></li>
					<li>Secondary Package(opt): <b>${req.body.secondaryPackage}</b></li>
		  	</ul>  

				<h2>Personel Details:</h2>
				<ul>
			    <li>Nr of Adults   : <b>${req.body.adults}</b></li>
			    <li>Nr of Children : <b>${req.body.children}</b></li>
			    <li>Breakfast      : <b>${req.body.breakfast}</b></li>
		  	</ul>

				<p><b>Your booking will be confirmed after payment has reflected.</b></p>

				<p>Happy Vacations!</p>

				<p>DM-DMZ Guesthouse</p>

				<p><small><a href="https://www.dm-dmzguesthouse.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.dm-dmzguesthouse.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.dm-dmzguesthouse.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender dmz guesthouse
		let smtpTransport = nodemailer.createTransport({
			host: 's38.registerdomain.net.za',
			port: 465,
			secure: true,
			auth: {
				user: 'bookings@dm-dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email sender user
		let smtpTransportUser = nodemailer.createTransport({
			host: 's38.registerdomain.net.za',
			port: 465,
			secure: true,
			auth: {
				user: 'bookings@dm-dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options dmz guesthouse
		const mailOptions = {
			from: '"Bookings - DM-DMZ Guesthouse" <bookings@dm-dmzguesthouse.co.za>',
			to: 'bookings@dm-dmzguesthouse.co.za',
			subject: 'New Customer Enquiry',
			html: bookingData
		};

		// email options user
		const mailOptionsUser = {
			from:'"DM-DMZ Guesthouse - Bookings" <bookings@dm-dmzguesthouse.co.za>',
			to: req.body.email,
			subject: 'Booking Recieved - DM-DMZ Guesthouse',
			html: bookingDataUser
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsUser);

		await smtpTransportUser.sendMail(mailOptionsUser);

		req.session.success = `G'day ${req.body.firstName} ${req.body.lastName}, your Booking request has been received! Please check your Email for finalization.`;
		res.redirect('/');
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
