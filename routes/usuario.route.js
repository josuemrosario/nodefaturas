const express = require('express');
const router = express.Router();
const {
    getUsuario,
    createUsuario,
    deleteUsuario,
} = require('../controllers/usuario.controller');

router.get('/', getUsuario);
router.get('/criar', createUsuario);
router.get('/deletar', deleteUsuario);

module.exports = router;