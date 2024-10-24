const express = require("express");
const router = express.Router();
const {
  mostrarClientes,
  validarCliente,
  cadastrarCliente,
  editarCliente,
  atualizarCliente,
  deletarCliente
} = require("../controllers/cliente.controller");

router.get("/", mostrarClientes);

router.get("/cadastrar", function (req, res) {
  res.render("pages/cliente", {
    titulo: "Cadastrar Cliente",
    formAction: "cadastrar",
    tipo: "form",
    dadosCliente: req.flash("data")[0], 
    erros: req.flash("erros"),
  });
});

router.post("/cadastrar", validarCliente, cadastrarCliente);

router.get('/:id/editar', editarCliente);
router.post('/:id/editar', validarCliente, atualizarCliente);


router.post('/:id/deletar', deletarCliente);

module.exports = router;
