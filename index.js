const http = require('http');
const porta = 3000

const server = http.createServer((req, res) => {
    //console.log('url: ',req.url);
    // res.end('inicio do projeto fatura');
    
    url = req.url //rota solicitada

    //Criando algumas rotas manualmente
    if(url === '/') {
        res.end('Rota raiz');
    } else if (url === '/contato') {
       res.end('Pagina de contato');
    } else if (url === '/sobre') {
       res.end('Pagina sobre');
    } else {
       res.writeHead(404) //rota nao cadastrada
       res.end('Rota nao cadastrada');
    }

});

server.listen(porta, () => {
    console.log('Servidor rodando');
    console.log('Endereco: http://localhost:'+porta);
});
