<?php
if (isset($_FILES["cargarImagen"]["type"])) {
    //echo 'ENTRE A IMAGENUPLOAD';
    $validextensions = array("jpeg", "jpg", "png");
    $temporary = explode(".", $_FILES["cargarImagen"]["name"]);
    $file_extension = end($temporary);
    //$max_file_size = 1024*200; // 200kb
    $max_file_size = 1024*1024*10; // 10 Mb
    $ruta = str_replace("C:\\fakepath\\","",$_FILES["cargarImagen"]["name"]);
    if ((($_FILES["cargarImagen"]["type"] == "image/png") || ($_FILES["cargarImagen"]["type"] == "image/jpg") || ($_FILES["cargarImagen"]["type"] == "image/jpeg")
            ) && ($_FILES["cargarImagen"]["size"] < $max_file_size)
            && in_array($file_extension, $validextensions)) {
        if ($_FILES["cargarImagen"]["error"] > 0) {
            echo "Código regresado: " . $_FILES["cargarImagen"]["error"] . "<br/><br/>";
        } else {
//            if (file_exists("productos/" . $_FILES["cargarImagen"]["name"])) {
//                echo $_FILES["cargarImagen"]["name"] . " <span id='invalid'><b>Ya existe la imagen.</b></span> ";
//            } else {
                $sourcePath = $_FILES['cargarImagen']['tmp_name']; // Storing source path of the file in a variable
                $targetPath = "../../vista/imagenes/ordenes/" . $ruta;//$_FILES['cargarImagen']['name']; // Target path where file is to be stored
                move_uploaded_file($sourcePath, $targetPath); // Moving Uploaded file
                echo "<span id='success'>Imagen cargada correctamente...!!</span><br/>";
                echo "<br/><b>Nombre:</b> " . $_FILES["cargarImagen"]["name"] . "<br>";
                echo "<b>Tipo:</b> " . $_FILES["cargarImagen"]["type"] . "<br>";
                echo "<b>Tamaño:</b> " . ($_FILES["cargarImagen"]["size"] / 1024) . " kB<br>";
                echo "<b>Nombre Temp:</b> " . $_FILES["cargarImagen"]["tmp_name"] . "<br>";
//            }
        }
    } else {
        echo "<span id='invalid'>***Tamaño o tipo inválido***<span>";
    }
}else{
    echo "no entra al if-isset de imagenUpload";
}
?>