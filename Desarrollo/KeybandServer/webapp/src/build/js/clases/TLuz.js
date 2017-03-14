define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');

    function TLuz(color, int) { //constructor de la clase
        if (!(this instanceof TLuz)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.color = color;
        this.numero = int;
    }

    TLuz.prototype = {
        constructor: TLuz,

        beginDraw: function () {
            console.log("beginDraw TLuz");
        },

        endDraw: function () {
            console.log("endraw TLuz");
        },

    };  

    return TLuz; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});