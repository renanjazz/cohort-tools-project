const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
	cohortSlug: {
		type: String,
		required: true
	},
	cohortName: {
		type: String,
		required: true

	},
	program: {
		type: String,
	},
	format: {
		type: String,
	},
	campus: {
		type: String,
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
	},
	inProgress: {
		type: Boolean,
		default: false
	},
	programManager: {
		type: String,
		required: true
	},
	leadTeacher: {
		type: String,
		required: true
	},
	totalHours: {
		type: Number,
		default: 360
	},
});

const Cohort = mongoose.model("Cohort", cohortSchema)

module.exports = Cohort;
