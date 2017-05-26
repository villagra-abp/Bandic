define(function (require) {
    "use strict";

    var TNodo = require('clases/TNodo');
    var TTransform = require('clases/TTransform');
    var TCamara = require('clases/TCamara');
    var TLuz = require('clases/TLuz');
    var TMalla = require('clases/TMalla');
    var TGestorRecursos = require('clases/TGestorRecursos');
    var CamaraInteractor = require('clases/CamaraInteractor');
    var Frustum = require('clases/Frustum');

    //var TGestor = require('clases/TGestor');

    function TMotorTAG(nEscena0) { //constructor de la clase
        if (!(this instanceof TMotorTAG)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
        this.nEscena = new TNodo(null, null, null);
        this.nEscena = nEscena0;
        this.numberOfLights =0;
        this.numberOfCameras= 0;
        this.numberOfMallas = 0;
        this.frustum = new Frustum();
        this.porcentajes = [];
        this.mapa_activado = false;
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
            this.numberOfLights++;
            return luz;
        },

        crearTransform: function(matriz) {
            var transform = new TTransform(matriz);
        	return transform;
        },

        crearMalla: function(nombre,id, sala, int, booltext, rutaText) {
            //AQUI TENEMOS QUE PEDIRLE AL GESTOR EL ARCHIVO RECIBIDO
            var malla = new TMalla(nombre,id, sala, int, booltext, rutaText);
            gestorRecursos.getRecurso(nombre);
            //LO OBTENEMOS Y LUEGO YA SE DEVUELVE
            return malla;
        },
        crearMalla2: function(nombre, place, shadertype, hasTexture,textName, rot, tra){
            /*Rotación malla*/ 
            var mat5 = mat4.identity();
            //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
            if(rot!=0)
                mat4.rotate(mat5,rot,[0,1,0]);
            //mat4.rotate(mat5,(3.1416/4),[0,0,1]);
            var transformMallaRot = motor.crearTransform(mat5);

            /*Translación malla*/ 
            var mat6 = mat4.identity();
            mat4.translate(mat6, tra);
            var transformMalla = motor.crearTransform(mat6);


            var malla1 = motor.crearMalla(nombre, this.numberOfMallas, place, shadertype, hasTexture,textName);   //nombre, id, shadertype, hasTexture, el id está asociado al recurso
            this.numberOfMallas++;
            var nTrMallaRot = motor.crearNodo(transformMallaRot, null, nEscena);
            nEscena.addHijo(nTrMallaRot);
            var nTrMalla = motor.crearNodo(transformMalla, null, nTrMallaRot);
            nTrMallaRot.addHijo(nTrMalla);

            var nMalla1 = motor.crearNodo(malla1, null, nTrMalla);
            nTrMalla.addHijo(nMalla1);
        },
        crearCamara: function(arg1, arg2, arg3) {
            var camara = new TCamara(arg1,arg2, arg3);
            this.numberOfCameras ++;
            return camara;
        },
        crearGestorrecursos: function(){
            var gestorRecursos = new TGestorRecursos();
           // gestorRecursos.getRecurso('edificio1.3ds');
           // gestorRecursos.getRecurso('esfera.3ds');
            return gestorRecursos;
        },
        setEscena: function(scena){
            this.nEscena =scena;
        },
        getLights: function() {
            return this.numberOfLights;
        },
        setLights: function(int) {
           this.numberOfLights = int;
        },
        getCameras: function() {
            return this.numberOfCameras;
        },
        setCameras: function(int) {
           this.numberOfCameras = int;
        },
        setfrustum: function(mvp){
            this.frustum.setplanos(mvp);
        },
        esVisible: function(centro, radio){//centro[] float radio
            return this.frustum.esVisible(centro, radio);
        },
        initProgram: function(nEscena){
            /******************CAMARA INTERACTOR**********************+ */
            var canvas = document.getElementById("canvas-element-id");
            interactor = new CamaraInteractor(canvas, transformTra, transformRot);
            var fragmentShader          = utils.getShader(gl, "shader-fs");
            var vertexShader            = utils.getShader(gl, "shader-vs");

            prg[0] = gl.createProgram();
            gl.attachShader(prg[0], vertexShader);
            gl.attachShader(prg[0], fragmentShader);
            gl.linkProgram(prg[0]);

            if (!gl.getProgramParameter(prg[0], gl.LINK_STATUS)) {
                alert("Could not initialise shaders");
            }

            gl.useProgram(prg[0]);

            prg[0].aVertexPosition  = gl.getAttribLocation(prg[0], "aVertexPosition");
            prg[0].aVertexNormal    = gl.getAttribLocation(prg[0], "aVertexNormal");
            prg[0].aVertexTextureCoords= gl.getAttribLocation(prg[0], "aVertexTextureCoords");

            prg[0].uMMatrix         = gl.getUniformLocation(prg[0], "uMMatrix");
            prg[0].uPMatrix         = gl.getUniformLocation(prg[0], "uPMatrix");
            prg[0].uMVMatrix        = gl.getUniformLocation(prg[0], "uMVMatrix");
            prg[0].uNMatrix         = gl.getUniformLocation(prg[0], "uNMatrix");

            prg[0].uAmbientLocation = gl.getUniformLocation(prg[0], "uAmbient");
            
            prg[0].uShininess          = gl.getUniformLocation(prg[0], "uShininess");

            prg[0].hasTexture          = gl.getUniformLocation(prg[0], "hasTexture");

            prg[0].mapa_activado          = gl.getUniformLocation(prg[0], "mapa_activado");
            prg[0].colorMapa          = gl.getUniformLocation(prg[0], "colorMapa");
            prg[0].pintable          = gl.getUniformLocation(prg[0], "pintable");

            prg[0].SunPosition     = gl.getUniformLocation(prg[0], "SunPosition");
             prg[0].u_PosLuz     = gl.getUniformLocation(prg[0], "u_PosLuz");
             prg[0].viewPos     = gl.getUniformLocation(prg[0], "viewPos");
            prg[0].uColorLocation  = gl.getUniformLocation(prg[0], "u_Color");

            prg[0].uSampler          = gl.getUniformLocation(prg[0], "uSampler");

              /* FERNANDO */
            prg[0].TipoSala         = gl.getUniformLocation(prg[0], "TipoSala");
            //TIEMPO
            prg[0].uTime        = gl.getUniformLocation(prg[0], "uTime");
            //RESOLUCION
            prg[0].resolution = gl.getUniformLocation(prg[0], "resolution");

            gl.uniform1f(prg[0].hasTexture, 0.0);
            gl.uniform1f(prg[0].mapa_activado, 0.0);
            gl.uniform1f(prg[0].pintable, 0.0);
            /*SITIO NUEVO de estas tres lineas de abajo*/
            gl.enableVertexAttribArray(prg[0].aVertexPosition);
            gl.enableVertexAttribArray(prg[0].aVertexTexCoord);
            gl.enableVertexAttribArray(prg[0].aVertexNormal);

            gl.enableVertexAttribArray(prg[0].aVertexTextureCoords);
            

            /***********************SHADER 2********************** */
             var fgShader = utils.getShader(gl, 'shader-fs2');
            var vxShader = utils.getShader(gl, 'shader-vs2');

            prg[1] = gl.createProgram();
            gl.attachShader(prg[1], vxShader);
            gl.attachShader(prg[1], fgShader);
            gl.linkProgram(prg[1]);

            if (!gl.getProgramParameter(prg[1], gl.LINK_STATUS)) {
                alert('Could not initialise shaders');
            }

            //gl.useProgram(prg[1]);

            prg[1].vertexPositionAttribute = gl.getAttribLocation(prg[1], 'aVertexPosition'); //le asigno a aVertexPosition el valor de vertexPositionAttribute
            prg[1].pMatrixUniform          = gl.getUniformLocation(prg[1], 'uPMatrix');       //le asigno a la variable del Shader el valor de la Location
            prg[1].mvMatrixUniform         = gl.getUniformLocation(prg[1], 'uMVMatrix');
            prg[1].uColorLocation          = gl.getUniformLocation(prg[1], 'uColor');
            gl.enableVertexAttribArray(prg[1].vertexPositionAttribute);



            // Apilamos en la pila la matriz identidad
            var iden = mat4.identity();
            pila.push(iden);

        },
        
        renderLoop: function() {
            gl.clearColor(0.968,0.968,0.968, 1.0);
            gl.clearDepth(100.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.viewport(0, 0, c_width, c_height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
            mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix);
            //let position = this.getmatCamara();
            var MatCam = this.getmatCamara();
            gl.uniform3fv(prg[0].viewPos,  [MatCam[12], MatCam[13], MatCam[14]]);
            // gl.uniform3fv(prg[0].viewPos,  [posLigth[12], posLigth[13], posLigth[14]]);
            MatView = mat4.inverse(MatCam);
            
            //mat4.identity(mvMatrix);        //mvMatrix se traslada con la camara
           // mat4.translate(mvMatrix, [position[3], position[7], position[11]]); //Sets the camera to a reasonable distance to view the part
           // mat4.multiply(mvMatrix,position);
           let posSun = mat4.identity();
           mat4.translate(posSun,[0.0,50.0,0.0]);
           var matviewaux2 = mat4.create(MatView);
           var Sundef = mat4.multiply(matviewaux2,posSun);
            gl.uniform3fv(prg[0].SunPosition,  [Sundef[12], Sundef[13], Sundef[14]]);

           let posLigth = this.getMatLuz();
           var matviewaux = mat4.create(MatView);
           var posdef = mat4.multiply(matviewaux,posLigth);
           //console.log("Posición luz: "+posLigth[12]+" "+ posLigth[13]+" "+ posLigth[14])
           gl.uniform3fv(prg[0].u_PosLuz,  [posdef[12], posdef[13], posdef[14]]);
            

            gl.uniformMatrix4fv(prg[0].uMVMatrix, false, mvMatrix);

            gl.uniformMatrix4fv(prg[0].uPMatrix, false, pMatrix);

         

            mat4.set(mvMatrix, nMatrix);
            mat4.inverse(nMatrix);
            mat4.transpose(nMatrix);
            
            gl.uniformMatrix4fv(prg[0].uNMatrix, false, nMatrix);
    
   
           this.nEscena.draw();
            requestAnimFrame(this.renderLoop.bind(this));
            
        },
        initBuffers: function(){
            var start = this.numberOfCameras + this.numberOfLights;
            let n = gestorRecursos.getNumRecursos() + this.numberOfCameras + this.numberOfLights;
            for(let i = start;i<n;i++){
                var recurso = gestorRecursos.getRecursoById(i);
                 //var normals = utils.calculateNormals(recurso.vertices, recurso.indices);
                 this.nEscena.getHijo(i).getHijo(0).getHijo(0).getEntidad().setBuffers();
                 
            }
        },
        getCamaraActiva: function(){    //Devuelve la cámara activa
            var camara;
            for(let c =0;c<this.numberOfCameras;c++){
                 camara = this.nEscena.getHijo(c).getHijo(0).getHijo(0).getEntidad();
                 if(camara.isActive)
                    return this.nEscena.getHijo(c).getHijo(0).getHijo(0);
            }

           
        },
        getLight: function(int){    //devuelve el nodo si la luz está encendida
             var Luz;
             var final = this.numberOfLights+this.numberOfCameras - 1;
                var aux = this.nEscena.getHijo(int);
                 Luz = this.nEscena.getHijo(int).getHijo(0).getEntidad();
                 if(Luz.getEncendida())
                    return this.nEscena.getHijo(int).getHijo(0);
                else return null;
            
        },
        getmatCamara: function(){
            var resul;
            var mul1;
            var mul2;
            var mul3;
            var pila = [];
            var nodo =  this.getCamaraActiva();
             let entidad = nodo.getEntidad();
            var position =entidad.getPosition();
              let entid = mat4.identity();
              mat4.translate(entid,position);
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
            var nodo = this.getLight(this.numberOfCameras);
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
              //gl.uniform3fv(prg[0].u_PosLuz,  [10, 0, 5]);
           // gl.uniform4fv(prg[0].uAmbientLocation,[0,0,0,1.0])
            gl.uniform1f(prg[0].uShininess, 230.0);
            //gl.uniform4fv(prg[0].uColorLocation,[1,1,1,1.0])    //esto pinta el objeto con textura tal y como es

            
        },
        initMap: function(){
            let PiscinaActual;
            let PiscinaTotal;
            let SpaA;
            let SpaT;
            let ComA;
            let ComT;
            let GymA;
            let GymT;
            let MasA;
            let MasT;
            let boolp1 = false;
            let boolp2 = false;

            let boolp11 = false;
            let boolp21 = false;

            let boolp13 = false;
            let boolp23 = false;

            let boolp14 = false;
            let boolp24 = false;

            let boolp15 = false;
            let boolp25 = false;
            
            /*PISCINA*/ 
             var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Afoto actual piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].count)
                             PiscinaActual = a[0].count;
                             boolp1=true;
                             if(boolp2==true)
                                motor.calcularPorcentaje(1,PiscinaTotal,PiscinaActual);
                        }
                    }
                };
                xhttp.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/aforo/Piscina", true);
                xhttp.send();
            
             var xhttp2 = new XMLHttpRequest();
                xhttp2.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Capacidad  piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].capacidad)
                             PiscinaTotal = a[0].capacidad;
                             boolp2 = true;
                             if(boolp1==true)
                                motor.calcularPorcentaje(1,PiscinaTotal,PiscinaActual);
                        }
                    }
                };
                xhttp2.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/Piscina", true);
                xhttp2.send();

                /*SPA */
                 var xhttp3 = new XMLHttpRequest();
                xhttp3.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Afoto actual SPA");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].count)
                             SpaA = a[0].count;
                             boolp11=true;
                             if(boolp21==true)
                                motor.calcularPorcentaje(4,SpaT,SpaA);
                        }
                    }
                };
                xhttp3.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/aforo/Spa", true);
                xhttp3.send();
            
             var xhttp4 = new XMLHttpRequest();
                xhttp4.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Capacidad  piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].capacidad)
                             SpaT = a[0].capacidad;
                             boolp21 = true;
                             if(boolp11==true)
                                motor.calcularPorcentaje(4,SpaT,SpaA);
                        }
                    }
                };
                xhttp4.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/Spa", true);
                xhttp4.send();


                 /*COMEDOR*/ 
             var xhttp5 = new XMLHttpRequest();
                xhttp5.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Afoto actual piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].count)
                             ComA = a[0].count;
                             boolp13=true;
                             if(boolp23==true)
                                motor.calcularPorcentaje(3,ComT,ComA);
                        }
                    }
                };
                xhttp5.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/aforo/Comedor", true);
                xhttp5.send();
            
             var xhttp6 = new XMLHttpRequest();
                xhttp6.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Capacidad  piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].capacidad)
                             ComT = a[0].capacidad;
                             boolp23 = true;
                             if(boolp13==true)
                                motor.calcularPorcentaje(3,ComT,ComA);
                        }
                    }
                };
                xhttp6.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/Comedor", true);
                xhttp6.send();


                      /*GIMNASIO*/ 
             var xhttp7 = new XMLHttpRequest();
                xhttp7.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Afoto actual piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].count)
                             GymA = a[0].count;
                             boolp14=true;
                             if(boolp24==true)
                                motor.calcularPorcentaje(2,GymT,GymA);
                        }
                    }
                };
                xhttp7.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/aforo/Gimnasio", true);
                xhttp7.send();
            
             var xhttp8 = new XMLHttpRequest();
                xhttp8.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Capacidad  piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].capacidad)
                             GymT = a[0].capacidad;
                             boolp24 = true;
                             if(boolp14==true)
                                motor.calcularPorcentaje(2,GymT,GymA);
                        }
                    }
                };
                xhttp8.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/Gimnasio", true);
                xhttp8.send();


                       /*ZONA MASAJES*/ 
             var xhttp9 = new XMLHttpRequest();
                xhttp9.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Afoto actual piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].count)
                             MasA = a[0].count;
                             boolp15=true;
                             if(boolp25==true)
                                motor.calcularPorcentaje(5,MasT,MasA);
                        }
                    }
                };
                xhttp9.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/aforo/ZonaMasajes", true);
                xhttp9.send();
            
             var xhttp10 = new XMLHttpRequest();
                xhttp10.onreadystatechange = function() {
                    if(this.readyState == 4){
                        if(this.status==200){
                             console.log("Capacidad  piscina");
                             let a = JSON.parse(this.responseText);
                            console.log(a[0].capacidad)
                             MasT = a[0].capacidad;
                             boolp25 = true;
                             if(boolp15==true)
                                motor.calcularPorcentaje(5,MasT,MasA);
                        }
                    }
                };
                xhttp10.open("GET", "http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/ZonaMasajes", true);
                xhttp10.send();
        },
        isMapActivated:function(){
            return this.mapa_activado;
           
        },
        mapacalor:function(){
            if(this.mapa_activado==false){
                this.mapa_activado = true;
                gl.uniform1f(prg[0].mapa_activado, 1.0);
           
            }else{
                  this.mapa_activado = false;
                 gl.uniform1f(prg[0].mapa_activado, 0.0);
            }
            
             
        },
        calcularPorcentaje: function(estancia,capacidad, aforo){
            console.log("Calculando porcentaje");
            console.log(estancia + " "+ capacidad+ " "+ aforo);
            this.porcentajes[estancia]  = ((aforo*100)/capacidad);
            //this.porcentajes[estancia] = 80.0;
            if(estancia==1){
                 this.porcentajes[6] =((aforo*100)/capacidad);
            }
            //alert(this.porcentajes[estancia]);
        },
        getPorcentaje: function(sala){
            return this.porcentajes[sala];
        }
    }; 
    //metodos para registro y manejo de camaras, luces y viewports

    return TMotorTAG;
   
});