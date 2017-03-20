define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');

    function TTransform(matriz) { //constructor de la clase
        if (!(this instanceof TTransform)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.matriz = matriz;
        this. multi = mat4.create();
       
    }

    TTransform.prototype = {
        constructor: TTransform,

        identidad: function () {
            console.log("Dibujo la entidad");
        },
        getMatriz: function(){
            return this.matriz;
        },
        cargar: function (matriz) {
            console.log("Cargo la matriz "+matriz);
        },

        trasponer: function() {
            console.log("Transponer la matriz "+this.matriz);
        },

        transladar: function(x,y,z) {
            console.log("Transladar la matriz "+this.matriz);
        },

        rotar: function(x,y,z,w) {
            console.log("Rotar la matriz "+this.matriz);
        },

        beginDraw: function () {
           // console.log("beginDraw Ttransfrom")
            //pila= [];
            //var asd2 = new Float32Array();
            //var asd2 = [];
            var mat1aux = mat4.create(pila[pila.length-1]);
            var mat2aux = mat4.create(this.matriz);

            this.multi=  mat4.multiply( mat1aux, mat2aux);
            //console.log(mat4.multiply(pila[pila.length -1], this.matriz));
            
            pila.push(this.multi);
            
        },

        endDraw: function () {
            pila.pop();
            //console.log(pila[pila.length-1][3]);
        }
    };  

    return TTransform; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});