-- Se crea entidad de competencia
CREATE TABLE IF NOT EXISTS `competencias`.`competencia` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- Se inserta datos a la entidad competencia
INSERT INTO `competencia` (`id`, `nombre`) VALUES ('1', '¿Qué drama te hizo llorar más?');
INSERT INTO `competencia` (`id`, `nombre`) VALUES ('2', '¿Cuál comedia te hizo reir más?');
INSERT INTO `competencia` (`id`, `nombre`) VALUES ('3', '¿Cuál es la mejor película de Leonardo DiCaprio?');
INSERT INTO `competencia` (`id`, `nombre`) VALUES ('4', '¿Cuál documental te pareció más interesante?');