// ============================================
//   MongoDB CRUD using Mongoose — For Beginners
// ============================================

// Step 1: Import mongoose
const mongoose = require('mongoose');

// ─────────────────────────────────────────────
// Step 2: Connect to MongoDB
// ─────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => {
    console.log(' Connected to MongoDB!');
    runCRUD(); // Start CRUD after connecting
  })
  .catch((error) => {
    console.log(' Connection failed:', error.message);
  });

// ─────────────────────────────────────────────
// Step 3: Create a Schema (blueprint of data)
// ─────────────────────────────────────────────
const studentSchema = new mongoose.Schema({
  name:  String,
  age:   Number,
  grade: String,
});

// ─────────────────────────────────────────────
// Step 4: Create a Model (to interact with DB)
// ─────────────────────────────────────────────
const Student = mongoose.model('Student', studentSchema);

// ─────────────────────────────────────────────
// Step 5: CRUD Operations
// ─────────────────────────────────────────────
async function runCRUD() {

  // --------------------
  // CREATE — Add students
  // --------------------
  console.log('\n--- CREATE ---');

  const student1 = await Student.create({ name: 'karthik', age: 20, grade: 'A' });
  const student2 = await Student.create({ name: 'janu',   age: 22, grade: 'B' });
  const student3 = await Student.create({ name: 'Chandu', age: 21, grade: 'A' });

  console.log('Added:', student1.name, student2.name, student3.name);

  // --------------------
  // READ — Get students
  // --------------------
  console.log('\n--- READ ---');

  // Get ALL students
  const allStudents = await Student.find();
  console.log('All students:');
  allStudents.forEach(s => console.log(' -', s.name, '| Age:', s.age, '| Grade:', s.grade));

  // Get students with grade 'A'
  const aGrade = await Student.find({ grade: 'A' });
  console.log('Grade A students:', aGrade.map(s => s.name));

  // Get one student by ID
  const oneStudent = await Student.findById(student1._id);
  console.log('Found by ID:', oneStudent.name);

  // --------------------
  // UPDATE — Change data
  // --------------------
  console.log('\n--- UPDATE ---');

  // Update Bob's grade from B to A
  const updated = await Student.findByIdAndUpdate(
    student2._id,
    { grade: 'A' },
    { new: true }   // return updated document
  );
  console.log('Updated Bob\'s grade:', updated.name, '->', updated.grade);

  // --------------------
  // DELETE — Remove data
  // --------------------
  console.log('\n--- DELETE ---');

  // Delete Carol
  await Student.findByIdAndDelete(student3._id);
  console.log('Deleted Carol');

  // Show remaining students
  const remaining = await Student.find();
  console.log('Remaining students:', remaining.map(s => s.name));

  // --------------------
  // CLEANUP & DISCONNECT
  // --------------------
  await Student.deleteMany({}); // clear all demo data
  await mongoose.disconnect();
  console.log('\n Done! Disconnected from MongoDB.');
}