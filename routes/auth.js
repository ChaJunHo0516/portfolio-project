// routes/auth.js
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, pass } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
       return res.render('login', { errorMessage: '존재하지 않는 아이디입니다.' });
    }

    const user = rows[0];

    if (pass !== user.pass) {
      return res.render('login', { errorMessage: '비밀번호가 올바르지 않습니다.' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      displayName: user.display_name,
    };

    req.session.save(() => {
      res.redirect('/home');
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
});

module.exports = router;
