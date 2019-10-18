const express = require('express')
const router = express.Router()
const mysqlConnection = require('../database')
var Password = require('node-php-password')
var jwt = require('jsonwebtoken')
const secret = 'secreto'

verifyToken = (req, res, next) => {
  let token = req.headers['access-token']

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: 'No token provided.',
    })
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Fail to Authentication. Error -> ' + err,
      })
    }
    req.userId = decoded.id
    next()
  })
}

//Devuelve todas las zonas Ordenadas alfabeticamenes
router.post('/login', (req, res) => {
  var query = 'SELECT * FROM users where email="' + req.body.email + '"'
  console.log(query)
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      if (Password.verify(req.body.password, rows[0].password)) {
        var token = jwt.sign({id: rows[0].id}, secret, {
          expiresIn: 86400, // expires in 24 hours
        })

        res.status(200).send({auth: true, accessToken: token})
      } else {
        console.log('falla login en crm')
      }
    } else {
      res.status(500).send('Error -> ' + err)
    }
  })
})

router.post('/me', [verifyToken], (req, res) => {
  var query = 'SELECT * FROM users where id="' + req.userId + '"'
  console.log(query)
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.status(200).send({user: rows[0]})
    } else {
      res.status(500).send('Error -> ' + err)
    }
  })
})

module.exports = router
