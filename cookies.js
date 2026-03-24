const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
app.use(cookieParser());
// session middleware
app.use(session({
 secret: "mysecretkey",
 resave: false,
 saveUninitialized: true
}));
// home route
app.get('/', (req, res) => {
     if (req.session.views) {
        req.session.views++;
     res.send(`Visited ${req.session.views} times`);
    } 
    else {
 req.session.views = 1;
 res.send("Welcome! First visit");
 }
});


app.get('/logout', (req, res) => {
 req.session.destroy();
 res.send("Session ended");
 });


app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});