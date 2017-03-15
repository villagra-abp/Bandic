<?php
class Share{
	public static function methodShare($method,$type){   //filtra por metodo
		$row;
		switch ($method) {
			case 'GET'://consulta
				Share::getshare($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
					
		}
	}
	public static function getshare($type){   //filtra por metodo
		switch ($type) {
			case '9':   //categoria/id
				Share::sharefb($_GET['resource2'], $_GET['resource3']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function sharefb($company, $idproduct){
		$url = "http://www.".$company.".es";
		$dataArray = array();
		try {
			$string = "select imagen_redes, tweet from producto where id='".$idproduct."'";

			$conection = openConection();
			$result = @pg_query($conection, $string);
		
			if (!$result) {
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					
					$dataArray[] = $row;
				}
			}
		
				@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		echo "<html>
				<head>
					<title>Prueba de PHP</title>
					<meta http-equiv='refresh' content='10;url=".$url."'>
				</head>
				<body>
					<img src='".$row['imagen_redes']."' />
					<p>".$row['tweet']."</p>
				</body>
			</html>";
	}
	
}

?>