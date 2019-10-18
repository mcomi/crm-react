const express = require('express');
const router = express.Router(); 
const mysqlConnection = require('../database');

//Devuelve todas las zonas Ordenadas alfabeticamenes
router.get('/zonas',(req,res) =>{
    mysqlConnection.query('SELECT * FROM zonas ORDER BY Nombre', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


//Devuelve una zona por su id
router.get('/zonas/:id',(req, res) =>{
    const { id } = req.params;
    
    mysqlConnection.query('SELECT * FROM zonas WHERE id = ?', [id], (err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
})

//Devuelve todos los miembros de una zona, pasandole su id
router.get('/zonas/advisors/:idZona',(req, res) =>{
    const { idZona } = req.params;
    
    mysqlConnection.query('SELECT z.Nombre as Zona, u.username, u.email, u.active, u.first_name, u.last_name, u.phone FROM users_zonas uz INNER JOIN users u ON u.username = uz.CVL INNER JOIN zonas z ON z.id = uz.idZona WHERE uz.idZona= ?', [idZona], (err,rows, fields)=>{
        if(!err){
            //Recorro el resultado 
            rows.forEach( function(valor, indice) {
                console.log("En el índice " + indice + " hay este valor: " + valor['Zona']);
                //otra consulta 
                
                // /otra consulta
                valor['Prueba'] = 'xxxxxxx';
            });// /fin forEach
            
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

router.get('descendencia:id',(req, res) =>{
    const { id } = req.params;
    
    mysqlConnection.query('SELECT * FROM zonas WHERE idPadre = ?', [id], (err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
})


module.exports = router;