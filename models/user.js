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
		resetPasswordToken: String,
		resetPasswordExpires: Date
	},
	{ timestamps: true }
);

UserSchema.plugin(passportLocalMongoose);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);