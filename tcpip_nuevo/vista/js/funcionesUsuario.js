$(function() {

    var Usuarios = {};
    var idUsuario="";
    (function(app) {

        app.init = function() {
            $("#cerrarSesion").on('click', function(event) {
                document.location.href="../../controlador/ruteador/CerrarSesion.php";
                event.preventDefault();
            });
            
            app.verificarSesion();
            
        };

        app.verificarSesion = function(){
            var url = "../../controlador/ruteador/Sesion.php"; 
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    if (datos.id_usuario != null && datos.tipoAcceso_usuario != null) {
                        $("#id_user").val(datos.id_usuario);
                        var tA = datos.tipoAcceso_usuario;
                        idUsuario=datos.id_usuario;
                        if (parseInt(tA) == 1) {
                            if (datos.tipoAcceso_usuario === "2") {
                                location.href = "ordenEmpresa.html"
                            }else{
                                $("#logedUser").html(datos.usuario_usuario);
                                app.buscarUsuarios(); 
                                app.buscarClientes();
                                app.bindings();
                            }    
                        }else{
                            location.href = "admin.html";
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
        
        app.bindings = function() {
            $("#divTablaClientes").hide();
            $("#divCliente").hide();
            $("#nombreCliente").attr('disabled', 'true');
            $('[data-toggle="tooltip"]').tooltip();
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
            $('#txtModificacion').attr('disabled',true);
            $('#txtCreacion').attr('disabled',true);
            $('#pass').attr('disabled',true);
            $('#rPass').attr('disabled',true);
            
            $("#agregar").on('click', function(event) {
                event.preventDefault();
                app.activarControles();
                $('#divCliente').hide();
                $('#fCrea').hide();
                $('#fModi').hide();                
                $("#id").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nuevo Usuario");//Cambio el título del Modal
                $("#modalUsuario").modal({show: true});//lo muestro
                $("#accion").attr("value","guardar");//Cambio el nombre del boton
                $("#guardar").html("Agregar");
                $('#pass').val("123");
                $('#rPass').val("123");
                $('#accesoTotal').attr('checked',false);
                $('#accesoRestringido').attr('checked',false);
                $('#accesoEmpresa').attr('checked',false);
                $("#guardar").show();//muestro el boton guardar
            });
            
            $("#accesoTotal").on('click', function(event) {
                $("#divCliente").hide();
                $("#nombreCliente").val("").html();
                $("#id_cliente").val("").html();
            });
            
            $("#accesoRestringido").on('click', function(event) {
                $("#divCliente").hide();
                $("#nombreCliente").val("").html();
                $("#id_cliente").val("").html();
            });
            
            $("#accesoEmpresa").on('click', function(event) {
                $("#divCliente").show();
            });
            
            //CLIENTE
            $("#selecCliente").on('click', function() {
                $("#divTablaClientes").slideToggle();
                $("#divTablaClientes").css("border-bottom-style", "solid");
                $("#divTablaClientes").css("border-bottom-width", "1px");
                $("#divTablaClientes").css("border-bottom-color", "grey");
                $("#divTablaClientes").css("border-top-style", "solid");
                $("#divTablaClientes").css("border-top-width", "1px");
                $("#divTablaClientes").css("border-top-color", "grey");
            });
            
            $("#agregarCliente").on('click', function() {
                $("#divTablaClientes").hide();
                $("#mHeaderCliente").removeClass();
                $("#mHeaderCliente").attr("class","modal-header bg-primary");
                $("#tituloModalCliente").html("Nuevo Cliente");
                $("#modalCliente").modal({show: true});
                $("#guardarCliente").attr("value","Agregar");
                $("#guardarCliente").html("Agregar");
                $("#guardarCliente").show();
                
            });
            
            $("#cuerpoTablaClientes").on('click', '.seleccionar', function(event) {
                event.preventDefault();
                var cliente = $(this).parent().parent().children().first().next().html() + ", " + $(this).parent().parent().children().first().next().next().html();
                $("#id_cliente").val($(this).attr("data-id_cliente"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-info");
                $("#divTablaClientes").hide();
                $("#nombreCliente").val(cliente);
                $("#numero_orden").focus();
            });
            
            $("#cancelarCliente").on("click", function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalCliente").modal('hide');
                $("#contTelefonos").val("2");
            });

            $("#equisCliente").on("click", function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalCliente").modal('hide');
                $("#contTelefonos").val("2");
            });

            $("#guardarCliente").on("click", function(event) {
                event.preventDefault();
                app.validarCamposCliente();
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
            //FIN CLIENTE
            
            
            
            $('#modalUsuario').on('shown.bs.modal', function () {
                $('#nombreUsuario').focus();
            });
            
            $("#reporteUsuario").on('click', function(event) {
                event.preventDefault();
                window.open('../reportes/reporteUsuarios.php?idUsuario='+idUsuario, '_blank'); //de esta forma abre en una nueva ventana o pestaña
            });

            $("#cuerpoTablaUsuarios").on('click', '.editar', function(event) {
                event.preventDefault();
                $("#id").val($(this).attr("data-id_usuario"));
                
                $('#fCrea').show();
                $('#fModi').show();
                
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-success");
                $("#nombreUsuario").val($(this).parent().parent().children().first().next().html());
                $("#apellidoUsuario").val($(this).parent().parent().children().first().next().next().html());
                $("#usuario").val($(this).parent().parent().children().first().next().next().next().html());
                $("#pass").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#pass").attr('disabled', true);
                $("#rPass").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#rPass").attr('disabled', true);
                $('#usuario').removeAttr('disabled');
                
                $('#id_cliente').val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().html());
                var acceso=($(this).parent().parent().children().first().next().next().next().next().next()).html();
                
                if(acceso == "Total"){
                    $("#accesoRestringido").prop("checked", "");
                    $('#accesoTotal').prop('checked',true);
                    $('#accesoEmpresa').prop('checked',"");
                    $("#divCliente").hide();
                    $("#nombreCliente").val("").html();
                    $("#id_cliente").val("").html();
                }else if(acceso == "Restringido"){
                    $('#accesoTotal').prop("checked","");
                    $('#accesoRestringido').prop('checked',true);
                    $('#accesoEmpresa').prop('checked',"");
                    $("#divCliente").hide();
                    $("#nombreCliente").val("").html();
                    $("#id_cliente").val("").html();
                }else{
                    $('#accesoTotal').prop("checked","");
                    $('#accesoRestringido').prop('checked',"");
                    $('#accesoEmpresa').prop('checked',true);
                    $("#divCliente").show();
                    app.cargarNombreCliente();
                }
                
                $('#txtCreacion').val($(this).parent().parent().children().first().next().next().next().next().next().next().html());
                $('#txtModificacion').val($(this).parent().parent().children().first().next().next().next().next().next().next().next().html());
                
                app.activarControles();
                $("#guardar").html("Modificar");
                $("#accion").attr("value","modificar");
                $("#tituloModal").html("Editar Usuario");
                $("#modalUsuario").modal({show: true});                
                $("#guardar").show();
            });
            
            $("#cuerpoTablaUsuarios").on('click', '.seleccionar', function(event) {
                event.preventDefault();
                $("#id").val($(this).attr("data-id_usuario"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-info");
                $('#fCrea').show();
                $('#fModi').show();
                
                
                $("#nombreUsuario").val($(this).parent().parent().children().first().next().html());
                $("#apellidoUsuario").val($(this).parent().parent().children().first().next().next().html());
                $("#usuario").val($(this).parent().parent().children().first().next().next().next().html());
                $("#pass").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#pass").attr('disabled', true);
                $("#rPass").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#rPass").attr('disabled', true);
                $('#usuario').removeAttr('disabled');
                
                $('#id_cliente').val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().html());
                var acceso=($(this).parent().parent().children().first().next().next().next().next().next()).html();
                
                if(acceso == "Total"){
                    $("#accesoRestringido").prop("checked", "");
                    $('#accesoTotal').prop('checked',true);
                    $('#accesoEmpresa').prop('checked',"");
                    $("#divCliente").hide();
                    $("#nombreCliente").val("").html();
                    $("#id_cliente").val("").html();
                }else if(acceso == "Restringido"){
                    $('#accesoTotal').prop("checked","");
                    $('#accesoRestringido').prop('checked',true);
                    $('#accesoEmpresa').prop('checked',"");
                    $("#divCliente").hide();
                    $("#nombreCliente").val("").html();
                    $("#id_cliente").val("").html();
                }else{
                    $('#accesoTotal').prop("checked","");
                    $('#accesoRestringido').prop('checked',"");
                    $('#accesoEmpresa').prop('checked',true);
                    $("#divCliente").show();
                    app.cargarNombreCliente();
                }
                
                $('#txtCreacion').val($(this).parent().parent().children().first().next().next().next().next().next().next().html());
                $('#txtModificacion').val($(this).parent().parent().children().first().next().next().next().next().next().next().next().html());
                
                app.desactivarControles();
                $("#guardar").hide();
                $("#guardar").html("Modificar");
                $("#guardar").attr("value","Modificar");
                $("#tituloModal").html("Detalles Usuario");
                $("#modalUsuario").modal({show: true});
            });
            
            $("#cuerpoTablaUsuarios").on('click', '.eliminar', function() {
                app.eliminarUsuario($(this).attr("data-id_usuario"));
            });
            
            $("#cancelar").on("click", function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalUsuario").modal('hide');
            });

            $("#guardar").on("click", function(event) {
                event.preventDefault();
                app.validarCampos();
            });
            
            $("#formUsuario").bootstrapValidator({
                excluded: []
            });
        };
        
        //COMIENZO CODIGO MODAL CLIETNE
        app.cargarNombreCliente = function(){
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=getCliente&nombreFormulario=Cliente&id=" + id_cliente; 
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
//                    app.coto(data);
                    $("#nombreCliente").val(data.apellido_cliente + ", " + data.nombre_cliente).html();
                },
                error: function(data) {
                    alert('error en app.cargarNombreClieente');
                }
            });
        };
        
        app.coto = function(datos){
//            alert(datos.apellido_cliente);
            $("#nombreCliente").val(datos.apellido_cliente + ", " + datos.nombre_cliente).html();
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
        
        app.borrarCamposCliente = function (){
            $("#apellido").val("").html();
            $("#nombre").val("").html();
            $("#dni").val("").html();
            $("#direccion").val("").html();
            $("#email").val("").html();
            app.inicializarGridTelefonos();
        }; 
       
        
        
        app.validarCamposCliente = function(){
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
                app.borrarCamposCliente();
            }
        };
        
        app.guardarCliente = function() {
            var url = "../../controlador/ruteador/Ruteador.php";
            var data = $("#formCliente").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(datos) {
                    $("#nombreCliente").val(datos.apellido_cliente + ", " + datos.nombre_cliente);
                    $("#id_cliente").val(datos.id_cliente);
                    $("#modalCliente").modal('hide');
                    $("#numero_orden").focus();
                    app.buscarClientes();
                },
                error: function(data) {
                    alert(data);
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
                    app.rellenarDataTableClientes(data);
                },
                error: function() {
                    alert('error al intentar buscar clientes');
                }

            });
        };

        app.rellenarDataTableClientes = function(data) {
            var html = "";
            if ( $.fn.DataTable.isDataTable( '#tablaClientes' ) ) {
                $('#tablaClientes').DataTable().destroy();
            }
            $.each(data, function(clave, cliente) {
                html += '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar center-block"  class="btn" data-toggle="tooltip" title="Seleccionar Cliente" data-id_cliente="' + cliente.id_cliente + '">'+
                        '<span><img src="../imagenes/iconos/elegir2.ico" width="28" height="28" alt="Seleccionar"></span></a></td>' +
                        '<td class="text-center">' + cliente.apellido_cliente + '</td>' +
                        '<td class="text-center">' + cliente.nombre_cliente + '</td>' +
                        '<td class="text-center">' + cliente.dni_cliente + '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaClientes").html(html);
            $("#tablaClientes").dataTable({       //transforma la tabla en dataTable
                responsive: true,
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            $('[data-toggle="tooltip"]').tooltip();
        }; 
        
        //FIN CODIGO MODAL CLIENTE
        
        
        
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
            var nom = $('#nombreUsuario').val();
            var ape = $('#apellidoUsuario').val();
            var user = $('#usuario').val();
            var pass = $('#pass').val();
            var rPass = $('#rPass').val();
            var acceso = 2;
            if (!($('#accesoTotal').is(':checked')) && !($('#accesoRestringido').is(':checked')) && !($('#accesoEmpresa').is(':checked'))) {
                acceso = 2; //cuando no ha seleccionado ninguno
            }else if(($('#accesoTotal').is(':checked'))){
                acceso = 1; //selecciona acceso Total
            }else if(($('#accesoRestringido').is(':checked'))){
                acceso = 0; // selecciona acceso Restringido
            }else{
                acceso = 3; // selecciona acceso Empresa
            }
            if (nom == null || nom == "") {
                bootbox.alert("Debes completar el campo Nombre");
            }else if(ape == null || ape == ""){
                bootbox.alert("Debes completar el campo Apellido");
            }else if(user == null || user == ""){
                bootbox.alert("Debes completar el campo Usuario");
            }else if(pass == null || pass == ""){
                bootbox.alert("Debes completar el campo Contraseña");
            }else if(rPass == null || rPass == ""){
                bootbox.alert("Debes completar el campo Repetir Contraseña");
            }else if(pass != rPass){
                bootbox.alert("Las contraseñas ingresados con concuerdan");
            }else if(acceso == 2){  
                bootbox.alert("Debes seleccionar el Tipo de Acceso");
            }else if (acceso == 3){
                var nomCli = $("#nombreCliente").val();
                if (nomCli == null || nomCli == "") {
                    bootbox.alert("Debes seleccionar un Cliente");
                }else{
                    app.guardarUsuarios();
                }
            }else{
                app.guardarUsuarios();
            }
        };
        app.desactivarControles = function(){
            $('#nombreUsuario').attr('disabled', true);
            $('#apellidoUsuario').attr('disabled', true);
            $('#usuario').attr('disabled', true);
            $('#pass').attr('disabled', true);
            $('#rPass').attr('disabled', true);
            $('#accesoRestringido').attr('disabled', true);
            $('#accesoTotal').attr('disabled', true);
            $('#accesoEmpresa').attr('disabled', true);
            $('#txtCreacion').attr('disabled', true);
            $('#txtModificacion').attr('disabled', true);
            $('#selecCliente').attr('disabled', true);
            $('#agregarCliente').attr('disabled', true);
        };
        app.activarControles = function(){
            $('#nombreUsuario').removeAttr('disabled');
            $('#apellidoUsuario').removeAttr('disabled');
            $('#usuario').removeAttr('disabled');
            $('#accesoRestringido').removeAttr("disabled");
            $('#accesoTotal').removeAttr("disabled");
            $('#accesoEmpresa').removeAttr("disabled");
            $('#selecCliente').removeAttr("disabled");
            $('#agregarCliente').removeAttr("disabled");
        };
        app.borrarCampos = function (){
            $('#nombreUsuario').val("").html();
            $('#apellidoUsuario').val("").html();
            $('#usuario').val("").html();
            $('#accesoRestringido').removeAttr(':checked');
            $('#accesoTotal').removeAttr(':checked');
            $('#accesoEmpresa').removeAttr(':checked');
            $('#txtCreacion').val("").html();
            $('#txtModificacion').val("").html();
            $('#nombreCliente').val("").html();
            $('#id_cliente').val("").html();
            $("#modalUsuario").bootstrapValidator('resetForm', true);
        }; 
        
        app.guardarUsuarios = function() {
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar Usuario (tanto para modific como para agregar)
            var data = $("#formUsuario").serialize();//convierto los datos del alumno en un array para enviarlos al ruteados
            $.ajax({
                url: url,//paso la url
                method: 'POST',//método que utilizo
                dataType: 'json',//tipo de datos
                data: data,//el formulario del usuario que estoy pasando
                success: function(datos) {//si todo salió bien 
                    $("#modalUsuario").modal('hide');//oculto el modal
                    app.borrarCampos();
                    //app.actualizarDataTable(datos, $("#id").val());
                    app.buscarUsuarios();
                },
                error: function(data) {//si hay un error lo muestro por pantalla
                    alert(data);//mensaje de error
                }
            });
        };
        
        app.eliminarUsuario = function (id) {

            bootbox.confirm({
                size: 'medium',
                message: "Esta Seguro que desea Eliminar un Usuario?",
                callback: function (result) {
                    if (result) {
                        var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Usuario&id=" + id; //cambiar url
                        $.ajax({
                            url: url,
                            method: "GET",
                            dataType: 'json',
                            success: function (data) {
                                app.borrarFilaDataTable(id);
                            },
                            error: function (data) {
                                alert('error');
                            }
                        });
                    }
                }
            });
        };

        app.borrarFilaDataTable = function(id) {
            var fila = $("#cuerpoTablaUsuarios").find("a[data-id_usuario='" + id + "']").parent().parent().remove();

        };
        
        app.buscarUsuarios = function() {//función que se encarga de realizar la busqueda de los usuarios
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Usuario";//paso la dirección del 
            //ruteador para obtener los datos de la BD
            $.ajax({//ajax para realizar la petición de los datos
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {//si todo sale bien llamo a la funcion correspondiente
                    app.rellenarDataTable(data);//esta es la función encargada de rellenar la tabla conlos datos de los usuarios del sistema
                },
                error: function() {//si algo sale mal muestra un mensaje de error
                    alert('error');
                }

            });
        };
        
        
         app.rellenarDataTable = function(data) {//función para rellenar la tabla
            var html = "";//variable que voy a utilizar para rellenar la tabla
            if ( $.fn.DataTable.isDataTable( '#tablaUsuarios' ) ) {
                $('#tablaUsuarios').DataTable().destroy();
            }
            $.each(data, function(clave, usuario) {//recorro todos los datos devueltos con el JSon
                html += '<tr class="text-warning">' +
                        '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.apellido_usuario + '</td>' +
                        '<td>' + usuario.usuario_usuario + '</td>' +
                        '<td> '+ '°°°°°°°°°°°°'+'</td>' ;
                        if(usuario.tipoAcceso_usuario == 1){
                            html+="<td>Total</td>";
                        }else if(usuario.tipoAcceso_usuario == 0){
                            html+='<td>Restringido</td>';
                        }else{
                            html+='<td>Empresa</td>';
                        }
                        html+='<td class="oculto">' + usuario.fch_creacion+ '</td>' +
                        '<td class="oculto">' + usuario.fch_modificacion + '</td>' +
                        '<td class="oculto">' + usuario.id_cliente_usuario + '</td>' +
                        '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaUsuarios").html(html);//meto los datos en la tabla que corresponde
            $("#tablaUsuarios").dataTable({       //transforma la tabla en dataTable
                responsive: true,
                iDisplayLength: 50,
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };
        app.actualizarDataTable = function(usuario, id) {
            if (id == 0) { //si entra acá es porque es agregar
                html += '<tr class="text-warning">' +//agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                        '<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.apellido_usuario + '</td>' +
                        '<td>' + usuario.usuario_usuario + '</td>' +
                        '<td> '+ '°°°°°°°°°°°°'+'</td>';
                        if(usuario.tipoAcceso_usuario == 1){
                            html+="<td>Total</td>";
                        }else if(usuario.tipoAcceso_usuario == 0){
                            html+='<td>Restringido</td>';
                        }else{
                            html+='<td>Empresa</td>';
                        }
                        html +='<td class="oculto">' + usuario.fch_creacion+ '</td>' +
                        '<td class="oculto">' + usuario.fch_modificacion + '</td>' +
                        '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaUsuarios").append(html);
            } else {
                var html="";
                var fila ="";
                fila = $("#cuerpoTablaUsuarios").find("a[data-id_usuario='" + id + "']").parent().parent();
                  html +='<td><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.apellido_usuario + '</td>' +
                        '<td>' + usuario.usuario_usuario + '</td>' +
                        '<td> '+ '°°°°°°°°°°°°'+'</td>' ;
                        if(usuario.tipoAcceso_usuario == 1){
                            html+="<td>Total</td>";
                        }else if(usuario.tipoAcceso_usuario == 0){
                            html+='<td>Restringido</td>';
                        }else{
                            html+='<td>Empresa</td>';
                        }
                        html +='<td class="oculto">' + usuario.fch_creacion+ '</td>' +
                        '<td class="oculto">' + usuario.fch_modificacion + '</td>' +
                        '<td>' +
                        '<td>' +
                        '<a class="btn pull-left editar" data-toggle="tooltip" title="Editar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn pull-right eliminar" data-toggle="tooltip" title="Eliminar Usuario" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</td>';
                fila.html(html);
            }
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };
        app.init();
    })(Usuarios);


});