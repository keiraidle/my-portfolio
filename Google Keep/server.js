const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://renskayla_db_user:<db_password>@keirarens.gxuqrhu.mongodb.net/?compressors=zlib')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

const Note = mongoose.model('Note', new mongoose.Schema({
  title: String,
  text: String
}));

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));