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
class ControladorOrden extends ControladorGeneral{
    public function buscar() { //buscarOrdenEmpresa
                $pepe=new prueba();
                $fecha=$pepe->fecha30();
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ORDEN, array($fecha));
            $arrayOrden = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayOrden;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function buscarOrdenEmpresa ($id) { 
        $array="%.%";
        $sentencia = DBSentencias::BUSCAR_ORDEN_POR_EMPRESA;
        if($id == "federacion"){
            $array="%-%";
        }else if($id== "allianz"){
          $sentencia = DBSentencias::BUSCAR_ORDEN_POR_EMPRESA_2; 
          $array="%-%";
        }
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia($sentencia, array($array));
            $arrayOrden = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayOrden;
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
            $arrayOrden = ["id_orden"=>$id];
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_ORDEN, $arrayOrden);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayOrden;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }
    
    public function buscarX (){
        try {   
            $this->refControladorPersistencia->get_conexion()->beginTransaction(); //comienza la transacción
            $idOrden = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::NUMERO_ULTIMA_ORDEN);
            $id = $idOrden->fetchColumn();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $id;
        
    }
    
    public function guardar($datosCampos) {
        session_start();
        $idUser = $_SESSION["id_usuario"];
        $fecha = time();
        $fechaActual = date('Y-m-d H:i:s',$fecha);
        if ($datosCampos["monto"]== "" || $datosCampos["monto"]== null) {
            $datosCampos["monto"]= 0;
        }
        if ($datosCampos["entregado"]== "" || $datosCampos["entregado"]== null) {
            $datosCampos["entregado"]= 0;
        }
//        if ($datosCampos["falla_cliente"]== "" || $datosCampos["falla_cliente"]== null) {
//            $datosCampos["falla_cliente"]= 0;
//        }
//        if ($datosCampos["observaciones"]== "" || $datosCampos["observaciones"]== null) {
//            $datosCampos["observaciones"]= 0;
//        }
//        if ($datosCampos["numero_siniestro"]== "" || $datosCampos["numero_siniestro"]== null) {
//            $datosCampos["numero_siniestro"]= 0;
//        }
        if($datosCampos['id_orden'] == 0) { // si id=0 entonces es agregar
            try {
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $paramOrden = ["numero_orden"=>$datosCampos["numero_orden"], 
                    "equipo_orden"=>$datosCampos["equipo"], 
                    "falla_cliente_orden"=>$datosCampos["falla_cliente"],
                    "observaciones_orden"=>$datosCampos["observaciones"],
                    "numero_siniestro_orden"=>$datosCampos["numero_siniestro"],
                    "monto_orden"=>$datosCampos["monto"],
                    "entregado_orden"=>$datosCampos["entregado"],
                    "id_estado"=>$datosCampos["id_estado"],
                    "id_usuario_orden"=>$datosCampos["id_usuario"],
                    "fecha_alta_orden"=>$fechaActual,
                    "id_cliente_orden"=>$datosCampos["id_cliente"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_ORDEN, $paramOrden);
                $idOrden = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ULTIMA_ORDEN);
                $id = $idOrden->fetchColumn();
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
                $paramOrden = ["numero_orden"=>$datosCampos["numero_orden"], 
                    "equipo_orden"=>$datosCampos["equipo"],
                    "falla_cliente_orden"=>$datosCampos["falla_cliente"],
                    "observaciones_orden"=>$datosCampos["observaciones"],
                    "numero_siniestro_orden"=>$datosCampos["numero_siniestro"],
                    "monto_orden"=>$datosCampos["monto"],
                    "entregado_orden"=>$datosCampos["entregado"],
                    "id_estado"=>$datosCampos["id_estado"],
                    "id_usuario_orden"=>$datosCampos["id_usuario"],
                    "id_cliente_orden"=>$datosCampos["id_cliente"],
                    "id_orden"=>$datosCampos["id_orden"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ACTUALIZAR_ORDEN, $paramOrden);
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
                $id = $datosCampos["id_orden"];
            }catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        }
        $respuesta = $this->getOrden($id);
        return $respuesta;
    }
    
    public function getOrden($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UNA_ORDEN,array($id));
            $orden = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $orden;

    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }

}