const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/formBuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', formRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
