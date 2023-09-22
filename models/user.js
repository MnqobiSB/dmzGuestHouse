const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema(
	{
		fisrtName: {
			type: String,
			trim: true,
			required: true,
			maxlength: 128
		},
    lastName: {
			type: String,
			trim: true,
			required: true,
			maxlength: 128
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			lowercase: true,
			required: [ true, "can't be blank" ],
			match: [ /\S+@\S+\.\S+/, 'is invalid' ],
			maxlength: 150
		},
		contactNr: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 16
		},
		addressLineOne: {
			type: String,
			trim: true,
			required: true,
			maxlength: 256
		},
		addressLineTwo: {
			type: String,
			trim: true,
			maxlength: 256
		},
		city: {
			type: String,
			trim: true,
			required: true,
			maxlength: 128
		},
		zipCode: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 128
		},
		province: {
			type: String,
			trim: true,
			required: true,
			maxlength: 128
		},
		paymentDate: { type: Date },
		hasPaid: {
			type: Boolean,
			default: false
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		agreeToTerms: {
			type: Boolean,
			default: false,
			required: true
		},
		resetPasswordToken: String,
		resetPasswordExpires: Date
	},
	{ timestamps: true }
);

UserSchema.plugin(passportLocalMongoose);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
