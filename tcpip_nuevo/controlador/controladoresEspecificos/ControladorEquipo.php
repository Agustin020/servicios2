<?php
require_once 'ControladorGeneral.php';
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
class ControladorEquipo extends ControladorGeneral{
    public function buscar() {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_EQUIPO);
            $arrayTipoForms = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayTipoForms;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function eliminar($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $fecha=time() - (5 * 60 * 60); // le resto 5 horas a la fecha para que me dé la hora argentina
            $fechaRestada=date('Y-m-d H:i:s',$fecha);
            $arrayEquipo = ["fecha_baja_equipo"=>$fechaRestada, "id_equipo"=>$id];
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_EQUIPO, $arrayEquipo);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayEquipo;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }
    
    public function buscarX (){
        
    }
    
    public function guardar($datosCampos) {
        session_start();
        $idUser = $_SESSION["id_usuario"];
        $fecha = time() - (5 * 60 * 60); // le resto 5 horas a la fecha para que me dé la hora argentina
        $fechaActual = date('Y-m-d H:i:s',$fecha);
        if($datosCampos['id_equipo'] == 0) { // si id=0 entonces es agregar
            try {
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $paramEquipo = ["descripcion_equipo"=>$datosCampos["descripcion"], 
                    "fecha_alta_equipo"=>$fechaActual , "fecha_baja_equipo"=>"0000-00-00 00:00:00"];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_EQUIPO, $paramEquipo);
                $idEquipo = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ULTIMO_EQUIPO);
                $id = $idEquipo->fetchColumn();
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
            }catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        } else { //si entra acá es para modificar
            try {
                //var_dump($datosCampos);
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $paramEquipo = ["descripcion_equipo"=>$datosCampos["descripcion"], 
                    "fecha_alta_equipo"=>$fechaActual , "fecha_baja_equipo"=>"0000-00-00 00:00:00",
                    "id_equipo"=>$datosCampos["id_equipo"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ACTUALIZAR_EQUIPO, $paramEquipo);
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
                $id = $datosCampos["id_equipo"];
            }catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        }
        $respuesta = $this->getEquipo($id);
        return $respuesta;
    }
    
    public function getEquipo($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_EQUIPO,array($id));
            $equipo = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $equipo;

    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }

}
