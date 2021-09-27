const express = require('express');
const app = express();
const connectDB = require('./config/db');

//Connect to database

connectDB();
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to server' });
});

// use method to tell the path of api
app.use('/api/users', require('./routes/users'));
app.use('/api/contact', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`server start on PORT  ${PORT}`));
