-- Se crea entidad de competencia
DROP TABLE IF EXISTS `competencias`.`competencia`;

CREATE TABLE IF NOT EXISTS `competencias`.`competencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `genero_id` INT(11) UNSIGNED NULL,
  `director_id` INT(11) UNSIGNED NULL,
  `actor_id` INT(11) UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_competencia_genero1_idx` (`genero_id` ASC),
  INDEX `fk_competencia_director1_idx` (`director_id` ASC),
  INDEX `fk_competencia_actor1_idx` (`actor_id` ASC),
  CONSTRAINT `fk_competencia_genero1`
    FOREIGN KEY (`genero_id`)
    REFERENCES `competencias`.`genero` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_competencia_director1`
    FOREIGN KEY (`director_id`)
    REFERENCES `competencias`.`director` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_competencia_actor1`
    FOREIGN KEY (`actor_id`)
    REFERENCES `competencias`.`actor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Se inserta datos a la entidad competencia
INSERT INTO `competencia` (`nombre`, `genero_id`, `director_id`, `actor_id`)
VALUES ('¿Qué drama te hizo llorar más?', 8,null,null),
       ('¿Cuál comedia te hizo reir más?', 5,null,null),
       ('¿Cuál es la mejor película de Leonardo DiCaprio?',null,null,1203),
       ('¿Cuál documental te pareció más interesante?',7,null,null),
       ('¿Cuál es la mejor pelicula dirigida por Woody Allen?', null, 3279, null),
       ('¿Cuál es la mejor pelicula dirigida por y Aaron Blaise, Robert Walker?', null, 3311, null);


CREATE TABLE IF NOT EXISTS `competencias`.`voto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `competencia_id` INT NOT NULL,
  `pelicula_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_voto_competencia1_idx` (`competencia_id` ASC),
  INDEX `fk_voto_pelicula1_idx` (`pelicula_id` ASC),
  CONSTRAINT `fk_voto_competencia1`
    FOREIGN KEY (`competencia_id`)
    REFERENCES `competencias`.`competencia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_voto_pelicula1`
    FOREIGN KEY (`pelicula_id`)
    REFERENCES `competencias`.`pelicula` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;