const express = require("express");
const router = express.Router();
const {
  mostrarFaturas,
  validarFatura,
  obterClientes,
  criarFatura,
  editarFatura,
  atualizarFatura,
  deletarFatura,
} = require("../controllers/fatura.controller");

router.get("/", mostrarFaturas);

router.get("/criar", obterClientes, (req, res) => {
  const { clientes } = req;
  // console.log('reg ===>',clientes)
  res.render("pages/fatura", {
    titulo: "Criar Fatura",
    formAction: "criar",
    tipo: "form",
    clientes,
    fatura: req.flash("data")[0],
    erros: req.flash("erros"),
  });
});

router.post("/criar", validarFatura, criarFatura);

router.get("/:id/editar", obterClientes, editarFatura);
router.post("/:id/editar", validarFatura, atualizarFatura);
router.post("/:id/deletar", deletarFatura);

module.exports = router;
