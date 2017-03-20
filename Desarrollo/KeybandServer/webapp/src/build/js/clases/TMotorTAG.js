define(function (require) {
    "use strict";

    var TNodo = require('clases/TNodo');
    var TTransform = require('clases/TTransform');
    var TCamara = require('clases/TCamara');
    var TLuz = require('clases/TLuz');
    var TMalla = require('clases/TMalla');
    var TGestorRecursos = require('clases/TGestorRecursos');

    //var TGestor = require('clases/TGestor');

    function TMotorTAG(nEscena0) { //constructor de la clase
        if (!(this instanceof TMotorTAG)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
        this.nEscena = new TNodo(null, null, null);
        this.nEscena = nEscena0;
    }

   TMotorTAG.prototype = { 
        
        constructor: TMotorTAG, 

        crearNodo: function(entidad, hijo, padres) {
            var nodo = new TNodo(entidad, hijo, padres)
            return nodo;
        },
        getEscena: function(){
            return this.nEscena;
        },
        crearLuz: function(luz, matriz) {
            var luz = new TLuz(luz, matriz);
            return luz;
        },

        crearTransform: function(matriz) {
            var transform = new TTransform(matriz);
        	return transform;
        },

        crearMalla: function(malla) {
            //AQUI TENEMOS QUE PEDIRLE AL GESTOR EL ARCHIVO RECIBIDO
            var malla = new TMalla(malla);
            //LO OBTENEMOS Y LUEGO YA SE DEVUELVE
            return malla;
        },

        crearCamara: function(arg1, arg2, arg3) {
            var camara = new TCamara(arg1,arg2, arg3);
            return camara;
        },
        crearGestorrecursos: function(){
            var gestorRecursos = new TGestorRecursos();
            gestorRecursos.getRecurso('cube2.3ds');
            gestorRecursos.getRecurso('cono.3ds');
            return gestorRecursos;
        },
        setEscena: function(scena){
            this.nEscena =scena;
        },
        initProgram: function(nEscena){
            var fragmentShader          = utils.getShader(gl, "shader-fs");
            var vertexShader            = utils.getShader(gl, "shader-vs");

            prg = gl.createProgram();
            gl.attachShader(prg, vertexShader);
            gl.attachShader(prg, fragmentShader);
            gl.linkProgram(prg);

            if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
                alert("Could not initialise shaders");
            }

            gl.useProgram(prg);

            prg.aVertexPosition  = gl.getAttribLocation(prg, "aVertexPosition");
            prg.aVertexNormal    = gl.getAttribLocation(prg, "aVertexNormal");


            prg.uPMatrix         = gl.getUniformLocation(prg, "uPMatrix");
            prg.uMVMatrix        = gl.getUniformLocation(prg, "uMVMatrix");
            prg.uNMatrix         = gl.getUniformLocation(prg, "uNMatrix");

            prg.uAmbientLocation = gl.getUniformLocation(prg, "uAmbient");
            
            prg.uShininess          = gl.getUniformLocation(prg, "uShininess");
            
             prg.u_PosLuz     = gl.getUniformLocation(prg, "u_PosLuz");
            prg.uColorLocation  = gl.getUniformLocation(prg, "u_Color");

            /*SITIO NUEVO de estas tres lineas de abajo*/
            gl.enableVertexAttribArray(prg.aVertexPosition);
            gl.enableVertexAttribArray(prg.aVertexTexCoord);
            gl.enableVertexAttribArray(prg.aVertexNormal);

            // Apilamos en la pila la matriz identidad
            pila.push(matriz);

        },
        
        renderLoop: function() {
            gl.clearColor(0.3,0.3,0.3, 1.0);
            gl.clearDepth(100.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.viewport(0, 0, c_width, c_height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
            mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix);
            let position = this.getmatCamara();
            var MatCam = this.getmatCamara();
            MatView = mat4.inverse(MatCam);
            
            //mat4.identity(mvMatrix);        //mvMatrix se traslada con la camara
           // mat4.translate(mvMatrix, [position[3], position[7], position[11]]); //Sets the camera to a reasonable distance to view the part
           // mat4.multiply(mvMatrix,position);
           let posLigth = this.getMatLuz();
           gl.uniform3fv(prg.u_PosLuz,  [posLigth[3], posLigth[7], posLigth[11]]);
            //gl.uniform3fv(prg.u_PosLuz,  [10, 0, 5]);
            gl.uniformMatrix4fv(prg.uMVMatrix, false, mvMatrix);
            gl.uniformMatrix4fv(prg.uPMatrix, false, pMatrix);

            mat4.set(mvMatrix, nMatrix);
            mat4.inverse(nMatrix);
            mat4.transpose(nMatrix);
            
            gl.uniformMatrix4fv(prg.uNMatrix, false, nMatrix);
    
   
           this.nEscena.draw();
            requestAnimFrame(this.renderLoop.bind(this));
            
        },
        initBuffers: function(){
            
             /*var vertices =[1.5, 0, 0, 
                -1.5, 1, 0, 
                -1.5, 0.809017,	0.587785,
                -1.5, 0.309017,	0.951057, 
                -1.5, -0.309017, 0.951057, 
                -1.5, -0.809017, 0.587785,
                -1.5, -1, 0, 
                -1.5, -0.809017, -0.587785,
                -1.5, -0.309017, -0.951057, 
                -1.5, 0.309017,	-0.951057, 
                -1.5, 0.809017,	-0.587785];

                var indices = [0, 1, 2,
                0, 2, 3,
                0, 3, 4,
                0, 4, 5,
                0, 5, 6,
                0, 6, 7,
                0, 7, 8,
                0, 8, 9,
                0, 9, 10,
                0, 10, 1];*/
            var vertices = recursos[0].vertices;
            console.log(vertices);
            var indices = recursos[0].indices;
            console.log(indices);
           var normals = utils.calculateNormals(vertices, indices);

            malla1.setBuffers(vertices, indices, normals);


        },
        getmatCamara: function(){
            var resul;
            var mul1;
            var mul2;
            var mul3;
            var pila = [];
            var nodo = nCamara; //cambiar por getCamaraActiva();
             let entidad = nodo.getEntidad();
            var position =entidad.getPosition();
              let entid = mat4.create(position);
            while(nodo.getEntidad()!=null){
                nodo = nodo.getPadre();
                let entidad = nodo.getEntidad();
                if(entidad!=null)
                    pila.push(entidad.getMatriz());
            }
            var it=0;
            pila.reverse();
            for(let r = 0; r<=pila.length-1; r++){
                 if(it==0)
                    mul1=mat4.create(pila[r]);
                if(it==1)
                     mul2=mat4.create(pila[r]);
                if(it==2)
                     mul3=mat4.create(pila[r]);
                it++;
            }
            var aux;
            if(mul2!= null)
                 aux = mat4.multiply(mul1,mul2);
            if(mul3!=null)
                aux = mat4.multiply(aux,mul3);
            resul = mat4.multiply(aux,entid);

            return resul;
                   
                
            
        },
         getMatLuz: function(){    //esto por cada luz que haya
            var resul;
            var mul1;
            var mul2;
            var mul3;
            var pila = [];
            var nodo = nLuz;
             let entidad = nodo.getEntidad();
            var position =entidad.getPosition();
              let entid = mat4.create(position);
            while(nodo.getEntidad()!=null){
                nodo = nodo.getPadre();
                let entidad = nodo.getEntidad();
                if(entidad!=null)
                    pila.push(entidad.getMatriz());
            }
            var it=0;
            pila.reverse();
            for(let r = 0; r<=pila.length-1; r++){
                 if(it==0)
                    mul1=mat4.create(pila[r]);
                if(it==1)
                     mul2=mat4.create(pila[r]);
                if(it==2)
                     mul3=mat4.create(pila[r]);
                it++;
            }
            var aux;
            if(mul2!= null)
                 aux = mat4.multiply(mul1,mul2);
            else
                aux = mul1;
            if(mul3!=null)
                aux = mat4.multiply(aux,mul3);
            resul = mat4.multiply(aux,entid);

            return resul;
                   
                
            
        },
        initLights: function(){
              gl.uniform3fv(prg.u_PosLuz,  [10, 0, 5]);
            gl.uniform4fv(prg.uAmbientLocation,[0,0,0,1.0])
            gl.uniform1f(prg.uShininess, 10.0);
            gl.uniform4fv(prg.uColorLocation,[0.2,0.7,0.3,1.0])
        }
            
    }; 
    //metodos para registro y manejo de camaras, luces y viewports

    return TMotorTAG;
   
});