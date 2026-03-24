const express = require('express');
const app = express();

// Middleware - MUST be added before routes
app.use(express.json());                      // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses form data

// In-memory database (array acts as temporary DB)
let items = [
  { id: 1, name: "Item One", price: 100 },
  { id: 2, name: "Item Two", price: 200 }
];


// Create - Add new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1, // Simple ID generation
    name: req.body.name,
    price: req.body.price
    };
  items.push(newItem);
  res.json(newItem);
});
app.get('/items', (req, res) => {
 res.json(items);
});

app.delete('/items/:index', (req, res) => {
 const index = req.params.index;
 items.splice(index, 1);
 res.send('Item deleted successfully');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});