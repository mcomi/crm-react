const express = require('express');
const app = express();


// Settings
app.set('port',process.env.PORT || 3000); //

// Middlewares (funciones antes de que se procese algo)
app.use(express.json()); //con esto consigo leer JSON

// Routes 


app.use(require('./routes/zonas'));


// Starting the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});