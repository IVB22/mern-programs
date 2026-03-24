
//   Session Management using Cookies & Sessions


const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();


// Parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser — lets us read/write cookies
app.use(cookieParser());

// Session setup
app.use(session({
  secret: 'mySecretKey123',   
  resave: false,              
  saveUninitialized: false,   
  cookie: {
    maxAge: 1000 * 60 * 5,   
    httpOnly: true,           
  }
}));


// Fake user database (for demo)

const users = [
  { id: 1, username: 'alice', password: '1234' },
  { id: 2, username: 'bob',   password: 'abcd' },
];


// Helper: Check if user is logged in

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next(); // User is logged in, continue
  } else {
    res.send(' Please login first. <a href="/">Go to Login</a>');
  }
}


// Routes

// HOME — Show login form
app.get('/', (req, res) => {
  // If already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  res.send(`
    <h1> Login Page</h1>
    <form method="POST" action="/login">
      <label>Username: <input type="text" name="username" /></label><br><br>
      <label>Password: <input type="password" name="password" /></label><br><br>
      <button type="submit">Login</button>
    </form>
    <p>Try: alice / 1234  or  bob / abcd</p>
  `);
});

// LOGIN — Handle login form
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in fake database
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    //  Save user info in SESSION
    req.session.user = { id: user.id, username: user.username };

    //  Also set a simple COOKIE (just for demo)
    res.cookie('lastLogin', new Date().toLocaleString(), {
      maxAge: 1000 * 60 * 5, // 5 minutes
      httpOnly: false,        // Readable by browser JS
    });

    console.log(' Session created:', req.session.user);
    console.log(' Cookie set: lastLogin');

    res.redirect('/dashboard');
  } else {
    // Wrong credentials
    res.send(' Wrong username or password. <a href="/">Try again</a>');
  }
});

// DASHBOARD — Protected page (only logged in users)
app.get('/dashboard', isLoggedIn, (req, res) => {
  const user = req.session.user;
  const lastLogin = req.cookies.lastLogin || 'Not available';
  const visits = req.session.visits = (req.session.visits || 0) + 1;

  res.send(`
    <h1> Welcome, ${user.username}!</h1>
    <p> You are logged in.</p>
    <hr>
    <h3> Session Data:</h3>
    <p>User ID: ${user.id}</p>
    <p>Username: ${user.username}</p>
    <p>Page visits this session: ${visits}</p>
    <h3> Cookie Data:</h3>
    <p>Last Login Time: ${lastLogin}</p>
    <hr>
    <a href="/profile">View Profile</a> |
    <a href="/dashboard">Refresh</a> |
    <a href="/logout">Logout</a>
  `);
});

// PROFILE — Another protected page
app.get('/profile', isLoggedIn, (req, res) => {
  const user = req.session.user;

  res.send(`
    <h1>👤 Profile Page</h1>
    <p>Username: <b>${user.username}</b></p>
    <p>User ID: <b>${user.id}</b></p>
    <p>Session ID: <b>${req.sessionID}</b></p>
    <br>
    <a href="/dashboard">Back to Dashboard</a> |
    <a href="/logout">Logout</a>
  `);
});

// LOGOUT — Destroy session and clear cookie
app.get('/logout', (req, res) => {
  const username = req.session.user?.username;

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }

    // Clear the cookie
    res.clearCookie('connect.sid');   // session cookie
    res.clearCookie('lastLogin');     // our custom cookie

    console.log(`${username} logged out. Session destroyed.`);

    res.send(`
      <h1>Logged Out Successfully!</h1>
      <p>Your session has been destroyed.</p>
      <p>Your cookies have been cleared.</p>
      <a href="/">Login Again</a>
    `);
  });
});


// Start Server

app.listen(3000, () => {
  console.log(' Server running at http://localhost:3000');
  console.log(' Open your browser and go to http://localhost:3000');
});