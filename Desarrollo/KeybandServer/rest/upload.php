<?php

//$fname = $_POST["fname"];

$id_producto = $_GET['id'];
$uploaddir = "../fotos/";

if(isset($_FILES['uploads'])){
	print_r($_FILES['uploads']);
	$muchsize = false;
	$formaterror = false;

	//echo "deleteando22222222222";
    //The error validation could be done on the javascript client side.
    $errors= array();        
    $file_name = $_FILES['uploads']['name'][0];
    $file_size =$_FILES['uploads']['size'][0];
    $file_tmp =$_FILES['uploads']['tmp_name'][0];
    $file_type=$_FILES['uploads']['type'][0];   
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg","jpg","png");
    
    if(in_array($file_ext,$extensions )=== false){
    	$formaterror = true;
    }
    if($file_size > 2097152){
    	$muchsize = true;
    }
    
    if(!$muchsize && !$formaterror && isset($_GET['RRSS'])) {
    	if($_GET['RRSS'] == 'n')
    		$uploaddir = "../fotos/normal/";
    	else
    		$uploaddir = "../fotos/RRSS/";  
    	
	    $uploadfile = $uploaddir . $id_producto . '/' .  $file_name; // path fichero destino
		echo $_GET['RRSS'];
		if(isset($_GET['method'])) {
			 // Se crea el directorio si no existe
			 if (!file_exists($uploaddir . $id_producto)) 
			     mkdir($uploaddir . $id_producto, 0777, true);
			 else {//si existe el directorio elimino lo que haya dentro
			 	echo "hola, editar";
			    $files = glob($uploaddir.$id_producto.'/*'); // get all file names
			    foreach($files as $file){ // iterate files
			    	if(is_file($file))
			    		unlink($file); // delete file
			    }
			 }
			 echo $_FILES['uploads']['tmp_name'][0];
			 if(move_uploaded_file($_FILES['uploads']['tmp_name'][0], $uploadfile)) // se sube el fichero
			     echo "OK";                 
		}
	}
	if($formaterror) {
		echo "formatError";
	}
	if($muchsize) {
		echo "sizeError";
	}
}
else { //Si no mando file es que estoy borrando el producto
	echo "hola??????????";
	echo $id_producto;
	$uploaddir = "../fotos/normal/";
	$dir = $uploaddir . $id_producto;
	if (file_exists($dir))
		rmdir_recursive($dir);
	
	$uploaddir2 = "../fotos/RRSS/";
	$dir = $uploaddir2 . $id_producto;
	if (file_exists($dir))
		rmdir_recursive($dir);
}

function rmdir_recursive($dir) {
	foreach(scandir($dir) as $file) {
		if ('.' === $file || '..' === $file) continue;
		if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
		else unlink("$dir/$file");
	}
	rmdir($dir);
}
?>