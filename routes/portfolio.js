// routes/portfolio.js
const express = require('express');
const db = require('../db');

const router = express.Router();

function requireLogin(req, res, next) {
if (!req.session || !req.session.user) {
return res.redirect('/auth/login');
}
next();
}

// 홈: 로그인 되어 있으면 해당 유저의 최신 3개 프로젝트
router.get('/home', requireLogin, async (req, res, next) => {
try {
let projects = [];

if (req.session.user) {
  const userId = req.session.user.id;
  const [rows] = await db.query(
    `SELECT id, title, period, tech, summary, github, team_text, mypart_text
     FROM projects
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT 3`,
    [userId]
  );
  projects = rows;
}

res.render('home', { projects });
} catch (err) {
next(err);
}
});

// 소개
router.get('/about', requireLogin, (req, res) => {
res.render('about');
});

// 프로젝트 목록: 로그인 필수, 내 프로젝트 전체
router.get('/projects', requireLogin, async (req, res, next) => {
try {
const userId = req.session.user.id;

const [rows] = await db.query(
  `SELECT id, title, period, tech, summary, github, team_text, mypart_text, created_at
   FROM projects
   WHERE user_id = ?
   ORDER BY created_at DESC`,
  [userId]
);

res.render('projects', { projects: rows });
} catch (err) {
next(err);
}
});

// 프로젝트 추가 폼
router.get('/projects/new', requireLogin, (req, res) => {
res.render('project-form');
});

// 프로젝트 추가 처리
router.post('/projects/new', requireLogin, async (req, res, next) => {
try {
const userId = req.session.user.id;
const {
title,
period,
tech,
summary,
github,
team_text,
mypart_text,
} = req.body;

await db.query(
  `INSERT INTO projects
   (user_id, title, period, tech, summary, github, team_text, mypart_text)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  [userId, title, period, tech, summary, github, team_text, mypart_text]
);

res.redirect('/projects');
} catch (err) {
next(err);
}
});

// 연락처
router.get('/contact', requireLogin, (req, res) => {
res.render('contact');
});

module.exports = router;