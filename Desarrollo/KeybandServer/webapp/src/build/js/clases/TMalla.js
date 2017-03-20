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
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.vbuffer;
        this.ibuffer;
        this.nbuffer;
    }

    TMalla.prototype = {
        constructor: TMalla,

        cargarMalla: function(malla) {
            console.log("cargo la malla: "+ malla)
        },
        setBuffers: function(v, i , n){
            this.vertices = v;
            this.indices = i;
            this.normals = n;

             this.vbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

            this.nbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.nbuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

            this.ibuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        },

        beginDraw: function () {
             try{
                /*esto está ahora en initprogram, porque creo que solo es necesario hacerlo una vez*/
                /*gl.enableVertexAttribArray(prg.aVertexPosition);
                gl.enableVertexAttribArray(prg.aVertexTexCoord);
                gl.enableVertexAttribArray(prg.aVertexNormal);*/
                
                //2. bind buffers 
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
                gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.nbuffer);
                gl.vertexAttribPointer(prg.aVertexNormal,3,gl.FLOAT, false, 0,0);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
                gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT,0);

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            }
            catch(err){
                alert(err);
                message(err.description);
            }
        },

        endDraw: function () {
            //console.log("endraw TMalla");
        },

    };  

    return TMalla; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});