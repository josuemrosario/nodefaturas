const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/dashboard', { titulo: 'Dashboard' });
});

module.exports = router;
