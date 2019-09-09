//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var competenciaController = require('./controladores/competenciasController');

 var app = express();

 app.use(cors());

 app.use(bodyParser.urlencoded({
     extended: true
 }));

 app.use(bodyParser.json());

//Obtiene todas las competencias sin filtro alguno.
app.get('/competencias', competenciaController.getCompetitions);
//Obtiene todas las competencias sin filtro alguno.
app.post('/competencias', competenciaController.setCompetition);
// Obtiene las dos opciones de película a enfrentar.
app.get('/competencias/:id/peliculas', competenciaController.getMovieOptions);
// Agrega voto a una competencia.
app.post('/competencias/:idCompetencia/voto', competenciaController.setVote);
// Obtiene las tres películas más votadas de una competencia
app.get('/competencias/:id/resultados', competenciaController.getResults);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});