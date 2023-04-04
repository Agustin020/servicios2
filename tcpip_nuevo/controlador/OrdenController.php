<?php

class OrdenController{
    public static function ctrMostrarOrdenes(){
        require_once("../modelo/OrdenModel.php");
        $mdlOrdenes = new mdlOrdenes(); 
        $listaOrdenes = $mdlOrdenes->mostrarOrdenes();
        require_once("../vista/html/orden2.php");
    }
}


?>