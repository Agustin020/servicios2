$(function() {

    var cambiarClave = {};

    (function(app) {
        
        app.init = function() {
            app.verificarSesion();
           
        };
        app.bindings = function(){
            app.mostrarFecha();
			$("#guardar").on('click', function(event){
               event.preventDefault();
               app.validarCampos(); 
               
            });
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
            //user, passAnteior, nuevoPass1, nuevoPass2
            var user = $("#user").val();
            var passAnt = $("#passAnterior").val();
            var nuevoPass1 = $("#nuevoPass1").val();
            var nuevoPass2 = $("#nuevoPass2").val();
            if (user == null || user == "") {
                bootbox.alert("Debes completar el campo Usuario");
            }else if(passAnt == null || passAnt == ""){
                bootbox.alert("Debes completar el campo Clave Anterior");
            }else if(nuevoPass1 == null || nuevoPass1 == ""){
                bootbox.alert("Debes completar el campo Nueva Clave");
            }else if(nuevoPass2 == null || nuevoPass2 == ""){
                bootbox.alert("Debes completar el campo Repetir de Nueva Clave");
            }else if(nuevoPass1 != nuevoPass2){
                bootbox.alert("La nueva clave y su confirmación no concuerdan.");
            }else{
                app.cambiarClave();
            }
        };
        app.cambiarClave = function(){
            var idUser = $("#id_user").val();
            var nuevoPass = btoa(btoa($("#nuevoPass1").val()));
            var url = "../../controlador/ruteador/Seguridad.php"; 
            var datosEnviar = {accion:"cambiarClave",id_usuario:idUser, nuevoPass:nuevoPass};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function(datosDevueltos) {
                    if(typeof datosDevueltos.cambio != 'undefined'){
//                        bootbox.alert("La contraseña se cambió correctamente.\nLa sesión se cerrará para que ingreses con tu nueva contraseña.");
//                        document.location.href="../../CerrarSesion.php";                        
//                        bootbox.confirm({ 
//                            size: 'medium',
//                            cancel: 'false',
//                            message: "La contraseña se cambió correctamente.<br>La sesión se cerrará para que ingreses con tu nueva contraseña.<br>PRESIONE \"ACEPTAR\"" , 
//                            callback: function(result){
//                                if(result){
//                                    document.location.href="../../CerrarSesion.php";
//                                }
//                            }
//                        });
                        bootbox.dialog({
                            message: "La contraseña se cambió correctamente.<br>La sesión se cerrará para que ingreses con tu nueva contraseña.",
                            title: "CAMBIO CORRECTO",
                            show: true,
                            backdrop: true,
                            animate: true,
                            className: "my-modal",
                            buttons: {
                              success: {   
                                label: "Aceptar",
                                className: "btn-success",
                                callback: function(result) {
                                        if (result) {
                                            document.location.href="../../controlador/ruteador/CerrarSesion.php";
                                        }
                                }
                              }
                            }  
                        });
                    }
                },
                error: function(datosDevueltos) {
                    alert("Error en el ajax de cambiarClave: " + datosDevueltos);
                }
            });
        };
        app.verificarSesion = function () {
            var url = "../../controlador/ruteador/Sesion.php";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    if (datos.id_usuario != null) {
                        $("#id_user").val(datos.id_usuario);
                        $("#logedUser").html(datos.usuario_usuario);
                        $("#user").val(datos.usuario_usuario);
                        app.bindings();
					} else {
                        location.href = "../../index.html";
                    }
                },
                error: function (data) {
                    location.href = "../../index.html";
                }
            });
        };
        app.encriptar = function(){
            var usuario = btoa(btoa($('#user').val()));
            var pass = btoa(btoa($('#pass').val()));
            app.enviarAServidor(usuario, pass);
        };
        app.init();

    })(cambiarClave);


});



