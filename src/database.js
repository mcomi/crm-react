const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pase14792',
  database: 'react',
  port: '14792',
})

mysqlConnection.connect(function(err) {
  if (err) {
    console.log(err)
    return
  } else {
    console.log('Db is connected')
  }
})

module.exports = mysqlConnection
