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
            console.log("beginDraw Ttransfrom")
            //pila= [];
            //var asd2 = new Float32Array();
            //var asd2 = [];
            var matAUX = mat4.create(pila[pila.length-1]);
            var mat2AUX = mat4.create(this.matriz);

            this.multi=  mat4.multiply( matAUX, mat2AUX);
            //console.log(mat4.multiply(pila[pila.length -1], this.matriz));
            
            pila.push(this.multi);
            console.log(pila);
            console.log("y la ultima de la pila");
            console.log(pila[pila.length -1]);
           /* var aux = mat4.create();
            aux = pila[pila.length-1];
            console.log("Última matriz en pila");
            console.log(pila);
            //var mult = mat4.multiply(aux, this.matriz)
            /*var data = [16];
             data[0] = 1;
             data[1] = 0;
             data[2] = 0;
             data[3] = 5;
             data[4] = 0;
             data[5] = 1;
             data[6] = 0;
             data[7] = 3;
             data[8] = 0;
             data[9] = 0;
             data[10] = 1;
             data[11] = 2;
             data[12] = 0;
             data[13] = 0;
             data[14] = 0;
             data[15] = 1;*/
            /* var data = [
                            1,  0, 0, 5,
                            0,  1, 0, 3,
                            0,  1, 0, 2,
                            //Triangle 2
                            0,  0, 0, 1
                        ];

            var mult = mat4.multiply(aux, data);
            pila.push(mult);
            console.log("ultima matriz de la pila despues de push")
            console.log(pila[pila.length-1]);
            console.log(pila[pila.length-2]);
            //Apilar matriz actual
            // Multiplicar la matriz de la transformación a la matriz actual }
            //console.log("Dibujo la tranformacion");*/
        },

        endDraw: function () {
            console.log("endraw TTransform");
            pila.pop();
            console.log(pila);
            console.log("la ultima de la pila al quitar");
            console.log(pila[pila.length-1]);
            //matriz = pila.pop(pila[pila.length-1]);
          //  console.log("Ultima matriz en pila después de pop")
           // console.log(pila);
        },
        /*multiplyMatrices: function(matrixA, matrixB) {
            
            // Slice the second matrix up into columns
            var column0 = [matrixB[0], matrixB[4], matrixB[8], matrixB[12]];
            var column1 = [matrixB[1], matrixB[5], matrixB[9], matrixB[13]];
            var column2 = [matrixB[2], matrixB[6], matrixB[10], matrixB[14]];
            var column3 = [matrixB[3], matrixB[7], matrixB[11], matrixB[15]];
            
            // Multiply each column by the matrix
            var result0 =this.multiplyMatrixAndPoint(matrixA, column0);
            var result1 = this.multiplyMatrixAndPoint(matrixA, column1);
            var result2 = this.multiplyMatrixAndPoint(matrixA, column2);
            var result3 = this.multiplyMatrixAndPoint(matrixA, column3);
            
            // Turn the result columns back into a single matrix
            return new Float32Array([
                result0[0], result1[0], result2[0], result3[0],
                result0[1], result1[1], result2[1], result3[1],
                result0[2], result1[2], result2[2], result3[2],
                result0[3], result1[3], result2[3], result3[3]
            ]);
        },
         multiplyMatrixAndPoint:function(matrix, point) {
  
            //Give a simple variable name to each part of the matrix, a column and row number
            var c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
            var c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
            var c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
            var c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
            
            //Now set some simple names for the point
            var x = point[0];
            var y = point[1];
            var z = point[2];
            var w = point[3];
            
            //Multiply the point against each part of the 1st column, then add together
            var resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
            
            //Multiply the point against each part of the 2nd column, then add together
            var resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
            
            //Multiply the point against each part of the 3rd column, then add together
            var resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
            
            //Multiply the point against each part of the 4th column, then add together
            var resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
            
            return [resultX, resultY, resultZ, resultW];
        }*/

    };  

    return TTransform; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});