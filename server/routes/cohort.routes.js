const Cohort = require('../models/Cohort.model');
const router = require("express").Router()


router.post('/api/cohorts', async (req, res) => {
	try {
		const createCohort = await Cohort.create(req.body);
		res.status(201).json(createCohort);
	} catch (error) {
		console.log(error);
	}
});

router.get('/api/cohorts', (req, res, next) => {
	Cohort.find({})
		.then((cohort) => {
			console.log('Retrieved cohort ->', cohort);
			res.json(cohort);
		})
		.catch((error) => {
			console.error('Error while retrieving cohort ->', error);
			next(error);
		});
});

router.get('/api/cohorts/:cohortId', async (req, res, next) => {
	const { cohortId } = req.params;
	try {
		const getOneCohort = await Cohort.findById(cohortId);
		res.status(200).json(getOneCohort);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.put('/api/cohorts/:cohortId', async (req, res, next) => {
	try {
		const updatedCohort = await Cohort.findByIdAndUpdate(
			req.params.cohortId,
			req.body,
			{
				new: true,
			}
		);
		res.status(201).json(updatedCohort);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.delete('/api/cohorts/:cohortId', async (req, res, next) => {
	const { cohortId } = req.params;
	try {
		const deleteOneCohort = await Cohort.findByIdAndDelete(cohortId);
		res.status(204).json(deleteOneCohort);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;