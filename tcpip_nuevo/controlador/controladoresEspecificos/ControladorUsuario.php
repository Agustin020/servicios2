<?php

require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorUsuario
 *
 * @author Flaco
 */
class ControladorUsuario extends ControladorGeneral {

    public function agregar($datosCampos) {
        
    }

    public function cambiarClave($datosCampos) {
        $fecha = time() - (5 * 60 * 60); // le resto 5 horas a la fecha para que me dé la hora argentina
        $fechaActual = date('Y-m-d H:i:s', $fecha);
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $paramCambiarClave = ["clave_usuario" => sha1($datosCampos["clave_usuario"]), "fch_modificacion" => $fechaActual, "id_usuario" => $datosCampos["id_usuario"]];
            //var_dump($paramCambiarClave);
            //$ppp = ["clave_usuario"=> "pepe", "fch_modificacion"=>"2015-09-10 23:01", "id_usuario"=>8];
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::MODIFICAR_USUARIO_CLAVE, $paramCambiarClave);
            $ultimoUsuario = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ULTIMO_USUARIO);
            $idUltimoUser = $ultimoUsuario->fetchColumn();
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            //return $this->getUsuario($idUltimoUser);
            $rtaCambio = ["cambio" => "ok"];
            return $rtaCambio;
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        }
    }

    public function buscar() {//funcion utilizada para buscar en la base de datos a todos los asistentes para proceder con
        //    su listado
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_USUARIOS); //paso los datos correspondientes a la función ejecutar sentencia
            //para buscar a los asistentes
            $arrayUsuario = $statement->fetchAll(PDO::FETCH_ASSOC); //retorna un array asociativo para no duplicar datos
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayUsuario; //regreso el array para poder 
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        }
    }

    public function eliminar($id) {
        try {
            $fecha = time(); //coloca la fecha actual           
            $fechaFormato = date('Y-m-d H:i:s'); //formateo la fecha para guardar en la bd

            $this->refControladorPersistencia->get_conexion()->beginTransaction(); //comienzo la transacción

            $paramUsuario = ["fch_baja" => $fechaFormato, "id_usuario" => $id]; //uso los datos obtenidos para buscar en la bd de datos todos los datos el ususrio

            $usuarioConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_USUARIO, $paramUsuario); //Envio los datos a la base de datos para eliminar el usuario          
            $this->refControladorPersistencia->get_conexion()->commit(); //ejecuto la acción para eliminar de forma lógica a los ususario
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
    }

    public function buscarUsuarioXId($datos) {//este método es el encargado de realiza la busqueda del último usuario insertado       
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();
            $paramUsuario = ["id_usuario" => $datos]; //uso los datos obtenidos para buscar en la bd de datos todos los datos el ususrio

            $usuarioConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_USUARIO_ID, $paramUsuario);
            $arrayUsuario = $usuarioConsulta->fetchAll(PDO::FETCH_ASSOC); //utilizo el FETCH_ASSOC para que no repita los campos

            $this->refControladorPersistencia->get_conexion()->commit(); //realizo el commit para obtener los datos

            return $arrayUsuario; //regreso el array de usuario que necesito para mostrar los datos que han sido almacenados en la base de datos.
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
    }

    public function guardar($datosCampos) {
        $fecha = time(); //coloca la fecha actual
        $fechaFormato = date('Y-m-d H:i:s', $fecha); //formateo la fecha para guardar en la bd
        $passSha = sha1("123"); //$passMd5= md5($datosCampos["pass"]); BILYK???????
        if ($datosCampos['acceso'] == "total") {
            $acceso = 1;
        } else if ($datosCampos['acceso'] == "restringido") {
            $acceso = 0;
        } else {
            $acceso = 2;
        }
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            if (!($datosCampos["id_cliente"] == null || $datosCampos["id_cliente"] == "")) {
                $paramAddUser = ["nombre_usuaio" => $datosCampos["nUsuario"],
                "apellido_usuario" => $datosCampos["aUsuario"],
                "usuario_usuario" => $datosCampos["usuario"],
                "clave_usuario" => $passSha,
                "tipoAcceso_usuario" => $acceso,
                "fch_creacion" => $fechaFormato,
                "fch_modificacion" => '0000-00-00 00:00:00',
                "fch_baja" => '0000-00-00 00:00:00',
                "id_cliente_usuario"=>$datosCampos["id_cliente"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_USUARIO_EMPRESA, $paramAddUser);
                $idUser = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ULTIMO_USUARIO);
                $id = $idUser->fetchColumn();
            }else{
                $paramAddUser = ["nombre_usuaio" => $datosCampos["nUsuario"],
                "apellido_usuario" => $datosCampos["aUsuario"],
                "usuario_usuario" => $datosCampos["usuario"],
                "clave_usuario" => $passSha,
                "tipoAcceso_usuario" => $acceso,
                "fch_creacion" => $fechaFormato,
                "fch_modificacion" => '0000-00-00 00:00:00',
                "fch_baja" => '0000-00-00 00:00:00',
                "id_cliente_usuario"=>null];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_USUARIO, $paramAddUser);
                $idUser = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ULTIMO_USUARIO);
                $id = $idUser->fetchColumn();
            }
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        $respuesta = $this->getUsuario($id);
        return $respuesta;
    }

    public function ultimoUsuario() {
        try {

            $this->refControladorPersistencia->get_conexion()->beginTransaction();
            $usuarioConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ULTIMO_USUARIO); //en esta consulta busco cual es el ultimo usuario            
            $arrayUsuario = $usuarioConsulta->fetchAll(PDO::FETCH_ASSOC); //utilizo el FETCH_ASSOC para que no repita los campos

            $this->refControladorPersistencia->get_conexion()->commit(); //realizo el commit de los datos a la base de datos
            $idUsuario = ""; //creo una variable para poder enviar los datos al metodo correpondiente
            foreach ($arrayUsuario as $id) {//recorro el array que contiene los datos que necesito para buscarl el ultimo usuario
                foreach ($id as $clave => $value) {//recorro los datos dentro del array y obtengo el valor que necesito
                    $idUsuario = $value; //asigno el valor correspondiente a la variable creada anteriormente para tal caso
                }
            }

            //envio los datos al metodo que se va a encargar de ralizar la consulta a la base de 
            //datos para obtener el último usiario registrado y devolver los datos para mostrarlos por pantalla
            $usuarioId = $this->buscarUsuarioXId($idUsuario); //lamo al metodo para obtener todos los datos del usuario que 
            //estoy buscando en este caso el último que se creo
            return $usuarioId; //regreso los datos de ese usuario a la llamada para enviarlos desde el ruteador a la vista
        } catch (PDOException $excepcionPDO) { //atrapo la excepcion por si algo salio mal que se realice el rollback           
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
    }

    public function modificar($datosCampos) {
        $fecha = time(); 
        $fechaFormato = date('Y-m-d H:i:s', $fecha); 
        if ($datosCampos['acceso'] == "total") {
            $acceso = 1;
        } else if ($datosCampos['acceso'] == "restringido") {
            $acceso = 0;
        } else {
            $acceso = 2; //usuarios-empresa
        }
        try {
            if ($acceso == 2) {
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $paramUsuario = ["nombre_usuaio" => $datosCampos["nUsuario"],
                "apellido_usuario" => $datosCampos["aUsuario"],
                "usuario_usuario" => $datosCampos["usuario"],
                "tipoAcceso_usuario" => $acceso,
                "fch_modificacion" => $fechaFormato,
                "fch_baja" => '0000-00-00 00:00:00',
                "id_cliente_usuario"=>$datosCampos["id_cliente"],
                "id_usuario" => $datosCampos["id"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::MODIFICAR_USUARIO_EMPRESA, $paramUsuario);
                $this->refControladorPersistencia->get_conexion()->commit();             
                $id = $datosCampos["id"];
                $respuesta = $this->getUsuarioEmpresa($id);
            }else{
                $this->refControladorPersistencia->get_conexion()->beginTransaction();
                $paramUsuario = ["nombre_usuaio" => $datosCampos["nUsuario"],
                "apellido_usuario" => $datosCampos["aUsuario"],
                "usuario_usuario" => $datosCampos["usuario"],
                "tipoAcceso_usuario" => $acceso,
                "fch_modificacion" => $fechaFormato,
                "fch_baja" => '0000-00-00 00:00:00',
                "id_cliente_usuario"=>null,
                "id_usuario" => $datosCampos["id"]];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::MODIFICAR_USUARIO, $paramUsuario);
                $this->refControladorPersistencia->get_conexion()->commit();
                $id = $datosCampos["id"];
                $respuesta = $this->getUsuario($id);
            }
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $respuesta;
    }

    public function validarUsuarioClave($user, $pass) {

        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::CHECK_USER, array($user));
            $resultado = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            if (!$resultado) { //no exste usuario
                session_start();
                session_destroy();
                return $res = ["falla" => "user"];
            } else if ((strcasecmp($resultado['clave_usuario'], sha1($pass))) == 0) {
                if (strcasecmp($pass, "123") == 0) {// primer ingreso, debe cambiar la contraseña
                    //por ahora está igual, pero cambiar
                    session_start();
                    $_SESSION["usuario_usuario"] = $user;
                    $_SESSION["id_usuario"] = $resultado['id_usuario'];
                    $_SESSION["tipoAcceso_usuario"] = $resultado['tipoAcceso_usuario'];
                    $_SESSION["id_cliente_usuario"] = $resultado['id_cliente_usuario'];
                    return $res = ["usuario_usuario" => $user, "id_usuario" => $resultado['id_usuario'], "tipoAcceso_usuario" => $resultado['tipoAcceso_usuario'], "cambiarClave" => "cambiar"];
                } else {//ya la ha cambiado, ingreso correcto
                    session_start();
                    $_SESSION["usuario_usuario"] = $user;
                    $_SESSION["id_usuario"] = $resultado['id_usuario'];
                    $_SESSION["tipoAcceso_usuario"] = $resultado['tipoAcceso_usuario'];
                    $_SESSION["id_cliente_usuario"] = $resultado['id_cliente_usuario'];
                    return $res = ["usuario_usuario" => $user, "id_usuario" => $resultado['id_usuario'], "tipoAcceso_usuario" => $resultado['tipoAcceso_usuario']];
                }
            } else {
                session_start();
                session_destroy();
                return $res = ["falla" => "pass", "pass" => sha1($pass), "passbd" => $resultado['clave_usuario']];
            }
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        }
    }

    public function getUsuario($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_USUARIO_ID, array($id));
            $user = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $user;
    }

    public function getUsuarioEmpresa($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_USUARIO_ID_EMPRESA, array($id));
            $user = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
        } catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: " . $excepcionPDO->getTraceAsString() . '<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack(); //si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $user;
    }
}