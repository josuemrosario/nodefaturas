const Cliente = require("../models/cliente.model");
const { body, validationResult } = require("express-validator");

const validarCliente = [
  body("nome", "Email não pode estar vazio").notEmpty(),
  body("email", "Email não pode estar vazio").notEmpty(),
  body("telefone", "Telefone não pode estar vazio").notEmpty(),
  body("endereco", "Endereço não pode estar vazio").notEmpty(),
];

const mostrarClientes = async (req, res) => {
  console.log(req.session.userId)
  const query = { usuarioRef: req.session.userId };
  const dadosclientes = await Cliente.find(query);
  res.render("pages/cliente", {
    titulo: "Clientes",
    tipo: "dados",
    dadosclientes,
    info: req.flash("info")[0],
  });
};

const cadastrarCliente = async (req, res) => {
  const errosValidacao = validationResult(req);
  if (!errosValidacao.isEmpty()) {
    const erros = errosValidacao.array();
    req.flash("erros", erros);
    req.flash("data", req.body);
    return res.redirect("cadastrar");
  }
  const novoCliente = req.body;
  novoCliente.usuarioRef = req.session.userId;
  await Cliente.create(novoCliente);
  req.flash("info", {
    mensagem: "Cliente Criado",
    type: "success",
  });
  res.redirect("/dashboard/clientes");
};

const editarCliente = async (req, res) => {
  const clienteId = req.params.id;
  const dadosCliente = await Cliente.findById(clienteId);
  res.render('pages/cliente', {
    titulo: 'Editar Cliente',
    tipo: 'form',
    formAction: 'editar',
    dadosCliente: req.flash('data')[0] || dadosCliente,
    erros: req.flash('errors'),
  });
};

const atualizarCliente = async (req, res) => {
  const errosValidacao = validationResult(req);
  if (!errosValidacao.isEmpty()) {
    const erros = errosValidacao.array();
    req.flash('erros', erros);
    req.flash('data', req.body);
    return res.redirect('editar');
  }
  const clienteId = req.params.id;
  const dadosCliente = req.body;
  await Cliente.findByIdAndUpdate(clienteId, dadosCliente);
  req.flash('info', {
    mensagem: 'Cliente Atualizado',
    tipo: 'successo'
  });
  res.redirect('/dashboard/clientes');
};

const deletarCliente = async (req, res) => {
  const clienteId = req.params.id
  await Cliente.findByIdAndDelete(clienteId);
  req.flash('info', {
    mensagem: 'Cliente excluido com sucesso',
    tipo: 'successo'
  });
  res.redirect('/dashboard/clientes');
};

module.exports = {
  mostrarClientes,
  validarCliente,
  cadastrarCliente,
  editarCliente,
  atualizarCliente,
  deletarCliente
};
