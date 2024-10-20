const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/dashboard', 
        { 
            titulo: 'Dashboard',
            info: req.flash('info')[0],

        });
});

module.exports = router;
