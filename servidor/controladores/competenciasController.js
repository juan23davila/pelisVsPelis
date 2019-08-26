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

//se exportan las funciones creadas
module.exports = {
    getCompetitions: getCompetitions
};