<?php

class Pulsera {
	var $id;
	var $usuario;
	var $estado_pulsera;


	public function __construct ($id, $usuario, $estado_pulsera)
	{

		$this->id = $id;
		$this->usuario = $usuario;
		$this->estado_pulsera = $estado_pulsera;

	}

	public function __toString() {
		return "<b>Pulsera:</b> [" . $this->id .", ". $this->usuario .", ". $this->estado_pulsera."] <br/>";
	}

}
?>