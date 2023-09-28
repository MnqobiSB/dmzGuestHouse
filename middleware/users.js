const User = require('../models/user');

const middleware = {
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) return next();
		req.session.error = 'You need to be signed in first!';
		req.session.redirectTo = req.originalUrl;
		res.redirect('/car-dealerships/sign-in');
	},

	isValidUserPassword: async (req, res, next) => {
		const { user } = await User.authenticate()(
			req.user.username,
			req.body.currentPassword
		);
		if (user) {
			// add user to res.locals
			res.locals.user = user;
			next();
		} else {
			middleware.deleteProfileImage(req);
			req.session.error = 'Incorrect current password!';
			return res.redirect('/car-dealerships/profile');
		}
	},

	changeUserPassword: async (req, res, next) => {
		const { newPassword, passwordConfirmation } = req.body;

		if (newPassword && !passwordConfirmation) {
			middleware.deleteProfileImage(req);
			req.session.error = 'Missing password confirmation!';
			return res.redirect('/car-dealerships/profile');
		} else if (newPassword && passwordConfirmation) {
			const { user } = res.locals;
			if (newPassword === passwordConfirmation) {
				await user.setPassword(newPassword);
				next();
			} else {
				middleware.deleteProfileImage(req);
				req.session.error = 'New passwords must match!';
				return res.redirect('/car-dealerships/profile');
			}
		} else {
			next();
		}
	}
};

module.exports = middleware;
