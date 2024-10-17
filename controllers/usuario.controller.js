// Necessario importar sempre que for usar o modelo usuario
const Usuario = require('../models/usuario.model');
const { body, validationResult } = require('express-validator');



// cria um usuario (hard coded por enquanto)
// const createUsuario = async (req, res) => {
//     await Usuario.create({
//         email: 'joao@mail.com',
//         password: '1234',
//     });
//     res.render('Usuario', { mensagem: 'Usuario Criado', usuario: null });
// };


// obtem um usuario
// const getUsuario = async (req, res) => {
//     const usuario = await Usuario.findOne({ email: 'joao@mail.com' });
//     res.render('Usuario', { mensagem: 'Usuario Recuperado', usuario: usuario });
// };


// Exclui um usuario
// const deleteUsuario = async (req, res) => {
//     await Usuario.findOneAndDelete({ email: 'joao@mail.com' });
//     res.render('Usuario', { mensagem: 'Usuario deletado', usuario: null });
// };

//valida o cadastro do usuario
const validarCadastro = [
    body('email', 'Email não pode ser vazio').notEmpty(),
    body('senha', 'Senha não pode ser vazia').notEmpty(),
    body('senha', 'Senha deve ter mais de 6 caracteres').isLength({ min: 6 }),
    body('repetirSenha', 'Repita a senha').notEmpty(),
    body('repetirSenha', 'Senhas sao diferentes').custom((value, { req }) => (value === req.body.password)),
    ];


// cadastra um usuario
const cadastrarUsuario = async (req, res) => {
    
    //Verifica se a validacao esta ok antes de 
    //cadastrar efetivamente o usuario
    const errosValidacao = validationResult(req);
    if (!errosValidacao.isEmpty()) {
        const erros = errosValidacao.array();
        req.flash('erros', erros);
        return res.redirect('/cadastrar');
    }


    // obter o email e a senha informada no formulario
    const { email, senha } = req.body;
    
    // monta a query de verificação do email
    const query = { email };
        
    // pesquisa no mongoDB se o email já existe
    const usuarioExiste = await User.findOne(query);
    
    if (usuarioExiste) {
    
        // Email já está cadastrado
        res.redirect('/cadastrar');
    
    } else {
        
        // Encripta (cria o hash) a senha informada e cria o novo usuario
        const hashSenha = await bcrypt.hash(senha, 10);
        const novoUsuario = {
            email,
            password: hashSenha,
        };
        const result = await Usuario.create(novoUsuario);
        
        //userid da sessão
        req.session.userId = result._id;
        
        
        // redireciona para a pagina principal
        res.redirect('/dashboard');
    }
};
    


// Exporta as funcoes para uso de outros módulos
module.exports = {
    // getUsuario,
    // createUsuario,
    // deleteUsuario,
    cadastrarUsuario,
    validarCadastro
};
