const Cliente = require("../models/cliente.model");
const Fatura = require("../models/fatura.model");
const { BRReal } = require("../libs/formatter");
const { body, validationResult } = require("express-validator");

// Validacao da fatura
const validarFatura = [
  body("clienteRef", "Selecione o Cliente").notEmpty(),
  body("total", "Total não pode ser vazio").notEmpty(),
  body("data_vencto", "Data de vencimento não pode estar vazia").notEmpty(),
  body("status", "Selecione o Status").notEmpty(),
];

// Mostra as faturas cadastradas
const mostrarFaturas = async (req, res) => {
  const query = { usuarioRef: req.session.userId};
  const { pesquisar } = req.query;
  opcoesPopulate={path:"clienteRef"}

  if(pesquisar){
    opcoesPopulate['match'] = { nome: { $regex: pesquisar, $options: 'i' } };
  }

  const faturas = await Fatura.find(query).populate(opcoesPopulate);

  console.log("faturas ===>", faturas);

  res.render("pages/fatura", {
    titulo: "Faturas",
    tipo: "dados",
    faturas,
    BRReal, // Funcao que formata um numero em R$ Reais
    info: req.flash("info")[0],
  });
};

//Criando uma nova fatura
const criarFatura = async (req, res) => {
  const errosValidacao = validationResult(req);
  if (!errosValidacao.isEmpty()) {
    const erros = errosValidacao.array();
    req.flash("erros", erros);
    req.flash("dados", req.body);
    return res.redirect("criar");
  }
  const novaFatura = req.body;
  console.log("nova fatura: ", novaFatura);

  novaFatura.usuarioRef = req.session.userId;
  await Fatura.create(novaFatura);
  req.flash("info", {
    mensagem: "Nova Fatura Criada",
    tipo: "sucesso",
  });
  res.redirect("/dashboard/faturas");
};

const obterClientes = async (req, res, next) => {
  const Query = { usuarioRef: req.session.userId };
  const clientes = await Cliente.find(Query);
  // console.log("clientes ==>", clientes);
  req.clientes = clientes;
  next();
};

const editarFatura = async (req, res) => {
  const faturaId = req.params.id;
  const fatura = await Fatura.findById(faturaId).populate("clienteRef");
  const { clientes } = req;
  res.render("pages/fatura", {
    titulo: "Editar Fatura",
    tipo: "form",
    formAction: "editar",
    clientes,
    fatura: req.flash("data")[0] || fatura,
    erros: req.flash("erros"),
  });
};

const atualizarFatura = async (req, res) => {
  const errosValidacao = validationResult(req);
  if (!errosValidacao.isEmpty()) {
    const erros = validationErrors.array();
    req.flash("erros", erros);
    req.flash("data", req.body);
    return res.redirect("editar");
  }
  const faturaId = req.params.id;
  const dados = req.body;
  await Fatura.findByIdAndUpdate(faturaId, dados);
  req.flash("info", {
    mensagem: "Fatura Atualizada",
    tipo: "sucess",
  });
  res.redirect("/dashboard/faturas");
};

const deletarFatura = async (req, res) => {
  const faturaId = req.params.id;
  await Fatura.findByIdAndDelete(faturaId);
  req.flash("info", {
    mensagem: "Fatura Excluída",
    tipo: "success",
  });
  res.redirect("/dashboard/faturas");
};

module.exports = {
  validarFatura,
  mostrarFaturas,
  criarFatura,
  obterClientes,
  editarFatura,
  atualizarFatura,
  deletarFatura,
};
