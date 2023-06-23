const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 8888;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));

// Enable session middleware
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
  })
);

let uploadedFilename = null;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  uploadedFilename = req.file.filename;
  //io.emit('reloadImage');
  res.send({ success: true, filename: uploadedFilename });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check the username and password against the expected values
  if (username === 'Aissms' && password === 'ioit') {
    // Set the 'authenticated' property in the session
    req.session.authenticated = true;

    // Redirect the user to the secure page
    res.redirect('/public/secure');
  } else {
    // Authentication failed
    res.status(401).send('Invalid username or password');
  }
});

// Middleware to check authentication for secure routes
const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/public/login.html');
  }
};

// Route for the secure page
app.get('/public/secure', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'secure', 'index.html'));
});

// Redirect the root URL to the login page
app.get('/', (req, res) => {
  res.redirect('/public/login.html');
});

app.get('/image', (req, res) => {
  if (!uploadedFilename) {
    return res.status(404).send('No image uploaded.');
  }
  res.sendFile(path.join(__dirname, 'public', 'images', uploadedFilename));
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);

});
