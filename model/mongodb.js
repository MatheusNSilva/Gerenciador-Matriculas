const Mongoose = require('Mongoose');

const db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log('Conectado ao MongoDB.')
    
});

Mongoose.connect('mongodb://localhost/test');
const Mongoose = require('Mongoose');
const disciplinaSchema = new Mongoose.Schema({
    nome: { type: String },
    horario: '',
    hasCreditCookie: Boolean
});

const Disciplina = Mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina; 

const alunoSchema = new Mongoose.Schema({
    "_id" : ObjectId("5b21a4332a5e3333cc64a12f"), 
    "nome" : "João",
});
