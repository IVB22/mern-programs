const express=require('express');
const app=express();
app.get('/',(req,res)=>{
 res.send('<h2>Welcome to Express JS</h2>');
});

app.get('/about',(req,res)=>{  
    res.send('<h2>about us page</h2>' )
       
});

app.get('/contact',(req,res)=>{ 
    res.send('<h2>contact us page</h2>');
});

app.get('/services',(req,res)=>{ 
    res.send('<h2>services page</h2>');
});

app.listen(3001,()=>{
 console.log("Server running at http://localhost:3001");
});

app.get('/student/:name/:id', (req, res) => {
 res.send(`Student Name: ${req.params.name}, ID: ${req.params.id}`);
});

app.get('/student', (req, res) => {
//                      ↓
  console.log(req.query);         // { name: 'John', age: '25' }
  console.log(req.query.name);    // John
  console.log(req.query.age);     // 25
});
// query parameters
const queryString = 'name=John&age=25';
const queryParams = new URLSearchParams(queryString);
console.log(queryParams.get('name')); // John
console.log(queryParams.get('age'));  // 25
app.get('/student', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send(`Student Name: ${name}, Age: ${age}`);
});

// building url
app.get('/build-url', (req, res) => {
    const ans1= new URL('http://localhost:3001/student');
    const ans = `/student/101?role=monitor`;
 res.send(`Generated URL: ${ans1}${ans}`);
});
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
