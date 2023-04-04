$(function() {

    var Inicio = {};

    (function(app) {

        app.init = function() {
            app.verificarSesion();
            //app.bindings();
        };
        app.bindings = function() {
            
            $("#cerrarSesion").on('click', function(event) {
                document.location.href="../../controlador/ruteador/CerrarSesion.php";
                event.preventDefault();
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
                            $("#logedUser").html(datos.usuario_usuario);
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
        app.init();

    })(Inicio);
});
