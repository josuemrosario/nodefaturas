const Cliente = require("../models/cliente.model");
const { body, validationResult } = require("express-validator");

const validarCliente = [
  body("nome", "Email não pode estar vazio").notEmpty(),
  body("email", "Email não pode estar vazio").notEmpty(),
  body("telefone", "Telefone não pode estar vazio").notEmpty(),
  body("endereco", "Endereço não pode estar vazio").notEmpty(),
];

const mostrarClientes = async (req, res) => {
  const query = { owner: req.session.userId };
  const dadosclientes = await Cliente.find(query);
  res.render("pages/cliente", {
    titulo: "Clientes",
    tipo: "dados",
    dadosclientes,
    info: req.flash("info")[0],
  });
};


module.exports = {
    mostrarClientes,
    validarCliente,
};