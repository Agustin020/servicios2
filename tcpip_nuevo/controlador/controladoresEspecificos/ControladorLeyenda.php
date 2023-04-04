<?php

require_once 'ControladorGeneral.php';
require_once 'prueba.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorTelefono
 *
 * @author Flaco
 */
class ControladorLeyenda extends ControladorGeneral {

    public function buscar() {
        $buscarPrueba = new prueba(); //objeto prueba para poder acceder a todas sus funciones
        (string) $tabla = get_class($this); //para no cambiar la lógica anterior... utilizo éste método para obtener el nombre de la tabla con la que me voy a comunicar en le BD
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction(); //comienza la transacción
            $busca = $buscarPrueba->buscar($tabla); //utilizo el método buscar en la BD para comenzar la busqueda de los datos en la tabla... demás esta decir que este es el método q mas va a cambiar y obviamente el que mas va a utilizar BDSentencias al tener que llamar varias tablas cuando sea necesario...
            $statement = $this->refControladorPersistencia->ejecutarSentencia($busca); //senencia armada desde la clase prueba sirve para comenzar la busqueda
            $arrayCombustible = $statement->fetchAll(PDO::FETCH_ASSOC); //retorna un array asociativo para no duplicar datos
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit             
        } catch (PDOException $excepcionPDO) {//si hay un error entro en el catch y caputra la excepcio PDO
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>'; //con esto muestro en un Trace donde se produjo el error
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback y no se impacta en la BD
        } catch (Exception $exc) {//en este catch captura cualquier otro tipo de excepcion
            echo "<br>Error :" . $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback y no impacta sobre la BD
        }
        return $arrayCombustible; //regreso el array para poder mostrar los datos en la vista... con Ajax... y dataTabel de JavaScript
    }

    public function eliminar($id) {
        $pepe = new prueba(); //genero el objeto de la clase prueba
        (string) $tabla = get_class($this); //consulto el nombre de la tabla
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction(); //comienzo la transacción
            $elimina = $pepe->eliminar($tabla, $id); //llamo al método respectivo con los datos necesarios para realizar la consulta
            $this->refControladorPersistencia->ejecutarSentencia($elimina); //Envio los datos al método correspondiente para completar la eliminación          
            $this->refControladorPersistencia->get_conexion()->commit(); //ejecuto la acción para eliminar de forma lógica los combustibles
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
    }

    public function buscarX($consulta) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($consulta);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $array;
    }

    public function guardar($datosCampos, $tabla) {
        $pepe = new prueba();
        $dato = $pepe->arrayString($datosCampos);
        $datos = $pepe->meta($tabla);
        $existencia = $pepe->verificarExistencia($tabla, $dato);       
        $this->refControladorPersistencia->get_conexion()->beginTransaction();
        $rtaVerif = $this->refControladorPersistencia->ejecutarSentencia($existencia);
        $existe = $rtaVerif->fetch();
        $this->refControladorPersistencia->get_conexion()->commit();
        if ($existe[0] == '0') {
            try {
                $array = $pepe->armarArray($datos, $datosCampos);
                $sentencia = $pepe->armarSentencia($datos, $tabla);
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $this->refControladorPersistencia->ejecutarSentencia($sentencia, $array);
                $ultimo = $pepe->buscarUltimo($tabla);
                $bUltimo = $this->refControladorPersistencia->ejecutarSentencia($ultimo);
                $id = $bUltimo->fetchColumn();
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
            } catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
            return $this->getComb($id);
        } else {
            try {
                $array = $pepe->armarArrayModi($datos, $datosCampos);
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $sentencia = $pepe->armarSentenciaModificar($datos, $tabla);
                $this->refControladorPersistencia->ejecutarSentencia($sentencia, $array);
                $ultimo = $pepe->buscarUltimo($tabla);
                $bUltimo = $this->refControladorPersistencia->ejecutarSentencia($ultimo);
                $id = $bUltimo->fetchColumn();
                $this->refControladorPersistencia->get_conexion()->commit();
            } catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        }/* else {
          return $id = ["incorrecto" => "incorrecto"];
          } */
    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {        
        
    }

    public function getComb($id) {
        $pepe = new prueba();
        (string) $tabla = get_class($this);
        $sentencia = $pepe->buscarId($id, $tabla);
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia($sentencia);
            $comb = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit  
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $comb;
    }

}