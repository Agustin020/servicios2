$(function () {
    var Orden = {};
    var idUsuario = "";
    var tipoAcceso = "";   
    var opcion = "";
    (function (app) {
        app.init = function () {
            app.verificarSesion();
        };
        app.bindings = function () {
            app.buscarOrdenes();
            //app.buscarClientes();
            app.mostrarFecha();
            
            

//            $("#monto").on('keypress', function(tecla) {
//                if ((tecla.charCode < 48 || tecla.charCode > 57) && (tecla.charCode != 46) && (tecla.charCode != 8)) {
//                    return false;
//                }else {
//                         var len   = $('#monto').val().length;
//                         var index = $('#monto').val().indexOf('.');
//                         if (index > 0 && tecla.charCode == 46) {
//                             return false;
//                         }
//                         if (index > 0) {
//                             var CharAfterdot = (len + 1) - index;
//                             if (CharAfterdot > 3) {
//                                 return false;
//                             }
//                         }
//                }
//                return true;
//            });
//            
//            $("#entregado").on('keypress', function(tecla) {
//                if ((tecla.charCode < 48 || tecla.charCode > 57) && (tecla.charCode != 46) && (tecla.charCode != 8)) {
//                    return false;
//                }else {
//                         var len   = $('#entregado').val().length;
//                         var index = $('#entregado').val().indexOf('.');
//                         if (index > 0 && tecla.charCode == 46) {
//                             return false;
//                         }
//                         if (index > 0) {
//                             var CharAfterdot = (len + 1) - index;
//                             if (CharAfterdot > 3) {
//                                 return false;
//                             }
//                         }
//                }
//                return true;
//            });

            $("#nombreCliente").attr('disabled', 'true');
            $('[data-toggle="tooltip"]').tooltip();
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
                $("#nombreCliente").attr('disabled', 'true');
                $("#divTablaClientes").hide();
                $("#divAgregarClientes").hide();
                $("#selecCliente").show();
                $("#agregarCliente").show();
                $("#id_orden").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-primary");
                $("#tituloModal").html("Nueva Orden");
                $("#modalOrden").modal({show: true});
                $("#guardar").attr("value", "Agregar");
                $("#guardar").html("Agregar");
                $("#guardar").show();
                $("#imprimir").hide();
                //app.buscarNumero();
                app.activarControles();
                app.borrarCampos();
            });

            $("#selecCliente").on('click', function () {
                //app.buscarClientes();
                $("#divTablaClientes").slideToggle();
                $("#divTablaClientes").css("border-bottom-style", "solid");
                $("#divTablaClientes").css("border-bottom-width", "1px");
                $("#divTablaClientes").css("border-bottom-color", "grey");
                $("#divTablaClientes").css("border-top-style", "solid");
                $("#divTablaClientes").css("border-top-width", "1px");
                $("#divTablaClientes").css("border-top-color", "grey");
            });

            $("#agregarCliente").on('click', function () {
                $("#divTablaClientes").hide();
                $("#mHeaderCliente").removeClass();
                $("#mHeaderCliente").attr("class", "modal-header bg-primary");
                $("#tituloModalCliente").html("Nuevo Cliente");
                $("#modalCliente").modal({show: true});
                $("#guardarCliente").attr("value", "Agregar");
                $("#guardarCliente").html("Agregar");
                $("#guardarCliente").show();

            });

            $("#cuerpoTablaClientes").on('click', '.seleccionar', function (event) {
                event.preventDefault();
                var cliente = $(this).parent().parent().children().first().next().html() + ", " + $(this).parent().parent().children().first().next().next().html();
                $("#id_cliente").val($(this).attr("data-id_cliente"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-info");
                $("#divTablaClientes").hide();
                $("#nombreCliente").val(cliente);
                $("#numero_orden").focus();
            });

            $("#tablaOrdenes").on('click', '.eliminar', function () {
                var id = $(this).attr("data-id_orden");
                bootbox.confirm({
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Está seguro?",
                    callback: function (result) {
                        if (result) {
                            app.eliminarOrden(id);
                        }
                    }
                });
            });

            $("#comboEstado").change(function () {
                var idEstado = $("#comboEstado").val();
                $("#id_estado").val(idEstado);
            });

            $("#comboUsuario").change(function () {
                var idUser = $("#comboUsuario").val();
                $("#id_usuario").val(idUser);
            });

            $('#modalOrden').on('shown.bs.modal', function () {
                $('#numero_orden').focus();
            });

            $("#cuerpoTablaOrdenes").on('click', '.editar', function (event) {
                $("#divTablaClientes").hide();

                $("#id_orden").val($(this).attr("data-id_orden"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#id_cliente").val($(this).parent().parent().children().first().next().html());
                $("#nombreCliente").val($(this).parent().parent().children().first().next().next().children().children().html());
                $("#numero_orden").val($(this).parent().parent().children().first().next().next().next().next().children().html());
                $("#equipo").val($(this).parent().parent().children().first().next().next().next().next().next().children().html());

                $("#falla_cliente").val($(this).parent().parent().children().first().next().next().next().next().next().next().html());
                $("#observaciones").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().html());
                $("#numero_siniestro").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().children().html());
                $("#monto").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().children().children().html());
                $("#entregado").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().html());
                $("#id_estado").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().html());
                var idEstado = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().children().html();
                var estado = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().children().html();
                app.cargarComboEstado(estado);

                $("#id_usuario").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().html());
                var idUser = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().children().html();
                var usuario = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().children().html();
                app.cargarComboUsuario(usuario);

                $("#imprimir").hide();
                $("#selecCliente").show();
                $("#agregarCliente").show();
                $("#guardar").attr("value", "Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Orden");
                $("#modalOrden").modal({show: true});

                $("#guardar").show();
                app.activarControles();
            });

            $("#btnBuscar").on('click', function (event) {
                event.preventDefault();
                app.recarga();
                //window.location.href = 'http://tcpiptecnologia.com.ar/servicios2/tcpip_nuevo/controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Orden';
                //window.location.href = 'http://tcpiptecnologia.com.ar/servicios2/tcpip_nuevo/controlador/ruteador/Ruteador.php?accion=buscarX&nombreFormulario=Orden';
                //location. reload();
                //console.log("pasos Completos");
            });
            
            
            

            $("#cuerpoTablaOrdenes").on('click', '.fotos', function (event) {
                var idOrden = $(this).attr("data-id_orden");
                location.href = "foto.html?id=" + idOrden;
            });

            $("#cuerpoTablaOrdenes").on('click', '.seleccionar', function (event) {
                $("#divTablaClientes").hide();
                $("#id_orden").val($(this).attr("data-id_orden"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-info");

                $("#id_orden").val($(this).attr("data-id_orden"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#id_cliente").val($(this).parent().parent().children().first().next().html());
                $("#nombreCliente").val($(this).parent().parent().children().first().next().next().children().children().html());
                $("#numero_orden").val($(this).parent().parent().children().first().next().next().next().next().children().html());
                $("#equipo").val($(this).parent().parent().children().first().next().next().next().next().next().children().html());
                $("#falla_cliente").val($(this).parent().parent().children().first().next().next().next().next().next().next().html());

                $("#observaciones").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().html());
                $("#numero_siniestro").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().children().html());
                $("#monto").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().children().children().html());
                $("#entregado").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().html());
                $("#id_estado").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().html());
                var idEstado = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().children().html();
                var estado = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().children().html();
                app.cargarComboEstado(estado);

                $("#id_usuario").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().html());
                var idUser = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().children().html();
                var usuario = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().children().html();
                app.cargarComboUsuario(usuario);

                $("#imprimir").show();
                $("#imprimir").html("Imprimir");
                $("#selecCliente").hide();
                $("#agregarCliente").hide();
                $("#guardar").hide();
                $("#tituloModal").html("Detalles Orden");
                $("#modalOrden").modal({show: true});
                app.desactivarControles();
            });

            $("#cancelar").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalOrden").modal('hide');
            });

            $("#equis").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalOrden").modal('hide');
            });

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                app.validarCampos(event);
            });
            
            app.buscarLeyenda = function () {
                var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Leyenda";
                $.ajax({
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var opcion2="";
                        var i = 0;
                        opcion = '<div class="form-check">';
                        $.each(data, function (clave, leyenda) {                           
                                opcion +='<label><input type="checkbox" class="form-chek-input" id="'+leyenda.id_leyenda+'" value="'+leyenda.id_leyenda+'">'+leyenda.titulo_leyenda+'</label><br>';
                        });
                        opcion += '</div>';
                        $("#relleno").html(opcion);                        
                    },
                    error: function () {
                        alert('error buscar leyendas imprimir');
                    }
                });
            };

            $("#imprimir").on('click', function (event) {
                event.preventDefault();
                var idOrden = $("#id_orden").val();
                var estado = $("#id_estado").val();
                bootbox.confirm({
                    message: "Imprime Leyenda?",
                    buttons: {
                        confirm: {
                            label: 'SI',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'NO',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if(result === true){
                             app.buscarLeyenda();
                        $("#dialogo").modal({show: true});
                        $("#cancelarImp").on("click", function (event) {
                            event.preventDefault();
                            $("#dialogo").modal('hide');
                        });
                       $("#imp").on("click", function (event) {
                            event.preventDefault();
                            var data ="";
                            var i=0;
                            $('#formImp input[type=checkbox]').each(function () {
                                if (this.checked) {
                                    data +=$(this).val() + ',';
                                    i++;
                                }
                            });
                            window.open('../reportes/reporteOrden.php?id=' + idOrden + '&leyenda=' + result + '&estado=' + estado+'&check='+data, '_blank'); //de esta forma abre en una nueva ventana o pestaña
                       idOrden = $("#id_orden").val(""); 
                       });
                        //window.open('../reportes/reporteOrden.php?id=' + idOrden + '&leyenda=' + result + '&estado=' + estado, '_blank'); //de esta forma abre en una nueva ventana o pestaña

                        }else{
                            window.open('../reportes/reporteOrden.php?id=' + idOrden + '&leyenda=' + result + '&estado=' + estado+'&check=""', '_blank'); //de esta forma abre en una nueva ventana o pestaña
                        idOrden = $("#id_orden").val("");
                        }
                       
                    }
                });
                console.log(idOrden);
                $("#modalOrden").modal('hide');
            });
            
            $("#cancelarCliente").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalCliente").modal('hide');
                $("#contTelefonos").val("2");
            });

            $("#equisCliente").on("click", function (event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalCliente").modal('hide');
                $("#contTelefonos").val("2");
            });

            $("#guardarCliente").on("click", function (event) {
                event.preventDefault();
                app.validarCamposCliente();
            });

            $('#modalCliente').on('shown.bs.modal', function () { //QFFooter
                $('#apellido').focus();
            });
            $("#masTelefonos").on('click', function (event) {
                var cont = $("#contTelefonos").val();
                var idId = "id_telefono" + cont;
                var idNum = "numero" + cont;
                var idProp = "propietario" + cont;
                var idDet = "detalle" + cont
                //alert("Cont: " + cont + ". Id: " + idId + ". Num: " + idNum + ". Prop: " + idProp + ". Det: " + idDet);
                var filaGrid = "<div class=\"form-group row\"><div class=\"col-lg-2\">" +
                        "<input class=\"form-control\" type=\"hidden\" id=\"" + idId + "\" name=\"" + idId + "\">" +
                        "</div>" +
                        "<div class=\"col-lg-3\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + idNum + "\" name=\"" + idNum + "\" placeholder=\"N&uacute;mero\">" +
                        "</div>" +
                        "<div class=\"col-lg-3\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + idProp + "\" name=\"" + idProp + "\" placeholder=\"Propietario\">" +
                        "</div>" +
                        "<div class=\"col-lg-4\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + idDet + "\" name=\"" + idDet + "\" placeholder=\"Detalles\">" +
                        "</div></div>";
                $("#gridTelefonos").append(filaGrid);
                $("#contTelefonos").val((parseInt(cont) + 1).toString());
            });

        };

        //COMIENZO CODIGO MODAL CLIETNE
        app.inicializarGridTelefonos = function () {
            var filaGrid = "<div class=\"form-group row\"><div class=\"col-lg-2\">" +
                    "<input class=\"form-control\" type=\"hidden\" id=\"id_telefono1\" name=\"id_telefono1\">" +
                    "</div>" +
                    "<div class=\"col-lg-3\">" +
                    "<input class=\"form-control\" type=\"text\" id=\"numero1\" name=\"numero1\" placeholder=\"N&uacute;mero\">" +
                    "</div>" +
                    "<div class=\"col-lg-3\">" +
                    "<input class=\"form-control\" type=\"text\" id=\"propietario1\" name=\"propietario1\" placeholder=\"Propietario\">" +
                    "</div>" +
                    "<div class=\"col-lg-4\">" +
                    "<input class=\"form-control\" type=\"text\" id=\"detalle1\" name=\"detalle1\" placeholder=\"Detalles\">" +
                    "</div></div>";
            $("#gridTelefonos").html(filaGrid);
        };
        app.traerTelefonos = function () {
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&id=" + id_cliente;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.cargarGridTelefonos(data);
                },
                error: function (data) {
                    alert('error en app.traerTelefonos');
                }
            });
        };

        app.traerTelefonosDisabled = function () {
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&id=" + id_cliente;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.cargarGridTelefonosDisabled(data);
                },
                error: function (data) {
                    alert('error en app.traerTelefonos');
                }
            });
        };

        app.cargarGridTelefonos = function (data) {
            var index = 0; //para ir creando los campos numero1, 2, 3 y asi. Lo mismo en propietario y detalle
            var ids = "id_telefono";
            var nums = "numero";
            var prop = "propietario";
            var det = "detalle";
            var filaGrid = "";
            $("#gridTelefonos").html(filaGrid);
            $.each(data, function (clave, tel) {
                filaGrid = "<div class=\"form-group row\"><div class=\"row\"><div class=\"col-lg-2\">" +
                        "<input class=\"form-control\" type=\"hidden\" id=\"" + (ids + (index.toString())) + "\" name=\"" + (ids + (index.toString())) + "\" value=\"" + tel.id_telefono + "\">" +
                        "</div>" +
                        "<div class=\"col-lg-3\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + (nums + (index.toString())) + "\" name=\"" + (nums + (index.toString())) + "\" placeholder=\"N&uacute;mero\" value=\"" + tel.numero_telefono + "\">" +
                        "</div>" +
                        "<div class=\"col-lg-3\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + (prop + (index.toString())) + "\" name=\"" + (prop + (index.toString())) + "\" placeholder=\"Propietario\" value=\"" + tel.propietario_telefono + "\">" +
                        "</div>" +
                        "<div class=\"col-lg-4\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + (det + (index.toString())) + "\" name=\"" + (det + (index.toString())) + "\" placeholder=\"Detalles\" value=\"" + tel.detalle_telefono + "\">" +
                        "</div></div>";
                $("#gridTelefonos").append(filaGrid);
                index++;
            });
        };

        app.cargarGridTelefonosDisabled = function (data) {
            var index = 0; //para ir creando los campos numero1, 2, 3 y asi. Lo mismo en propietario y detalle
            var ids = "id_telefono";
            var nums = "numero";
            var prop = "propietario";
            var det = "detalle";
            var filaGrid = "";
            $("#gridTelefonos").html(filaGrid);
            $.each(data, function (clave, tel) {
                filaGrid = "<div class=\"form-group row\"><div class=\"row\"><div class=\"col-lg-2\">" +
                        "<input class=\"form-control\" type=\"hidden\" id=\"" + (ids + (index.toString())) + "\" name=\"" + (ids + (index.toString())) + "\" value=\"" + tel.id_telefono + "\" disabled=\"true\">" +
                        "</div>" +
                        "<div class=\"col-lg-3\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + (nums + (index.toString())) + "\" name=\"" + (nums + (index.toString())) + "\" placeholder=\"N&uacute;mero\" value=\"" + tel.numero_telefono + "\" disabled=\"true\">" +
                        "</div>" +
                        "<div class=\"col-lg-3\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + (prop + (index.toString())) + "\" name=\"" + (prop + (index.toString())) + "\" placeholder=\"Propietario\" value=\"" + tel.propietario_telefono + "\" disabled=\"true\">" +
                        "</div>" +
                        "<div class=\"col-lg-4\">" +
                        "<input class=\"form-control\" type=\"text\" id=\"" + (det + (index.toString())) + "\" name=\"" + (det + (index.toString())) + "\" placeholder=\"Detalles\" value=\"" + tel.detalle_telefono + "\" disabled=\"true\">" +
                        "</div></div>";
                $("#gridTelefonos").append(filaGrid);
                index++;
            });
        };
        app.dialogo = function (opcion) {
            
            $("#relleno").html(opcion);
            $("#dialogo").modal({show: true});
        };
        app.borrarCamposCliente = function () {
            $("#apellido").val("").html();
            $("#nombre").val("").html();
            $("#dni").val("").html();
            $("#direccion").val("").html();
            $("#email").val("").html();
            app.inicializarGridTelefonos();
        };

        
        app.validarCamposCliente = function () {
            //dir y fechaNac pueden ser null
            var nom = $("#nombre").val();
            var ape = $("#apellido").val();
            var dni = $("#dni").val();
            var dir = $("#direccion").val();
            var mail = $("#email").val();
            var telefono = $("#numero1").val();
            var rta = "";
            if (ape == "") {
                rta += "Debes completar el campo APELLIDO.";
                bootbox.alert(rta);
                $("#apellido").focus();
            } else if (ape.length > 50) {
                rta += "Máximo 50 caracteres para APELLIDO.";
                bootbox.alert(rta);
                $("#apellido").focus();
            } else if (nom == "") {
                rta += "Debes completar el campo NOMBRE.";
                bootbox.alert(rta);
                $("#nombre").focus();
            } else if (nom.length > 50) {
                rta += "Máximo 50 caracteres para NOMBRE.";
                bootbox.alert(rta);
                $("#nombre").focus();
            } else if (dni == "") {
                rta += "Debes completar el campo DNI/CUIT.";
                bootbox.alert(rta);
                $("#dni").focus();
            } else if (isNaN(dni)) {
                rta += "Sólo números para DNI/CUIT.";
                bootbox.alert(rta);
                $("#dni").focus();
            } else if (dni.length > 11) {
                rta += "Máximo 11 dígitos para DNI/CUIT.";
                bootbox.alert(rta);
                $("#dni").focus();
            } else if (dir == "") {
                rta += "Debes completar el campo DIRECCIÓN.";
                bootbox.alert(rta);
                $("#direccion").focus();
            } else if (dir.length > 100) {
                rta += "Máximo 100 caracteres para DIRECCIÓN.";
                bootbox.alert(rta);
                $("#direccion").focus();
            } else if (mail == "") {
                rta += "Debes completar el campo E-MAIL.";
                bootbox.alert(rta);
                $("#email").focus();
            } else if (mail.length > 50) {
                rta += "Máximo 60 caracteres para E-MAIL.";
                bootbox.alert(rta);
                $("#email").focus();
            } else {
                if (telefono == "") {
                    $("#numero1").val(0);
                }
                app.guardarCliente();
                app.borrarCamposCliente();
            }
        };

        app.guardarCliente = function () {
            var url = "../../controlador/ruteador/Ruteador.php";
            var data = $("#formCliente").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#nombreCliente").val(datos.apellido_cliente + ", " + datos.nombre_cliente);
                    $("#id_cliente").val(datos.id_cliente);
                    $("#modalCliente").modal('hide');
                    $("#numero_orden").focus();
                    app.buscarClientes();
                },
                error: function (data) {
                    alert(data);
                }
            });
        };

        //FIN CODIGO MODAL CLIENTE


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
            if ($.fn.DataTable.isDataTable('#tablaClientes')) {
                $('#tablaClientes').DataTable().destroy();
            }
            $.each(data, function (clave, cliente) {
                html += '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar center-block"  class="btn" data-toggle="tooltip" title="Seleccionar Cliente" data-id_cliente="' + cliente.id_cliente + '">' +
                        '<span><img src="../imagenes/iconos/elegir2.ico" width="28" height="28" alt="Seleccionar"></span></a></td>' +
                        '<td class="text-center">' + cliente.apellido_cliente + '</td>' +
                        '<td class="text-center">' + cliente.nombre_cliente + '</td>' +
                        '<td class="text-center">' + cliente.dni_cliente + '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaClientes").html(html);
            $("#tablaClientes").dataTable({//transforma la tabla en dataTable
                responsive: true,
                "sPagiationType": "full_numbers", //activa la paginación con números
                "language": {//cambia el lenguaje de la dataTable
                    "url": "../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            $('[data-toggle="tooltip"]').tooltip();
        };

        app.cargarComboEstado = function (text) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Estado";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarComboEstado(data, text);
                },
                error: function () {
                    alert('error al intentar cargar combo estados');
                }
            });
        };

        app.rellenarComboEstado = function (data, text) {
            $("#comboEstado").html("<option value=\"0\">Estado</option>");
            $.each(data, function (clave, estado) {
                if (estado.descripcion_estado == text) {
                    $("#comboEstado").append("<option value=\"" + estado.id_estado + "\" selected>" + estado.descripcion_estado + "</option>");
                } else {
                    $("#comboEstado").append("<option value=\"" + estado.id_estado + "\">" + estado.descripcion_estado + "</option>");
                }
            });
        };

        app.cargarComboUsuario = function (text) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Usuario";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarComboUsuario(data, text);
                },
                error: function () {
                    alert('error al intentar cargar combo usuarios');
                }
            });
        };

        app.rellenarComboUsuario = function (data, text) {
            $("#comboUsuario").html("<option value=\"0\">Usuario</option>");
            $.each(data, function (clave, usuario) {
                if (usuario.tipoAcceso_usuario !== "2") {
                    if (usuario.apellido_usuario + ', ' + usuario.nombre_usuario == text) {
                        $("#comboUsuario").append("<option value=\"" + usuario.id_usuario + "\" selected>" + usuario.apellido_usuario + ", " + usuario.nombre_usuario + "</option>");
                    } else {
                        $("#comboUsuario").append("<option value=\"" + usuario.id_usuario + "\">" + usuario.apellido_usuario + ", " + usuario.nombre_usuario + "</option>");
                    }
                }
            });
        };

        app.borrarCampos = function () {
            //$("#id_orden").val("").html();
            $("#numero_orden").val("").html();
            $("#equipo").val("").html();
            $("#falla_cliente").val("").html();
            $("#observaciones").val("").html();
            $("#numero_siniestro").val("").html();
            $("#monto").val("").html();
            $("#nombreCliente").val("").html();
            $("#entregado").val("").html();
            $("#id_cliente").val("").html();
            app.cargarComboEstado("Estado");
            app.cargarComboUsuario("Usuario");

        };

        app.activarControles = function () {
            $("#id_orden").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
            $("#numero_orden").removeAttr("disabled");
            $("#equipo").removeAttr("disabled");

            $("#falla_cliente").removeAttr("disabled");
            $("#observaciones").removeAttr("disabled");
            $("#numero_siniestro").removeAttr("disabled");
            $("#monto").removeAttr("disabled");
            $("#entregado").removeAttr("disabled");

            $("#comboEstado").removeAttr("disabled");

            $("#comboUsuario").removeAttr("disabled");
        };

        app.desactivarControles = function () {
            $("#id_orden").attr('disabled', 'true');
            $("#numero_orden").attr('disabled', 'true');
            $("#equipo").attr('disabled', 'true');
            $("#nombreCliente").attr('disabled', 'true');
            $("#falla_cliente").attr('disabled', 'true');
            $("#observaciones").attr('disabled', 'true');
            $("#numero_siniestro").attr('disabled', 'true');
            $("#monto").attr('disabled', 'true');
            $("#entregado").attr('disabled', 'true');

            $("#comboEstado").attr('disabled', 'true');

            $("#comboUsuario").attr('disabled', 'true');

        };





        app.validarCampos = function (event) {
            var idOrden = $("#id_orden").val();
            var nroOrden = $("#numero_orden").val();
            var Equipo = $("#equipo").val();
            var observ = $("#observaciones").val();
            var monto = $("#monto").val();
            var entregado = $("#entregado").val();
            var idEstado = $("#comboEstado").val();
            var idUser = $("#comboUsuario").val();
            var idCliente = $("#id_cliente").val();
            var nombreCliente = $("#nombreCliente").val();

            var regexp = /^[0-9]+(\.[0-9]+)?$/;
            var rta = "";

            if (nombreCliente == "") {
                rta += "Debes seleccionar un CLIENTE.";
                bootbox.alert(rta);
                $("#selecCliente").focus();
            } else if (nroOrden == "") {
                rta += "Debes completar el campo NÚMERO ORDEN.";
                bootbox.alert(rta);
                $("#numero_orden").focus();
            } else if (isNaN(nroOrden)) {
                rta += "Sólo se aceptan números en NÚMERO ORDEN.";
                bootbox.alert(rta);
                $("#numero_orden").focus();
            } else if (nroOrden.length > 11) {
                rta += "Máximo 11 dígitos en NÚMERO ORDEN.";
                bootbox.alert(rta);
                $("#numero_orden").focus();
            } else if (Equipo == "") {
                rta += "Debes completar el campo EQUIPO.";
                bootbox.alert(rta);
                $("#equipo").focus();
            } else if (Equipo.length > 100) {
                rta += "Máximo 100 caracteres para EQUIPO.";
                bootbox.alert(rta);
                $("#equipo").focus();
            } else if (observ == "") {
                rta += "Debes completar el campo OBSERVACIONES.";
                bootbox.alert(rta);
                $("#observaciones").focus();
            } else if (observ.length > 1000) {
                rta += "Máximo 1000 caracteres para OBSERVACIONES.";
                bootbox.alert(rta);
                $("#observaciones").focus();
            } else if (!(regexp.test(monto)) && monto != "") {
                rta += "Monto inválido en campo PRESUPUESTO.";
                bootbox.alert(rta);
                $("#monto").focus();
            } else if (!(regexp.test(entregado)) && entregado != "") {
                rta += "Monto inválido en campo ENTREGADO.";
                bootbox.alert(rta);
                $("#entregado").focus();
            } else if (idEstado == "" || idEstado == 0) {
                rta += "Debes seleccionar un ESTADO.";
                bootbox.alert(rta);
                $("#comboEstado").focus();
            } else if (idUser == "" || idUser == 0) {
                rta += "Debes seleccionar un USUARIO.";
                bootbox.alert(rta);
                $("#comboUsuario").focus();
            } else {
                if (monto != "") {
                    $("#monto").val(parseFloat(monto).toFixed(2)).html();
                }
                if (entregado != "") {
                    $("#entregado").val(parseFloat(entregado).toFixed(2)).html();
                }
                app.guardarOrden();
                app.borrarCampos();
            }
        };
        app.eliminarOrden = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Orden&id=" + id;
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.borrarFilaDataTable(id);
                },
                error: function (data) {
                    alert('error en app.eliminarOrden');
                }
            });
        };
        app.buscarOrdenes = function () {

            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=BuscarOrden";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    //app.rellenarDataTable(data);
                    app.cargarArray(data);
                },
                error: function () {
                    alert('error en buscar ordenes');
                }

            });
        };
        
        app.cargarArray = function(data){            
            var array = data;
            app.buscar(array);        
            
        };
        
        app.buscar = function (array) {

            $("#buscarDatos").on('click', function (event) {
                event.preventDefault();
                var html = "";
                var orden = $("#porNumerot").val();
                var apellido = $("#porApellidot").val().toLowerCase();
                var documento = $("#porDocumentot").val();
console.log(apellido);
                $.each(array, function (clave, valor) {
                    if (valor.numero_orden === orden
                            || valor.dni_cliente === documento ||
                            valor.apellido_cliente.toLowerCase() === apellido) {
                        html += '<div class="panel panel-success">' +
                                '<div class="panel-heading"> <h3><strong>Orden  ' + valor.numero_orden + '</strong></h3></div>' +
                                '<div class="panel-body">' +
                                'NOMBRE: <strong>'+valor.apellido_cliente+' '+valor. nombre_cliente+'</strong><br>'+
                                'DIRECCION: <strong>'+valor.direccion_cliente+'</strong><br>'+
                                'DNI: <strong>'+valor.dni_cliente+'</strong><br>'+
                                'CORREO: <strong>'+valor.email_cliente+'</strong><br>'+
                                'TELEFONO: <strong>'+valor.numero_telefono+'</strong><br>'+
                                'DESCRIPCION: <strong>'+valor.equipo_orden+'</strong><br>'+
                                'OBSERVACIONES: <strong>'+valor.observaciones_orden+'</strong><br>'+
                                'FALLA CLIENTE: <strong>'+valor.falla_cliente_orden+'</strong><br>'+
                                'SINIESTRO: <strong>'+valor.numero_siniestro_orden+'</strong><br>'+
                                'MONTO : <strong>'+valor.monto_orden+'</strong><br>'+
                                'USUARIO: <strong>'+valor.nombre_usuario+ ' '+valor.apellido_usuario+                           
                                '</strong></div>' +
                                '</div>';

                    }
                    ;
                });
                $("#relleno").html(html);
            });

        };
        
        
        
        
        app.guardarOrden = function () {

            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formOrden").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalOrden").modal('hide');
                    //app.buscarOrdenes();
                },
                error: function (data) {
                    alert("Error en guardar Orden. " + data);
                }
            });
        };

        app.buscarNumero = function () {
            //app.recarga();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarX&nombreFormulario=Orden";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var num = parseInt(data);                    
                    $("#numero_orden").val(num + 1);
                },
                error: function () {
                    alert('error al Buscar Ultima Orden');
                }
            });
        };


        app.recarga = function () {
            window.location.href = 'http://tcpiptecnologia.com.ar/servicios2/tcpip_nuevo/controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Orden';
            window.location.href = 'http://tcpiptecnologia.com.ar/servicios2/tcpip_nuevo/controlador/ruteador/Ruteador.php?accion=buscarX&nombreFormulario=Orden';
            location.reload();
            console.log("pasos Completos");

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
                            location.href = "ordenEmpresa.html"
                        } else {
                            $("#id_user").val(datos.id_usuario);
                            $("#logedUser").html(datos.usuario_usuario);
                            idUsuario = datos.id_usuario;
                            tipoAcceso = datos.tipoAcceso_usuario;
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
        app.borrarFilaDataTable = function (id) {
            var fila = $("#cuerpoTablaOrdenes").find("a[data-id_orden='" + id + "']").parent().parent().remove();

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
                    if (tipoAcceso === "0") {
                        if (idUsuario === orden.id_usuario_orden) {
                            html += '<tr class="text-warning">' +
                                    '<td class="text-center"><a class="btn seleccionar" data-toggle="tooltip" title="Tel: ' + orden.numero_telefono + ". " + orden.propietario_telefono + ". " + orden.detalle_telefono + '" data-id_orden="' + orden.id_orden + '">' +
                                    '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="12" height="12" alt=""> </span></a></td>' +
                                    '<td class="text-center oculto">' + orden.id_cliente_orden + '</td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '"><span  data-toggle="tooltip" title="DNI/CUIT: ' + orden.dni_cliente + '">' + orden.apellido_cliente + ", " + orden.nombre_cliente + '</font></span></td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '">' + dia[2] + "/" + dia[1] + "/" + dia[0] + '</font></td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.numero_orden + '</font></td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.equipo_orden + '</font></td>';
                            if (orden.falla_cliente_orden == null) {
                                html += '<td class="text-center oculto"></td>';
                            } else {
                                html += '<td class="text-center oculto">' + orden.falla_cliente_orden + '</td>';
                            }
                            html += '<td class="text-center oculto">' + orden.observaciones_orden + '</td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.numero_siniestro_orden + '</font></td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '"><span data-toggle="tooltip" title="Entregado: $' + orden.entregado_orden + '">' + orden.monto_orden + '</span></font></td>' +
                                    '<td class="text-center oculto">' + orden.entregado_orden + '</td>' +
                                    '<td class="text-center oculto">' + orden.id_estado + '</td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.descripcion_estado + '</font></td>' +
                                    '<td class="text-center oculto">' + orden.id_usuario_orden + '</td>' +
                                    '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.apellido_usuario + ", " + orden.nombre_usuario + '</font></td>';
                            html += '<td class="text-center">' +
                                    '<a class="btn text-center editar" data-toggle="tooltip" title="Editar Orden" data-id_orden="' + orden.id_orden + '">' +
                                    '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="12" height="12" alt="Editar"> </span></a>' +
                                    '<a class="btn text-center fotos" data-toggle="tooltip" title="Fotos" data-id_orden="' + orden.id_orden + '">' +
                                    '<span><img class="pull-right" src="../imagenes/iconos/camera-ico.jpg" width="12" height="12" alt="Fotos"> </span></a>' +
                                    '</td>' +
                                    '</tr>';
                        }


                    } else {
                        html += '<tr class="text-warning">' +
                                '<td class="text-center"><a class="btn seleccionar" data-toggle="tooltip" title="Tel: ' + orden.numero_telefono + ". " + orden.propietario_telefono + ". " + orden.detalle_telefono + '" data-id_orden="' + orden.id_orden + '">' +
                                '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="12" height="12" alt=""> </span></a></td>' +
                                '<td class="text-center oculto">' + orden.id_cliente_orden + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '"><span  data-toggle="tooltip" title="DNI/CUIT: ' + orden.dni_cliente + '">' + orden.apellido_cliente + ", " + orden.nombre_cliente + '</font></span></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + dia[2] + "/" + dia[1] + "/" + dia[0] + '</font></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.numero_orden + '</font></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.equipo_orden + '</font></td>';
                        if (orden.falla_cliente_orden == null) {
                            html += '<td class="text-center oculto"></td>';
                        } else {
                            html += '<td class="text-center oculto">' + orden.falla_cliente_orden + '</td>';
                        }
                        html += '<td class="text-center oculto">' + orden.observaciones_orden + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.numero_siniestro_orden + '</font></td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '"><span data-toggle="tooltip" title="Entregado: $' + orden.entregado_orden + '">' + orden.monto_orden + '</span></font></td>' +
                                '<td class="text-center oculto">' + orden.entregado_orden + '</td>' +
                                '<td class="text-center oculto">' + orden.id_estado + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.descripcion_estado + '</font></td>' +
                                '<td class="text-center oculto">' + orden.id_usuario_orden + '</td>' +
                                '<td class="text-center"><font color="' + orden.color_estado + '">' + orden.apellido_usuario + ", " + orden.nombre_usuario + '</font></td>';
                        html += '<td class="text-center">' +
                                '<a class="btn text-center editar" data-toggle="tooltip" title="Editar Orden" data-id_orden="' + orden.id_orden + '">' +
                                '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="12" height="12" alt="Editar"> </span></a>' +
                                '<a class="btn text-center fotos" data-toggle="tooltip" title="Fotos" data-id_orden="' + orden.id_orden + '">' +
                                '<span><img class="pull-right" src="../imagenes/iconos/camera-ico.jpg" width="12" height="12" alt="Fotos"> </span></a>' +
                                '</td>' +
                                '</tr>';
                    }
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
    })(Orden);
});