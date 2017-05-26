define(function (require) {
    "use strict";

    var TRecurso = require('clases/TRecurso');

    function TRecursoMalla(nombre, vertices, normales, texturas, vertTriangulos, normTriangulos,
    textTriangulos, nTriangulos) { //constructor de la clase
        if (!(this instanceof TRecursoMalla)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        TRecurso.call(this); //llamamos al constructor padre
        this.nombre = nombre;
        this.vertices = vertices;
        this.normales = normales;
        this.texturas = texturas;
        this.vertTriangulos = vertTriangulos;
        this.normTriangulos = normTriangulos;
        this.textTriangulos = textTriangulos;
        this.nTriangulos = nTriangulos;
    }

    TRecursoMalla.prototype = {
        constructor: TRecursoMalla,

        cargarFichero: function (nombre) {
            console.log("cargarFichero");
        },

        draw: function () {
            console.log("draw");
        },

    };  

    return TRecursoMalla; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});