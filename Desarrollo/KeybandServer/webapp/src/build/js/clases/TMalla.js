define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');

    function TMalla(malla, int) { //constructor de la clase
        if (!(this instanceof TMalla)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.malla = malla;
        this.numero = int;
    }

    TMalla.prototype = {
        constructor: TMalla,

        cargarMalla: function(malla) {
            console.log("cargo la malla: "+ malla)
        },

        beginDraw: function () {
            console.log("beginDraw TMalla");
        },

        endDraw: function () {
            console.log("endraw TMalla");
        },

    };  

    return TMalla; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});