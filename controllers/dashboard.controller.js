const Cliente = require("../models/cliente.model");
const Fatura = require("../models/fatura.model");
const { BRReal } = require("../libs/formatter");

const mostrarDashboard = async (req, res) => {
  //Obtendo dados para criacao dos cards
  const query = { usuarioRef: req.session.userId };
  const contagemFaturas = await Fatura.countDocuments(query);
  const contagemClientes = await Cliente.countDocuments(query);

  const todasFaturas = await Fatura.find(query).populate("clienteRef");

  console.log("todasFaturas:", todasFaturas);

  const totalPagas = todasFaturas.reduce((total, fatura) => {
    return fatura.status === "paga" ? total + fatura.total : total;
  }, 0);

  const totalPendentes = todasFaturas.reduce((total, fatura) => {
    return fatura.status === "pendente" ? total + fatura.total : total;
  }, 0);

  // obtendo dados para criacao do grafico
  const retornoDados = [];
  for (let i = 0; i < 6; i++) {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() - i);
    primeiroDia = new Date(hoje);
    primeiroDia.setDate(1);

    ultimodia = new Date(hoje);
    ultimodia.setMonth(ultimodia.getMonth() + 1);
    ultimodia.setDate(0);

    const mes = hoje.toLocaleString("default", { month: "short" });

    const retornoMensal = todasFaturas
      .filter((fatura) => {
        // datas do banco estão no formato dd/mm/yyyy
        // necessário corrigir antes de fazer testes

        datacorrigida = corrigeData(fatura.data_vencto);

        return datacorrigida >= primeiroDia && datacorrigida <= ultimodia;
      })
      .reduce((total, fatura) => total + fatura.total, 0);
    retornoDados.unshift({ mes, retorno: retornoMensal });
  }

  // obtendo dados das ultimas 5 faturas
  todasFaturas.sort((faturaAtual, proximaFatura) => {
    data_faturaAtual = corrigeData(faturaAtual.data_vencto);
    data_proximaFatura = corrigeData(proximaFatura.data_vencto);
    return data_proximaFatura - data_faturaAtual;
  });
  const ultimasFaturas = todasFaturas.slice(0, 5);

  res.render("pages/dashboard", {
    titulo: "Dashboard",
    retornoDados: JSON.stringify(retornoDados),
    contagemFaturas,
    contagemClientes,
    totalPagas,
    totalPendentes,
    ultimasFaturas,
    BRReal,
    info: req.flash("info")[0],
  });
};

function corrigeData(data) {
  const [dia, mes, ano] = data.split("/");
  return new Date(
    parseInt(ano),
    parseInt(mes) - 1, // no objeto Date o mes começa em zero
    parseInt(dia)
  );
}

module.exports = {
  mostrarDashboard,
};
