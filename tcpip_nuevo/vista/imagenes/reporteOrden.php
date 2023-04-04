<?php

require_once '../../fpdf/fpdf.php';
require_once '../../controlador/persistencia/ControladorPersistencia.php';

//require('fpdf.php');

class PDF extends FPDF {

// Cabecera de página
    function Header() {
        $cont = 0;
        $id = $_GET['id'];
        //$fecha = time(); //coloca la fecha actual
        $formatoFecha = date('d-m-Y'); //formato para mostrar en pantalla
        $file = "../imagenes/logo.jpg";
        $this->Image($file, 10, 5, 70);
        $this->ln();
        $this->SetFont('Arial', '', '8');
        $this->SetX(150);
        $this->SetTextColor(2, 6, 144);
        $this->MultiCell(30, 3, utf8_decode('TCP/IP Tecnología 20-27982272-3 Presidente Alvear 58 Godoy Cruz 5501 MENDOZA 4248100 155999902'), 0, 'R');
        //$this->Cell(150,20,utf8_decode('20-27982272-3'),0,0,'R');
        $this->Ln();
        $this->Ln();
        $this->Ln();
        $this->Ln();

        $this->SetX(15);
        $this->SetY(41);
        $cp = new ControladorPersistencia();
        $consultaOrdenes = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UNA_ORDEN, array($id));
        $ordenes = $consultaOrdenes->fetchAll(PDO::FETCH_ASSOC);
        $this->SetFont('Arial', '', '8');
        $this->SetFillColor(194, 184, 181);
        $this->SetTextColor(4, 4, 4);
        $this->SetDrawColor(255, 254, 254);
        $this->Cell(35, 4, "PRESUPUESTO", 1, 0, 'C', true);
        $this->Cell(35, 4, "FECHA", 1, 0, 'C', true);
        $this->Cell(35, 4, "REALIZADO POR", 1, 0, 'C', true);
        $this->Cell(3, 4, "", 1, 0, 'C', FALSE);
        $this->Cell(91, 4, "CLIENTE", 1, 0, 'C', true);
        $this->Ln();
        $usuario = null;
        foreach ($ordenes as $orden) {
            (int) $final = count($ordenes);
            if ($orden["id_usuario"] != $usuario) {
                $this->SetFillColor(254, 254, 254);
                $this->SetTextColor(250, 0, 0);
                $this->Cell(35, 4, $orden['numero_orden'], 1, 0, 'C', true);
                $this->Cell(35, 4, $formatoFecha, 1, 0, 'C', true);
                $this->Cell(35, 4, $orden["apellido_usuario"] . ", " . $orden["nombre_usuario"], 1, 0, 'C', true);
                $this->Cell(3, 4, "", 1, 0, 'C', FALSE);
                $this->SetTextColor(0, 150, 0);
                $this->MultiCell(91, 4, $orden["apellido_cliente"] . ", " . $orden["nombre_cliente"] . "\n" . $orden["direccion_cliente"] . "\n" . $orden["numero_telefono"] . " " . $orden["propietario_telefono"], 0, 'L');
                $usuario = $orden["id_usuario"];
            } else {
                $this->SetX(118);
                $this->SetTextColor(0, 150, 0);
                $this->Cell(91, 4, $orden["numero_telefono"] . " " . $orden["propietario_telefono"], 0, 'L');
                $this->Ln();
            }
            if ($final == $cont + 1) {
                $this->SetFillColor(194, 184, 181);
                $this->SetTextColor(4, 4, 4);
                $this->SetDrawColor(255, 254, 254);
                $this->Cell(35, 4, "CODIGO CLIENTE", 1, 0, 'C', true);
                $this->Cell(35, 4, "CUIL/CUIT", 1, 0, 'C', true);
                $this->Cell(35, 4, utf8_decode("N° DE HOJA "), 1, 0, 'C', true);
                $this->Cell(3, 4, "", 1, 0, 'C', FALSE);
                $this->Ln();
                $this->SetTextColor(0, 100, 0);
                $this->Cell(35, 4, $orden['id_cliente'], 1, 0, 'C', FALSE);
                $this->Cell(35, 4, $orden['dni_cliente'], 1, 0, 'C', FALSE);
                $this->Cell(35, 4, $this->PageNo(), 1, 0, 'C', FALSE);
                $this->Cell(3, 4, "", 1, 0, 'C', FALSE);
                $this->ln();
            }
            $cont++;
        }
    }

// Pie de página
    function Footer() {
        $id = $_GET["id"];
        $cp = new ControladorPersistencia();
        $consultaOrdenes = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UNA_ORDEN, array($id));
        $ordenes = $consultaOrdenes->fetchAll(PDO::FETCH_ASSOC);
        foreach ($ordenes as $orden) {

            $usuario = $orden["apellido_usuario"] . ", " . $orden["nombre_usuario"];
        }
        // Posición: a 1,5 cm del final
        $this->SetY(-18);
        $this->SetFont('Arial', 'I', 5);
        $this->SetTextColor(0, 120, 0);
        // Arial italic 12
        $this->MultiCell(200, 3, utf8_decode('La empresa no se responsabiliza por el origen de los equipos recibidos. La empresa no se responsabiliza por la perdida de los equipos  por causa de siniestro, robo, hurto, o desastre natural. Todo software y/o información existente en medios de almacenamiento  son propiedad del cliente TCP/IP Tecnología no se responsabiliza por la información en medios de almacenamiento. La fecha de entrega del equipo puede variar de acuerdo a disponibilidad de repuestos, tiempos de reparación y prueba. Verifique la descripcion detallada de este documento caso contrario no habra lugar a reclamos, Conserve este documento ya que sin él no se podrá retirar el equipo. Pasado los 90 días el equipo se considerará abandonado y queda a disposición de TCP/IP Tecnología sin derecho a reclamo alguno. Luego de presupeustado el equipo, el cliente tiene 10 días para retirarlo caso contrario se actualizarán los costos.'), 0, 'C');
        $this->SetFont('Arial', 'I', 12);
        // Número de página
        $this->SetTextColor(0, 0, 100);
        $this->Cell(0, 5, 'www.tcpiptecnologia.com.ar  - info@tcpiptecnologia.com  --            Usuario: ' . $usuario, 0, 0, 'C');
    }

}

// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage('P', 'A4');
$id = $_GET['id'];
$cp = new ControladorPersistencia();
$consultaOrdenes = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UNA_ORDEN, array($id));
$ordenes = $consultaOrdenes->fetchAll(PDO::FETCH_ASSOC);

$pdf->setX(30);
$pdf->SetFont('Arial', '', '9');
$pdf->SetFillColor(252, 247, 246);
$pdf->SetTextColor(9, 9, 9);
$pdf->SetDrawColor(255, 236, 232);
$pdf->Cell(30, 5, utf8_decode('REF/COD'), 1, 0, 'C', true);
$pdf->Cell(80, 5, utf8_decode('DESCRIPCION'), 1, 0, 'C', true);
$pdf->Cell(30, 5, utf8_decode('CANTIDAD'), 1, 0, 'C', true);
$pdf->Cell(30, 5, utf8_decode('PRECIO'), 1, 0, 'C', true);



$pdf->Ln();

$alterna = true;
foreach ($ordenes as $orden) {
  if ($alterna) {
  $pdf->setX(30);
      $pdf->SetFont('Arial', '', '10');
    $pdf->SetFillColor(255, 255, 255);
  $pdf->SetTextColor(3, 3, 3);
  $pdf->Cell(30,40, utf8_decode($orden['numero_orden']), 1, 0, 'C', true);
  $pdf->Cell(80,40, utf8_decode($orden['observaciones_orden']), 1, 0, 'C', true);
  $pdf->Cell(30,40, utf8_decode($orden['descripcion_equipo']), 1, 0, 'C', true);
  $pdf->Cell(30,40, utf8_decode($orden['monto_orden']), 1, 0, 'C', true);
  
  $pdf->SetY(150);
   $pdf->Ln();
   $pdf->SetFont('Arial', 'I', 5);
  $pdf->SetTextColor(0, 120, 0);
        // Arial italic 12
  $pdf->MultiCell(200, 3, utf8_decode('La empresa no se responsabiliza por el origen de los equipos recibidos. La empresa no se responsabiliza por la perdida de los equipos  por causa de siniestro, robo, hurto, o desastre natural. Todo software y/o información existente en medios de almacenamiento  son propiedad del cliente TCP/IP Tecnología no se responsabiliza por la información en medios de almacenamiento. La fecha de entrega del equipo puede variar de acuerdo a disponibilidad de repuestos, tiempos de reparación y prueba. Verifique la descripcion detallada de este documento caso contrario no habra lugar a reclamos, Conserve este documento ya que sin él no se podrá retirar el equipo. Pasado los 90 días el equipo se considerará abandonado y queda a disposición de TCP/IP Tecnología sin derecho a reclamo alguno. Luego de presupeustado el equipo, el cliente tiene 10 días para retirarlo caso contrario se actualizarán los costos.'), 0, 'C');
  
  
  
  $pdf->Ln();
$pdf->setX(30);  
$pdf->SetFont('Arial', '', '9');
$pdf->SetFillColor(252, 247, 246);
$pdf->SetTextColor(9, 9, 9);
$pdf->SetDrawColor(255, 236, 232);
$pdf->Cell(30, 5, utf8_decode('REF/COD'), 1, 0, 'C', true);
$pdf->Cell(80, 5, utf8_decode('DESCRIPCION'), 1, 0, 'C', true);
$pdf->Cell(30, 5, utf8_decode('CANTIDAD'), 1, 0, 'C', true);
$pdf->Cell(30, 5, utf8_decode('PRECIO'), 1, 0, 'C', true);
$pdf->setX(30);  
$pdf->Ln();
      $pdf->SetFont('Arial', '', '10');
    $pdf->SetFillColor(255, 255, 255);
  $pdf->SetTextColor(3, 3, 3);
  $pdf->Cell(30,40, utf8_decode($orden['numero_orden']), 1, 0, 'C', true);
  $pdf->Cell(80,40, utf8_decode($orden['observaciones_orden']), 1, 0, 'C', true);
  $pdf->Cell(30,40, utf8_decode($orden['descripcion_equipo']), 1, 0, 'C', true);
  $pdf->Cell(30,40, utf8_decode($orden['monto_orden']), 1, 0, 'C', true);
  
  
  
  
  } 
  }
  
  


$pdf->Ln();
  

  
 

$pdf->Output();
