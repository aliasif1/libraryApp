const express = require('express');
const router = express.Router();

//set up index routes 
router.get('/',(req,res) => {
    res.render('index');
})


module.exports = router;