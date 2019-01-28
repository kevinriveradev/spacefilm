var express = require('express');
var router = express.Router();
var models = require('../models');
const jwt = require('jsonwebtoken');
var passport = require('passport');

router.post('/login', passport.authenticate('jwt-login', { session: false }), async  (req, res) => {
  const token = jwt.sign(req.user.id, 'sp@c3f1t');
    let result = await models.User.findAll({
        where: {
            'id': req.user.id
        }
    });
    let data = {
        'jwt': token,
        'usuario':result[0]
    }
  res.status(200).json({
    error: false,
    data: data,
  })
})

router.post('/register', passport.authenticate('local-signup', { session: false }), async (req, res) => {
    const token = jwt.sign(req.user.id, 'sp@c3f1t');
    let result = await models.User.findAll({
        where: {
            'id': req.user.id
        }
    });
    let data = {
        'jwt': token,
        'usuario':result[0]
    }
  res.status(200).json({
    error: false,
    data: data
  })
});



module.exports = router;
