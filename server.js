const express = require('express');
// const path = require('path');
const path = require('path');
const app = express();
const connectDB = require('./config/db');

//Connect to database

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// use method to tell the path of api
app.use('/api/users', require('./routes/users'));
app.use('/api/contact', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// // serve static files on production server
// if (process.env.NODE.ENV === 'production') {
//   //set static folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }

// if (process.env.NODE_ENV === 'production') {
//   // Set Static Folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }

if (process.env.NODE_ENV === 'production') {
  //set a static folder
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`server start on PORT  ${PORT}`));
