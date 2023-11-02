const Package = require('../models/package');
const { cloudinary } = require('../cloudinary');

module.exports = {
	// Packages Index
	async packagesIndex (req, res) {
		// check dbqueries
		const { dbQuery } = res.locals;
		delete res.locals.dbQuery;
		// find all packages
		let packages = await Package.paginate(dbQuery, {
			page: req.query.page || 1,
			limit: 5,
			sort: '-_id'
		});
		// paginate packages
		packages.page = Number(packages.page);
		if (!packages.docs.length && res.locals.query) {
			res.locals.error = 'No articles match that query found.';
		}
		// render page
		res.render('packages/index', {
			title: 'All Packages - DM-DMZ Guesthouse',
			description:
				'DM-DMZ Guesthouse - Get the best choice accomodation in & around Clarens, Free State, South Africa. We provide quality accommodation services to our customers.',
			canonical: '/packages',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			page: 'all-packages',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			packages
		});
	},
  
	// Packages New
	packageNew (req, res, next) {
		res.render('packages/new', {
			title: 'Add New Package - DM-DMZ Guesthouse',
			description: 'Add New Package - DM-DMZ Guesthouse',
			canonical: '/motoring-news-&-reviews/add-new-package',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			page: 'new-package',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// Packages Create
	async packageCreate (req, res, next) {
		req.body.package.images = [];
		for (const file of req.files) {
			req.body.package.images.push({
				url: file.secure_url,
				public_id: file.public_id
			});
		}
		req.body.package.author = req.user._id;
		let package = new Package(req.body.package);
		await package.save();
		req.session.success = 'Package created successfully!';
		res.redirect(`/packages/${package.slug}`);
	},

	// Packages Show
	async packageShow (req, res, next) {
		// find specific package and its comments
		let package = await Package.findOne({
			slug: req.params.slug
		});
		// render package show view
		res.render('packages/show', {
			title: `${package.title}`,
			description: `${package.body
				.replace(/(<([^>]+)>)/gi, '')
				.substring(0, 150)}`,
			canonical: `/packages/${package.slug}`,
			page: 'package-show',
			robots: 'index, follow',
			googlebot:
				'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
      package
		});
	},

	// Packages Edit
	packageEdit (req, res, next) {
		res.render('packages/edit', {
			title: `Edit Package - DM-DMZ Guesthouse`,
			description: `Edit Package - DM-DMZ Guesthouse`,
			canonical: `/motoring-news-&-reviews/:id/edit`,
			page: 'edit-package',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico'
			// open graph properties end
		});
	},

	// Packages Update
	async packageUpdate (req, res, next) {
		// destructure package from res.locals
		const { package } = res.locals;
		// check if there's any images for deletion
		if (req.body.deleteImages && req.body.deleteImages.length) {
			// assign deleteImages from req.body to its own variable
			let deleteImages = req.body.deleteImages;
			// loop over the deleteImages
			for (const public_id of deleteImages) {
				// delete images from cloudinary
				await cloudinary.v2.uploader.destroy(public_id);
				// delete images from package.images
				for (const image of package.images) {
					if (image.public_id === public_id) {
						let index = package.images.indexOf(image);
						package.images.splice(index, 1);
					}
				}
			}
		}
		// check if there are any new images for upload
		if (req.files) {
			// upload images
			for (const file of req.files) {
				// add images to package.images array
				package.images.push({
					url: file.secure_url,
					public_id: file.public_id
				});
			}
		}
		// update the package with any new properties
		package.title = req.body.package.title;
		package.createdAt = req.body.package.createdAt;
		package.featuredPackage = req.body.package.featuredPackage;
		package.body = req.body.package.body;

		// save the updated package into the db
		await package.save();
		req.session.success = 'Package updated successfully!';
		// redirect to show page
		res.redirect(`/packages/${package.slug}`);
	},
	// Package Destroy
	async packageDestroy (req, res, next) {
		const { package } = res.locals;
		for (const image of package.images) {
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await package.remove();
		req.session.success = 'Package deleted successfully!';
		res.redirect('/packages');
	}
};
