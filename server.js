const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to server' });
});

// use method to tell the path of api
app.use('/api/user', require('./routes/users.js'));
app.use('/api/contact', require('./routes/contacts.js'));
app.use('/api/auth', require('./routes/auth.js'));

const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`server start on PORT  ${PORT}`));
