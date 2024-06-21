const Student = require('../models/Students.model');
const router = require("express").Router()



router.post('/api/students', async (req, res, next) => {
	try {
		const createStudent = await Student.create(req.body);
		res.status(201).json(createStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/api/students/cohort/:cohortId', async (req, res, next) => {
	const { cohortId } = req.params;
	try {
		const getStudents = await Student.find({ cohort: cohortId }).populate(
			'cohort'
		);
		console.log(getStudents);
		res.status(200).json(getStudents);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/api/students', (req, res, next) => {
	Student.find()
		.populate('cohort')
		.then((students) => {
			console.log('Retrieved students ->', students);
			res.json(students);
		})
		.catch((error) => {
			console.error('Error while retrieving students ->', error);
			res.status(500).json({ error: 'Failed to retrieve students' });
			next(error);
		});
});

router.get('/api/students/:studentId', async (req, res, next) => {
	const { studentId } = req.params;

	try {
		const getOneStudent = await Student.findById(studentId).populate('cohort');

		res.status(200).json(getOneStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.put('/api/students/:studentId', async (req, res, next) => {
	try {
		const updateStudent = await Student.findByIdAndUpdate(
			req.params.studentId,
			req.body,
			{
				new: true,
			}
		);
		res.status(201).json(updateStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.delete('/api/students/:studentId', async (req, res, next) => {
	const { studentId } = req.params;
	try {
		const deleteStudent = await Student.findByIdAndDelete(studentId);
		res.status(204).json(deleteStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;