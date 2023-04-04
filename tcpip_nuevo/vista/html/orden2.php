<?php
// error_reporting(0);
?>
<!doctype html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- <link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/letra.css" rel="stylesheet" type="text/css" /> -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.13.1/b-2.3.3/b-html5-2.3.3/b-print-2.3.3/datatables.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.13.1/b-2.3.3/b-html5-2.3.3/b-print-2.3.3/datatables.min.css" />
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.13.1/b-2.3.3/b-html5-2.3.3/b-print-2.3.3/datatables.min.js"></script>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>



    <script>
        $(document).ready(function() {
            $('#table').DataTable({
                dom: 'Bfrtip',
                buttons: [{
                        extend: 'pdfHtml5',
                        orientation: 'landscape',
                        pageSize: 'LEGAL',
                        title: 'Ordenes'
                    },
                    {
                        extend: 'excelHtml5',
                        autoFilter: true,
                        sheetName: 'Exported data',
                        title: 'Ordenes'
                    },
                    {
                        extend: 'print',
                        title: 'Ordenes',
                        orientation: 'landscape',
                    }
                ],
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
            });
        }, );
    </script>

</head>

<?php
require_once("../../modelo/OrdenModel.php");
$mdlOrdenes = new mdlOrdenes();
$listaOrdenes = $mdlOrdenes->mostrarOrdenes();
?>

<body>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive-xxl pt-5">
                    <table id="table" class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID Orden</th>
                                <th scope="col">N° de Orden</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">Falla</th>
                                <th scope="col">Observaciones</th>
                                <th scope="col">N° Siniestro</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Entregado</th>
                                <th scope="col">Estado</th>
                                <th scope="col">ID Usuario</th>
                                <th scope="col">Fecha alta</th>
                                <th scope="col">Id Cliente</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            foreach ($listaOrdenes as $orden) {
                            ?>
                                <tr>

                                    <td>
                                        <?= $orden["id_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["numero_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["equipo_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["falla_cliente_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["observaciones_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["numero_siniestro_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["monto_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["entregado_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["id_estado"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["id_usuario_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["fecha_alta_orden"] ?>
                                    </td>
                                    <td>
                                        <?= $orden["id_cliente_orden"] ?>
                                    </td>

                                </tr>


                            <?php
                            }
                            ?>


                        </tbody>

                    </table><br><br>
                    <a class="btn btn-primary"> Regresar</a>
                </div>
            </div>
        </div>
    </div>



</body>

</html>