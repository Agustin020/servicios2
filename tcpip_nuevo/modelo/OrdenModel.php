<?php
require_once('../../controlador/persistencia/Conexion.php');

class mdlOrdenes extends Conexion
{
   
    public function mostrarOrdenes()
    {
        $sql = "SELECT * FROM orden";
        $resultado = $this->conexion->query($sql);
        $listaOrdenes = $resultado->fetch_all(MYSQLI_ASSOC);
        return $listaOrdenes;
    }
    
}