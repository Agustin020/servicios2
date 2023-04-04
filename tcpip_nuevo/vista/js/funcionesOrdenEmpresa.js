$(function() {
    var OE = {};
    var idUsuario="";
    var tipoAcceso="";
    var idCliente = "";
    var nombre_usuario="";
    (function(app) {
        app.init = function() {
            app.verificarSesion();
        };
        app.bindings = function() {
            app.buscarOrdenes();
            app.mostrarFecha();
        };

        app.mostrarFecha = function(){
            var f = new Date();
            var mes = (f.getMonth() + 1);
            var mesLetras  = "";
            switch (mes)
            {
                case 1: 
                   mesLetras  = "Enero";
                   break;
                case 2: 
                   mesLetras  = "Febrero";
                   break;
                case 3: 
                   mesLetras  = "Marzo";
                   break;
                case 4: 
                   mesLetras  = "Abril";
                   break;
                case 5: 
                   mesLetras  = "Mayo";
                   break;
                case 6: 
                    mesLetras  = "Junio";
                    break;
                case 7: 
                    mesLetras  = "Julio";
                    break;
                case 8: 
                    mesLetras  = "Agosto";
                    break;
                case 9: 
                    mesLetras  = "Septiembre";
                    break;
                case 10: 
                    mesLetras  = "Octubre";
                    break;
                case 11: 
                    mesLetras  = "Noviembre";
                    break;
                case 12: 
                    mesLetras  = "Diciembre";
                    break;
            }
            $("#fecha").html(f.getDate() + " de " + mesLetras + " de " + f.getFullYear());
          };

        app.buscarClientes = function() {

            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTableClientes(data);
                },
                error: function() {
                    alert('error al intentar buscar clientes');
                }

            });
        };

        app.buscarOrdenes = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarOrdenEmpresa&nombreFormulario=Orden&id=" + nombre_usuario;

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error en buscar ordenes');
                }

            });
        };

        app.verificarSesion = function(){
            var url = "../../controlador/ruteador/Sesion.php"; 
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    if (datos.id_usuario != null) {
                        $("#id_user").val(datos.id_usuario);
                        $("#logedUser").html(datos.usuario_usuario);
                        nombre_usuario=datos.usuario_usuario;
                        idUsuario=datos.id_usuario;
                        idCliente=datos.id_cliente_usuario;
                        tipoAcceso = datos.tipoAcceso_usuario;
                        //if (datos.)
                        app.bindings();
                    }else{
                        location.href = "../../index.html";
                    }
                },
                error: function(data) {
                    location.href = "../../index.html";
                } 
            });
        };
        
        app.rellenarDataTable = function (data) {
            var html = "";
            var numeroOrden = "";
            if ($.fn.DataTable.isDataTable('#tablaOrdenes')) {
                $('#tablaOrdenes').DataTable().destroy();
            }
            $.each(data, function (clave, orden) {
                var fecha = orden.fecha_alta_orden.split(" ");
                var dia = fecha[0].split("-");
                if (!(orden.numero_orden === numeroOrden)) {
                        html += '<tr class="text-warning">' +
                                '<td class="text-center oculto">' + orden.id_cliente_orden + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '"><span  data-toggle="tooltip" title="DNI/CUIT: ' + orden.dni_cliente + '">' + orden.apellido_cliente + ", " + orden.nombre_cliente + '</font></span></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + dia[2] + "/" + dia[1] + "/" + dia[0] + '</font></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.numero_orden + '</font></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.equipo_orden + '</font></td>';
                                if (orden.falla_cliente_orden == null) {
                                    html +='<td class="text-center oculto"></td>' ;
                                }else{
                                    html +='<td class="text-center oculto">' + orden.falla_cliente_orden + '</td>' ;
                                }
                                html +='<td class="text-center oculto">' + orden.observaciones_orden + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.numero_siniestro_orden + '</font></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '"><span data-toggle="tooltip" title="Entregado: $' + orden.entregado_orden + '">' + orden.monto_orden + '</span></font></td>' +
                                '<td class="text-center oculto">' + orden.entregado_orden + '</td>' +
                                '<td class="text-center oculto">' + orden.id_estado + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.descripcion_estado + '</font></td>' +
                                '<td class="text-center oculto">' + orden.id_usuario_orden + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.apellido_usuario + ", " + orden.nombre_usuario + '</font></td>';
                        html += '</tr>';
                }
                numeroOrden = orden.numero_orden;
            });

            $("#cuerpoTablaOrdenes").html(html);
            $("#tablaOrdenes").dataTable({//transforma la tabla en dataTable
                responsive: true,
                iDisplayLength: 50,
                "sPagiationType": "full_numbers", //activa la paginación con números
                "language": {//cambia el lenguaje de la dataTable
                    "url": "../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };
        app.init();
    })(OE);
});