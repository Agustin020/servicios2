$(function () {
    var Leyenda = {};
    var idUsuario = "";
    (function (app) {
        app.init = function () {
            app.verificarSesion();
        };
        app.bindings = function () {
            app.buscarLeyenda();
            app.mostrarFecha();
            $("#menuAdmin").mouseout(function () {
                $("#menuAdmin").css("background-color", "#393185");
            });

            $("#menuAdmin").mouseover(function () {
                $("#menuAdmin").css("background-color", "#312652");
            });

            $(".omover").mouseout(function () {
                $(this).css("background-color", "#393185");
            });

            $(".omover").mouseover(function () {
                $(this).css("background-color", "#312652");
            });
            $("#agregar").on('click', function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#id_leyenda").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-primary");
                $("#tituloModal").html("Nuevo Leyenda");
                $("#modalLeyenda").modal({show: true});
                $("#guardar").attr("value", "Agregar");
                $("#guardar").html("Agregar");
                $("#descripcion").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#tituloLeyenda").removeAttr("disabled");
                $("#guardar").show();
            });

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                app.validarCampos(event);
            });

            $("#tablaLeyenda").on('click', '.eliminar', function () {
                var id = $(this).attr("data-id_leyenda");
                bootbox.confirm({
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Está seguro?",
                    callback: function (result) {
                        if (result) {
                            app.eliminarLeyenda(id);
                        }
                    }
                });
            });

            $("#cuerpoTablaLeyenda").on('click', '.editar', function (event) {
                $("#id_leyenda").val($(this).attr("data-id_leyenda"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#tituloLeyenda").val($(this).parent().parent().children().first().next().html());
                $("#descripcion").val($(this).parent().parent().children().first().next().next().html());
                $("#alta").val($(this).parent().parent().children().first().next().next().next().html());
                $("#modificacion").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#baja").val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $("#guardar").attr("value", "modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Leyenda");
                $("#modalLeyenda").modal({show: true});
                $("#descripcion").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#tituloLeyenda").removeAttr("disabled");
                $("#guardar").show();
            });


            $("#cuerpoTablaLeyenda").on('click', '.seleccionar', function (event) {
                $("#id_leyenda").val($(this).attr("data-id_leyenda"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-info");
                $("#tituloLeyenda").val($(this).parent().parent().children().first().next().html());
                $("#descripcion").val($(this).parent().parent().children().first().next().next().html());
                $("#alta").val($(this).parent().parent().children().first().next().next().next().html());
                $("#modificacion").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#baja").val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $("#descripcion").attr('disabled', 'true');
                $("#tituloLeyenda").attr('disabled', 'true');
                $("#guardar").hide();
                $("#tituloModal").html("Detalles Leyenda");
                $("#modalLeyenda").modal({show: true});
            });

            $("#cancelar").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalLeyenda").modal('hide');
            });

            $("#equis").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalLeyenda").modal('hide');
            });
        };

        app.mostrarFecha = function () {
            var f = new Date();
            var mes = (f.getMonth() + 1);
            var mesLetras = "";
            switch (mes)
            {
                case 1:
                    mesLetras = "Enero";
                    break;
                case 2:
                    mesLetras = "Febrero";
                    break;
                case 3:
                    mesLetras = "Marzo";
                    break;
                case 4:
                    mesLetras = "Abril";
                    break;
                case 5:
                    mesLetras = "Mayo";
                    break;
                case 6:
                    mesLetras = "Junio";
                    break;
                case 7:
                    mesLetras = "Julio";
                    break;
                case 8:
                    mesLetras = "Agosto";
                    break;
                case 9:
                    mesLetras = "Septiembre";
                    break;
                case 10:
                    mesLetras = "Octubre";
                    break;
                case 11:
                    mesLetras = "Noviembre";
                    break;
                case 12:
                    mesLetras = "Diciembre";
                    break;
            }
            $("#fecha").html(f.getDate() + " de " + mesLetras + " de " + f.getFullYear());
        };

        app.validarCampos = function () {
            var id = $("#id_leyenda").val();
            var descripcion = $("#descripcion").val();
            var rta = "";
            if (descripcion == "") {
                rta += "Debes completar la Descripción.";
                bootbox.alert(rta);
                $("#descripcion").focus();
            } else {
                $("#alta").removeAttr("hidden");
                $("#modificacion").removeAttr("hidden");
                $("#baja").removeAttr("hidden");
                app.guardarLeyenda();
            }
        };

        app.eliminarLeyenda = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Leyenda&id=" + id;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.borrarFilaDataTable(id);
                },
                error: function (data) {
                    alert('error en app.eliminarLeyenda');
                }
            });
        };


        app.guardarLeyenda = function () {
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formLeyenda").serialize();
            //alert (data);
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalLeyenda").modal('hide');
                    if (typeof(datos.incorrecto) === 'undefined') {
                        app.actualizarDataTable(datos, $("#id_leyenda").val());
                    } else if (datos.incorrecto) {                       
                        bootbox.alert("La Leyenda '" + $("#tituloLeyenda").val() + "' ya existe... Intente nuevamente");
                    }
                },
                error: function (data) {
                    alert(data);
                }
            });
        };

        app.actualizarDataTable = function (data, id) {
            console.log(id);
            if (id == 0) { //si entra acá es porque es agrega
                var html="";
                $.each(data, function (clave, leyenda) {
                    html = '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + leyenda.titulo_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.descripcion_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_alta_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_baja_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_modificacion_leyenda + '</td>';
                html += '<td>' +
                        '<a class="btn pull-left editar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
                $("#cuerpoTablaLeyenda").append(html);

            } else {
                //busco la fila   
                var fila = $("#cuerpoTablaLeyenda").find("a[data-id_leyenda='" + id + "']").parent().parent();
                var contenidoFila = "";
                $.each(data, function (clave, leyenda) {                
                var contenidoFila = '<td>' +
                        '<a class="btn seleccionar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + leyenda.titulo_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.descripcion_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_alta_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_baja_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_modificacion_leyenda + '</td>';
                contenidoFila += '<td>' +
                        '<a class="btn pull-left editar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>';
            });
                fila.html(contenidoFila);
            }
            $(".oculto").hide();
        };

        app.borrarCampos = function () {
            $("#id_leyenda").val("").html();
            $("#descripcion").val("").html();
            $("#tituloLeyenda").val("").html();
        };

        app.buscarLeyenda = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Leyenda";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarDataTable(data);
                },
                error: function () {
                    alert('error buscar leyendas');
                }
            });
        };

        app.borrarFilaDataTable = function (id) {
            $("#cuerpoTablaLeyenda").find("a[data-id_leyenda='" + id + "']").parent().parent().remove();
        };

        app.rellenarDataTable = function (data) {
            var html = "";
            if ($.fn.DataTable.isDataTable('#tablaLeyenda')) {
                $('#tablaLeyenda').DataTable().destroy();
            }
            $.each(data, function (clave, leyenda) {
                html += '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + leyenda.titulo_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.descripcion_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_alta_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_baja_leyenda + '</td>' +
                        '<td class="oculto">' + leyenda.fch_modificacion_leyenda + '</td>';
                html += '<td>' +
                        '<a class="btn pull-left editar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-id_leyenda="' + leyenda.id_leyenda + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaLeyenda").html(html);
            $("#tablaLeyenda").dataTable({//transforma la tabla en dataTable
                iDisplayLength: 50,
                responsive: true,
                "sPagiationType": "full_numbers", //activa la paginación con números
                "language": {//cambia el lenguaje de la dataTable
                    "url": "../js/dataTable-es.json" //este es el archivo json del lenguaje español
                },
                "autoWidth": false,
                "columns": [
                    {"width": "15%", "targets": 0},
                    {"width": "15%", "targets": 0},
                    {"width": "25%", "targets": 0},
                    {"width": "15%", "targets": 0},
                    {"width": "15%", "targets": 0},
                    {"width": "15%", "targets": 0},
                    {"width": "15%", "targets": 0}
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
                success: function (datos) {
                    if (datos.id_usuario != null) {
                        if (datos.tipoAcceso_usuario === "2") {
                            location.href = "ordenEmpresa.html";
                        } else {
                            $("#id_user").val(datos.id_usuario);
                            idUsuario = datos.id_usuario;
                            $("#logedUser").html(datos.usuario_usuario);
                            app.bindings();
                        }
                    } else {
                        location.href = "../../index.html";
                    }
                },
                error: function (data) {
                    location.href = "../../index.html";
                }
            });
        };
        app.init();
    })(Leyenda);
});
