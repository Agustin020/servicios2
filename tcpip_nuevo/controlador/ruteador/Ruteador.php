<?php
if (isset($_GET['accion']) && isset($_GET['nombreFormulario'])) {
    $accion = $_GET['accion'];
    $nombreformulario = $_GET['nombreFormulario'];
    
}else if (isset ($_POST['accion'])){
    $accion = $_POST['accion'];
    $datosCampos = $_REQUEST;
    $nombreformulario = $datosCampos['nombreFormulario'];
}else if(isset ($_POST['user']) && isset($_POST['pass'])){
    $accion = "guardar";
    $nombreformulario = "Usuario";
    $datosCampos = ["user"=>$_POST['user'], "pass"=>$_POST['pass']];
}




//CAMBIOS EN RUTEADOR POR FLACO
if (isset($_GET['accionCliente']) && isset($_GET['nombreFormularioCliente'])) {
    $accion = $_GET['accionCliente'];
    $nombreformulario = $_GET['nombreFormularioCliente'];
}else if (isset ($_POST['accionCliente'])){
    $accion = $_POST['accionCliente'];
    $datosCampos = $_REQUEST;
    $nombreformulario = $datosCampos['nombreFormularioCliente'];
}
//FIN CAMBIOS EN RUTEADOR POR FLACO





if (isset($_GET['id'])) {
    $id=$_GET['id'];
}
if (isset($_GET['idCliente'])) {
    $idCliente=$_GET['idCliente'];
}
if (isset($_GET['idCaso'])) {
    $idCaso=$_GET['idCaso'];
}
if (isset($_GET['tipoProducto'])) {
    $tipoProducto=$_GET['tipoProducto'];
}
require_once '../controladoresEspecificos/Controlador'.$nombreformulario.'.php'; 
$nombreControlador = "Controlador".$nombreformulario;
$objControlador = new $nombreControlador();
switch ($accion) {
    case "eliminar":
        $resultado = $objControlador->$accion($id);
        echo json_encode($resultado);
        break;
    case "buscarProductos":
        $resultado = $objControlador->$accion($tipoProducto); 
        echo json_encode($resultado);
        break;
    case "buscar":
        $resultado = $objControlador->$accion(); 
        echo json_encode($resultado);
        break;
    case "guardar":
        /*$datosCampos=$_REQUEST;
        $resultado = $objControlador->$accion($datosCampos); 
        echo json_encode($resultado);
        break;*/
        $datosCampos = $_REQUEST;
        if ($nombreformulario == "Leyenda") {
            $resultado = $objControlador->$accion($datosCampos, $nombreformulario);
        } else {
            $resultado = $objControlador->$accion($datosCampos);
        }
        echo json_encode($resultado);
        break;
    case "buscarUno":
        $resultado = $objControlador->$accion($idCaso);
        echo json_encode($resultado);
        break;
    case "buscarTelsDeUnCliente":
        $resultado = $objControlador->$accion($id);
        echo json_encode($resultado);
        break;
    case "cambiarClave":
        $resultado = $objControlador->$accion($idCliente);
        echo json_encode($resultado);
        break;
    case "eliminarImagen": 
        $resultado = $objControlador->$accion($id); 
        echo json_encode($resultado);
        break;
    case "buscarFotoDeOrden":
        $resultado = $objControlador->$accion($id);
        echo json_encode($resultado);
        break;
    case "modificar":
        $resultado = $objControlador->$accion($datosCampos);
        echo json_encode($resultado);
        break; 
    case "buscarX":
        $resultado = $objControlador->$accion(); 
        echo json_encode($resultado);
        break;
    case "buscarOrdenEmpresa":
        $resultado = $objControlador->$accion($id); 
        echo json_encode($resultado);
        break;
    case "getCliente":
        $resultado = $objControlador->$accion($id); 
        echo json_encode($resultado);
        break;
    case "consulta":
        $resultado = $objControlador->$accion($_REQUEST); 
        echo json_encode($resultado);
        break;
    default:
        break;
}