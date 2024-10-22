// permite acesso apenas se o usuário estiver logado
const verificarUserLogado = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

const redirecionarAutenticados = (req, res, next) => {
    if (req.session.userId) return res.redirect('/dashboard');
    next();
    };

module.exports = {
  verificarUserLogado,
  redirecionarAutenticados
};
