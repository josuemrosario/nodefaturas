const express = require('express');
const router = express.Router();
const {
    // getUsuario,
    // createUsuario,
    // deleteUsuario,
    validarCadastro, //valida se os dado foram enviado corretamente
    cadastrarUsuario, // cadastra o usuario

} = require('../controllers/usuario.controller');

// router.get('/', getUsuario);
// router.get('/criar', createUsuario);
// router.get('/deletar', deleteUsuario);

router.get('/', (req, res) => {
    res.render('pages/index', 
        { 
            titulo: 'Faturas' 
        }
    );
});

router.get('/login', (req, res) => {
    res.render('pages/login', 
        {
            titulo: 'Fazer login',
        }
    );
});

router.get('/cadastrar', (req, res) => {
    res.render('pages/cadastrar', 
        {
            titulo: 'Cadastrar-se',
            erros: req.flash('erros'),
        }
    );
});

// quando o usuario clica no botao de cadastrar
// um POST com os dados são enviados. Nesse ponto
// as funcoes de validação (validarCadastro) são chamadas e logo em
// seguida o cadastro de usuários (cadastrarUsuario)
router.post('/cadastrar', validarCadastro, cadastrarUsuario);


module.exports = router;