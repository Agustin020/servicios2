<?php
require_once '../../fpdf/fpdf.php';
require_once '../../controlador/persistencia/ControladorPersistencia.php';   
//require('fpdf.php');

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
    
    $fecha = time();//coloca la fecha actual
    $formatoFecha=date('d-m-Y H:i:s');//formato para mostrar en pantalla
    $file ="../images/logo.png"; 
    $this->Image($file);
    
    $this->SetFont('Arial', 'B', '15');
    $this->Cell(300,10,'Fecha: '.$formatoFecha,0,0,'R');
    $this->Ln();
    $this->Cell(300,10,"LISTADO DE CLIENTES",0,0,'C');
    $this->Ln();
    $this->Ln();
    $this->SetFillColor(2,157,116);
    $this->SetTextColor(240, 255, 240);
    $this->Cell(60,15,"APELLIDO",1, 0, 'C', true);
    $this->Cell(60,15,"NOMBRE",1, 0, 'C', true);
    $this->Cell(60,15,"DNI",1, 0, 'C', true);
    $this->Cell(120,15,"DIRECCION",1, 0, 'C', true);
    $this->Cell(60,15,"FECHA NAC.",1, 0, 'C', true);
    $this->Ln();
}

// Pie de página
function Footer()
{
    $id = $_GET["idUsuario"];
    $cp = new ControladorPersistencia();
    $consultaUsuarios=$cp->ejecutarSentencia(DBSentencias::BUSCAR_USUARIO_ID,array($id));
    $usuarios = $consultaUsuarios->fetchAll(PDO::FETCH_ASSOC);
    foreach ($usuarios as $usuarioF) {
        
        $usuario=$usuarioF['usuario_usuario'];
    }
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,'Practica Profesional Guirao Lazarte Bilyk--Pagina '.$this->PageNo().'/{nb} Usuario: '.$usuario,0,0,'C');
}
}

// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage('A','A3');
$cp = new ControladorPersistencia();
    $listadoClientes = $cp->ejecutarSentencia(DBSentencias::BUSCAR_CLIENTES);
    $alterna = true;
    foreach ($listadoClientes as $clientes) {
        if ($alterna) {
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,10, utf8_decode($clientes['apellido_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['nombre_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['dni_cliente']),1, 0, 'L', true);
            $pdf->Cell(120,10, utf8_decode($clientes['direccion_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['fecha_nacimiento_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            $alterna = !$alterna;
        }else{
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,10, utf8_decode($clientes['apellido_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['nombre_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['dni_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(120,10, utf8_decode($clientes['direccion_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['fecha_nacimiento_cliente']),1, 0, 'L', FALSE);
            $pdf->Ln();
            $alterna = !$alterna;
        }
        
        
        
    }
    $pdf->Output();

    
