// app.js
const express = require('express');
const app = express();
const router = require('./src/router/router');
const loggerMiddleware = require('./src/middleware/logger');
const {connectToDatabase} = require('./src/config/db');
require('dotenv').config();
const passport = require('./src/middleware/passport');
const session = require('express-session');
const cors = require('cors');

app.use(express.json());

app.use(loggerMiddleware);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(cors());

app.use('/api', router);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', (req, res) => {
    res.send(`<h1>You successfully signed in with your Google account!</h1>`);
  }
);


connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});