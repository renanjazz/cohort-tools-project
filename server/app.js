const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const PORT = 5005;
const cors = require('cors');
const Student = require("./models/Students.model");
const Cohort = require("./models/Cohort.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...



// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// Connecting mongoose with MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ['http://localhost:5173', 'http://example.com'] }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get('/docs', (req, res) => {
	res.sendFile(__dirname + '/views/docs.html');
});

app.get('/api/cohorts', (req, res) => {
	Cohort.find({})
  .then((cohort) => {
    console.log("Retrieved cohort ->", cohort);
    res.json(cohort);
  })
  .catch((error) => {
    console.error("Error while retrieving cohort ->", error);
    res.status(500).json({ error: "Failed to retrieve cohort" });
  });
});

app.get('/api/students', (req, res) => {
	Student.find({})
  .then((students) => {
    console.log("Retrieved students ->", students);
    res.json(students);
  })
  .catch((error) => {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  });
});

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
