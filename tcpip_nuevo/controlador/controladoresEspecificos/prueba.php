<?php

require_once '../persistencia/ControladorPersistencia.php'; //utilizo para la conexion

/**
 * Esta clase es generada para manejar los datos y sentencias que vienen de los controladores
 * la idea es no tener que escribir tanto códido en lo q a sentencias sql se refiere... me
 * recomiendo no dejar de utilizar del DBSentencias... pero solo hacerlo en el caso de las consultas cruzadas
 * cuando se trate de agregar en una sola tabla, el metodo a emplear es este.... sin ninguna duda
 * @author Diego
 */
class prueba {

    protected $refControladorPersistencia; //controlador persistencia utilizado para crear la conexion a la BD

    function __construct() {
        $this->refControladorPersistencia = new ControladorPersistencia();
    }

    public function meta($tabla) {//funcion meta(), se utiliza para obtener los datos de la tabla en cuestion que luego serán mis variables en las sentencias... y también mis claves primarias
        $array = array(); //declaro array donde voy a armar los key a ser utilizados por el resto de los metodos 
        $this->refControladorPersistencia->get_conexion(); //abro la conexion para leer la BD
        $consulta = "DESCRIBE"; //con la consulta DESCRIBE $tabla´(éste es el nombre del controlador que obvio coincide con el de la tabla) obtengo la metadata de la BD
        $minTabla = strtolower($tabla); //paso el nombre del controlador a minusculas para que MySQL no desconozca la tabla... siempre tengo cuidado de generar los nombres de la base de datos con minusculas
        $consulta .= ' ' . $minTabla; //contateno la consulta con el nombre de la tabla
        $variable = $this->refControladorPersistencia->ejecutarSentencia($consulta); //realizo la consulta en la BD
        $var = $variable->fetchAll(PDO::FETCH_ASSOC); //obtengo los valores
        foreach ($var as $valores) {//hago un for para recorrer los valores que me devuelve la tabla
            foreach ($valores as $clave => $valor) {//este for es el que se encarga de llenar el arreglo con los Keys correpondiente que obtuve de la BD
                if ($clave == "Field") {//Field = Campo :) no lo voy a aclarar
                    $array[$valor] = "campo"; //lleno el array y completo los valores con un string cualquiera para saber q estoy trabajando
                }
            }
        }
        return $array; //regreso el array
    }

    public function armarSentencia($arrayCabecera, $tabla) {//ésta es la funcion encargada de generar la sentencia agregar en la base de datos
        $i = 1; //contador inicializado en 1 
        $tablaMin = strtolower($tabla);
        $sentencia = "INSERT INTO " . $tablaMin . " ("; //sentencia insert paso como dato el nombre de la tabla
        $llaveStr = ""; //inicializada en vacio, para poder cargarlo los campos de las base de dato a la sentencia
        array_shift($arrayCabecera); //elimino el primer componente del array... ya que si es insertar el id tiene q ser automatico
        $long = sizeof($arrayCabecera); //determino el tamaño del array para usarlo en el if de los foreach
        foreach ($arrayCabecera as $llave => $value) {// recorro el array ;)
            $llaveStr = " " . $llave; //ingreso los nombres de los campos de la BD en la sentencia
            if ($long > $i) {//si todavia hay metadata con nombres de campo sigo el recorrido del array
                $sentencia .= $llaveStr . ","; //agrego una coma despues de cada nuevo campo ingresado en la sentencia
            } else {//sino =)
                $sentencia .= $llaveStr . ')'; //finalizo los campos en cerrando con un parentesis
            }
            $i++; //autoincremento de la variable
        }
        $i = 1; //vuelvo a inicializar la variable en 1 para su posterior uso en el próximo foreach
        $sentencia .= ' VALUES ('; //concateno la sentencia con la cantidad de campos que se requieran para las incognitas
        foreach ($arrayCabecera as $llave => $value) {//vuelvo a recorrer el array... ahora poque no lo hago en el mismo array de arriba con dos variables distintas y después las concateno
            if ($long > $i) {//si no es el último campo...
                $sentencia .= '?, '; //cargo con una incognita mientras no se el último... se repite
            } else {//sino ;,
                $sentencia .= '? )'; //finalizo la sentencia
            }
            $i++; //incremento
        }
        return $sentencia; //regreso la sentencia
    }

    public function armarArray($arrayCabecera, $arrayDatos) {//ésta es para armar el array al momento de realizar la inserción en la BD
        $paramArray = array(); //array q se encarga de devolver los datos al controlador solicitante
        $limpArray = array(); //en este solo quito los datos que no representan nada en esta acción 
        $i = 0; //contador para los foreach de datos
        $j = 0; //contador para las fechas
        $id = array_values($arrayDatos)[0];
        foreach ($arrayDatos as $llave => $value) {//recorro los datos del array de datos
            if ($llave != "accion") {//mientras no lleguemos a la llave acción sequimos incorporando al array los datos
                $limpArray[$i] = $value; //todos los valores .... con su respectivo indice
            } else {//sino $)
                $i = 0; //reinicio el contador ... llegué al final
                break; //termino el método
            }
            $i++; //autoincremento la variable $i
        }
        foreach ($arrayCabecera as $llave => $value) {//utilizo este foreach para cargar los datos en un array con sus respectivas llaves.... tal cual esta en la BD
            $fch = explode("_", $llave); //verifico si es un campo fecha
            if ($fch[0] == "fch") {//si es un campo fecha ingreso 
                if ($j == 0 && $id == '0') {
                    $paramArray[$llave] = $this->fechaArray($id, $j, NULL); //llamo a la función correspondiente para que se encargue de llenar el array
                } else if ($j == 0) {
                    $paramArray[$llave] = $this->fechaArray($id, $j, $limpArray[$i]);
                } else {
                    $paramArray[$llave] = $this->fechaArray($id, $j, NULL);
                }
                $j++;
            } else {//sino *)
                $paramArray[$llave] = $limpArray[$i]; //cargo los datos del array con los datos que limpié en el foreach anterior...
            }
            $i++; //auto incremento
        }
        array_shift($paramArray); //quito el primer elemento
        return $paramArray; //regreso el array que se encuentra armado y listo para ser insertado en la BD
    }

    public function buscarUltimo($tabla) {//Esta función busca el máximo ID cargado el la tabla correspondiente para reguresar el dato
        $minTabla = strtolower($tabla);
        $sentencia = "SELECT MAX(id_" . $tabla . ") FROM " . $minTabla; //es solo para no repetir la sentencia un montón de veces en el BDSentencias
        return $sentencia; //obvio.... regreso la sentencia
    }

    public function buscar($tabla) {//tuve que generar esta función para no cambiar la de la lógica que usamos en el controlador...
        $strTabla = substr($tabla, 11); //al obtener de la clase el nombre de la clase de digo que quiero que parta la palabra controlador y me haga la consulta con el nombre del formulario
        $minTabla = strtolower($strTabla);
        $sentencia = "SELECT * FROM " . $minTabla . " WHERE fch_baja_" . $minTabla . " = '0000-00-00 00:00:00'"; //inserto el nombre del formulario para relizar la consulta desde el controlador        
        return $sentencia; //regreso la sentencia para ser usada..
    }

    public function fecha() {//utilizado para cargas las fechas actuales
        $fecha = time(); //coloca la fecha actual
        $fechaFormato = date('Y-m-d H:i:s', $fecha); //le doy el formato que necesito.... y sigo
        return $fechaFormato; //regreso la fecha
    }

    public function eliminar($tabla, $id) {//está demás decir para que sirve esta función ... todavía basica... pero funcional
        $fecha = $this->fecha(); // desde aquí llamo a la función fecha... que sirve para ingresar la fecha con el formato correspondiente en la BD
        $strTabla = substr($tabla, 11); //al obtener de la clase el nombre de la clase de digo que quiero que parta la palabra controlador y me haga la consulta con el nombre del formulario
        $minTabla = strtolower($strTabla);
        $consulta = "UPDATE " . $minTabla . " SET fch_baja_" . $minTabla . " = '" . $fecha . "' WHERE id_" . $minTabla . " =" . $id; // se genera la sentencia..
        return $consulta; //regreso la consula... '(
    }

    public function fechaArrayAgregar($j) {
        $fechaFormato = "";
        if ($j == 0) {//mi contador está en 0 por tanto es una fecha de AGREGAR...  
            $fechaFormato = $this->fecha(); //llamo a la funcion correspondiente encargada de poner la fecha actual para enviar en la llave correspodinte a la BD         
        } else if ($j == 1 || $j == 2) {//cuando vuelvo a ingresar paso por éste SINO... 
            $fechaFormato = "0000-00-00 00:00:00"; //le agrego al array el resto de las fechas que usamos en la BD
        }
        return $fechaFormato;
    }

    public function fechaArrayModificar($j) {//funcion para llenar las fechas de los FCH que estan en la base de datos
        $fechaFormato = ""; //inicializo la variable que voy a rellenar con la fecha correspondiente... 
        if ($j == 1) {//mi contador está en 0 por tanto es una fecha de AGREGAR...  
            $fechaFormato = $this->fecha(); //llamo a la funcion correspondiente encargada de poner la fecha actual para enviar en la llave correspodinte a la BD         
        } else if ($j == 0 || $j == 2) {//cuando vuelvo a ingresar paso por éste SINO... 
            $fechaFormato = "0000-00-00 00:00:00"; //le agrego al array el resto de las fechas que usamos en la BD
        }
        return $fechaFormato; //regreso la vecha que corresponde...
    }

    public function buscarId($dato, $tabla) {//sirve para generar la sentencia que se encarga de buscar un id en la tabla 
        $strTabla = substr($tabla, 11); //al obtener de la clase el nombre de la clase de digo que quiero que parta la palabra controlador y me haga la consulta con el nombre del formulario
        $minTabla = strtolower($strTabla);
        $consulta = "SELECT * FROM " . $minTabla . " WHERE id_" . $minTabla . "= " . $dato; //ésta es la consulta ensambalda... tambien se prodria utilizar unida a un INNER JOIN todavía al momento de escribir esto todavía estoy pensando como hacerlo ;)
        return $consulta; //regreso la consulta
    }

    public function buscarInnerJoin($tablaP, $tablaS) {//Ésta función esta todavía en fase de prueba... en realidad lo que me gustaria hacer es ver si en lugar de pasar una tabla secundaria pudiera generar un array para poder pasar los datos de la vista... de esa manera podría leer las todos lo elementos que vienen en el array para poder armar la consulta °¬)
        $strTablaP = substr($tablaP, 11); //obvio utilizo el substring... para poder acceder a la segunda parte del nombre en donde esta la tabla a la cual quiero acceder
        $strTablaS = /* substr($tablaS, 11) */$tablaS; //tabla secundaria ... todavía a prueba quisiera poder acceder a este dato desde una array() para poder recorrerlo y desde ahí verificar que datos lo componene.. etapa de prueba... si puedo meter esta función sería un golazo...
        $minTablaP = strtolower($strTablaP);
        $minTablaS = strtolower($strTablaS);
        $consulta = "SELECT * FROM " . $minTablaP . " INNER JOIN " . $minTablaS . " ON " . $minTablaP . ".id_" . $minTablaP . " = " . $minTablaS . ".id_" . $minTablaS;
        $consulta .= " WHERE " . $minTablaP . ".fch_baja = '0000-00-00 00:00:00'"; //sentencia armada con un solo INNER JOIN todavía se le puede sacar mas provecho a esta función
        return $consulta; // tal cual lo pienso regreso la función y... magicamente busca con un INNER JOIN  dentro de la BD... @)
    }

    public function verificarExistencia($tabla, $dato) {
        $array = $this->meta($tabla);
        $arrayString = $this->arrayString($array);
        $tablaMin = strtolower($tabla);
        $consulta = "SELECT COUNT(*) FROM " . $tablaMin . " WHERE " . $arrayString . " = '" . $dato . "'";
        return $consulta;
    }

    public function arrayString($array) {
        $i = 0;
        $string = "";
        foreach ($array as $llave => $val) {
            if ($i == 1 && $val == "campo") {
                $string = $llave;
                break;
            } else if ($i == 1) {
                $string = $val;
            }
            $i++;
        }
        return $string;
    }

    public function fecha30() {
        return date('Y-m-d 00:00:00', strtotime('-2400 day'));
    }

    public function armarSentenciaModificar($arrayCabecera, $tabla) {//ésta es la funcion encargada de generar la sentencia agregar en la base de datos
        $i = 1; //contador inicializado en 1 
        $minTabla = strtolower($tabla);
        //UPDATE combustible SET nombre_combustible=?,fch_modificacion=?,fch_baja=? WHERE id_combustible=?
        $sentencia = "UPDATE " . $minTabla . " SET"; //sentencia insert paso como dato el nombre de la tabla
        $llaveStr = ""; //inicializada en vacio, para poder cargarlo los campos de las base de dato a la sentencia
        array_shift($arrayCabecera);
        $long = sizeof($arrayCabecera); //determino el tamaño del array para usarlo en el if de los foreach
        foreach ($arrayCabecera as $llave => $value) {// recorro el array ;)
            $llaveStr = " " . $llave; //ingreso los nombres de los campos de la BD en la sentencia
            if ($long > $i) {//si todavia hay metadata con nombres de campo sigo el recorrido del array
                $sentencia .= $llaveStr . "=?,"; //agrego una coma despues de cada nuevo campo ingresado en la sentencia
            } else {//sino =)
                $sentencia .= $llaveStr . "=? "; //finalizo los campos en cerrando con un parentesis
            }
            $i++; //autoincremento de la variable
        }
        $sentencia .= ' WHERE id_' . $minTabla . " =?"; //concateno la sentencia con la cantidad de campos que se requieran para las incognitas

        return $sentencia;
    }

    public function fechaArray($id, $j, $valor) {//utilizado para colocar la fecha correspondiente en el array que 
        $fechaFormato = "";
        if ($id == '0' && $j == 0) {//mi contador está en 0 por tanto es una fecha de AGREGAR...  
            $fechaFormato = $this->fecha(); //llamo a la funcion correspondiente encargada de poner la fecha actual para enviar en la llave correspodinte a la BD         
        } else if ($id != '0' && $j == 1) {//cuando vuelvo a ingresar paso por éste SINO... 
            $fechaFormato = $this->fecha(); //le agrego al array el resto de las fechas que usamos en la BD
        } else if ($id != '0' && $j == 0) {
            $fechaFormato = $valor; //este caso es solo por si ya viene un valor desde la BD es para la modificacioón
        } else {
            $fechaFormato = "0000-00-00 00:00:00"; //en el caso de ser un INSERT se llenan los campos fecha Modi y fecha baja con este campo
        }
        return $fechaFormato; //regreso la fecha *~{
    }

    public function armarArrayModi($arrayCabecera, $arrayDatos) {//ésta es para armar el array al momento de realizar la inserción en la BD
        $paramArray = array(); //array q se encarga de devolver los datos al controlador solicitante
        $limpArray = array(); //en este solo quito los datos que no representan nada en esta acción 
        $i = 0; //contador para los foreach de datos
        $j = 0; //contador para las fechas
        $id = array_values($arrayDatos)[0];
        foreach ($arrayDatos as $llave => $value) {//recorro los datos del array de datos
            if ($llave != "accion") {//mientras no lleguemos a la llave acción sequimos incorporando al array los datos
                $limpArray[$i] = $value; //todos los valores .... con su respectivo indice
            } else {//sino $)
                $i = 0; //reinicio el contador ... llegué al final
                break; //termino el método
            }
            $i++; //autoincremento la variable $i
        }
        foreach ($arrayCabecera as $llave => $value) {//utilizo este foreach para cargar los datos en un array con sus respectivas llaves.... tal cual esta en la BD
            $fch = explode("_", $llave); //verifico si es un campo fecha
            if ($fch[0] == "fch") {//si es un campo fecha ingreso 
                if ($j == 0 && $id == '0') {
                    $paramArray[$llave] = $this->fechaArray($id, $j, NULL); //llamo a la función correspondiente para que se encargue de llenar el array
                } else if ($j == 0) {
                    $paramArray[$llave] = $this->fechaArray($id, $j, $limpArray[$i]);
                } else {
                    $paramArray[$llave] = $this->fechaArray($id, $j, NULL);
                }
                $j++;
            } else {//sino *)
                $paramArray[$llave] = $limpArray[$i]; //cargo los datos del array con los datos que limpié en el foreach anterior...
            }
            $i++; //auto incremento
        }

        array_shift($paramArray);
        array_push($paramArray, $id);

        return $paramArray; //regreso el array que se encuentra armado y listo para ser insertado en la BD
    }

}