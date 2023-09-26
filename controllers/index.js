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
				'DM-DMZ Guesthouse - We are the best choice accomodation in & around Clarens, Free State, South Africa. We provide quality accommodation services to our customers.',
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
	// POST /
	async subscribe (req, res, next) {
		// send DM-DMZ Guesthouse an email
		const subscribeData = `
		  	<h1>You Have a New User Newsletters Subscription!</h1>
		  	<h2>User data:</h2>
		  	<ul>
		  		<li>${req.body.firstName}</li>
			    <li>${req.body.email}</li>
		  	</ul>  
		  	<h3>Message</h3>
		  	<p>New user Subscription, add user to maillist.</p>
	  	`;
		// send user an email
		const subscribeDataUser = `
				<img src="https://res.cloudinary.com/mnqobi-digital-solutions/image/upload/v1626865504/logos/logo_yluhlm.png" width="150"/>

		  	<h1>Welcome To AutoTerritory.co.za Newsletter!</h1>

		  	<p>Hello ${req.body.firstName},</p>

		  	<p><b>Thank you for joining our cool community of package enthusiasts.</b></p>

		  	<p>We are all about providing top online package deals, latest motoring news and reviews, hosting fun activities and competitions and other usefull motoring tools.</p>

		  	<p>Our main job is to help you find and buy your perfect package with the least effort possible.</p>

		  	<p>We will be sending you weekly updates from our website, keeping you in the loop of what is going on at DM-DMZ Guesthouse</p>

				<p>Regards,<br>DM-DMZ Guesthouse Newsletters</p>

				<p><small><a href="https://www.autoterritory.co.za/contact-us">Unsubscribe</a> | <a href="https://www.autoterritory.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.autoterritory.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.autoterritory.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender auto territory
		let smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'subscribe@autoterritory.co.za',
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
				user: 'subscribe@autoterritory.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options auto territory
		const mailOptions = {
			from:
				'"New Newsletters Subscription" <subscribe@autoterritory.co.za>',
			to: 'subscribe@autoterritory.co.za',
			subject: 'New User Subscription',
			html: subscribeData
		};

		// email options user
		const mailOptionsUser = {
			from:
				'"DM-DMZ Guesthouse Newsletter Subscription" <subscribe@autoterritory.co.za>',
			to: req.body.email,
			subject: 'Welcome to DM-DMZ Guesthouse Newsletter Subscription',
			html: subscribeDataUser
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsUser);

		await smtpTransportUser.sendMail(mailOptionsUser);

		req.session.success = `G'day ${req.body
			.firstName}, thank you for subscribing to AutoTerritory.co.za newsletter. From now you will be receiving our weeklys updates!`;
		res.redirect('/');
	},
	// GET /finance-calculator
	async getFinanceCalc (req, res, next) {
		res.render('finance-calc', {
			title: 'Finance Calculator - DM-DMZ Guesthouse',
			description:
				'Finance Calculator - Calculate Package Finance For Your Desired Package & Get Your Finance Plan Immediately',
			canonical: '/finance-calculator',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'finance-calc',
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
				'Contact DM-DMZ Guesthouse - Are You A Package Dealer Or A Package Buyer And You Have A Query? Feel Free To Contact Us Today',
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
		  	<h1>New Enquiry From Contact Us</h1>
		  	<h2>User Details:</h2>
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
				<img src="https://res.cloudinary.com/mnqobi-digital-solutions/image/upload/v1626865504/logos/logo_yluhlm.png" width="150"/>

		  	<h1>Thank you for contacting DM-DMZ Guesthouse!</h1>

		  	<p>Hello ${req.body.name}!,</p>

		  	<p><b>We have received your enquiry. Do not reply to this message!</b></p>

		  	<p>A reply will be sent to you as soon as your enquiry has been reviewed.</p>

				<p>Regards,<br>DM-DMZ Guesthouse Contact Team</p>

				<p><small><a href="https://www.autoterritory.co.za/privacy-policy">Privacy Policy</a> | <a href="https://www.autoterritory.co.za/terms-of-service">Terms Of Service</a> | <a href="https://www.autoterritory.co.za/contact-us">Contact Us</a></small></p>
			`;

		// email sender auto territory
		let smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'contact@autoterritory.co.za',
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
				user: 'contact@autoterritory.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// email options auto territory
		const mailOptions = {
			from: '"Contact Us - DM-DMZ Guesthouse" <contact@autoterritory.co.za>',
			to: 'contact@autoterritory.co.za',
			subject: 'New Contact Us Enquiry',
			html: contactData
		};

		// email options user
		const mailOptionsUser = {
			from:
				'"DM-DMZ Guesthouse - Contact Us Team" <contact@autoterritory.co.za>',
			to: req.body.email,
			subject: 'Contact Enquiry Recieved',
			html: contactDataUser
		};

		await smtpTransport.sendMail(mailOptions, mailOptionsUser);

		await smtpTransportUser.sendMail(mailOptionsUser);

		req.session.success = `G'day ${req.body
			.name}, your enquiry has been successfully sent, a response will be sent to you soon!`;
		res.redirect('/contact-us');
	},
	// GET /sell-package
	async getSellPackage (req, res, next) {
		res.render('sell-package', {
			title: 'Advertise A Package - DM-DMZ Guesthouse',
			description:
				'Advertise A Package On DM-DMZ Guesthouse - Are You A Package Dealer? Check Out Our Affordable Packages And Advertise Your Packages',
			canonical: '/sell-package',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'sell-package',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},
	// GET /private-seller
	async getSellPackagePrivate (req, res, next) {
		res.render('private-seller', {
			title: 'Private Seller - DM-DMZ Guesthouse',
			description:
				'Individual Package Seller On DM-DMZ Guesthouse - Are You Looking To Sell Or Trade-In Your Vehicle? Advertise Your Vehicle To Our Wide Range Of Dealership Partners',
			canonical: '/private-seller',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'private-seller',
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
				'About DM-DMZ Guesthouse - We Provide Online Package Searchers & Package Lovers With The Best Packages For Sale Deals, And Other Motoring Services In South Africa',
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
	// GET /packageeers
	async getPackageeers (req, res, next) {
		res.render('packageeers', {
			title: 'Packageeers - DM-DMZ Guesthouse',
			description:
				'Packageeers At DM-DMZ Guesthouse - Work At DM-DMZ Guesthouse. Check Out Our Latest Job Posts & Apply Today',
			canonical: '/packageeers',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'packageeers',
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
		// find all dealerships
		let dealers = await User.find({}).sort({ _id: -1 });
		// find all posts
		let posts = await Package.find({}).sort({ _id: -1 });

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
			packages,
			dealers,
			posts
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
	}
};
