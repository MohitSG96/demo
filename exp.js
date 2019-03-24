const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require("express");
const app = express();


//Template environment
app.set('view engine', 'pug');
app.set('Views', './views');
//end
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Configuration
console.log('Application name:' + config.get('name'));
console.log('Mail server:' + config.get('mail.host'));
console.log('Mail password:' + config.get('mail.password'));


app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Logging enabled only on development environment
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan Enabled...');
}
app.use(logger);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));