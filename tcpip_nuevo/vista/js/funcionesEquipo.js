$(function () {
    var Equipo = {};
    var idUsuario="";
    (function (app) {
        app.init = function () {
            app.verificarSesion();
        };
        app.bindings = function () {
            app.buscarEquipo();
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
                $("#id_equipo").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nuevo Equipo");
                $("#modalEquipo").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#descripcion").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#guardar").show();
            });

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                app.validarCampos(event);
            });
            
            $("#tablaEquipo").on('click', '.eliminar', function () {
                var id = $(this).attr("data-id_equipo");
                bootbox.confirm({
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Está seguro?",
                    callback: function (result) {
                        if (result) {
                            app.eliminarEquipo(id);
                        }
                    }
                });
            });

            $("#cuerpoTablaEquipo").on('click', '.editar', function (event) {
                $("#id_equipo").val($(this).attr("data-id_equipo"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#descripcion").val($(this).parent().parent().children().first().next().html());
                $("#guardar").attr("value", "Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Equipo");
                $("#modalEquipo").modal({show: true});
                $("#descripcion").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#guardar").show();
            });


            $("#cuerpoTablaEquipo").on('click', '.seleccionar', function (event) {
                $("#id_equipo").val($(this).attr("data-id_equipo"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-info");
                $("#descripcion").val($(this).parent().parent().children().first().next().html());
                $("#descripcion").attr('disabled', 'true');
                $("#guardar").hide();
                $("#tituloModal").html("Detalles Equipo");
                $("#modalEquipo").modal({show: true});
            });

            $("#cancelar").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalEquipo").modal('hide');
            });

            $("#equis").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalEquipo").modal('hide');
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
            var id = $("#id_equipo").val();
            var descripcion = $("#descripcion").val();
            var rta = "";
            if (descripcion == ""){
                rta += "Debes completar la Descripción.";
                bootbox.alert(rta);
                $("#descripcion").focus();
            }else{
                app.guardarEquipo();
            }
        };

        app.eliminarEquipo = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Equipo&id=" + id;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.borrarFilaDataTable(id);
                },
                error: function (data) {
                    alert('error en app.eliminarEquipo');
                }
            });
        };


        app.guardarEquipo = function () {
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formEquipo").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalEquipo").modal('hide');
                    app.actualizarDataTable(datos, $("#id_equipo").val());
                    
                },
                error: function (data) {
                    alert(data);
                }
            });
        };

        app.actualizarDataTable = function (equipo, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html = '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + equipo.descripcion_equipo + '</td>' + 
                        '<td class="oculto">' + equipo.fecha_alta_equipo + '</td>' +
                        '<td class="oculto">' + equipo.fecha_baja_equipo + '</td>';
                html += '<td>' +
                        '<a class="btn pull-left editar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaEquipo").append(html);

            } else {
                //busco la fila
                var fila = $("#cuerpoTablaEquipo").find("a[data-id_equipo='" + id + "']").parent().parent();
                var contenidoFila = '<td>' +
                        '<a class="btn seleccionar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + equipo.descripcion_equipo + '</td>' + 
                        '<td class="oculto">' + equipo.fecha_alta_equipo + '</td>' +
                        '<td class="oculto">' + equipo.fecha_baja_equipo + '</td>';
                contenidoFila += '<td>' +
                        '<a class="btn pull-left editar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>';
                fila.html(contenidoFila);
            }
            $(".oculto").hide();
        };

        app.borrarCampos = function () {
            $("#id_equipo").val("").html();
            $("#descripcion").val("").html();
        };

        app.buscarEquipo = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Equipo";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarDataTable(data);
                },
                error: function () {
                    alert('error buscar equipos');
                }
            });
        };

        app.borrarFilaDataTable = function (id) {
            $("#cuerpoTablaEquipo").find("a[data-id_equipo='" + id + "']").parent().parent().remove();
        };

        app.rellenarDataTable = function (data) {
            var html = "";
            if ( $.fn.DataTable.isDataTable( '#tablaEquipo' ) ) {
                $('#tablaEquipo').DataTable().destroy();
            }
            $.each(data, function (clave, equipo) {
                html += '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + equipo.descripcion_equipo + '</td>' + 
                        '<td class="oculto">' + equipo.fecha_alta_equipo + '</td>' +
                        '<td class="oculto">' + equipo.fecha_baja_equipo + '</td>';
                html += '<td>' +
                        '<a class="btn pull-left editar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-id_equipo="' + equipo.id_equipo + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaEquipo").html(html);
            $("#tablaEquipo").dataTable({//transforma la tabla en dataTable
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
                    { "width": "15%", "targets": 0 }
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
    })(Equipo);
});
