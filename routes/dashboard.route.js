const express = require('express');
const router = express.Router();
const clientesRouter = require('./cliente.route');

router.get('/', (req, res) => {
    res.render('pages/dashboard', 
        { 
            titulo: 'Dashboard',
            info: req.flash('info')[0],

        });
});

router.use('/clientes',clientesRouter); // rota dashboard/clientes

module.exports = router;
