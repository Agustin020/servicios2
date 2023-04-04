<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Conexion
 *
 * @author Flaco
 */
class Conexion {

    private $_conexion  =  "localhost";
    private $_usuario   = 'root';//'rk000488_base' ;
    private $_clave     = '';
    // ------------------------------
    protected $conexion;
    protected $dbhost = "localhost";
    protected $dbuser = "root";
    protected $dbpass = "";
    protected $dbname = "rk000488_base";

    public function __construct() {//rk000488_tcpip
        try {
            //estoy probando este PDO con utf8
            $this->_conexion = new PDO("mysql:dbname=rk000488_base;host=localhost", $this->_usuario, $this->_clave, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES  \'UTF8\'')); 
            
            $this->_conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //ANTE ERROR, LANZA UNA EXCEPCION
        } catch (PDOException $e) {
            file_put_contents("log/dberror.log", "Date: " . date('M j Y - G:i:s') . " ---- Error: " . $e->getMessage().PHP_EOL, FILE_APPEND);
            die($e->getMessage()); // Log and display error in the event that there is an issue connecting
        }
        //$pdo = new PDO('mysql:host= servidor; dbname=bd', $usuario, $clave, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES  \'UTF8\''))
        //  ----------------------------------------------------------------------------------------------------------------------------------------
        $this->conexion = new mysqli($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);

        if ($this->conexion->connect_errno) {
            echo 'Error al conectar la base de datos: ' . $this->conexion->connect_errno;
            return;
        }
        $this->conexion->set_charset('UTF8');
    }
    /**
     * 
     * @return PDO
     */
    public function getConexion() { 
        return $this->_conexion;
    }
    
    public function __destruct() {
        try {
            $this->_conexion=null; //Closes connection
        } catch (PDOException $e) {
            file_put_contents("log/dberror.log", "Fecha: " . date('M j Y - G:i:s') . " ---- Error: " . $e->getMessage().PHP_EOL, FILE_APPEND);
            die($e->getMessage());
        }
        
        
    }
}