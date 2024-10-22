const express = require("express");
const router = express.Router();
const {
  // getUsuario,
  // createUsuario,
  // deleteUsuario,
  validarCadastro, //valida se os dado foram enviado corretamente
  cadastrarUsuario, // cadastra o usuario
  validarLogin,
  loginUsuario,
  logoutUsuario,
} = require("../controllers/usuario.controller");

const { redirecionarAutenticados } = require("../libs/middleware");

// router.get('/', getUsuario);
// router.get('/criar', createUsuario);
// router.get('/deletar', deleteUsuario);

router.get("/", (req, res) => {
  res.render("pages/index", {
    titulo: "Faturas",
    info: req.flash("info")[0],
  });
});

router.get("/login", redirecionarAutenticados, (req, res) => {
  res.render("pages/login", {
    titulo: "Fazer login",
    usuario: req.flash("data")[0],
    info: req.flash("info")[0],
    erros: req.flash("errors"),
  });
});

router.post("/login", validarLogin, loginUsuario);
router.get("/logout", logoutUsuario);

router.get("/cadastrar", (req, res) => {
  res.render("pages/cadastrar", {
    titulo: "Cadastrar-se",
    erros: req.flash("erros"),
    dadosPreenchidos: req.flash("dadosPreenchidos")[0],
  });
});

// quando o usuario clica no botao de cadastrar
// um POST com os dados são enviados. Nesse ponto
// as funcoes de validação (validarCadastro) são chamadas e logo em
// seguida o cadastro de usuários (cadastrarUsuario)
router.post("/cadastrar", validarCadastro, cadastrarUsuario);

module.exports = router;
