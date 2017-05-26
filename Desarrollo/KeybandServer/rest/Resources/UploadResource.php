<?php

class UploadResource {
	public static function methodUpload($method,$type){   //filtra por metodo
		switch ($method) {
			case 'POST'://inserta
				UploadResource::upload($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
					
		}
	}
	
	public static function upload($type) {
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '4':
				if($_GET['resource2'] == "factura") {
					echo "eeeeeeehh";
					UploadResource::uploadFactura($objArr);
				}
				else if($_GET['resource2'] == "imagen") {
					UploadResource::uploadImagen($objArr);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function uploadFactura($objArr) {
		
		echo $objArr["data"];
		
		$pdf_decoded = base64_decode ($objArr["data"]);
		//Write data back to pdf file
		$pdf = fopen ("../facturas/".$objArr["id"].'.pdf','w');
		fwrite ($pdf,$pdf_decoded);
		//close output file
		fclose ($pdf);
		echo 'Done';
	}
	
	public static function uploadImagen($objArr) {
		print_r($_FILES);
		print_r($objArr);
	}
}
?>