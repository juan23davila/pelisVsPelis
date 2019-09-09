/** 
 * Import connection
 */
var connec = require('../lib/conectionBD');

/**
 * Obtiene las competencias de base de datos
 */
function getCompetitions(req, res) {
    // Se crea consulta para obtener todas las competencias
    var sql = "SELECT * FROM competencia";

    //se ejecuta la consulta
    connec.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta de todas las competencias", error.message);
            return res.status(404).send("Hubo un error en la consulta Todas las competencias");
        }//si no se encontró ningún resultado, se envía un mensaje con el error
        if (resultado.length == 0) {
            console.log("No se encontraron competencias");
            return res.status(404).send("No se encontraron competencias");
        }else{
            //se envía la respuesta
            res.send(JSON.stringify(resultado)); 
        }
    });
}

function buildCopetitionQuery(id){
    return "SELECT * FROM competencia\n"+
           "WHERE id ="+id;
}


/**
 * Obtiene las dos opciones de películas a enfrentarse
 */
function getMovieOptions(req, res){
    // Se obtiene identificador de la copetencia
    const idCompetition = req.params.id;

    // Consulta para obtener la competencia
    let sqlCompetition = buildCopetitionQuery(idCompetition);
                          
    //Se consulta la competencia
    connec.query(sqlCompetition, function(error, resultadoComp, fields) {
        // si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta: ", error.message);
            return res.status(500).send("Hubo un error en la consulta: "+error.message);
        }// si no se encontró ningún resultado, se envía un mensaje con el error
        if (resultadoComp.length == 0) {
            console.log("No se encontró competencia");
            return res.status(404).send("No se encontró competencia");
        }else{
            // Consulta para obtener las dos películas para votar   
            let fieldsMovieOptions = "pelicula.*";
            let tablesMovieOptions = "pelicula"
            let whereMovieOptions = "\nWHERE 1 = 1";
            
            // Se valida si la competencia tiene en cuenta el director
            if(resultadoComp[0].director_id){
                tablesMovieOptions += ", director_pelicula"; 
                whereMovieOptions += "\nAND director_pelicula.pelicula_id = pelicula.id"
                whereMovieOptions += "\nAND director_pelicula.director_id = "+resultadoComp[0].director_id;
            }
            // Se valida si la competencia tiene en cuenta el actor
            if(resultadoComp[0].actor_id){
                tablesMovieOptions += ", actor_pelicula"; 
                whereMovieOptions += "\nAND actor_pelicula.pelicula_id = pelicula.id";
                whereMovieOptions += "\nAND actor_pelicula.actor_id = "+resultadoComp[0].actor_id;
            }
            // Se valida si la competencia tiene en cuenta el género
            if(resultadoComp[0].genero_id){
                whereMovieOptions += "\nAND genero_id = "+resultadoComp[0].genero_id;
            }

            var endMovieOptions = "\norder by RAND()"+
                               "\nLIMIT 2"

            let sqlMovies = "SELECT "+fieldsMovieOptions+
                            "FROM "+tablesMovieOptions+
                            whereMovieOptions + endMovieOptions;

            //Se consulta las dos peliculas a competir
            connec.query(sqlMovies, function(error, resultado, fields){
                // si hubo un error, se informa y se envía un mensaje de error
                if (error) {
                    console.log("Hubo un error en la consulta: ", error.message);
                    return res.status(500).send("Hubo un error en la consulta: "+error.message);
                }// si no se encontró ningún resultado, se envía un mensaje con el error
                if (resultado.length < 2) {
                    console.log("No se encontró películas para competir");
                    return res.status(404).json("No se encontró películas para competir");
                }else{
                    var response = {
                        'competencia': resultadoComp[0].nombre,
                        'peliculas': resultado
                    };

                    res.send(JSON.stringify(response));
                }
            });                
        }
    });
}

/**
 * Adiciona un voto a una competencia
 */
function setVote(req, res){
    const idCompetencia = req.params.idCompetencia;
    const idMovie = req.body.idPelicula;

    // Se valida existencia de competencia
    let sqlCompExist = 'SELECT * FROM competencia where id ='+idCompetencia;
    connec.query(sqlCompExist, function(error, result, fields){
        // si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta: ", error.message);
            return res.status(500).send("Hubo un error en la consulta: "+error.message);
        }// si no se encontró ningún resultado, se envía un mensaje con el error
        if (result.length == 0) {
            console.log("No existe competencia");
            return res.status(404).json("No existe competencia");
        }else{
            // Se valida existencia de película
            let sqlMovieExist = 'SELECT * FROM pelicula where id ='+idMovie;
            console.log('sqlMovieExist: '+sqlMovieExist);
        
            connec.query(sqlMovieExist, function(error, result, fields){
                // si hubo un error, se informa y se envía un mensaje de error
                if (error) {
                    console.log("Hubo un error en la consulta: ", error.message);
                    return res.status(500).send("Hubo un error en la consulta: "+error.message);
                }// si no se encontró ningún resultado, se envía un mensaje con el error
                if (result.length == 0) {
                    console.log("No existe película");
                    return res.status(404).json("No existe película");
                }else{
                    // Se inserta voto
                    let insertQuery = 'INSERT INTO voto (competencia_id, pelicula_id) VALUES ('+idCompetencia+','+idMovie+')';

                    connec.query(insertQuery, function(error, result, fields){
                        res.json(result);
                    });
                }
            });
        }
    });
}

/**
 * Obtiene los resultados de la cotación de una competencia
 */
function getResults(req, res){

    const idCompetition = req.params.id;
    
    // Se crea consulta para obtener todas las competencias
    var sqlCompetition = "SELECT * FROM competencia where id ="+idCompetition;

    //se ejecuta la consulta
    connec.query(sqlCompetition, function(errorCompetencia, resultsCompetencia, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (errorCompetencia) {
            console.log("Hubo un error en la consulta de competencias: "+errorCompetencia.message);
            return res.status(505).send("Hubo un error en la consulta de competencias: "+errorCompetencia.message);
        }//si no se encontró ningún resultado, se envía un mensaje con el error
        if (resultsCompetencia.length == 0) {
            console.log("No existe competencia");
            return res.status(404).send("No existe competencia");
        }else{
            var sqlResults = "SELECT voto.pelicula_id idPelicula, pelicula.poster, pelicula.titulo, count(voto.id) votos"+
                             "\nFROM voto, pelicula"+
                             "\nWHERE voto.pelicula_id = pelicula.id"+
                             "\nAND voto.competencia_id = "+idCompetition+
                             "\nGROUP BY voto.pelicula_id"+
                             "\nORDER BY votos desc";

            console.log(sqlResults);

            connec.query(sqlResults, function(errorVotos, resultVotos, fields){
                // si hubo un error, se informa y se envía un mensaje de error
                if (errorVotos) {
                    console.log("Hubo un error en la consulta de resultados: "+errorVotos.message);
                    return res.status(500).send("Hubo un error en la consulta de resultados: "+errorVotos.message);
                }// si no se encontró ningún resultado, se envía un mensaje con el error
                if (resultVotos.length == 0) {
                    console.log("No existen votos para la competencia "+idCompetition);
                    return res.status(404).json("No existen votos para la competencia "+idCompetition);
                }else{
                    var response = {
                        'competencia': resultsCompetencia[0].competencia,
                        'resultados': resultVotos
                    };

                    res.send(JSON.stringify(response)); 
                }
            });
        }
    });
}

/**
 * Se crea una nueva competencia
 */
function setCompetition(req, res){

}


//se exportan las funciones creadas
module.exports = {
    getCompetitions: getCompetitions,
    getMovieOptions: getMovieOptions,
    setVote : setVote,
    getResults : getResults,
    setCompetition : setCompetition
};