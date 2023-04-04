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
        $file = "../imagenes/tcpipLogoPagina.gif";
        $this->Image($file, 10, 5, 70);
        $this->ln();
        $this->SetFont('Arial', '', '8');
        $this->SetX(150);
        $this->SetTextColor(2, 6, 144);
        $this->MultiCell(30, 3, utf8_decode('TCP/IP Tecnología 20-27982272-3 Presidente Alvear 58 Godoy Cruz 5501 MENDOZA 4248100 +5492613418702'), 0, 'R');
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
        $this->Cell(35, 4, utf8_decode("TÉCNICO"), 1, 0, 'C', true);
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
                $this->Cell(35, 4, $orden['fecha_alta_orden'], 1, 0, 'C', true);
                $this->Cell(35, 4, utf8_decode($orden["apellido_usuario"]) . ", " . utf8_decode($orden["nombre_usuario"]), 1, 0, 'C', true);
                $this->Cell(3, 4, "", 1, 0, 'C', FALSE);
                $this->SetTextColor(0, 150, 0);
                $this->MultiCell(91, 4, utf8_decode($orden["apellido_cliente"]) . ", " . utf8_decode($orden["nombre_cliente"]) . "\n" . utf8_decode($orden["direccion_cliente"]) . "\n" . utf8_decode($orden["numero_telefono"]) . " " . utf8_decode($orden["propietario_telefono"]), 0, 'L');
                $usuario = $orden["id_usuario"];
            } else {
                $this->SetX(118);
                $this->SetTextColor(0, 150, 0);
                $this->Cell(91, 4, $orden["numero_telefono"] . " " . utf8_decode($orden["propietario_telefono"]), 0, 'L');
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
        $leye = leye();
        foreach ($ordenes as $orden) {

            $usuario = utf8_decode($orden["apellido_usuario"]) . ", " . utf8_decode($orden["nombre_usuario"]);
        }
        // Posición: a 1,5 cm del final
        $this->SetY(-18);
        $this->SetFont('Arial', 'I', 5);
        $this->SetTextColor(0, 120, 0);
        // Arial italic 12
        $this->MultiCell(200, 3, utf8_decode('La empresa no se responsabiliza por el origen de los equipos recibidos. La empresa no se responsabiliza por la perdida de los equipos  por causa de siniestro, robo, hurto, o desastre natural. Todo software y/o información existente en medios de almacenamiento  son propiedad del cliente TCP/IP Tecnología no se responsabiliza por la información en medios de almacenamiento. La fecha de entrega del equipo puede variar de acuerdo a disponibilidad de repuestos, tiempos de reparación y prueba. Verifique la descripcion detallada de este documento caso contrario no habra lugar a reclamos, Conserve este documento ya que sin él no se podrá retirar el equipo. Pasado los 90 días el equipo se considerará abandonado y queda a disposición de TCP/IP Tecnología sin derecho a reclamo alguno. Luego de presupeustado el equipo, el cliente tiene 10 días para retirarlo caso contrario se actualizarán los costos.' + $leye), 0, 'C');
        $this->SetFont('Arial', 'I', 12);
        // Número de página
        $this->SetTextColor(0, 0, 100);
        $this->Cell(0, 5, 'www.tcpiptecnologia.com.ar  - info@tcpiptecnologia.com.ar  --            Usuario: ' . $usuario, 0, 0, 'C');
    }

}

function leye() {
    $leyenda = $_GET['check'];
    $ley = explode(",", $leyenda);
    array_pop($ley);
    $leye = "";
    $strLey = "";
    $cp = new ControladorPersistencia();
    for ($i = 0; $i < count($ley); $i++) {
        $consultaLey = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UNA_LEYENDA, array($ley[$i]));
        $strLey[$i] = $consultaLey->fetchAll(PDO::FETCH_ASSOC);
    }
    for ($i = 0; $i < count($strLey); $i++) {
        foreach ($strLey[$i] as $key => $value) {
            foreach ($value as $llave => $valor) {
                $leye .= $valor . " ";
            }
        }
    }
    return $leye;
}

// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage('P', 'A4');
$id = $_GET['id'];

$formatoFecha = date('d-m-Y');
$cont = 0;
$monto;
$cp = new ControladorPersistencia();
$consultaOrdenes = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UNA_ORDEN, array($id));
$ordenes = $consultaOrdenes->fetchAll(PDO::FETCH_ASSOC);
$pdf->SetFont('Arial', '', '9');
$pdf->SetFillColor(252, 247, 246);
$pdf->SetTextColor(9, 9, 9);
$pdf->SetDrawColor(255, 236, 232);
$pdf->Cell(30, 5, utf8_decode('REF/COD'), 1, 0, 'C', true);
$pdf->Cell(130, 5, utf8_decode('DESCRIPCION'), 1, 0, 'C', true);
//$pdf->Cell(30, 5, utf8_decode('CANTIDAD'), 1, 0, 'C', true);
$pdf->Cell(30, 5, utf8_decode('PRECIO'), 1, 0, 'C', true);
$pdf->ln();
$file = "../imagenes/tcpipLogoPagina.gif";
$usuario = null;
$alterna = true;
$tel = 0;
$leye = 'La empresa no se responsabiliza por el origen de los equipos recibidos. La empresa no se responsabiliza por la perdida de los equipos  por causa de siniestro, robo, hurto, o desastre natural. Todo software y/o información existente en medios de almacenamiento  son propiedad del cliente TCP/IP Tecnología no se responsabiliza por la información en medios de almacenamiento. La fecha de entrega del equipo puede variar de acuerdo a disponibilidad de repuestos, tiempos de reparación y prueba. Verifique la descripcion detallada de este documento caso contrario no habra lugar a reclamos, Conserve este documento ya que sin él no se podrá retirar el equipo. Pasado los 90 días el equipo se considerará abandonado y queda a disposición de TCP/IP Tecnología sin derecho a reclamo alguno. Luego de presupeustado el equipo, el cliente tiene 10 días para retirarlo caso contrario se actualizarán los costos.';
$leye .= leye();
if ($_GET["estado"] < "13") {
    foreach ($ordenes as $orden) {
        if ($alterna) {
            $str = str_replace(". ", "\n", $orden['equipo_orden'], $count);
            $numero = number_format($orden['monto_orden'], 2, ',', '.');
            $pdf->SetFont('Arial', '', '8');
            $pdf->SetFillColor(255, 255, 255);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(30, 7, utf8_decode($orden['numero_orden']), 0, 0, 'C');
            $pdf->Cell(130, 7, utf8_decode($str), 0, 'L');
            //$pdf->Cell(30,40, utf8_decode($orden['descripcion_equipo']), 1, 0, 'C', true);
            //$pdf->Cell(30, 7, utf8_decode("$ " . $numero), 0, 0, 'C');
            $pdf->Ln();
            $pdf->SetFont('Arial', 'B', '9');
            $pdf->Cell(30, 7, utf8_decode("Falla al Ingreso: "), 0, 0, 'C');
            $pdf->SetFont('Arial', 'I', '7');
            $pdf->Ln();
            $mostrar= split(":",$orden['falla_cliente_orden']);
            $pdf->multiCell(200, 3, utf8_decode(/*$orden['falla_cliente_orden']*/(string)$mostrar[0]), 0, 'L');
            $pdf->SetY(130);
            $pdf->SetFont('Arial', 'I', 5);
            $pdf->SetTextColor(0, 120, 0);
            // Arial italic 12
            $pdf->MultiCell(200, 3, utf8_decode($leye), 0, 'C');
            $pdf->Ln();
            $pdf->SetTextColor(0, 0, 0);
            $pdf->multiCell(210, 1, utf8_decode("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"), 0, 0, 'C', true);
            $pdf->ln();
            $pdf->ln();
            $pdf->ln();
            $pdf->ln();
            $pdf->ln();
            $pdf->ln();
            $pdf->ln();
        }

        $pdf->Image($file, 10, 147, 70);
        $pdf->ln();
        $pdf->SetFont('Arial', '', '8');
        $pdf->SetX(150);
        $pdf->SetTextColor(2, 6, 144);
        $pdf->MultiCell(30, 3, utf8_decode('TCP/IP Tecnología 20-27982272-3 Presidente Alvear 58 Godoy Cruz 5501 MENDOZA 4248100 +5492613418702'), 0, 'R');
        //$this->Cell(150,20,utf8_decode('20-27982272-3'),0,0,'R');
        $pdf->Ln();
        $pdf->Ln();




        $pdf->Ln();
        $pdf->SetFont('Arial', '', '8');
        $pdf->SetFillColor(194, 184, 181);
        $pdf->SetTextColor(4, 4, 4);
        $pdf->SetDrawColor(255, 254, 254);
        $pdf->Cell(35, 4, "PRESUPUESTO", 1, 0, 'C', true);
        $pdf->Cell(35, 4, "FECHA", 1, 0, 'C', true);
        $pdf->Cell(35, 4, utf8_decode("TÉCNICO"), 1, 0, 'C', true);
        $pdf->Cell(3, 4, "", 1, 0, 'C', FALSE);
        $pdf->Cell(91, 4, "CLIENTE", 1, 0, 'C', true);
        $pdf->Ln();
    }
    foreach ($ordenes as $orden) {
        (int) $final = count($ordenes);
        //var_dump($orden["id_usuario"]);           
        if ($orden["id_usuario"] != $usuario) {
            $pdf->SetFillColor(254, 254, 254);
            $pdf->SetTextColor(250, 0, 0);
            $pdf->Cell(35, 4, $orden['numero_orden'], 1, 0, 'C', true);
            $pdf->Cell(35, 4, $orden['fecha_alta_orden'], 1, 0, 'C', true);
            $pdf->Cell(35, 4, utf8_decode($orden["apellido_usuario"]) . ", " . utf8_decode($orden["nombre_usuario"]), 1, 0, 'C', true);
            $pdf->Cell(3, 4, "", 1, 0, 'C', FALSE);
            $pdf->SetTextColor(0, 150, 0);
            $pdf->MultiCell(91, 4, utf8_decode($orden["apellido_cliente"]) . ", " . utf8_decode($orden["nombre_cliente"]) . "\n" . utf8_decode($orden["direccion_cliente"]) . "\n" . $orden["numero_telefono"] . " " . utf8_decode($orden["propietario_telefono"]), 0, 'L');
            $usuario = $orden["id_usuario"];
            $telefono = $orden["numero_telefono"];
        } else if ($orden["numero_telefono"] != $telefono) {
            $pdf->Ln();
            $y = 197;
            if ($tel == 1) {
                $pdf->SetXY(118, $y);
            } else {
                $y += 3;
                $pdf->SetXY(118, $y);
            }

            $pdf->SetTextColor(0, 150, 0);
            $pdf->Cell(91, 4, utf8_decode($orden["numero_telefono"]) . " " . utf8_decode($orden["propietario_telefono"]), 0, 'L');
            $pdf->Ln();
            $tel++;
        }
        if ($final == $cont + 1) {
            //echo "final = ".$final;
            //echo "contador = ".$cont;
            $pdf->SetFillColor(194, 184, 181);
            $pdf->SetTextColor(4, 4, 4);
            $pdf->SetDrawColor(255, 254, 254);
            $pdf->Cell(35, 4, "CODIGO CLIENTE", 1, 0, 'C', true);
            $pdf->Cell(35, 4, "CUIL/CUIT", 1, 0, 'C', true);
            $pdf->Cell(35, 4, utf8_decode("N° DE HOJA "), 1, 0, 'C', true);
            $pdf->Cell(3, 4, "", 1, 0, 'C', FALSE);
            $pdf->Ln();
            $pdf->SetTextColor(0, 100, 0);
            $pdf->Cell(35, 4, $orden['id_cliente'], 1, 0, 'C', FALSE);
            $pdf->Cell(35, 4, $orden['dni_cliente'], 1, 0, 'C', FALSE);
            $pdf->Cell(35, 4, $pdf->PageNo(), 1, 0, 'C', FALSE);
            $pdf->Cell(3, 4, "", 1, 0, 'C', FALSE);
            $pdf->ln();

            $pdf->SetFont('Arial', '', '9');
            $pdf->SetFillColor(252, 247, 246);
            $pdf->SetTextColor(9, 9, 9);
            $pdf->SetDrawColor(255, 236, 232);
            $pdf->Cell(30, 5, utf8_decode('REF/COD'), 1, 0, 'C', true);
            $pdf->Cell(130, 5, utf8_decode('DESCRIPCION'), 1, 0, 'C', true);
            //$pdf->Cell(30, 5, utf8_decode('CANTIDAD'), 1, 0, 'C', true);
            $pdf->Cell(30, 5, utf8_decode('PRECIO'), 1, 0, 'C', true);
            $pdf->setX(30);
            $pdf->Ln();

            $str = str_replace(". ", "\n", $orden['equipo_orden'], $count);
            $numero = number_format($orden['monto_orden'], 2, ',', '.');
            $pdf->SetFont('Arial', '', '8');
            $pdf->SetFillColor(255, 255, 255);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(30, 7, utf8_decode($orden['numero_orden']), 0, 0, 'C');
            $pdf->Cell(130, 7, utf8_decode($str), 0, 'L');
            //$pdf->Cell(30,40, utf8_decode($orden['descripcion_equipo']), 1, 0, 'C', true);
            $pdf->Cell(30, 7, utf8_decode("$ " . $numero), 0, 0, 'C');
            $pdf->Ln();
            $pdf->SetFont('Arial', 'B', '9');
            $pdf->Cell(30, 7, utf8_decode("Falla al Ingreso: "), 0, 0, 'C');
            $pdf->SetFont('Arial', 'I', '7');
            $pdf->Ln();
            $mostrar= split(":",$orden['falla_cliente_orden']);
            $pdf->multiCell(200, 3, utf8_decode(/*$orden['falla_cliente_orden']*/(string)$mostrar[0]), 0, 'L');
            $pdf->Ln();
            $pdf->Ln();
            if ($_GET["id"] === "375") {
                $pdf->MultiCell(200, 2, utf8_decode("El producto entregado, es nuevo y se verifica el funcionamiento con el cliente. La aceptación del producto supone que le cliente recibe en conformidad un equipo de las mismas caracteristicas del siniestrado y no se aceptan cambios, ni devoluciones del mismo" . $leye), 0, 'L');
            }
        }
        $cont++;
    }
} else {

    foreach ($ordenes as $orden) {
        if ($alterna) {
//            $str = str_replace(". ", "\n", $orden['equipo_orden'], $count);
//            $numero = number_format($orden['monto_orden'], 2, ',', '.');
//            $pdf->SetFont('Arial', '', '8');
//            $pdf->SetFillColor(255, 255, 255);
//            $pdf->SetTextColor(3, 3, 3);
//            $pdf->Cell(30, 7, utf8_decode($orden['numero_orden']), 0, 0, 'C');
//            $pdf->Cell(130, 7, utf8_decode($str), 0, 'L');
//            $pdf->Cell(30, 7, utf8_decode("$ " . $numero), 0, 0, 'C');
//            $pdf->Ln();
//            $pdf->Ln();
//            $pdf->SetFont('Arial', '', '9');
//            $pdf->SetFillColor(252, 247, 246);
//            $pdf->SetTextColor(9, 9, 9);
//            $pdf->SetDrawColor(255, 236, 232);
//            $pdf->Cell(30, 7, utf8_decode("Falla de Ingreso"), 0, 0, 'L');
//            $pdf->Ln();
//            $pdf->SetFont('Arial', 'B', '9');
//            $pdf->multiCell(200, 7, utf8_decode($orden['falla_cliente_orden']), 0, 'L');
//            $pdf->Ln();
//            $pdf->SetFont('Arial', '', '9');
//            $pdf->SetFillColor(252, 247, 246);
//            $pdf->SetTextColor(9, 9, 9);
//            $pdf->SetDrawColor(255, 236, 232);
//            $pdf->SetY(120);
//            $pdf->SetFont('Arial', 'I', 5);
//            $pdf->SetTextColor(0, 120, 0);
//            $pdf->Ln();
//            $pdf->Ln();
            $str = str_replace(". ", "\n", $orden['equipo_orden'], $count);
            $numero = number_format($orden['monto_orden'], 2, ',', '.');
            $pdf->SetFont('Arial', '', '8');
            $pdf->SetFillColor(255, 255, 255);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(30, 7, utf8_decode($orden['numero_orden']), 0, 0, 'C');
            $pdf->Cell(130, 7, utf8_decode($str), 0, 'L');
            $pdf->Cell(30, 7, utf8_decode("$ " . $numero), 0, 0, 'C');
            $pdf->Ln();
            $pdf->Ln();
            $pdf->SetFont('Arial', '', '9');
            $pdf->SetFillColor(252, 247, 246);
            $pdf->SetTextColor(9, 9, 9);
            $pdf->SetDrawColor(255, 236, 232);
            $pdf->Cell(30, 7, utf8_decode("Falla de Ingreso"), 0, 0, 'L');
            $pdf->Ln();
            $pdf->SetFont('Arial', 'B', '9');
            $mostrar= split(":",$orden['falla_cliente_orden']);
            $pdf->multiCell(200, 3, utf8_decode(/*$orden['falla_cliente_orden']*/$mostrar[0]), 0, 'L');
            $pdf->Ln();
            $pdf->SetFont('Arial', '', '9');
            $pdf->SetFillColor(252, 247, 246);
            $pdf->SetTextColor(9, 9, 9);
            $pdf->SetDrawColor(255, 236, 232);
            $pdf->Cell(30, 7, utf8_decode("Falla Detectada"), 0, 0, 'L');
            $pdf->Ln();
            $pdf->SetFont('Arial', 'B', '9');
            $pdf->multiCell(200, 7, utf8_decode($orden['observaciones_orden']), 0, 'L');
            $pdf->SetY(120);
            $pdf->SetFont('Arial', 'I', 5);
            $pdf->SetTextColor(0, 120, 0);


            $pdf->Ln();
            $pdf->Ln();
            if (!$orden['numero_siniestro_orden']) {
                
            } else {
                $pdf->Ln();
                $pdf->Ln();
                $pdf->SetFont('Arial', '', '9');
                $pdf->SetFillColor(252, 247, 246);
                $pdf->SetTextColor(9, 9, 9);
                $pdf->SetDrawColor(255, 236, 232);
                $pdf->Cell(30, 7, utf8_decode("Número De Siniestro"), 0, 0, 'L');
                $pdf->Ln();
                $pdf->SetFont('Arial', 'I', '9');
                $pdf->Cell(30, 7, utf8_decode($orden['numero_siniestro_orden']), 0, 0, 'L');
            }
            // Arial italic 12
            $pdf->SetXY(3, 200);
            if ($_GET["leyenda"] == "true") {
                $pdf->SetFont('Arial', '', '8');
                $pdf->SetTextColor(3, 3, 3);
                $pdf->MultiCell(200, 2, utf8_decode('Si entregó su equipo con accesorios, verifique que los mismos (equipos y accesorios) estén correctamente indicados en la boleta, caso contrario no tendrá derecho a reclamo alguno. Todos los trabajos tienen un periodo de prueba de 48hs. para cualquier tipo de reclamo por falla o inconformidad, pasado dicho tiempo se considerará que las reparaciones fueron de conformidad por el cliente' . $leye), 0, 'C');
            }

            $pdf->Ln();
            $pdf->setY(222);
            $pdf->SetFont('Arial', '', '24');
            $pdf->SetTextColor(3, 3, 3);
            //$pdf->Cell(30, 7, utf8_decode("TRABAJO FINALIZADO"), 0, 0, 'C');
            $alterna = false;
        }
        $pdf->multiCell(210, 1, utf8_decode("________________________________________"), 0, 'L');
        $monto = $numero;
    }

    $pdf->Ln();
    $pdf->Ln();
    $pdf->Ln();
    $pdf->Ln();
    $pdf->Ln();
    $pdf->Ln();
    $pdf->SetFont('Arial', '', '9');
    $pdf->SetFillColor(252, 247, 246);
    $pdf->SetTextColor(9, 9, 9);
    $pdf->SetDrawColor(255, 236, 232);
    $pdf->Cell(30, 5, utf8_decode('B. IMPONIBLE'), 1, 0, 'C', true);
    $pdf->Cell(30, 5, utf8_decode('TIPO'), 1, 0, 'C', true);
    $pdf->Cell(30, 5, utf8_decode('IMPORTES'), 1, 0, 'C', true);
    $pdf->Cell(30, 5, utf8_decode('FECHAS'), 1, 0, 'C', true);
    $pdf->Ln();
    $pdf->SetX(100);
    $pdf->Cell(30, 5, utf8_decode("Entregado: " . $formatoFecha), 1, 0, 'C', false);


    $pdf->ln();
    $pdf->SetFont('Arial', 'B', '9');
    $pdf->SetX(130);
    $pdf->multiCell(200, 5, utf8_decode('TOTAL PRESUPUESTO $ ' . $monto), 0, 'L');

    $pdf->Ln();
    $pdf->Ln();

    $pdf->SetTextColor(250, 250, 9);
    $pdf->SetFont('Arial', 'B', '45');
    $pdf->Rect(120, 251, 40, 25, 'DF');

    $pdf->SetXY(120, 250);
    $pdf->SetFont('Arial', '', '10');
    $pdf->SetTextColor(3, 3, 3);
    $pdf->Cell(30, 7, utf8_decode('Acepto: '), 0, 0, 'L');
}







$pdf->Ln();
$pdf->Output();
