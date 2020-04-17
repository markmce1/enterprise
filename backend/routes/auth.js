const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Auth = require("../models/auth");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const auth = new Auth({
      email: req.body.email,
      password: hash
    });
    auth
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedAuth;
  Auth.findOne({ email: req.body.email })
    .then(auth => {
      if (!auth) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedAuth = auth;
      return bcrypt.compare(req.body.password,auth.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedAuth.email, authId: fetchedAuth._id },
        "mce_s_secret_cyode_do_not_steal_it_fella",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
