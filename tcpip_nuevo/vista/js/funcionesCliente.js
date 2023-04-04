$(function() {
    var TallerAvanzada = {};
    var idUsuario="";
    (function(app) {
        app.init = function() {
            app.verificarSesion();
        };
        app.bindings = function() {
            app.mostrarFecha();
            $("#QF").hide();
            $('[data-toggle="tooltip"]').tooltip();
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
                $("#id_cliente").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nuevo Cliente");
                $("#modalCliente").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#apellido").removeAttr("disabled");
                $("#direccion").removeAttr("disabled");
                $("#email").removeAttr("disabled");
                $("#dni").removeAttr("disabled");
                $("#guardar").show();
                $("#masTelefonos").show();
                app.inicializarGridTelefonos();         
            });
            
            $("#tablaClientes").on('click', '.eliminar', function() {
                var id = $(this).attr("data-id_cliente");
                bootbox.confirm({ 
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Está seguro?", 
                    callback: function(result){
                    if(result){
                        app.eliminarCliente(id);
                    }
                    }
                });
            });
            
            $("#QFFooter").on('click', function() {
                $("#QF").slideToggle();
                $("#QF").css("border-bottom-style", "solid");
                $("#QF").css("border-bottom-width", "1px");
                $("#QF").css("border-bottom-color", "grey");
                $("#QF").css("border-top-style", "solid");
                $("#QF").css("border-top-width", "1px");
                $("#QF").css("border-top-color", "grey");
                $("#QF").css("border-left-style", "solid");
                $("#QF").css("border-left-width", "1px");
                $("#QF").css("border-left-color", "grey");
                $("#QF").css("border-right-style", "solid");
                $("#QF").css("border-right-width", "1px");
                $("#QF").css("border-right-color", "grey");
            });
            
            $('#modalCliente').on('shown.bs.modal', function () { //QFFooter
                $('#apellido').focus();
            }); 
            $("#masTelefonos").on('click', function(event){
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
            
            $("#cuerpoTablaClientes").on('click', '.editar', function(event) {
                event.preventDefault();
                $("#id_cliente").val($(this).attr("data-id_cliente"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-success");    
                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#nombre").val($(this).parent().parent().children().first().next().next().html());
                $("#dni").val($(this).parent().parent().children().first().next().next().next().html());
                $("#direccion").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#email").val($(this).parent().parent().children().first().next().next().next().next().next().next().html());
                $("#masTelefonos").show();
                $("#guardar").attr("value","Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Cliente");
                $("#modalCliente").modal({show: true});
                
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#apellido").removeAttr("disabled");
                $("#dni").removeAttr("disabled");
                $("#direccion").removeAttr("disabled");
                $("#email").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                app.traerTelefonos();
            });
            
            
            $("#cuerpoTablaClientes").on('click', '.seleccionar', function(event) {
                $("#id_cliente").val($(this).attr("data-id_cliente"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-info");
                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#nombre").val($(this).parent().parent().children().first().next().next().html());
                $("#dni").val($(this).parent().parent().children().first().next().next().next().html());
                $("#direccion").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#email").val($(this).parent().parent().children().first().next().next().next().next().next().next().html());
                $("#masTelefonos").hide();
                $("#guardar").attr("value","Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Cliente");
                $("#modalCliente").modal({show: true});
                
                $("#nombre").attr('disabled', 'true');//elimino la propiedad "disabled" que usé para ver
                $("#apellido").attr('disabled', 'true');
                $("#dni").attr('disabled', 'true');
                $("#direccion").attr('disabled', 'true');
                $("#email").attr('disabled', 'true');
                $("#guardar").hide();
                $("#reporDetalle").show();
                $("#tituloModal").html("Detalles Cliente");
                $("#modalCliente").modal({show: true});
                app.traerTelefonosDisabled();
                $("#masTelefonos").hide();
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
        
        app.inicializarGridTelefonos = function(){
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
        app.traerTelefonos = function (){
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&id=" + id_cliente; 
            $.ajax({
                url: url,
                cache: false,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.cargarGridTelefonos(data);
                },
                error: function(data) {
                    alert('error en app.traerTelefonos');
                }
            });
        };
        
        app.traerTelefonosDisabled = function (){
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&id=" + id_cliente; 
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.cargarGridTelefonosDisabled(data);
                },
                error: function(data) {
                    alert('error en app.traerTelefonos');
                }
            });
        };
        
        app.cargarGridTelefonos = function(data){
            var index = 0; //para ir creando los campos numero1, 2, 3 y asi. Lo mismo en propietario y detalle
            var ids = "id_telefono";
            var nums = "numero";
            var prop = "propietario";
            var det = "detalle";
            var filaGrid="";
            $("#gridTelefonos").html(filaGrid);
            $.each(data, function(clave, tel) {
                filaGrid = "<div class=\"form-group row\"><div class=\"row\"><div class=\"col-lg-2\">" +
                                "<input class=\"form-control\" type=\"hidden\" id=\""+ (ids + (index.toString())) +"\" name=\""+ (ids + (index.toString())) +"\" value=\"" + tel.id_telefono + "\">" +
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (nums + (index.toString())) +"\" name=\""+ (nums + (index.toString())) +"\" placeholder=\"N&uacute;mero\" value=\""+ tel.numero_telefono + "\">" + 
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (prop + (index.toString())) +"\" name=\""+ (prop + (index.toString())) +"\" placeholder=\"Propietario\" value=\""+ tel.propietario_telefono + "\">" +
                            "</div>" +
                            "<div class=\"col-lg-4\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (det + (index.toString())) +"\" name=\""+ (det + (index.toString())) +"\" placeholder=\"Detalles\" value=\"" + tel.detalle_telefono + "\">" +
                            "</div></div>"; 
                $("#gridTelefonos").append(filaGrid);
                index ++;
            });
        };
        
        app.cargarGridTelefonosDisabled = function(data){
            var index = 0; //para ir creando los campos numero1, 2, 3 y asi. Lo mismo en propietario y detalle
            var ids = "id_telefono";
            var nums = "numero";
            var prop = "propietario";
            var det = "detalle";
            var filaGrid="";
            $("#gridTelefonos").html(filaGrid);
            $.each(data, function(clave, tel) {
                filaGrid = "<div class=\"form-group row\"><div class=\"row\"><div class=\"col-lg-2\">" +
                                "<input class=\"form-control\" type=\"hidden\" id=\""+ (ids + (index.toString())) +"\" name=\""+ (ids + (index.toString())) +"\" value=\"" + tel.id_telefono + "\" disabled=\"true\">" +
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (nums + (index.toString())) +"\" name=\""+ (nums + (index.toString())) +"\" placeholder=\"N&uacute;mero\" value=\""+ tel.numero_telefono + "\" disabled=\"true\">" + 
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (prop + (index.toString())) +"\" name=\""+ (prop + (index.toString())) +"\" placeholder=\"Propietario\" value=\""+ tel.propietario_telefono + "\" disabled=\"true\">" +
                            "</div>" +
                            "<div class=\"col-lg-4\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (det + (index.toString())) +"\" name=\""+ (det + (index.toString())) +"\" placeholder=\"Detalles\" value=\"" + tel.detalle_telefono + "\" disabled=\"true\">" +
                            "</div></div>"; 
                $("#gridTelefonos").append(filaGrid);
                index ++;
            });
        };
        
        app.borrarCampos = function (){
            $("#apellido").val("").html();
            $("#nombre").val("").html();
            $("#dni").val("").html();
            $("#direccion").val("").html();
            $("#email").val("").html();
            app.inicializarGridTelefonos();
        }; 
       
        $("#cancelar").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalCliente").modal('hide');
            $("#contTelefonos").val("2");
        });
        
        $("#equis").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalCliente").modal('hide');
            $("#contTelefonos").val("2");
        });
        
        $("#guardar").on("click", function(event) {
            event.preventDefault();
            app.validarCampos();
        });
        
        app.validarCampos = function(){
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
            }else if(ape.length >50){
                rta += "Máximo 50 caracteres para APELLIDO.";
                bootbox.alert(rta);
                $("#apellido").focus();
            }else if(nom == ""){
                rta += "Debes completar el campo NOMBRE.";
                bootbox.alert(rta);
                $("#nombre").focus();
            }else if(nom.length >50){
                rta += "Máximo 50 caracteres para NOMBRE.";
                bootbox.alert(rta);
                $("#nombre").focus();
            }else if(dni == ""){
                rta += "Debes completar el campo DNI/CUIT.";
                bootbox.alert(rta);
                $("#dni").focus();
            }else if(isNaN(dni)){
                rta += "Sólo números para DNI/CUIT.";
                bootbox.alert(rta);
                $("#dni").focus();
            }else if(dni.length >11){
                rta += "Máximo 11 dígitos para DNI/CUIT.";
                bootbox.alert(rta);
                $("#dni").focus();
            }else if(dir == ""){
                rta += "Debes completar el campo DIRECCIÓN.";
                bootbox.alert(rta);
                $("#direccion").focus();
            }else if(dir.length >100){
                rta += "Máximo 100 caracteres para DIRECCIÓN.";
                bootbox.alert(rta);
                $("#direccion").focus();
            }else if(mail == ""){
                rta += "Debes completar el campo E-MAIL.";
                bootbox.alert(rta);
                $("#email").focus();
            }else if(mail.length >50){
                rta += "Máximo 60 caracteres para E-MAIL.";
                bootbox.alert(rta);
                $("#email").focus();
            }else{
                 if (telefono == "") {
                    $("#numero1").val(0);
                }
                app.guardarCliente();
                app.borrarCampos();
            }
        };
        
        app.eliminarCliente = function(id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Cliente&id=" + id; 
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.borrarFilaDataTable(id);
                },
                error: function(data) {
                    alert('error en app.eliminarCliente');
                }
            });
        };
        app.buscarClientes = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error en buscar clientes');
                }

            });
        };
        app.guardarCliente = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formCliente").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(datos) {
                    $("#modalCliente").modal('hide');
                    app.actualizarDataTable(datos, $("#id_cliente").val());
                },
                error: function(data) {
                    alert(data);
                }
            });
        };
        
        app.actualizarDataTable = function(cliente, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html = '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +      
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>';
                        if (cliente.direccion_cliente == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + cliente.direccion_cliente + '</td>';
                        }
                        html +='<td><a href="telefono.html?id=' + cliente.id_cliente + '" target="_blank" data-id_cliente="' + cliente.id_cliente + '"><span data-toggle="tooltip" title="Más Teléfonos">Ver Teléfonos</span></a></td>';
                        if (cliente.email_cliente == null) {
                            html +='<td></td>'
                        }else{
                            html +='<td>' + cliente.email_cliente + '</td>'
                        } 
                        html +='<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaClientes").append(html);
                
            } else {
                //busco la fila
                var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent();
                var html = '<td>' + 
                        '<a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +      
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>';
                        if (cliente.direccion_cliente == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + cliente.direccion_cliente + '</td>';
                        } 
                        html +='<td><a href="telefono.html?id=' + cliente.id_cliente + '" target="_blank" data-id_cliente="' + cliente.id_cliente + '"><span data-toggle="tooltip" title="Más Teléfonos">Ver Teléfonos</span></a></td>';
                        if (cliente.email_cliente == null) {
                            html +='<td></td>'
                        }else{
                            html +='<td>' + cliente.email_cliente + '</td>'
                        } 
                        html +='<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '</td>';
                fila.html(html);
            }
            $('[data-toggle="tooltip"]').tooltip();
        };
        
        
        app.verificarSesion = function(){
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
                            $("#logedUser").html(datos.usuario_usuario);
                            idUsuario=datos.id_usuario;
                            app.buscarClientes();  
                            app.bindings();
                        }    
                    }else{
                        location.href = "../../index.html";
                    }
                },
                error: function(data) {
                    location.href = "../../index.html";
                } 
            });		
        };
        app.borrarFilaDataTable = function(id) {
            var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent().remove();

        };
        app.rellenarDataTable = function(data) {
            var html = "";
            $.each(data, function(clave, cliente) {
                html += '<tr class="text-warning">' +
                        '<td><a class="seleccionar btn" data-toggle="tooltip" title="Seleccionar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +        
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>';
                        if (cliente.direccion_cliente == null) {
                            html +='<td></td>';
                        }else{
                            html +='<td>' + cliente.direccion_cliente + '</td>';
                        } 
                        html +='<td><a href="telefono.html?id=' + cliente.id_cliente + '" target="_blank" data-id_cliente="' + cliente.id_cliente + '"><span data-toggle="tooltip" title="Más Teléfonos">Ver Teléfonos</span></a></td>';
                        if (cliente.email_cliente == null) {
                            html +='<td></td>'
                        }else{
                            html +='<td>' + cliente.email_cliente + '</td>'
                        } 
                        html +='<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaClientes").html(html);
            $("#tablaClientes").dataTable({       //transforma la tabla en dataTable
                responsive: true,
                iDisplayLength: 50,
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            $('[data-toggle="tooltip"]').tooltip();
        };
        app.init();
    })(TallerAvanzada);
});