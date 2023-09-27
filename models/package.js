const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const PackageSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: 256
		},
		price: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 18
		},
		slug: {
			type: String,
			slug: [ 'title' ]
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		images: [
			{
				url: String,
				public_id: String
			}
		],
		featuredPackage: {
			type: Boolean,
			default: false
		},
		isBooked: {
			type: Boolean,
			default: false
		},
		body: {
			type: String,
			trim: true,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

PackageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Package', PackageSchema);
