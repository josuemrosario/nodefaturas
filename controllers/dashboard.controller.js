const Cliente = require("../models/cliente.model");
const Fatura = require("../models/fatura.model");
const { BRReal } = require("../libs/formatter");


const mostrarDashboard = async (req, res) => {
  
    //Obtendo dados para criacao do grafico
  const query = { usuarioRef: req.session.userId };
  const contagemFaturas = await Fatura.countDocuments(query);
  const contagemClientes = await Cliente.countDocuments(query);

  const todasFaturas = await Fatura.find(query).populate("clienteRef");
  
  const totalPagas = todasFaturas.reduce((total, fatura) => {
    return fatura.status === "paga" ? total + fatura.total : total;
  }, 0);
  
  const totalPendentes = todasFaturas.reduce((total, fatura) => {
    return fatura.status === "pendente" ? total + fatura.total : total;
  }, 0);

  res.render('pages/dashboard', {
        titulo: 'Dashboard',
        contagemFaturas,
        contagemClientes,
        totalPagas,
        totalPendentes,
        BRReal,
        info: req.flash('info')[0]
    });

};

module.exports = {
  mostrarDashboard,
};
