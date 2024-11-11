const express = require("express");
const router = express.Router();
const clientesRouter = require("./cliente.route");
const faturasRouter = require("./fatura.route");
const {
  mostrarDashboard
} = require("../controllers/dashboard.controller");

// router.get("/", (req, res) => {
//   res.render("pages/dashboard", {
//     titulo: "Dashboard",
//     info: req.flash("info")[0],
//   });
// });

router.get("/",mostrarDashboard)
router.use("/clientes", clientesRouter); // rota dashboard/clientes
router.use("/faturas", faturasRouter);

module.exports = router;
