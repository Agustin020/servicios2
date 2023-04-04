<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Flaco
 */
interface DBSentencias
{
    //INICIO USUARIOS
    const BUSCAR_NOMBRE_USUARIO = "SELECT * FROM usuario WHERE fch_baja = '0000-00-00 00:00:00' AND id_usuario = ? LOCK IN SHARE MODE";
    const CHECK_USER = "SELECT * FROM usuario WHERE usuario_usuario = ? LOCK IN SHARE MODE";
    const BUSCAR_USUARIOS = "SELECT * FROM usuario WHERE fch_baja= '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ELIMINAR_USUARIO = "UPDATE usuario SET fch_baja = ? WHERE id_usuario=?";
    const INSERTAR_USUARIO = "INSERT INTO usuario(nombre_usuario,apellido_usuario,usuario_usuario,clave_usuario,tipoAcceso_usuario,fch_creacion,fch_modificacion,fch_baja, id_cliente_usuario) VALUES (?,?,?,?,?,?,?,?,?)";
    const INSERTAR_USUARIO_EMPRESA = "INSERT INTO usuario(nombre_usuario,apellido_usuario,usuario_usuario,clave_usuario,tipoAcceso_usuario,fch_creacion,fch_modificacion,fch_baja, id_cliente_usuario) VALUES (?,?,?,?,?,?,?,?,?)";
    const BUSCAR_USUARIO_ID = "SELECT nombre_usuario,apellido_usuario, usuario_usuario,tipoAcceso_usuario,fch_creacion,fch_modificacion, id_cliente_usuario FROM usuario WHERE id_usuario=? LOCK IN SHARE MODE";
    const BUSCAR_USUARIO_ID_EMPRESA = "SELECT nombre_usuario,apellido_usuario, usuario_usuario,tipoAcceso_usuario,usuario.fch_creacion,usuario.fch_modificacion,id_cliente_usuario FROM usuario INNER JOIN cliente ON cliente.id_cliente = usuario.id_cliente_usuario WHERE id_usuario=? LOCK IN SHARE MODE";
    const BUSCAR_ULTIMO_USUARIO = "SELECT MAX(id_usuario) FROM usuario";
    const MODIFICAR_USUARIO = "UPDATE usuario SET nombre_usuario=?, apellido_usuario=?, usuario_usuario=?,tipoAcceso_usuario=?, fch_modificacion=?,fch_baja=?, id_cliente_usuario = ? WHERE id_usuario=?";
    const MODIFICAR_USUARIO_EMPRESA = "UPDATE usuario SET nombre_usuario=?, apellido_usuario=?, usuario_usuario=?,tipoAcceso_usuario=?, fch_modificacion=?,fch_baja=?, id_cliente_usuario = ? WHERE id_usuario=?";
    const MODIFICAR_USUARIO_CLAVE = "UPDATE usuario SET clave_usuario = ?, fch_modificacion = ? WHERE id_usuario=? ";
    //FIN USUARIOS

    //INICIO CLIENTES
    const BUSCAR_CLIENTES = "SELECT * FROM cliente WHERE fch_baja = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ELIMINAR_CLIENTE = "UPDATE cliente SET fch_baja = ? WHERE id_cliente = ?";
    const INSERTAR_CLIENTE = "INSERT INTO cliente( nombre_cliente, apellido_cliente, dni_cliente, direccion_cliente, email_cliente, id_usuario_cliente, fch_creacion, fch_modificacion, fch_baja ) VALUES (?,?,?,?,?,?,?,?,?)";
    const BUSCAR_UN_CLIENTE = "SELECT * FROM cliente WHERE fch_baja = '0000-00-00 00:00:00' AND id_cliente = ? LOCK IN SHARE MODE";
    const BUSCAR_TELEFONOS_DE_UN_CLIENTE = "SELECT * FROM telefono INNER JOIN cliente ON telefono.id_cliente = cliente.id_cliente WHERE telefono.fch_baja = '0000-00-00 00:00:00' AND telefono.id_cliente = ? LOCK IN SHARE MODE";
    const BUSCAR_TELEFONOS = "SELECT * FROM telefono INNER JOIN cliente ON telefono.id_cliente = cliente.id_cliente 
            WHERE telefono.fch_baja = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ULTIMO_CLIENTE = "SELECT MAX(id_cliente) FROM cliente WHERE cliente.fch_baja = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ACTUALIZAR_UN_CLIENTE = "UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, dni_cliente = ?, direccion_cliente = ?, email_cliente = ?, id_usuario_cliente = ?, fch_modificacion = ? WHERE id_cliente = ?";
    const CONSULTA_CLIENTES = "SELECT * FROM orden INNER JOIN cliente ON orden.id_cliente_orden=cliente.id_cliente INNER JOIN estado ON orden.id_estado=estado.id_estado WHERE id_cliente_orden=? AND numero_orden=?";

    //FIN CLIENTES      

    //INICIO TELEFONOS    

    const ELIMINAR_TELEFONO = "UPDATE telefono SET fch_baja = ? WHERE id_telefono = ?";
    const INSERTAR_TELEFONO = "INSERT INTO telefono(numero_telefono, propietario_telefono, detalle_telefono,
             id_cliente, id_usuario, fch_creacion) VALUES(?,?,?,?,?,?)";
    const ACTUALIZAR_TELEFONO = "UPDATE telefono SET numero_telefono = ?, propietario_telefono = ?, detalle_telefono = ?
        , id_cliente = ?, id_usuario = ?,fch_modificacion = ? WHERE id_telefono = ?";
    const ULTIMO_TELEFONO = "SELECT MAX(id_telefono) FROM telefono WHERE fch_baja = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const BUSCAR_UN_TELEFONO = "SELECT * FROM telefono INNER JOIN cliente ON telefono.id_cliente = cliente.id_cliente WHERE telefono.fch_baja = '0000-00-00 00:00:00' AND id_telefono = ? LOCK IN SHARE MODE";
    const BUSCAR_TELEFONO_ID = "SELECT * FROM telefono WHERE id_telefono = ?";
    const BUSCAR_TELEFONOS_US = "SELECT * FROM telefono INNER JOIN cliente ON telefono.id_cliente = cliente.id_cliente 
            INNER JOIN usuario ON telefono.id_usuario = usuario.id_usuario WHERE telefono.fch_baja = '0000-00-00 00:00:00' LOCK IN SHARE MODE";

    //FIN TELEFONOS      


    //INICIO EQUIPO

    const BUSCAR_EQUIPO = "SELECT * FROM equipo WHERE fecha_baja_equipo = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ELIMINAR_EQUIPO = "UPDATE equipo SET fecha_baja_equipo = ? WHERE id_equipo = ?";
    const INSERTAR_EQUIPO = "INSERT INTO equipo (descripcion_equipo, fecha_alta_equipo, fecha_baja_equipo) VALUES (?, ?, ?)";
    const ULTIMO_EQUIPO = "SELECT MAX(id_equipo) FROM equipo WHERE fecha_baja_equipo = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ACTUALIZAR_EQUIPO = "UPDATE equipo SET descripcion_equipo = ?, fecha_alta_equipo = ?, fecha_baja_equipo = ? WHERE id_equipo = ?";
    const BUSCAR_UN_EQUIPO = "SELECT * FROM equipo WHERE id_equipo = ?";

    //FIN EQUIPO

    //INICIO ESTADO

    const BUSCAR_ESTADO = "SELECT * FROM estado WHERE fecha_baja_estado = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ELIMINAR_ESTADO = "UPDATE estado SET fecha_baja_estado = ? WHERE id_estado = ?";
    const INSERTAR_ESTADO = "INSERT INTO estado (descripcion_estado,color_estado ,fecha_alta_estado, fecha_baja_estado) VALUES (?, ?,?, ?)";
    const ULTIMO_ESTADO = "SELECT MAX(id_estado) FROM estado WHERE fecha_baja_estado = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ACTUALIZAR_ESTADO = "UPDATE estado SET descripcion_estado = ?,color_estado=?, fecha_alta_estado = ?, fecha_baja_estado = ? WHERE id_estado = ?";
    const BUSCAR_UN_ESTADO = "SELECT * FROM estado WHERE id_estado = ?";

    //FIN ESTADO 

    //INICIO FOTO

    const BUSCAR_FOTO = "SELECT foto.id_foto, foto.ruta_foto, foto.id_orden, foto.fecha_alta_foto, foto.fecha_baja_foto, orden.id_orden, orden.numero_orden, orden.observaciones_orden FROM foto INNER JOIN orden ON foto.id_orden = orden.id_orden WHERE fecha_baja_foto = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ELIMINAR_FOTO = "UPDATE foto SET fecha_baja_foto = ? WHERE id_foto = ?";
    const INSERTAR_FOTO = "INSERT INTO foto (ruta_foto, id_orden, fecha_alta_foto, fecha_baja_foto) VALUES (?, ?, ?, ?)";
    const ULTIMA_FOTO = "SELECT MAX(id_foto) FROM foto WHERE fecha_baja_foto = '0000-00-00 00:00:00' LOCK IN SHARE MODE";
    const ACTUALIZAR_FOTO = "UPDATE foto SET ruta_foto = ?, id_orden = ?, fecha_alta_foto = ?, fecha_baja_foto = ? WHERE id_foto = ?";
    const BUSCAR_UNA_FOTO = "SELECT * FROM foto INNER JOIN orden ON foto.id_orden = orden.id_orden WHERE id_foto = ?";
    const BUSCAR_IMAGENES_DE_ORDENES = "SELECT * FROM producto_imagen  WHERE id_producto = ? LOCK IN SHARE MODE";
    const ELIMINAR_IMAGEN_ORDEN = "UPDATE foto SET ruta_foto = '../imagenes/ordenes/noimagen.jpg' WHERE id_foto=?";
    const BUSCAR_FOTO_DE_UNA_ORDEN = "SELECT * FROM foto INNER JOIN orden ON foto.id_orden = orden.id_orden INNER JOIN cliente ON cliente.id_cliente = orden.id_cliente_orden WHERE foto.id_orden = ? AND foto.fecha_baja_foto = '0000-00-00 00:00:00'";
    //FIN FOTO

    //INICIO ORDEN

    //    const BUSCAR_ORDEN ="SELECT * FROM orden INNER JOIN estado ON orden.id_estado = estado.id_estado INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario 
    //INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente LEFT JOIN telefono ON orden.id_cliente_orden = telefono.id_cliente ORDER BY orden.numero_orden DESC;
    // LIMIT 0, 1000 LOCK IN SHARE MODE ";
    /*WHERE telefono.numero_telefono = (SELECT MIN(numero_telefono) FROM telefono WHERE orden.id_cliente_orden = telefono.id_cliente)
*/
    const BUSCAR_ORDEN = "SELECT * FROM orden 
INNER JOIN estado ON orden.id_estado = estado.id_estado 
INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario 
INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente 
LEFT JOIN telefono ON orden.id_cliente_orden = telefono.id_cliente 
ORDER BY orden.numero_orden DESC 
LIMIT 0, 500 LOCK IN SHARE MODE";
// LIMIT 0, 10000 LOCK IN SHARE MODE";

    const BUSCAR_ORDEN_TODOS = "SELECT * FROM orden 
INNER JOIN estado ON orden.id_estado = estado.id_estado 
INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario 
INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente 
LEFT JOIN telefono ON orden.id_cliente_orden = telefono.id_cliente 
ORDER BY orden.numero_orden DESC 
LIMIT 0, 500 LOCK IN SHARE MODE";
// LIMIT 0, 5000 LOCK IN SHARE MODE";

    const BUSCAR_ORDEN_POR_EMPRESA = "SELECT * FROM orden INNER JOIN estado ON orden.id_estado = estado.id_estado INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario 
INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente LEFT JOIN telefono ON orden.id_cliente_orden = telefono.id_cliente WHERE orden.numero_siniestro_orden LIKE ? ORDER BY orden.numero_orden DESC LIMIT 0, 1000 LOCK IN SHARE MODE ";
    const BUSCAR_ORDEN_POR_EMPRESA_2 = "SELECT * FROM orden INNER JOIN estado ON orden.id_estado = estado.id_estado INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario 
INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente LEFT JOIN telefono ON orden.id_cliente_orden = telefono.id_cliente WHERE LENGTH(numero_siniestro_orden) = 12 AND NOT numero_siniestro_orden LIKE ?";

    const ELIMINAR_ORDEN = "UPDATE orden SET id_estado = 4 WHERE id_orden = ?";

    const BUSCAR_UNA_ORDEN = "SELECT * FROM orden INNER JOIN estado ON orden.id_estado = estado.id_estado INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente INNER JOIN telefono ON orden.id_cliente_orden=telefono.id_cliente WHERE orden.id_orden = ?";


    const INSERTAR_ORDEN = "INSERT INTO orden (numero_orden, equipo_orden, falla_cliente_orden,observaciones_orden, numero_siniestro_orden, monto_orden, entregado_orden,id_estado, id_usuario_orden, fecha_alta_orden, id_cliente_orden) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const ULTIMA_ORDEN = "SELECT MAX(id_orden) FROM orden LOCK IN SHARE MODE";
    const NUMERO_ULTIMA_ORDEN = "SELECT MAX(numero_orden) FROM orden LOCK IN SHARE MODE";
    const ACTUALIZAR_ORDEN = "UPDATE orden SET numero_orden = ?, equipo_orden = ?, falla_cliente_orden = ?, observaciones_orden = ?, numero_siniestro_orden = ?, monto_orden = ?, entregado_orden = ?,id_estado = ?, id_usuario_orden = ?, id_cliente_orden = ? WHERE id_orden = ?";

    const BUSCAR_ORDEN_USUARIO = "SELECT * FROM orden INNER JOIN estado ON orden.id_estado = estado.id_estado INNER JOIN usuario ON orden.id_usuario_orden = usuario.id_usuario 
INNER JOIN cliente ON orden.id_cliente_orden = cliente.id_cliente LEFT JOIN telefono ON orden.id_cliente_orden = telefono.id_cliente WHERE orden.id_usuario = ?
ORDER BY orden.numero_orden DESC LOCK IN SHARE MODE";

    //FIN ORDEN 
    const BUSCAR_UNA_LEYENDA = "SELECT descripcion_leyenda FROM leyenda WHERE id_leyenda = ?";
    const VERIFICAR = "SELECT COUNT(*) FROM fecha WHERE id_orden = ?";
    const CONSULTA_FINAL_ORDEN = "SELECT fecha_mod FROM fecha WHERE id_orden = ?";
    const FECHA_FINAL_ORDEN = "INSERT INTO fecha (id_orden, fecha_mod) VALUES (?, ?)";
}