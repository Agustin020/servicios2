<?php

$COUNT_FILE = "hitcounter.dat";
$count=0;
//echo dirname("");
if (file_exists($COUNT_FILE)) {
	$fp = fopen("$COUNT_FILE", "r+");
	flock($fp, 1);
	$count = fgets($fp, 100730);
	$count += 1; 
	fseek($fp,0);
	fputs($fp, $count);
	flock($fp, 3);
	fclose($fp);
} else {
	echo "Can't find file, check '\$file'<BR>";
}

?>
<style type="text/css">
<!--
#Layer1 {
	position:absolute;
	left:0px;
	top:0px;
	width:140px;
	height:50px;
	z-index:1;
}
-->
</style>

<style type="text/css">
<!--
#Layer2 {
	position: absolute;
	left: 0px;
	top: 0;
	width: 90px;
	height: 12px;
	z-index: 1;
}
-->
 </style>

<style type="text/css">
<!--
body {
	background-image: url();
}
.texto {
	color: #000;
	font-size: 12px;
	font-family: Arial, Helvetica, sans-serif;
}
-->
</style>

<style type="text/css">
body,td,th {
	
}
</style>
<div class="texto" id="Layer2">
  <div align="left"><span class="texto_negro"><b class="textochico_final"><?php echo $count; ?></b></span></div>
</div>
