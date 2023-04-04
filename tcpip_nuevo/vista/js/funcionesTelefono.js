$(function () {
    var TallerAvanzada = {};
    var idUsuario="";
    (function (app) {
        app.init = function () {
            app.verificarSesion();
            $("#nombreCliente").attr("disabled", true);
        };
        app.bindings = function () {
            app.mostrarFecha();
            var f = app.getParameterByName();
            if(f == null || f =="") {
                app.buscarTelefonos();
            }else{
                app.buscarTelefonosDeCliente(f);
            }
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
            app.buscarClientes();
            $("#divTablaClientes").hide();
            $("#agregar").on('click', function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#id_telefono").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nuevo Teléfono");
                $("#modalTelefono").modal({show: true});
                $("#guardar").attr("value", "Agregar");
                $("#guardar").html("Agregar");
                $("#guardar").show();
                $("#reporDetalle").hide();
                app.activarControles();
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
        
        app.getParameterByName = function() {
            var loc = document.location.href;
            if(loc.indexOf('?')>0){
                var res = loc.split('?')[1];
                var id = res.split('=')[1];
                return id;
            }else{
                return null;
            }
        }; 
        app.desactivarControles = function(){
            $("#selecCliente").hide();
            $("#numero").attr("disabled", true);
            $("#propietario").attr("disabled", true);
            $("#detalle").attr("disabled", true);
        };
        app.activarControles = function(){
            $("#selecCliente").show();
            $("#numero").removeAttr("disabled");
            $("#propietario").removeAttr("disabled");
            $("#detalle").removeAttr("disabled");
        };
        app.buscarTelefonos = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Telefono";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarDataTable(data);
                },
                error: function () {
                    alert('error buscar telefonos');
                }
            });
        };
        
        app.buscarTelefonosDeCliente = function(text) {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&id=" + text;

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error en buscar telefonos de cliente');
                }
            });
        };
        
        app.borrarCampos = function () {
            $("#numero").val("").html();
            $("#propietario").val("").html();
            $("#detalle").val("").html();
            $("#id_cliente").val("").html();
            $("#nombreCliente").val("").html();
            $("#id_telefono").val("").html();
            $("#formTelefono").bootstrapValidator('resetForm', true);
        };
        app.guardarTelefono = function () {//Funcion para guardar Telefono
            var url = "../../controlador/ruteador/Ruteador.php";
            var data = $("#formTelefono").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalTelefono").modal('hide');
                    app.actualizarDataTable(datos, ($("#id_telefono").val()));
                },
                error: function (datos) {
                    alert(datos);
                }
            });
        };
        app.modificarTelefono = function () {    //funcion para modificar telefono
            var url = "../../controlador/ruteador/Ruteador.php";
            //voy al ruteador a guardar el telefono (tanto para modificar como para agregar)
            //data del formulario
            var data = $("#formTelefono").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalTelefono").modal('hide');
                    app.actualizarDataTable(datos, $("#id_telefono").val());
                },
                error: function (datos) {
                    alert(datos);
                }
            });
        };
        app.rellenarDataTable = function (data) {
            var html = "";
            $.each(data, function (clave, telefono) {
                html += '<tr class="text-warning">' + //agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                        //después editar los datos que he recibido
                        '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '</button></a></td>' +
                        '<td>' + telefono.numero_telefono + '</td>';
                        if (telefono.propietario_telefono == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + telefono.propietario_telefono + '</td>';
                        }
                        if (telefono.detalle_telefono == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + telefono.detalle_telefono + '</td>';
                        }
                        html +='<td class="oculto">' + telefono.id_cliente + '</td>' +
                        '<td>' + telefono.apellido_cliente + ', ' + telefono.nombre_cliente + '</td>' +
                        '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</button></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaTelefonos").html(html);
            $("#tablaTelefonos").dataTable({//transforma la tabla en dataTable
                iDisplayLength: 50,
                "sPagiationType": "full_numbers", //activa la paginación con números
                "language": {//cambia el lenguaje de la dataTable
                    "url": "../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };
        app.actualizarDataTable = function (telefono, id) {   //funcion para agregar un telefono nuevo o modificar uno existente en la tabla telefono
            if (id == 0) { //ES guardar un telefono nuevo
                var html = "";
                html += '<tr class="text-warning">' + //agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                        //después editar los datos que he recibido
                        '<td><a class="seleccionar" data-toggle="tooltip" title="Seleccionar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '</button></a></td>' +
                        '<td>' + telefono.numero_telefono + '</td>';
                        if (telefono.propietario_telefono == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + telefono.propietario_telefono + '</td>';
                        }
                        if (telefono.detalle_telefono == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + telefono.detalle_telefono + '</td>';
                        }
                        html +='<td class="oculto">' + telefono.id_cliente + '</td>' +
                        '<td>' + telefono.apellido_cliente + ', ' + telefono.nombre_cliente + '</td>' +
                        '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaTelefonos").append(html);
            } else {    //Es Modificar un telefono existente
                //busco la fila
                    var fila = $("#cuerpoTablaTelefonos").find("a[data-id_telefono='" + id + "']").parent().parent();
                    var html = '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                            '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                            '<td>' + telefono.numero_telefono + '</td>';
                            if (telefono.propietario_telefono == null) {
                                html +='<td></td>';
                            }else{
                                html +='<td>' + telefono.propietario_telefono + '</td>';
                            }
                            if (telefono.detalle_telefono == null) {
                                html +='<td></td>';
                            }else{
                                html +='<td>' + telefono.detalle_telefono + '</td>';
                            }
                            html +='<td class="oculto">' + telefono.id_cliente + '</td>' +
                            '<td>' + telefono.apellido_cliente + ', ' + telefono.nombre_cliente + '</td>' +
                            '<td>' +
                            '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                            '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                            '</button></a>' +
                            '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Teléfono" data-id_telefono="' + telefono.id_telefono + '">' +
                            '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                            '</td>';
                    fila.html(html);
            }
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };
        app.eliminarTelefono = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Telefono&id=" + id;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.borrarFilaDataTable(id);
                },
                error: function (data) {
                    alert('error en app.eliminarTelefono');
                }
            });
        };
        app.borrarFilaDataTable = function (id) {
            var fila = $("#cuerpoTablaTelefonos").find("a[data-id_telefono='" + id + "']").parent().parent().remove();
        };

        $("#cuerpoTablaTelefonos").on('click', '.eliminar', function () {
            var id = $(this).attr("data-id_telefono");
                bootbox.confirm({ 
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Estás seguro?", 
                    callback: function(result){
                    if(result){
                        app.eliminarTelefono(id);
                    }
                    }
                });
        });
        $("#tablaTelefonos").on('click', '.editar', function () {
            $("#id_telefono").val($(this).attr("data-id_telefono"));
            $("#mHeader").removeClass();
            $("#mHeader").attr("class","modal-header bg-success");
            $("#id_cliente").val($(this).parent().parent().children().first().next().next().next().next().html());
            $("#nombreCliente").val($(this).parent().parent().children().first().next().next().next().next().next().html());
            $("#numero").val($(this).parent().parent().children().first().next().html());
            $("#propietario").val($(this).parent().parent().children().first().next().next().html());
            $("#detalle").val($(this).parent().parent().children().first().next().next().next().html());
            $("#tituloModal").html("Modificar Teléfono");
            $("#modalTelefono").modal({show: true});
            $("#guardar").html("Modificar");
            $("#guardar").show();
            $("#reporDetalle").hide();
            app.activarControles();
        });
        $("#tablaTelefonos").on('click', '.seleccionar', function () {
            $("#id_telefono").val($(this).attr("data-id_telefono"));
            $("#mHeader").removeClass();
            $("#mHeader").attr("class","modal-header bg-info");
            $("#id_cliente").val($(this).parent().parent().children().first().next().next().next().next().html());
            $("#nombreCliente").val($(this).parent().parent().children().first().next().next().next().next().next().html());
            $("#numero").val($(this).parent().parent().children().first().next().html());
            $("#propietario").val($(this).parent().parent().children().first().next().next().html());
            $("#detalle").val($(this).parent().parent().children().first().next().next().next().html());
            $("#tituloModal").html("Detalles Telefono");
            $("#modalTelefono").modal({show: true});
            $("#guardar").html("Modificar");
            $("#guardar").hide();
            $("#reporDetalle").show();
            app.desactivarControles();
        });
        $("#cancelar").on("click", function (event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalTelefono").modal('hide');
        });
        
         $("#equis").on("click", function (event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalTelefono").modal('hide');
        });
        
        
        $("#guardar").on("click", function (event) {
            event.preventDefault();
            app.validarCampos();
        });
        $("#reporteTelefono").on('click', function(event) {
            event.preventDefault();
            window.open('../reportes/reporteTelefonos.php?idUsuario='+idUsuario, '_blank'); 
        });
        $('#modalTelefono').on('shown.bs.modal', function () {
            $('#nombreCliente').focus();
        }); 
        $("#reporDetalle").on('click', function(event) {
            event.preventDefault();
            var idTel = $("#id_telefono").val();
            window.open('../reportes/reporteDetalleTelefono.php?id=' + idTel+'&idUsuario='+idUsuario , '_blank'); //de esta forma abre en una nueva ventana o pestaña
           ;
        });
        app.validarCampos = function(){
            var nomCliente = $("#nombreCliente").val();
            var num = $("#numero").val();
            var rta = "";
            if (nomCliente == "") {
                rta += "Debes seleccionar un Cliente";
                bootbox.alert(rta);
                $("#selecCliente").focus();
            }else if(num == 0){
                rta += "Debes completar un Número";
                bootbox.alert(rta);
                $("#numero").focus();
            }else{
                app.guardarTelefono();
            }
        };
        app.verificarSesion = function () {
            var url = "../../controlador/ruteador/Sesion.php";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    if (datos.id_usuario != null && datos.tipoAcceso_usuario != null) {
                        $("#id_user").val(datos.id_usuario);
                        var tA = datos.tipoAcceso_usuario;
                        idUsuario=datos.id_usuario;
                        if (tA == 1) {
                            if (datos.tipoAcceso_usuario === "2") {
                                location.href = "ordenEmpresa.html"
                            }else{
                                $("#logedUser").html(datos.usuario_usuario);
                                app.bindings(); 
                            }
                        }else{
                            location.href = "../../admin.html";
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

        app.buscarClientes = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarDataTableClientes(data);
                },
                error: function () {
                    alert('error al intentar buscar clientes');
                }
            });
        };
        
        app.rellenarDataTableClientes = function (data) {
            var html = "";
            $.each(data, function (clave, cliente) {
                html += '<tr class="text-warning">' +
                        '<td><a class="seleccionar" data-id_cliente="' + cliente.id_cliente + '"><button class="btn btn-info btn-sm">' +
                        '<span class="glyphicon glyphicon-eye-open left">Seleccionar</span></button></a></td>' +
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaClientes").html(html);
            $("#tablaClientes").dataTable({//transforma la tabla en dataTable
                responsive: true,
                iDisplayLength: 50,
                "sPagiationType": "full_numbers", //activa la paginación con números
                "language": {//cambia el lenguaje de la dataTable
                    "url": "../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
        };


        $("#selecCliente").on('click', function () {
            $("#divTablaClientes").toggle();
        });
        $("#cuerpoTablaClientes").on('click', '.seleccionar', function (event) {
            event.preventDefault();
            var cliente = $(this).parent().parent().children().first().next().html() + ', ' + $(this).parent().parent().children().first().next().next().html();;
            $("#id_cliente").val($(this).attr("data-id_cliente"));
            $("#nombreCliente").val(cliente);
            $("#divTablaClientes").hide();
        });
        app.init();
    })(TallerAvanzada);
});

