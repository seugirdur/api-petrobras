const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaUsuarios = require('./routes/usuarios')
const rotaRelatorios = require('./routes/relatorios')
const rotaProblems = require('./routes/problems')
const rotaSoluctions = require('./routes/soluctions')


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
     );

     if (req.method === 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
     }
     next();

});


app.use('/usuarios', rotaUsuarios);
app.use('/relatorios', rotaRelatorios);
app.use('/problems', rotaProblems);
app.use('/soluctions', rotaSoluctions);


//se ele naõ encontrar rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});
//lmao

module.exports = app;