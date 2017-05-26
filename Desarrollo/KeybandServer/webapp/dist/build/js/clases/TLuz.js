define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');

    function TLuz(color, matriz) { //constructor de la clase
        if (!(this instanceof TLuz)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.color = color;
        this.position = matriz;
        this.encendida= true;
    }

    TLuz.prototype = {
        constructor: TLuz,
        getPosition: function(){
            return this.position;
        },
        getEncendida: function(){
            return this.encendida;
        },
        Apagar: function(){
            this.encendida=true;
        },
        Encender: function(){
            this.encendida=false;
        },
        beginDraw: function () {
            //console.log("beginDraw TLuz");
        },

        endDraw: function () {
           // console.log("endraw TLuz");
        },

    };  

    return TLuz; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});