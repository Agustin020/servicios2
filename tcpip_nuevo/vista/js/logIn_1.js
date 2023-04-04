$(document).ready(function(){    
  $("#submit").click(function(){ //función submit del formulario
    var username = $("#user").val();//obtengo los datos del formulario (nombre de usuario)
    var password = $("#pass").val();//Obtengo los datos del formulario (pass del usuario)    
    if((username == "") || (password == "")) {//verifico que los campos no estan vacios 
      $("#message").html("<div class=\"alert alert-danger alert-dismissable\">\n\
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\
                            aria-hidden=\"true\">&times;</button>Ingrese Usuario y Password</div>");
                            //mustro un mensaje por la pantalla donde le indico al usuario que tiene que completar los campos
    }
    else {//si los campos estan llenos ingreso paso los datos al ajax para hacer la consulta en el servidor
            var url ="../../aforo/Controladores/ruteador/Seguridad.php"; //voy al ruteador (seguridad) para validar los datos del usuario
            var data = {user:username, pass:password};//genero un Array con los datos del formulario usuario y pass
            $.ajax({//utilizo el ajax para realizar la conexion asincronica de los datos con el servidor y traerlos a la vista
                url: url,//paso los valores de la url que asigno mas arriba
                method: 'POST',//el metodo que voy a utilizar para pasar los datos (POST) por seguridad
                dataType: 'json',//tipo de datos que voy a utilizar 
                data: data,//asigno los datos de la variable data con la que cree el array de datos que traemos de la vista
                success: function(datos) {//si la comunicación con el servidor fue exitosa traigo los datos para manejarlos en la vista
                    //alert ("Se llego a los datos"+datos);                    
                    if(datos){                        
                        $.each(datos,function (clave,usuario){
                            if (usuario.usuario_tipo == "0" && usuario.usuario_estado == "A"){
                                
                                window.location="Vista/html/inicioAdmin.html";
                                alert("Ingresaste como: "+usuario.usuario_nombre);
                            }else if (usuario.usuario_tipo == "1" && usuario.usuario_estado == "A"){
                                
                                window.location="Vista/html/inicioAdminAforo.html";
                                alert("Ingresaste como: "+usuario.usuario_nombre);
                            }else if(usuario.usuario_tipo == "2" && usuario.usuario_estado == "A"){
                                
                                window.location="Vista/html/inicio.html";
                                alert("Ingresaste como: "+usuario.usuario_nombre);
                            }else{
                                $("#message").html("<div class=\"alert alert-danger alert-dismissable\">\n\
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\
                            aria-hidden=\"true\">&times;</button>Usuario o Password Incorrecto</div>");                               
                                
                            }                          
                            
                            
                        });
                    }else{
                        $("#message").html("<div class=\"alert alert-danger alert-dismissable\">\n\
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\
                            aria-hidden=\"true\">&times;</button>Usuario o Password Incorrecto</div>");//muesto un mensaje
                    //de error donde se informa que los datos ingresados no son los correctos
                    }
                    //ingresa a la pagina que corresponda de acuerdo a su nivel de acceso                    
                },
                error: function(data) {//si hay un error en la comunación con el servidor se muestra un mensaje
                    alert("ERRORRRRRR: "+data);//mensaje de error
                    $("#message").html("<div class=\"alert alert-danger alert-dismissable\">\n\
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\
                            aria-hidden=\"true\">&times;</button>Usuario o Password Incorrecto</div>");//muesto un mensaje
                    //de error donde se informa que los datos ingresados no son los correctos
                },
        beforeSend:function()//esta función se realiza antes de enviar los datos al servidor cumple solo la función de mostrar un spinner
        {
          $("#message").html("<p class='text-center'><img src='imagenes/ajax-loader.gif'></p>")//utilizo el mismo div que uso para marcar
          //el mensaje de error para mostrar el spiner
        }
      });
    }
    return false;
  });
});

