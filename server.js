
//   Render HTML to a Web Page using Express


const express = require('express');
const path = require('path');

const app = express();

// Serve static files (CSS, images) from "public" folder
app.use(express.static(path.join(__dirname, 'public')));


// Route 1: Render HTML directly as a string

app.get('/hello', (req, res) => {
  res.send('<h1>Hello World!</h1><p>This is HTML sent directly from the server.</p>');
});


// Route 2: Render a full HTML file

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});


// Start Server

app.listen(3000, () => {
  console.log(' Server running at http://localhost:3000');
});