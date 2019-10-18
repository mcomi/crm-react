const { Router } = require('express');
const router = Router();

router.get('/',(req, res) =>{
    const data = {
        "name": "MateoEstudio",
        "website": "www.mateoestudio.es"
    };
    res.json(data);
});

module.exports = router;