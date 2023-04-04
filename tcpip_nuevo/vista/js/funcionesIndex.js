$(function() {

    var TallerAvanzada = {};

    (function(app) {
        
        app.init = function() {
            $('#user').focus();
            $("#submit").on('click', function(event) {
                event.preventDefault();
                app.encriptar();
            });
        };


        app.encriptar = function(){
            var usuario = btoa(btoa($('#user').val()));
            var pass = btoa(btoa($('#pass').val()));
            app.enviarAServidor(usuario, pass);
        };
        
        app.enviarAServidor = function(usuario, pass){
            var url = "controlador/ruteador/Seguridad.php";
            var datosEnviar = {user:usuario, pass:pass};
            $.ajax({
                url: url,
                method: 'POST',
                data: datosEnviar,
                dataType: 'json',
                success: function(datosDevueltos) {
                    app.rellenardiv(datosDevueltos);
                },
                error: function(datos) {
                    alert("error al enviar al servidor. "+ datos);
                },
                beforeSend:function()//esta función se realiza antes de enviar los datos al servidor cumple solo la función de mostrar un spinner
                {
                    $("#message").html("<p class='text-center'><img src='vista/imagenes/ajax-loader.gif'></p>")//utilizo el mismo div que uso para marcar
                    //el mensaje de error para mostrar el spiner
                }
            });
        };

        app.rellenardiv = function(datosDevueltos) {
            var html = "";
            if(typeof datosDevueltos.cambiarClave != 'undefined'){
                document.location.href ="vista/html/cambiarClave.html";
            }else if (typeof datosDevueltos.usuario_usuario != 'undefined') {
                document.location.href ="vista/html/admin.html";
            }else{
                html += "<div class='alert alert-danger' role='alert'><p>" + "USUARIO Y/O CONTRASEÑA INVALIDOS" + "</p></div>";
                $("#loginError").html(html);
                $("#user").css("background-color","red");
                $("#user").val("").html();
                $("#pass").css("background-color","red");
                $("#pass").val("").html();
            }
        };
        app.init();

    })(TallerAvanzada);


});

