const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Fake user database
const users = [
  { username: 'dinesh', password: '1234' },
  { username: 'admin', password: 'admin123' }
];

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // parse form data

// Session setup
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next(); // user is logged in, continue
  } else {
    res.redirect('/login'); // not logged in, go to login
  }
}

// ─── ROUTES ─────────────────────────────────────────

// Home (public)
app.get('/', (req, res) => {
  res.render('home');
});

// Login page (GET)
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Login form submit (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in fake DB
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    req.session.user = username; // save to session
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid username or password!' });
  }
});

// Dashboard (protected)
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});