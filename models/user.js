const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema(
	{
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

module.exports = mongoose.model('User', UserSchema);
