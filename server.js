const express = require('express'); // require importa a biblioteca framework
const bodyParser = require('body-parser'); // importa biblioteca de parser.
const Disciplina = require('./model/Disciplina');
const app = express();// cria instância do express do modulo express


app.listen('3000', function() { console.log('escutando na porta 3000')
});// cria um servidor conectado na porta 3000

// configuracoes do express e midwares
app.set('view engine','ejs');// Altera o motor de template para ejs
app.use(bodyParser.json()) // habilita midware para parsear o body do post e adicionar na requisicao

//banco de dados
const alunos = [];
///


app.get('/aluno', function (request, response) {
    //Este handler serve para registar um novo aluno.
    //Desta forma, passamos um objeto aluno vazio para
    //a view.
    return response.json({ alunos: alunos });
});

app.post('/aluno', function(request, response) {
    const { nome, matricula } = request.body;

    const novoAluno = {
        nome: nome,
        matricula: matricula,
        _id: new Date().getTime(),
    }
    alunos.push(novoAluno);
    response.json(alunos);
});
