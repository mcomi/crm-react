/*
    TRABAJO SOBRE GESTORES (en grupo)
*/

const express = require('express');
const router = express.Router(); 
const mysqlConnection = require('../database');


//devuelve el listado de usuarios del sistema
router.get('/advisors',(req,res) =>{
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//Devuelve el listado de usuarios activos (1)/ no activos(0)
router.get('/advisors/estado/:estado',(req, res) =>{
    const { estado } = req.params;
    
    mysqlConnection.query('SELECT * FROM users WHERE active = ?', [estado], (err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

//Devuelve el listado de usuarios segun su perfil partners (1)/ advisors(0)
router.get('/advisors/tipo/:tipo',(req, res) =>{
    const { tipo } = req.params;
    
    mysqlConnection.query('SELECT * FROM users WHERE EsPartner = ?', [tipo], (err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})



module.exports = router;