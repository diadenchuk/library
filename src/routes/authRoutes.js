const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
function router(nav) {
  authRouter.route('/signUp').post((req, res) => {
    // create user
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const col = db.collection('users');
        const user = { username, password };
        const result = await col.insertOne(user);
        debug(result);
        req.login(result.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error);
      }

      client.close();
    }());
  });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signIn', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
