const http = require('http');
const porta = 3000
const express = require('express');
const app = express();
const morgan = require('morgan');


// configurações iniciais
app.use(morgan('dev'));
app.set('views', './views');
app.set('view engine', 'ejs');


// rotas da aplicacao

app.get('/', (req, res) => {
    // res.send('rota raiz');
    res.render('index',{mensagem:'rota raiz'})
});

app.get('/contato', (req, res) => {
    // res.send('rota contato');
    res.render('index',{mensagem:'rota contato'})
});

app.get('/sobre', (req, res) => {
    // res.send('rota sobre');
    res.render('index',{mensagem:'rota sobre'})
});

app.get('*', (req, res) => {
    // res.status(404).send('Rota nao encontrada');
    res.status(404).render('index',{mensagem:'Rota nao encontrada'})
    console.log('rota nao encontrada')
});

// Coloca o servidor no ar
app.listen(porta, () => {
    console.log('Servidor rodando');
    console.log('Endereco: http://localhost:'+porta);
});
