define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');

    function TCamara(esPerspectiva, zoom, matriz) { //constructor de la clase
        if (!(this instanceof TCamara)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.esPerspectiva = esPerspectiva;
        this.zoom = zoom;
        this.position = matriz;
        this.padre;
    }

    TCamara.prototype ={
        constructor: TCamara,
        getPosition: function(){
            return this.position;
        },
        beginDraw: function () {
            //console.log("beginDraw TCamara");           
        },
        endDraw: function () {
            //console.log("endDraw TCamara");
        },

    };  

    return TCamara; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});