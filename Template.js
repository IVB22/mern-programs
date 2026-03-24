const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
 const user = {
 name: "Dinesh",
 course: "ExpressJS"
 };
 res.render('home', { user });
});
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});


