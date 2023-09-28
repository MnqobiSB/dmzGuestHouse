const Package = require('../models/package');

const middleware = {
	isPackageAuthor: async (req, res, next) => {
		const package = await Package.findById(req.params.id);
		if (package.author.equals(req.user._id)) {
			res.locals.package = package;
			return next();
		}
		req.session.error = 'Access denied!';
		res.redirect('back');
	}
};

module.exports = middleware;
