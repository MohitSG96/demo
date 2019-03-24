const Joi = require("joi");
const express = require("express");
const app = express();

const courses = [
  {
    id: 1,
    name: "Course1"
  },
  {
    id: 2,
    name: "Course2"
  },
  {
    id: 3,
    name: "Course3"
  }
];
//Custom middleware creation
app.use(express.json());
app.use(function(req, res, next) {
  console.log("Logging...");
});

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

//get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//get course details
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course id was not found");
  res.send(course);
});

//Query with parameters
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

//POST handling for adding new course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    //400 Bad Request
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

//POST handling for updating existing course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course id was not found");

  const { error } = validateCourse(req.body);
  if (error) {
    //400 Bad Request
    return res.status(400).send(error.details[0].message);
  }
  course.name = req.body.name;
  res.send(course);
});

//handling for deletion of extisting course
app.delete("/api/course/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course id was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//FUNCTION for validation
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}
