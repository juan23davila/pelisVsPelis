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
// // Obtiene todos los generos existentes para listarlos.
// app.get('/generos', recomendadorController.getGenders);
// //Obtiene las recomendaciones para el usuario.
// app.get('/peliculas/recomendacion', recomendadorController.getRecommendations);
// //Obtiene todas las peliculas dado un Id.
// app.get('/peliculas/:id', recomendadorController.getMoviesById);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});