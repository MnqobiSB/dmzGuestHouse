const User = require('../models/user');
const Package = require('../models/package');
const util = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = {
	// GET /sign up
	getSignup (req, res, next) {
		if (req.isAuthenticated())
			return res.redirect('/admin/profile');
		res.render('users/signup', {
			title: 'Admin Sign Up - DM-DMZ Guesthouse',
			description: 'Admin Sign Up - DM-DMZ Guesthouse',
			canonical: '/admin/sign-up',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'sign-up',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			username: '',
			email: '',
			about: ''
		});
	},

	// POST /sign up
	async postSignup (req, res, next) {
		if (req.isAuthenticated())
			return res.redirect('/');
		try {
			// save/register admin-user
			const user = await User.register(
				new User(req.body),
				req.body.password
			);
			// sign in user
			req.login(user, function (err) {
				if (err) return next(err);
				req.session.success = `You are successfully signed-up ${user.firstName}`;
				res.redirect('/');
			});
		} catch (err) {
			const { firstName, lastName, username,  email } = req.body;
			let error = err.message;
			if (
				error.includes('index: email_1 dup key')
			) {
				error = 'An admin with the given email is already registered!';
			}
			res.render('users/signup', {
				title: 'Admin Sign Up - DM-DMZ Guesthouse',
				description: 'Admin Sign Up - DM-DMZ Guesthouse',
				canonical: '/admin/sign-up',
				robots: 'noindex, nofollow',
				googlebot: 'noindex, nofollow',
				page: 'sign-up',
				// open graph properties start
				og_type: 'website',
				og_site_name: 'DM-DMZ Guesthouse',
				og_image: '/favicon.ico',
				// open graph properties end
        firstName,
        lastName,
				username,
				email,
				error
			});
		}
	},

	// GET /sign-in
	getSignin (req, res, next) {
		if (req.isAuthenticated())
			return res.redirect('/admin/profile');
		if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
		res.render('users/signin', {
			title: 'Admin Sign In - DM-DMZ Guesthouse',
			description: 'Admin Sign In - DM-DMZ Guesthouse',
			canonical: '/admin/sign-in',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'sign-in',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// POST /sign-in
	async postSignin (req, res, next) {
		const { username, password } = req.body;
		const { user, error } = await User.authenticate()(username, password);
		if (!user && error) return next(error);
		req.login(user, function (err) {
			if (err) return next(err);
			req.session.success = `Hello ${username}, Welcome back!`;
			const redirectUrl =
				req.session.redirectTo || '/admin/profile';
			delete req.session.redirectTo;
			res.redirect(redirectUrl);
		});
	},

	// GET /logout
	getSignout (req, res, next) {
		req.logout();
		req.session.success = `Goodbye, come back soon!`;
		res.redirect('/');
	},

	// GET /profile
	async getProfile (req, res, next) {
		//get user all cars
		const packages = await Package.find()
			.where('author')
			.equals(req.user._id)
			.exec();
		// render page
		res.render('users/profile', {
			title: 'My Profile - DM-DMZ Guesthouse',
			description: 'Admin Profile - DM-DMZ Guesthouse',
			canonical: '/admin/profile',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'profile',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			packages
		});
	},

	// PUT /profile
	async updateProfile (req, res, next) {
		const {
			username,
			email,
			firstName,
			lastName
		} = req.body;
		const { user } = res.locals;
		if (username) user.username = username;
		if (email) user.email = email;
		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		// save new changes
		await user.save();
		const login = util.promisify(req.login.bind(req));
		await login(user);
		req.session.success = 'Profile successfully updated!';
		res.redirect('/admin/profile');
	},

	// GET /admin/forgot
	getForgotPw (req, res, next) {
		res.render('users/forgot', {
			title: 'Forgot Password - DM-DMZ Guesthouse',
			description: 'Admin Forgot Password - DM-DMZ Guesthouse',
			canonical: '/admin/forgot-password',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'forgot',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// PUT /admin/forgot
	async putForgotPw (req, res, next) {
		const token = await crypto.randomBytes(20).toString('hex');
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			req.session.error = 'No account with that email.';
			return res.redirect('/admin/forgot-password');
		}
		user.resetPasswordToken = token;
		user.resetPasswordExpires = Date.now() + 3600000;
		await user.save();

		const smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'support@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		const msg = {
			to: email,
			from: '"DM-DMZ Guesthouse Support" <support@dmzguesthouse.co.za>',
			subject: 'DM-DMZ Guesthouse Support - Forgot Password / Reset',
			text:
				'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				'https://' +
				req.headers.host +
				'/admin/reset/' +
				token +
				'\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			// html: '<strong>and easy to do anywhere, even with Node.js</strong>',
		};
		await smtpTransport.sendMail(msg);
		req.session.success = `An email has been sent to ${email} with further instructions.`;
		res.redirect('/admin/forgot-password');
	},

	// GET /admin/reset
	async getReset (req, res, next) {
		const { token } = req.params;
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() }
		});
		if (!user) {
			req.session.error =
				'Password reset token is invalid or has expired.';
			return res.redirect('/admin/forgot-password');
		}

		res.render('users/reset', {
			title: 'Reset Password - DM-DMZ Guesthouse',
			description: 'Admin Reset Password - DM-DMZ Guesthouse',
			canonical: '/admin/reset/:token',
			page: 'reset',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			token,
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow'
		});
	},

	// PUT /admin/reset
	async putReset (req, res, next) {
		const { token } = req.params;
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() }
		});

		if (!user) {
			req.session.error =
				'Password reset token is invalid or has expired!';
			return res.redirect('/admin/forgot-password');
		}

		if (req.body.password === req.body.confirm) {
			await user.setPassword(req.body.password);
			user.resetPasswordToken = null;
			user.resetPasswordExpires = null;
			await user.save();
			const login = util.promisify(req.login.bind(req));
			await login(user);
		} else {
			req.session.error = 'Passwords do not match!';
			return res.redirect(`/admin/reset/${token}`);
		}

		const smtpTransport = nodemailer.createTransport({
			host: 'serv28.registerdomain.co.za',
			port: 465,
			secure: true,
			auth: {
				user: 'support@dmzguesthouse.co.za',
				pass: process.env.GMAILPW
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		const msg = {
			to: user.email,
			from: '"DM-DMZ Guesthouse Support Team" <support@dmzguesthouse.co.za>',
			subject: 'DM-DMZ Guesthouse Support - Password Reset successful!',
			text: `Hello,
		  	This email is to confirm that the password for your account has just been changed.
		  	If you did not make this change, please hit reply and notify us at once.`.replace(
				/		  	/g,
				''
			)
		};
		await smtpTransport.sendMail(msg);
		req.session.success = 'Password reset successful!';
		res.redirect('/');
	}
};
