$(function() {
    var Orden = {};
    var idUsuario="";
    (function(app) {
        app.init = function() {
            app.verificarSesion();
        };
        app.bindings = function() {
            app.mostrarFecha();
            $("#divTablaOrdenes").hide();
            $("#eliminarImagen").hide();
            var f = app.getParameterByName();
            if(f == null || f =="") {
                app.buscarFotos();
            }else{
                app.buscarFotosDeOrden(f);
            }
            app.buscarOrdenes();
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
                $("#divTablaOrdenes").hide();
                $("#id_foto").val(0);
                $("#fiLabel").show();
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nueva Foto");
                $("#modalFoto").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#cargarImagen").removeAttr("disabled");
                $("#eliminarImagen").hide();
                $("#mensaje").val("");
                //$("#ruta").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                //$("#id_orden").removeAttr("disabled");
                $("#numeroOrden").attr('disabled', 'true');
                $("#selecOrden").show(); 
                app.activarControles();
            });
            
            $("#formFoto").on("submit", function (event) {
                event.preventDefault();
                $("#mensaje").empty();
                var url = "../../controlador/ruteador/imagenUpload.php"; // Url to which the request is send
                    $.ajax({
                        url: url, // Url to which the request is send
                        type: "POST", // Type of request to be send, called as method
                        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                        contentType: false, // The content type used when sending data to the server.
                        cache: false, // To unable request pages to be cached
                        processData: false, // To send DOMDocument or non processed data file it is set to false
                        success: function (data)   // A function to be called if request succeeds
                        {
                            $("#mensaje").html(data);
                        },
                        error: function(data) {
                            alert('error en ajax de imagen Upload');
                        }
                    });
                app.validarCampos();
            });
            
            $("#eliminarImagen").on('click', function (event) {
                event.preventDefault();
                var id = $("#id_foto").val();
                app.eliminarImagen(id);
                $("#imagen").attr("src","../imagenes/ordenes/noimagen.jpg");
                $("#eliminarImagen").hide();
                $("#fiLabel").show();
            });
            
            $("#cancelar").on("click", function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalFoto").modal('hide');
            });
            
            $("#selecOrden").on('click', function() {
                $("#divTablaOrdenes").slideToggle();
                $("#divTablaOrdenes").css("border-bottom-style", "solid");
                $("#divTablaOrdenes").css("border-bottom-width", "1px");
                $("#divTablaOrdenes").css("border-bottom-color", "grey");
                $("#divTablaOrdenes").css("border-top-style", "solid");
                $("#divTablaOrdenes").css("border-top-width", "1px");
                $("#divTablaOrdenes").css("border-top-color", "grey");
            });
            
            $("#cuerpoTablaFotos").on('click', '.editar', function(event) {
                event.preventDefault();
                $("#divTablaOrdenes").hide();
                var ruta = $(this).parent().parent().children().first().next().html();
                var idOrden = $(this).parent().parent().children().first().next().next().next().html();
                var nro = $(this).parent().parent().children().first().next().next().next().next().html();
                $("#id_foto").val($(this).attr("data-id_foto"));
                $("#numeroOrden").val(nro);
                //$("#selecOrden").val(); //es el boton
                $("#id_orden").val(idOrden); // es un hidden con el id de orden
                $("#imagen").attr("src",($(this).parent().parent().children().first().next().next().children().children().attr("src")));
                $("#rutaImagen").val(ruta);
                $("#eliminarImagen").show(); // el el link que aparece y desaparece según necesidad
                $("#cargarImagen").val(($(this).parent().parent().children().first().next().next().next().children().children().attr("src")));
                $("#mHeader").removeClass();
                $("#eliminarImagen").show();
                $("#fiLabel").hide();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#guardar").attr("value", "Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Foto");
                $("#modalFoto").modal({show: true});
                app.activarControles();
            });
            
            $("#tablaFotos").on('click', '.seleccionar', function(event) {
                event.preventDefault();
                $("#divTablaOrdenes").hide();
                var ruta = $(this).parent().parent().children().first().next().html();
                var idOrden = $(this).parent().parent().children().first().next().next().next().html();
                var nro = $(this).parent().parent().children().first().next().next().next().next().html();
                $("#id_foto").val($(this).attr("data-id_foto"));
                $("#numeroOrden").val(nro);
                $("#selecOrden").hide(); //es el boton
                $("#id_orden").val(idOrden); // es un hidden con el id de orden
                $("#imagen").attr("src",($(this).parent().parent().children().first().next().next().children().children().attr("src")));
                $("#rutaImagen").val(ruta);
                $("#eliminarImagen").show(); // el el link que aparece y desaparece según necesidad
                $("#cargarImagen").val(($(this).parent().parent().children().first().next().next().next().children().children().attr("src")));
                
                //.attr('disabled', 'true');
                $("#mHeader").removeClass();
                $("#mHeader").attr("class", "modal-header bg-success");
                $("#guardar").attr("value", "Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Nueva Foto");
                $("#modalFoto").modal({show: true});
                app.desactivarControles();
            });
            
            $("#cargarImagen").on("change", function(event){  //se dispara este evento cuando se elige una imagen
                event.preventDefault();
                $("#mensaje").empty(); // To remove the previous error message
                var file = this.files[0];
                var imagefile = file.type;
                var match = ["image/jpeg", "image/png", "image/jpg"];
                if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2])))
                {
                    $('#imagen').attr('src', '../imagenes/ordenes/noimage.png');
                    $("#mensaje").html("<p id='error'>Seleccione un tipo válido de imagen. </p>" + "<h4>Nota:</h4>" + "<span id='error_message'>Sólo los tipos de imágenes: jpeg, jpg y png están permitidos</span>");
                    return false;
                } else
                {
                    
                    var reader = new FileReader();
                    reader.onload = app.imageIsLoaded;
                    reader.readAsDataURL(this.files[0]);
                }
            });
            
            $("#tablaFotos").on('click', '.eliminar', function() {
                var id = $(this).attr("data-id_foto");
                bootbox.confirm({ 
                    size: 'medium',
                    message: "Se va a eliminar el registro seleccionado. ¿Está seguro?", 
                    callback: function(result){
                    if(result){
                        app.eliminarFoto(id);
                    }
                    }
                });
            });
            
            $('#modalFoto').on('shown.bs.modal', function () {
                $('#apellido').focus();
            }); 
            
            $("#cuerpoTablaOrdenes").on('click', '.seleccionar', function(event) {
                event.preventDefault();
                $("#id_orden").val($(this).attr("data-id_orden"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-info");
                $("#numeroOrden").val($(this).parent().parent().children().first().next().html());
                $("#divTablaOrdenes").slideToggle();
                $("#cargarImagen").focus();
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
        
        app.activarControles = function (){
            $("#id_orden").removeAttr("disabled");
            $("#imagen").removeAttr("disabled");
            $("#rutaImagen").removeAttr("disabled");
            $("#eliminarImagen").removeAttr("disabled");
            $("#cargarImagen").removeAttr("disabled");
            $("#selecOrden").removeAttr("disabled");
            $("#selecOrden").show();
            $("#cargarImagen").removeAttr("disabled"); 
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
            
            // si existe el interrogante
//            if(loc.indexOf('?')>0){
//                // cogemos la parte de la url que hay despues del interrogante
//                var getString = loc.split('?')[1];
//                // obtenemos un array con cada clave=valor
//                var GET = getString.split('&');
//                var get = {};
//                // recorremos todo el array de valores
//                for(var i = 0, l = GET.length; i < l; i++){
//                    var tmp = GET[i].split('=');
//                    get[tmp[0]] = unescape(decodeURI(tmp[1]));
//                }
//                return get;
//            }
        };           
        
        app.eliminarImagen = function (id){
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminarImagen&nombreFormulario=Foto&id=" + id;
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    
                },
                error: function() {
                    alert('error al intentar eliminar imagen');
                }
            });
        };
        
        app.desactivarControles = function (){
        $("#id_orden").attr('disabled', 'true');
        $("#imagen").attr('disabled', 'true');
        $("#rutaImagen").attr('disabled', 'true');
        $("#eliminarImagen").attr('disabled', 'true');
        $("#eliminarImagen").hide();
        $("#cargarImagen").attr('disabled', 'true'); 
        $("#fiLabel").hide();
        $("#numeroOrden").attr('disabled', 'true'); 
        $("#cargarImagen").attr('disabled', 'true'); 
        
        };
        
        app.borrarCampos = function () {
            $("#numeroOrden").val("").html();
            $("#imagen").val("").html();
            $("#imagen").attr("src","../imagenes/ordenes/noimagen.jpg");
        }; 
        
        $("#cancelar").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalFoto").modal('hide');
        });
        
        $("#equis").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalFoto").modal('hide');
        });
        
        app.imageIsLoaded=function(e) {
            $("#cargarImagen").css("color","green");
            $('#imagen').attr('src', e.target.result);
            $('#imagen').attr('width', '150px');
            $('#imagen').attr('height', '130px');
            var nomImg = $("#cargarImagen").val();
//            alert(nomImg);
//            var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;//= !!window.chrome && !!window.chrome.webstore;
            var nom = "";
//            if (isChrome) {
            nom = nomImg.replace("C:\\fakepath\\" ,"");
//            }else{
            var nomRuta = "../imagenes/ordenes/" + nom;
//            }
            $("#rutaImagen").val(nomRuta);
            
        }; 
        
        app.validarCampos = function(){
            //dir y fechaNac pueden ser null
            var orden = $("#numeroOrden").val();
            var ruta = $("#rutaImagen").val();
            var imagen = $("#cargarImagen").val();
            var rta = "";
            if (orden == "") {
                rta += "Debes seleccionar una Orden.";
                bootbox.alert(rta);
                $("#selecOrden").focus();
            }else if(imagen == ""){
                rta += "Debes seleccionar una imagen";
                bootbox.alert(rta);
                $("#cargarImagen").focus();
            }else{
                app.guardarFoto();
                app.borrarCampos();
            }
        };
        app.eliminarFoto = function(id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Foto&id=" + id; 
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.borrarFilaDataTable(id);
                },
                error: function(data) {
                    alert('error en app.eliminarFoto');
                }
            });
        };
        
        app.buscarFotos = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Foto";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error en buscar fotos');
                }
            });
        };
        
        app.buscarFotosDeOrden = function(text) {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarFotoDeOrden&nombreFormulario=Foto&id=" + text;

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error en buscar fotos');
                }
            });
        };
        
        app.buscarOrdenes = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Orden";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTableOrdenes(data);
                },
                error: function() {
                    alert('error en buscar fotos');
                }
            });
        };
        
        app.guardarFoto = function() {
            var url = "../../controlador/ruteador/Ruteador.php"; 
            var data = $("#formFoto").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(datos) {
                    $("#modalFoto").modal('hide');
                    app.actualizarDataTable(datos, $("#id_foto").val());
                },
                error: function(data) {
                    alert("Error en ajax de guardarFoto");
                }
            });
        };
        
        app.actualizarDataTable = function(foto, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html = '<tr class="text-warning text-center">' +
                        '<td class="text-center"><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td class="text-center oculto">' + foto.ruta_foto + '</td>' +
                        '<td class="text-center"><a href="' + foto.ruta_foto + '" target="_blank" data-id_foto="' + foto.id_foto + '"><img src="' + foto.ruta_foto + '" data-toggle="tooltip" title="Ver" alt="alt" with="50" height="50"/></a></td>' +
                        '<td class="text-center oculto">' + foto.id_orden + '</td>' +
                        '<td class="text-center">' + foto.numero_orden + '</td>' +
                        '<td class="text-center oculto">' + foto.fecha_alta_foto + '</td>' +
                        '<td class="text-center oculto">' + foto.fecha_baja_foto + '</td>'; 
                        html +='<td class="text-center">' +
                        '<a class="btn editar" data-toggle="tooltip" title="Editar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn eliminar" data-toggle="tooltip" title="Eliminar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaFotos").append(html);
                
            } else {
                //busco la fila
                var fila = $("#cuerpoTablaFotos").find("a[data-id_foto='" + id + "']").parent().parent();
                var html = '<td class="text-center">' + 
                        '<a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td class="text-center oculto">' + foto.ruta_foto + '</td>' +
                        '<td class="text-center"><a href="' + foto.ruta_foto + '" target="_blank" data-id_foto="' + foto.id_foto + '"><img src="' + foto.ruta_foto + '" data-toggle="tooltip" title="Ver" alt="alt" with="50" height="50"/></a></td>' +
                        '<td class="text-center oculto">' + foto.id_orden + '</td>' +
                        '<td class="text-center">' + foto.numero_orden + '</td>' +
                        '<td class="text-center oculto">' + foto.fecha_alta_foto + '</td>' +
                        '<td class="text-center oculto">' + foto.fecha_baja_foto + '</td>'; 
                        html +='<td class="text-center">' +
                        '<a class="btn editar" data-toggle="tooltip" title="Editar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn eliminar" data-toggle="tooltip" title="Eliminar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>';
                fila.html(html);
            }
            $('[data-toggle="tooltip"]').tooltip();
            $(".oculto").hide();
        };
        
        
        app.verificarSesion = function(){
            var url = "../../controlador/ruteador/Sesion.php"; 
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    if (datos.id_usuario != null) {
                        $("#id_user").val(datos.id_usuario);
                        $("#logedUser").html(datos.usuario_usuario);
                        idUsuario=datos.id_usuario;
                        app.bindings();
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
            var fila = $("#cuerpoTablaFotos").find("a[data-id_foto='" + id + "']").parent().parent().remove();

        };
        
        app.rellenarDataTableOrdenes = function(data) {
            var html = "";
            var numeroOrden = "";
            if ($.fn.DataTable.isDataTable('#tablaOrdenes')) {
                $('#tablaOrdenes').DataTable().destroy();
            }
            $.each(data, function (clave, orden) {
                if (!(orden.numero_orden === numeroOrden)) {
                    html += '<tr class="text-warning">' +
                    '<td><a class="btn text-center seleccionar" data-toggle="tooltip" title="' + orden.apellido_cliente + ", " + orden.nombre_cliente + '" data-id_orden="' + orden.id_orden + '">' +
                    '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                    '<td class="text-center">' + orden.numero_orden + '</td>' +
                    '<td class="text-center">' + orden.observaciones_orden + '</td></tr>' ;
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
        };
        
        app.rellenarDataTable = function(data) {
            var html = "";
            if ( $.fn.DataTable.isDataTable( '#tablaFotos' ) ) {
                $('#tablaFotos').DataTable().destroy();
            }
            $.each(data, function(clave, foto) {
                html += '<tr class="text-warning text-center">' +
                        '<td class="text-center"><a class="btn seleccionar" data-toggle="tooltip" title="Seleccionar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/info3.ico" width="25" height="25" alt=""> </span></a></td>' +
                        '<td class="text-center oculto">' + foto.ruta_foto + '</td>' +
                        '<td class="text-center"><a href="' + foto.ruta_foto + '" target="_blank" data-id_foto="' + foto.id_foto + '"><img src="' + foto.ruta_foto + '" data-toggle="tooltip" title="Ver" alt="alt" with="50" height="50"/></a></td>' +
                        '<td class="text-center oculto">' + foto.id_orden + '</td>' +
                        '<td class="text-center">' + foto.numero_orden + '</td>' +
                        '<td class="text-center oculto">' + foto.fecha_alta_foto + '</td>' +
                        '<td class="text-center oculto">' + foto.fecha_baja_foto + '</td>'; 
                        html +='<td class="text-center">' +
                        '<a class="btn editar" data-toggle="tooltip" title="Editar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/edit2.ico" width="25" height="25" alt="Editar"> </span></a>' +
                        '<a class="btn eliminar" data-toggle="tooltip" title="Eliminar Foto" data-id_foto="' + foto.id_foto + '">'+
                        '<span><img class="pull-left" src="../imagenes/iconos/del2.ico" width="25" height="25" alt="Eliminar"> </span></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaFotos").html(html);
            $("#tablaFotos").dataTable({       //transforma la tabla en dataTable
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
        
        
        app.init();
    })(Orden);
});