// Necessario importar sempre que for usar o modelo usuario
const Usuario = require('../libs/models/usuario.model');


// cria um usuario (hard coded por enquanto)
const createUsuario = async (req, res) => {
    await Usuario.create({
        email: 'joao@mail.com',
        password: '1234',
    });
    res.render('Usuario', { mensagem: 'Usuario Criado', usuario: null });
};


// obtem um usuario
const getUsuario = async (req, res) => {
    const usuario = await Usuario.findOne({ email: 'joao@mail.com' });
    res.render('Usuario', { mensagem: 'Usuario Recuperado', usuario: usuario });
};


// Exclui um usuario
const deleteUsuario = async (req, res) => {
    await Usuario.findOneAndDelete({ email: 'joao@mail.com' });
    res.render('Usuario', { mensagem: 'Usuario deletado', usuario: null });
};


// Exporta as funcoes para uso de outros módulos
module.exports = {
    getUsuario,
    createUsuario,
    deleteUsuario,
};
