<?php
if(isset($_POST['accion'])){
    $arrayParam = $_REQUEST;
    require_once '../controladoresEspecificos/ControladorUsuario.php';
    $cU = new ControladorUsuario();
    $paramCambiarClave = ["clave_usuario"=>base64_decode(base64_decode($arrayParam["nuevoPass"])), "id_usuario"=>$arrayParam["id_usuario"]];
    $respuesta =$cU->cambiarClave($paramCambiarClave); 
    echo json_encode($respuesta);
}else if (isset($_POST['user'])) {
    $usuario = $_POST['user'];
    if (isset($_POST['pass'])) {
        $clave = $_POST['pass'];
        require_once '../controladoresEspecificos/ControladorUsuario.php';
        $cU = new ControladorUsuario();
        $us = base64_decode(base64_decode($usuario));
        $pa = base64_decode(base64_decode($clave));
        $res =$cU->validarUsuarioClave($us, $pa); 
        echo json_encode($res);
    }
}

