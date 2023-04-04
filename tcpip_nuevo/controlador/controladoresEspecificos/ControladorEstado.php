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
class ControladorEstado extends ControladorGeneral{
    public function buscar() {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ESTADO);
            $arrayEstado = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayEstado;
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
            $arrayEstado = ["fecha_baja_estado"=>$fechaRestada, "id_estado"=>$id];
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_ESTADO, $arrayEstado);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayEstado;
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
        if($datosCampos['id_estado'] == 0) { // si id=0 entonces es agregar
            try {
               
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $paramEstado = ["descripcion_estado"=>$datosCampos["descripcion"],"color_estado"=>$datosCampos["color"] ,
                    "fecha_alta_estado"=>$fechaActual , "fecha_baja_estado"=>"0000-00-00 00:00:00"];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_ESTADO, $paramEstado);
                $idEstado = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ULTIMO_ESTADO);
                $id = $idEstado->fetchColumn();
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
                $paramEstado = ["descripcion_estado"=>$datosCampos["descripcion"],"color_estado"=>$datosCampos["color"] , 
                    "fecha_alta_estado"=>$fechaActual , "fecha_baja_estado"=>"0000-00-00 00:00:00",
                    "id_estado"=>$datosCampos["id_estado"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ACTUALIZAR_ESTADO, $paramEstado);
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
                $id = $datosCampos["id_estado"];
            }catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        }
        $respuesta = $this->getEstado($id);
        return $respuesta;
    }
    
    public function getEstado($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_ESTADO,array($id));
            $estado = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $estado;

    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }

}