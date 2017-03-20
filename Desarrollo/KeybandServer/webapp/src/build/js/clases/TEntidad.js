define(function () {
    "use strict";

    function TEntidad() { //constructor de la clase
        if (!(this instanceof TEntidad)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
    }

    TEntidad.prototype = { 
    	
    	constructor: TEntidad, 

        beginDraw: function () {
           // console.log("begin en TEntidad");
        },

        endDraw: function () {
            //console.log("end draw");
            //Desapilar matriz y ponerla como actual
            //console.log("Termino de dibujar la entidad");
        },
        draw: function() {
            console.log("TENTIDAD")
        },
    };

    return TEntidad; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});