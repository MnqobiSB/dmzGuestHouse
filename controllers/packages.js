const Package = require('../models/package');
const { cloudinary } = require('../cloudinary');

module.exports = {
	// Packages Index
	async packagesIndex (req, res) {
		// check dbqueries
		// find featured packages
		let packages = await Package.find({});
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
			canonical: '/packages/add-new-package',
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
	async packageEdit (req, res) {
		const package = await Package.findById(req.params.id)
		res.render('packages/edit', {
			title: `Edit Package - DM-DMZ Guesthouse`,
			description: `Edit Package - DM-DMZ Guesthouse`,
			canonical: `/packages/:id/edit`,
			page: 'edit-package',
			robots: 'noindex, nofollow',
			googlebot: 'noindex, nofollow',
			// open graph properties start
			og_type: 'website',
			og_site_name: 'DM-DMZ Guesthouse',
			og_image: '/favicon.ico',
			// open graph properties end
			package
		});
	},

	// Packages Update
	async packageUpdate (req, res, next) {
		// destructure package from res.locals
		const { id } = req.params;
		
		// update the package with any new properties
		const package = await Package.findByIdAndUpdate(id, {...req.body.package})
		
		req.session.success = 'Package updated successfully!';
		// redirect to show page
		res.redirect(`/packages/${package.slug}`);
	},
	
	// Package Destroy
	async packageDestroy (req, res, next) {
		const { id } = req.params;
		for (const image of package.images) {
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await Package.findByIdAndDelete(id);
		req.session.success = 'Package deleted successfully!';
		res.redirect('/packages');
	}
};
