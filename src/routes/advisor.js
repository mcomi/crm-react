/*
    Trabajo con datos de usuarios inviduales
*/
const express = require('express');
const router = express.Router(); 
const mysqlConnection = require('../database');


//devuelve los datos de un usuario
router.get('/advisor/:cvl',(req,res) =>{
    const { cvl } = req.params;
    
    mysqlConnection.query('SELECT * FROM users WHERE username = ?', [cvl], (err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});


//Devuelve los objetivos de un gestor para un año:
router.get('/advisor/objetivos/:CVL/:Anno',(req, res) =>{
    
    const { CVL } = req.params;
    const { Anno } = req.params;

    mysqlConnection.query('SELECT * FROM `objetivos_gestores` WHERE `CVL`= ? AND `Anno`= ?', [CVL,Anno], (err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

//Listado de clientes de un gestor
router.get('/advisor/clientes/:CVL',(req, res) =>{
    
    const { CVL } = req.params;

    mysqlConnection.query('SELECT * FROM `clientes` WHERE `gestor`= ? ORDER BY `last_name` ASC, `first_name` ASC ', [CVL], (err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})


//devuelve el volumen de negocio de un gestor en productos iban
router.get('/advisor/cartera_iban/:CVL',(req, res) =>{
    
    const { CVL } = req.params;

    mysqlConnection.query('SELECT SUM(amount) as Saldo, product_name FROM `cuentas_movimientos` WHERE `gestor`= ? GROUP BY product_name', [CVL], (err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})



module.exports = router;