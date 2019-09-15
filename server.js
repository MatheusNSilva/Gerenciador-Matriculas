const express = require('express'); // require importa a biblioteca framework
const bodyParser = require('body-parser'); // importa biblioteca de parser.
const app = express();// cria instância do express do modulo express



app.listen('3000', function() { console.log('escutando na porta 3000')
});// cria um servidor conectado na porta 3000

// configuracoes do express e midwares
app.set('view engine','ejs');// Altera o motor de template para ejs
app.use(bodyParser.json()) // habilita midware para parsear o body do post e adicionar na requisicao


//banco de dados
const alunos = [];
const disciplinas = [];
///


app.get('/aluno', function (request, response) {
    //Este handler serve para registar um novo aluno.
    //Desta forma, passamos um objeto aluno vazio para
    //a view.
    return response.json({ alunos: alunos });
    response.render("/");
});

app.post('/aluno', function(request, response) {
    const { nome, matricula } = request.body;

    const novoAluno = {
        nome: nome,
        matricula: new Date().getTime(),
        _id: new Date().getTime(),
    }
    alunos.push(novoAluno);
    response.json(alunos);
});

app.get('/disciplina', function (request, response) {
    //Registra

    return response.json({ disciplinas: disciplinas });
});

app.post('/disciplina', function(request, response) {
    const { nome, horas, gradeHorario } = request.body;

    const novaDisciplina = {
        aluno: [],
        nome: nome,
        horas: horas,
        gradeHorario: gradeHorario,
        _id: new Date().getTime()
    }
    verificaDuracaoAula(novaDisciplina);
    disciplinas.push(novaDisciplina);
    response.json(disciplinas);
});

app.post('/matricular', function(request, response) {
    const { alunoId, disciplinaId } = request.body;
    
    const aluno = alunos.find(aluno => aluno._id === alunoId);
    const disciplina = disciplinas.find(disciplina => disciplina._id === disciplinaId);
    verificaConflito(aluno, disciplina)
});


function verificaDuracaoAula(disciplina) {
    const horas = disciplina.horas;
    if (horas > 4 || horas < 1)
        console.log("Uma disciplina deve possuir entre 1 ou 4 horas de duração!");
}

function verificaGradeHorario(disciplina) {
    const gradeHorario = disciplina.gradeHorario;
    if (gradeHorario.legth > 3 || gradeHorario.legth < 1)
        console.log("Disciplinas devem ser cadastradas em até quatro dias diferentes."); 
} 

function verificaConflito (aluno, disciplinaEscolhida) {
    const disciplinasDoAluno = disciplinas.filter( disciplina => {
       return disciplina.alunos.includes(aluno._id);
    });
    
    if (!disciplinasDoAluno.length) return false;
    let temConflitos = false;

    disciplinasDoAluno.forEach( disciplina => {
        Object.keys(disciplina.gradeHorario).forEach( chave => {
            if (temConflitos) return false;
            const conflitos = disciplinaEscolhida.gradeHorario[chave].filter( horario => disciplina.gradeHorario[chave].includes(horario))
            if (conflitos.legth) 
                temConflitos = true;
        });
    });

    return temConflitos;
    
}