<?php
session_start();
$rta = ["id_usuario"=>$_SESSION["id_usuario"], 
    "usuario_usuario"=>$_SESSION["usuario_usuario"], 
    "tipoAcceso_usuario"=>$_SESSION["tipoAcceso_usuario"],
    "id_cliente_usuario"=>$_SESSION["id_cliente_usuario"]];
echo json_encode($rta);

