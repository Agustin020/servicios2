$("#button").on('click', function () {
    if ($("#cliente").val() === "") {
        alert("ingrese un N de Cliente");
    }else
    if ($("#orden").val() === "") {
        alert("ingrese un N de Orden");
    }else{
        consulta($("#cliente").val(),$("#orden").val());
    }
    
});

$("#pie").html("<img src=\"../imagenes/pieIMAGEN.png\"/>");
$("#logo").html("<img src=\"../imagenes/logoConsulta.png\"/>");
consulta = function (cliente, orden){
   var url = "../../controlador/ruteador/Ruteador.php?accion=consulta&nombreFormulario=Cliente&cliente="+cliente+"&orden="+orden;
   var html="";
    $.ajax({
                url: url,
                cache: false,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    $.each(data, function (clave, equipo) {
                       var monto = "";
                       if(equipo.numero_siniestro_orden === ""){
                           monto = equipo.monto_orden;
                       }
                        
                    html =
// border="0" cellpadding="0" cellspacing="0"
                    '<table width="484"><tr>'+
                    '<td width="237" class="h2">Cliente: <span class="h3">'+equipo.nombre_cliente+' '+equipo.apellido_cliente+'</span></td>'+
                    '<td width="237" class="h2">Fecha de Ingreso: <span class="h3">'+equipo.fecha_alta_orden+'</span></td>'+
                    ' </tr>'+
                    '<tr>'+
                    '<td colspan="2" class="h2">Equipo: <span class="h3">'+equipo.equipo_orden+'</span></td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td colspan="2" class="h2">Falla:<span class="h3">'+equipo.observaciones_orden+'</span></td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td class="h2">Estado: <span class="h3">'+equipo.descripcion_estado+'</span></td>'+
                    '<td class="h2">Total presupuestado: <span class="h3">$ '+monto+'</span></td>'+
                    '</tr></table>';
                    //alert(html);
                    rellenar(html);
                    
                });
                },
                error: function() {
                    alert('error al realizar la consulta');
                }

            });
   rellenar(html);
};

rellenar = function(html){
    
    $("#respuesta").html(html);
    
};