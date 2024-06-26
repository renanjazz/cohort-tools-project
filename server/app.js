//require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;
const cors = require("cors");
require("dotenv").config();
const { isAuthenticated } = require("./middleware/jwt.middleware");

const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// Connecting mongoose with MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ["http://localhost:5173", "http://example.com"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

<<<<<<< HEAD
app.post('/api/cohorts', async (req, res, next) => {
	try {
		const createCohort = await Cohort.create(req.body);
		res.status(201).json(createCohort);
	} catch (error) {
		console.log(error);
    next(error);
	}
});

app.get('/api/cohorts', (req, res, next) => {
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

app.get('/api/cohorts/:cohortId', async (req, res, next) => {
	const { cohortId } = req.params;
	try {
		const getOneCohort = await Cohort.findById(cohortId);
		res.status(200).json(getOneCohort);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

app.put('/api/cohorts/:cohortId', async (req, res, next) => {
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

app.delete('/api/cohorts/:cohortId', async (req, res, next) => {
	const { cohortId } = req.params;
	try {
		const deleteOneCohort = await Cohort.findByIdAndDelete(cohortId);
		res.status(204).json(deleteOneCohort);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

app.post('/api/students', async (req, res, next) => {
	try {
		const createStudent = await Student.create(req.body);
		res.status(201).json(createStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

app.get('/api/students/cohort/:cohortId', async (req, res, next) => {
	const { cohortId } = req.params;
	try {
		const getStudents = await Student.find({ cohort: cohortId }).populate(
			'cohort'
		);
		console.log(res);
		res.status(200).json(getStudents);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

app.get('/api/students', (req, res, next) => {
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

app.get('/api/students/:studentId', async (req, res, next) => {
	const { studentId } = req.params;

	try {
		const getOneStudent = await Student.findById(studentId).populate('cohort');

		res.status(200).json(getOneStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

app.put('/api/students/:studentId', async (req, res, next) => {
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

app.delete('/api/students/:studentId', async (req, res, next) => {
	const { studentId } = req.params;
	try {
		const deleteStudent = await Student.findByIdAndDelete(studentId);
		res.status(204).json(deleteStudent);
	} catch (error) {
		console.log(error);
		next(error);
	}
});
=======
const cohortRoutes = require("./routes/cohort.routes");
app.use("/cohort", cohortRoutes);
const studentRoutes = require("./routes/students.routes");
app.use("/student", studentRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const userRoutes = require("./routes/users.routes");
app.use("/users", isAuthenticated, userRoutes);
>>>>>>> 61c79bec1b29f75e5636bbf58f34313b2cbad747

app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
