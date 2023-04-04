$(function () {
    var Estado = {};
    var idUsuario="";
    (function (app) {
        app.init = function () {
            app.verificarSesion();
        };
        app.bindings = function () {
            app.buscarEstado();
            app.mostrarFecha();
            $("#menuAdmin" ).mouseout(function() {
                $("#menuAdmin").css("background-color", "#393185");
            });

            $("#menuAdmin" ).mouseover(function() {
                $("#menuAdmin").css("background-color", "#312652");
            });
            
            $(".omover" ).mouseout(function() {
                $(this).css("background-color", "#393185");
            });

            $(".omover" ).mouseover(function() {
                $(this).css("background-color", "#312652");
            });
            $("#agregar").on('click', function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#id_estado").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nuevo Estado");
                $("#color").attr("placeholder", "Agregue Color");
                $("#modalEstado").modal({show: true});
                $("#color").css('background-color',"#ffffff" );
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#color").removeAttr("disabled");
                $("#descripcion").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#guardar").show();
            });

            $("#cancelar").on("click", function (event) {
                event.preventDefault();
                $("#modalEstado").modal('hide');
            });

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                app.validarCampos(event);
            });
            
            $("#tablaEstado").on('click', '.eliminar', function () {
                var id = $(this).attr("data-id_estado");
                bootbox.confirm({
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Está seguro?",
                    callback: function (result) {
                        if (result) {
                            app.eliminarEstado(id);
                        }
                    }
                });
            });

            $("#cuerpoTablaEstado").on('click', '.editar', function (event) {
                var color = $(this).parent().parent().children().first().next().css("background-color");
                $("#id_estado").val($(this).attr("data-id_estado"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#descripcion").val($(this).parent().parent().children().first().next().html());
                $("#color").css('background-color',color );
                $("#color").attr("placeholder", "Cambie el Color");
                $("#color").removeAttr("disabled");
                $("#guardar").attr("value", "Modificar");
                $("#guardar").html("Modificar");
                
                $("#tituloModal").html("Editar Estado");
                $("#modalEstado").modal({show: true});
                $("#descripcion").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#guardar").show();
            });


            $("#cuerpoTablaEstado").on('click', '.seleccionar', function (event) {
                var color = $(this).parent().parent().children().first().next().css("background-color");
                $("#id_estado").val($(this).attr("data-id_estado"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-info");                
                $("#descripcion").val($(this).parent().parent().children().first().next().html());
                $("#color").css('background-color',color );
                $("#descripcion").attr('disabled', 'true');
                $("#color").attr("placeholder", "");
                $("#color").attr('disabled','true' );
                $("#guardar").hide();
                $("#tituloModal").html("Detalles Estado");
                $("#modalEstado").modal({show: true});
            });

            $("#cancelar").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalEstado").modal('hide');
            });

            $("#equis").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalEstado").modal('hide');
            });
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

        app.validarCampos = function(){
            var id = $("#id_estado").val();
            var descripcion = $("#descripcion").val();
            var rta = "";
            if (descripcion == ""){
                rta += "Debes completar la Descripción.";
                bootbox.alert(rta);
                $("#descripcion").focus();
            }else{
                app.guardarEstado();
            }
        };

        app.eliminarEstado = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Estado&id=" + id;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.borrarFilaDataTable(id);
                },
                error: function (data) {
                    alert('error en app.eliminarEstado');
                }
            });
        };


        app.guardarEstado = function () {
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formEstado").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalEstado").modal('hide');
                    app.actualizarDataTable(datos, $("#id_estado").val());
                    
                },
                error: function (data) {
                    alert(data);
                }
            });
        };

        app.actualizarDataTable = function (estado, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var color;
                if (estado.color_estado === null){
                    color = "#ffffff";
                }else{
                    color = estado.color_estado;
                }
                var html = '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td bgcolor="'+color+'"; >'+ estado.descripcion_estado + '</td>' +                         
                        '<td class="oculto">' + estado.fecha_alta_estado + '</td>' +
                        '<td class="oculto">' + estado.fecha_baja_estado + '</td>';
                html += '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaEstado").append(html);

            } else {
                //busco la fila
                var fila = $("#cuerpoTablaEstado").find("a[data-id_estado='" + id + "']").parent().parent();
                var contenidoFila = '<td>' +
                        '<a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +                        
                        '<td bgcolor="'+color+'"; >'+ estado.descripcion_estado + '</td>' + 
                        '<td class="oculto">' + estado.fecha_alta_estado + '</td>' +
                        '<td class="oculto">' + estado.fecha_baja_estado + '</td>';
                contenidoFila += '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>';
                fila.html(contenidoFila);
            }
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };

        app.borrarCampos = function () {
            $("#id_estado").val("").html();
            $("#descripcion").val("").html();
        };

        app.buscarEstado = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Estado";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarDataTable(data);
                },
                error: function () {
                    alert('error buscar estados');
                }
            });
        };

        app.borrarFilaDataTable = function (id) {
            $("#cuerpoTablaEstado").find("a[data-id_estado='" + id + "']").parent().parent().remove();
        };

        app.rellenarDataTable = function (data) {
            var html = "";
            if ( $.fn.DataTable.isDataTable( '#tablaEstado' ) ) {
                $('#tablaEstado').DataTable().destroy();
            }
            $.each(data, function (clave, estado) {

             var color;
                if (estado.color_estado === null){
                    color = "#ffffff";
                }else{
                    color = estado.color_estado;
                }

                html += '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +                        
                        '<td bgcolor="'+color+'"; >'+ estado.descripcion_estado + '</td>' + 
                        '<td class="oculto">' + estado.fecha_alta_estado + '</td>' +
                        '<td class="oculto">' + estado.fecha_baja_estado + '</td>';
                html += '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Estado" data-id_estado="' + estado.id_estado + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaEstado").html(html);
            $("#tablaEstado").dataTable({//transforma la tabla en dataTable
                iDisplayLength: 50,
                responsive: true,
                "sPagiationType": "full_numbers", //activa la paginación con números
                "language": {//cambia el lenguaje de la dataTable
                    "url": "../js/dataTable-es.json" //este es el archivo json del lenguaje español
                },
                "autoWidth": false,
                "columns": [
                    { "width": "15%%", "targets": 0 },
                    { "width": "25%", "targets": 0 },
                    { "width": "15%", "targets": 0 },
                    { "width": "15%", "targets": 0 },
                    { "width": "5%", "targets": 0 }
                ]
            });
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };

        app.verificarSesion = function () {
            var url = "../../controlador/ruteador/Sesion.php"; 
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    if (datos.id_usuario != null) {
                        if (datos.tipoAcceso_usuario === "2") {
                            location.href = "ordenEmpresa.html"
                        }else{
                            $("#id_user").val(datos.id_usuario);
                            idUsuario=datos.id_usuario;
                            $("#logedUser").html(datos.usuario_usuario);
                            app.bindings();
                        }  
                    } else {
                        location.href = "../../index.html";
                    }
                },
                error: function(data) {
                    location.href = "../../index.html";
                } 
            });
        };
        app.init();
    })(Estado);
});