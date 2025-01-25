const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://opyotusamuel2020:4kdVS1weLmYSFKrF@cluster0.39jc4.mongodb.net/optic?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define Schemas and Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const SubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  date: Date,
  message: String,
});

const User = mongoose.model('User', UserSchema);
const Submission = mongoose.model('Submission', SubmissionSchema);

// Seed a default user (optional)
const seedUser = async () => {
  const userExists = await User.findOne({ username: 'admin' });
  if (!userExists) {
    await User.create({ username: 'admin', password: 'password123' });
    console.log('Default admin user created');
  }
};
seedUser();

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (user) {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ error: 'Invalid username or password.' });
  }
});

// Endpoint to fetch all submissions
app.get('/submissions', async (req, res) => {
  const submissions = await Submission.find();
  res.json(submissions);
});

// Endpoint to create a new submission
app.post('/submissions', async (req, res) => {
  const { name, email, phoneNumber, date, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).send({ error: 'Name, email, and message are required' });
  }

  const newSubmission = new Submission({
    name,
    email,
    phoneNumber: phoneNumber || null,
    date: date || null,
    message,
  });

  await newSubmission.save();
  res.status(201).send(newSubmission);
});

// Endpoint to delete a submission
app.delete('/submissions/:id', async (req, res) => {
  const id = req.params.id;

  const deletedSubmission = await Submission.findByIdAndDelete(id);
  if (deletedSubmission) {
    res.send({ message: 'Submission deleted' });
  } else {
    res.status(404).send({ error: 'Submission not found' });
  }
});

// Endpoint to update a submission
app.put('/submissions/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email, phoneNumber, date, message } = req.body;

  const updatedSubmission = await Submission.findByIdAndUpdate(
    id,
    { name, email, phoneNumber, date, message },
    { new: true }
  );

  if (updatedSubmission) {
    res.send({ message: 'Submission updated', updatedSubmission });
  } else {
    res.status(404).send({ error: 'Submission not found' });
  }
});

// Start the server

app.listen(port, () => console.log(`Server running on port ${port}`));
