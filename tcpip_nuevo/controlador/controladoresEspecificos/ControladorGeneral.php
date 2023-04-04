<?php
require_once '../persistencia/ControladorPersistencia.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorGeneral
 *
 * @author Flaco
 */
abstract class ControladorGeneral {
    protected $refControladorPersistencia;
    function __construct() {
        $this->refControladorPersistencia = new ControladorPersistencia();
    }
    //public abstract function guardar($datosCampos);
    public abstract function agregar($datosCampos);
    public abstract function modificar($datosCampos);
    public abstract function eliminar($datosCampos);
    public abstract function buscar();
}
