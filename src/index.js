const express = require('express')
const app = express()

// Settings
app.set('port', process.env.PORT || 3001) //si existe un puerto definido coge ese, en caso contrario establece el 3000
app.set('json spaces', 2) // para ver el formato json espaciado

// Middlewares (funciones antes de que se procese algo)
app.use(express.json()) //con esto consigo leer JSON
app.use(express.urlencoded({extended: false})) //para entender datos desde formularios
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-type,Accept,access-token,X-Key',
  )
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// Routes

//
app.use(require('./routes/index'))
app.use(require('./routes/user'))
app.use(require('./routes/advisor')) //gestor / usuario
app.use(require('./routes/advisors')) //gestores / usuarios
app.use(require('./routes/zonas')) //zonas

// Starting the server

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
