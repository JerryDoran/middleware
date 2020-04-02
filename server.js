const express = require('express');

const app = express();

// Global Middleware - place before the controller actions below
app.use(logger);

app.get('/', (req, res) => {
  console.log('Home Page');
  res.send('Home Page');
});

// The call back here takes a next function but there is no need to call it
// since it is the last piece of middle ware to be run in these controller functions
app.get('/users', auth, (req, res) => {
  console.log(`User is admin = ${req.admin}`);
  console.log('Users page');
  res.send('Users Page');
});

PORT = process.env.PORT || 3000;

// The next function just calls the next piece of middle ware to be run
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

function auth(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true;
    next();
  } else {
    res.send('No Auth');
  }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
