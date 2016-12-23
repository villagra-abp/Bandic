<?php

//$fname = $_POST["fname"];

$id_producto = $_GET['id'];
$uploaddir = "../fotos/";

if(isset($_FILES['file'])){
	//echo "deleteando22222222222";
    //The error validation could be done on the javascript client side.
    $errors= array();        
    $file_name = $_FILES['file']['name'];
    $file_size =$_FILES['file']['size'];
    $file_tmp =$_FILES['file']['tmp_name'];
    $file_type=$_FILES['file']['type'];   
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg","jpg","png");        
    if(in_array($file_ext,$extensions )=== false){
    	$errors[]="image extension not allowed, please choose a JPEG or PNG file.";
    }
    if($file_size > 2097152){
    	$errors[]='File size cannot exceed 2 MB';
    }
    
    if(isset($_GET['RRSS'])) {
    	if($_GET['RRSS'] == 'n')
    		$uploaddir = "../fotos/normal/";
    	else
    		$uploaddir = "../fotos/RRSS/";  
    	
	    $uploadfile = $uploaddir . $id_producto . '/' .  $file_name; // path fichero destino
	
		if(isset($_GET['method'])) {
			 // Se crea el directorio si no existe
			 if (!file_exists($uploaddir . $id_producto)) 
			     mkdir($uploaddir . $id_producto, 0777, true);
			 else {//si existe el directorio elimino lo que haya dentro
			    $files = glob($uploaddir.$id_producto.'/*'); // get all file names
			    foreach($files as $file){ // iterate files
			    	if(is_file($file))
			    		unlink($file); // delete file
			    }
			 }
			 if(move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) // se sube el fichero
			     echo "Foto subida correctamente";                 
			 else 
			     echo "Error en la subida de foto";
		}
	}
}
else { //Si no mando file es que estoy borrando el producto
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