import mongoose from "mongoose";
const { Schema } = mongoose;

const generalTime = new Date(Date.now());
generalTime.toLocaleTimeString("ICT");

const authenticate = new Schema({
	firstName: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 10,
	},
	lastName: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 10,
	},
	hasAvatar: {
		type: Boolean,
		default: false,
		required: true,
		enum: [true, false],
	},
	username: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 18,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 24,
	},
	gmail: {
		type: String,
		minLength: 11,
		required: true,
	},
	address: {
		type: String,
		minLength: 1,
		maxLength: 128,
		required: true,
	},
	registerAt: {
		type: String,
		default: generalTime,
	},
	lastLoginAt: {
		type: String,
		default: generalTime,
	},
	lastChangeProfile: {
		// prev profile
		changedAt: {
			type: String,
			default: generalTime,
		},
		prevProfie: {
			type: Object,
		},
	},
});

export default mongoose.model("Authenticate", authenticate);
