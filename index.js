const http = require("http");
const porta = 3000;
const express = require("express");
const app = express();
const morgan = require("morgan");
const usuarioRoutes = require("./routes/usuario.route");
const session = require("express-session"); // Middleware usado para autenticacao
const flash = require("connect-flash"); // deve ser chamada depois de express-session.
const dashboardRoutes = require("./routes/dashboard.route");

//middlewares
const { verificarUserLogado } = require("./libs/middleware");

// configurações iniciais
app.use(morgan("dev"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());

require("dotenv").config();
require("./libs/dbconnect");

//configuracao de sessão (express session)
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);

// app.get('/', (req, res) => {
//     // res.send('rota raiz');
//     res.render('index',{mensagem:'rota raiz'})
// });

// app.get('/contato', (req, res) => {
//     // res.send('rota contato');
//     res.render('index',{mensagem:'rota contato'})
// });

// app.get('/sobre', (req, res) => {
//     // res.send('rota sobre');
//     res.render('index',{mensagem:'rota sobre'})
// });

// //rotas de usuario
// app.use('/usuarios', usuarioRoutes);

app.use("/", usuarioRoutes);
app.use("/dashboard", verificarUserLogado, dashboardRoutes);

app.get("*", (req, res) => {
  // res.status(404).send('Rota nao encontrada');
  res.status(404).render("index", { mensagem: "Rota nao encontrada" });
  console.log("rota nao encontrada");
});

// Coloca o servidor no ar
app.listen(porta, () => {
  console.log("Servidor rodando");
  console.log("Endereco: http://localhost:" + porta);
});
