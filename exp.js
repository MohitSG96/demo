const express = require("express");
const app = express();
const courses = [
  {
    id: 1,
    name: "Course1"
  },
  {
    id: 1,
    name: "Course2"
  },
  {
    id: 1,
    name: "Course3"
  }
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course id was not found");
  res.send(course);
});

//Query with parameters
app.get("/api/post/:year/:month", (req, res) => {
  res.send(req.query);
});
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
