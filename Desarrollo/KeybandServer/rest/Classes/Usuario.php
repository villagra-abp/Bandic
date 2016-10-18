<?php

class Usuario {

	var $dni;
	var $nombre;
	var $apellidos;
	var $sexo;
	var $pais;
	var $localidad;
	var $provincia;
	var $rol;
	var $estancia;
	var $empleado;
	var $email;
	var $fecha_nacimiento;


	public function __construct ($dni,$nombre,$apellidos,$sexo,$pais,$localidad,$provincia,$rol,$estancia,$empleado,$email,$fecha_nacimiento)
	{

		$this->dni = $dni;
		$this->nombre = $nombre;
		$this->apellidos = $apellidos;
		$this->sexo = $sexo;
		$this->pais = $pais;
		$this->localidad = $localidad;
		$this->provincia = $provincia;
		$this->rol = $rol;
		$this->estancia = $estancia;
		$this->empleado = $empleado;
		$this->email = $email;
		$this->fecha_nacimiento = $fecha_nacimiento;

	}

	public function __toString() {
		return "<b>Usuario:</b> [" . $this->dni .", ". $this->nombre .", ". $this->apellidos .", ". $this->sexo
		. ", ". $this.pais . ", ". $this.localidad . ", ". $this.provincia
		. ", ". $this->rol . ", ". $this->estancia . "," . $this->empleado ."," . $this->email ." , ". $this->fecha_nacimiento."] <br/>";
	}

}
?>