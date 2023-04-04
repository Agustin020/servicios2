<?php
    require_once '../../fpdf/fpdf.php';
    require_once '../../controlador/persistencia/ControladorPersistencia.php';
    if (isset($_GET["id"])) {
        $id=$_GET["id"];
        $idUsuario=$_GET["idUsuario"];
        $pdf=new FPDF();
        $pdf->AddPage('P','A3');
        $fecha = time();//coloca la fecha actual
        $formatoFecha=date('d-m-Y H:i:s');
        $file ="../images/logo.png"; 
        $pdf->Image($file);
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', '12');
        
        $pdf->Cell(300,10,'Fecha: '.$formatoFecha,0,0,'C');
        $pdf->ln();
        $pdf->SetFont('Arial', 'B', '20');
        $pdf->Cell(100,10,"DETALLE DEL CLIENTE:",0,0,'C');
        $pdf->Ln();
        $pdf->Ln();
        
        $cp = new ControladorPersistencia();
        $respCliente = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UN_CLIENTE, array($id));
        $clientess = $respCliente->fetchAll(PDO::FETCH_ASSOC);
        
        
        foreach ($clientess as $clientes) {
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(50,15,"APELLIDO",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(140,15, utf8_decode($clientes['apellido_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(50,15,"NOMBRE",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(140,15, utf8_decode($clientes['nombre_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(50,15,"DNI",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(140,15, utf8_decode($clientes['dni_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(50,15,"DIRECCION",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(140,15, utf8_decode($clientes['direccion_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(50,15,"FECHA NAC.",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(140,15, utf8_decode($clientes['fecha_nacimiento_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(50,15,"CREACION",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(140,15, utf8_decode($clientes['fch_creacion']),1, 0, 'L', true);
            $pdf->Ln();
            
            //comienzo datos del usuario que lo creo
            $idUser = $clientes['id_usuario'];
            $respUser = $cp->ejecutarSentencia(DBSentencias::BUSCAR_NOMBRE_USUARIO, array($idUser));
            $user = $respUser->fetchAll(PDO::FETCH_ASSOC);
            foreach ($user as $us) {
                $pdf->SetFont('Arial', 'B', '20');
                $pdf->SetFillColor(2,157,116);
                $pdf->SetTextColor(240, 255, 240);
                $pdf->Cell(50,15,"USUARIO",1, 0, 'L', true);

                $pdf->SetFont('Arial', '', '16');
                $pdf->SetFillColor(229, 229, 229);
                $pdf->SetTextColor(3, 3, 3);
                $pdf->Cell(140,15, utf8_decode($us['apellido_usuario']).', '.utf8_decode($us['nombre_usuario']),1, 0, 'L', true);
                $pdf->Ln();
            }
            //final datos del usuario
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(255,255,255);
            $pdf->Cell(190,5,"",1, 0, 'C', true);
            $pdf->Ln();
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,57,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(190,15,"TELEFONOS",1, 0, 'C', true);
            $pdf->Ln();
            
            //comienzo datos de telefonos
            $respTels = $cp->ejecutarSentencia(DBSentencias::BUSCAR_TELEFONOS_DE_UN_CLIENTE, array($id));
            $tels = $respTels->fetchAll(PDO::FETCH_ASSOC);
            $contar = count($tels);
            $for=1;
            foreach ($tels as $tel) {
                $pdf->SetFont('Arial', 'B', '20');
                $pdf->SetFillColor(2,57,116);
                $pdf->SetTextColor(240, 255, 240);
                $pdf->Cell(50,15,"NUMERO",1, 0, 'L', true);

                $pdf->SetFont('Arial', '', '16');
                $pdf->SetFillColor(229, 229, 229);
                $pdf->SetTextColor(3, 3, 3);
                $pdf->Cell(140,15, utf8_decode($tel['numero_telefono']),1, 0, 'L', true);
                $pdf->Ln();
                
                $pdf->SetFont('Arial', 'B', '20');
                $pdf->SetFillColor(2,57,116);
                $pdf->SetTextColor(240, 255, 240);
                $pdf->Cell(50,15,"TIPO",1, 0, 'L', true);

                $pdf->SetFont('Arial', '', '16');
                $pdf->SetFillColor(229, 229, 229);
                $pdf->SetTextColor(3, 3, 3);
                $pdf->Cell(140,15, utf8_decode($tel['propietario_telefono']),1, 0, 'L', true);
                $pdf->Ln();
                
                
                $pdf->SetFont('Arial', 'B', '20');
                $pdf->SetFillColor(2,57,116);
                $pdf->SetTextColor(240, 255, 240);
                $pdf->Cell(50,15,"DETALLE",1, 0, 'L', true);

                $pdf->SetFont('Arial', '', '16');
                $pdf->SetFillColor(229, 229, 229);
                $pdf->SetTextColor(3, 3, 3);
                $pdf->Cell(140,15, utf8_decode($tel['detalle_telefono']),1, 0, 'L', true);
                $pdf->Ln();
                
                if ($for < $contar) 
                {
                $pdf->SetFont('Arial', 'B', '20');
                $pdf->SetFillColor(255,255,255);
                $pdf->Cell(150,5,"",1, 0, 'C', true);
                $pdf->Ln();
                
                }
                $for++;
            }
            //final datos de telefonos
            
            
    }
    $consultaUsuarios=$cp->ejecutarSentencia(DBSentencias::BUSCAR_USUARIO_ID,array($idUsuario));
    $usuarios = $consultaUsuarios->fetchAll(PDO::FETCH_ASSOC);
    foreach ($usuarios as $usuarioF) {
        
        $usuario=$usuarioF['usuario_usuario'];
    }
       // Posición: a 1,5 cm del final
    $pdf->SetY(380);
    // Arial italic 8
    $pdf->SetFont('Arial','I',12);
    // Número de página
    $pdf->Cell(0,10,'Practica Profesional Guirao Lazarte Bilyk--Pagina '.$pdf->PageNo().' Usuario: '.$usuario,0,0,'C');
           
           
           
        $pdf->Output();
    }