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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course id was not found");
  res.send(course);
});

//Query with parameters
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

//POST handling
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    //400 Bad Request
    return res.status(400).send(result.error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

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
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}
