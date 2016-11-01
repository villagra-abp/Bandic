<?php
class Rol{
	var $id;
	var $empleado;
	
	public function __construct ($id, $empleado)
	{
	
		$this->id = $id;
		$this->empleado = $empleado;
	
	}
	
	public function __toString() {
		return "<b>Rol:</b> [" . $this->id .", ". $this->empleado ."] <br/>";
	}
}
?>