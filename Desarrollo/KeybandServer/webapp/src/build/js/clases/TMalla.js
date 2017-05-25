define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');

    function TMalla(nombre, id, sala, int, booltext, rutaText) { //constructor de la clase
        if (!(this instanceof TMalla)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.shadertype=int;    //para usar un shader u otro
        this.nombre = nombre;
        this.id = id;
        this.sala = sala;
        this.rutaText = rutaText;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.text = [];

        this.vbuffer;
        this.ibuffer;
        this.nbuffer;
        this.tbuffer;
        
        this.maxX;
        this.maxY;
        this.maxZ;
        this.center = [];
        this.radio;

        this.textura = null;
        this.texture_coords= booltext; //para saber si tiene textura o no
    }

    TMalla.prototype = {
        constructor: TMalla,

        cargarMalla: function(malla) {
            console.log("cargo la malla: "+ malla)
        },
        setBuffers: function(){
           
            this.vertices = gestorRecursos.getRecursoById(this.id).vertices;
            this.indices = gestorRecursos.getRecursoById(this.id).indices;
            this.normals = gestorRecursos.getRecursoById(this.id).normales;
            this.text = gestorRecursos.getRecursoById(this.id).textura;
            
             this.vbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

            this.nbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.nbuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);


            var textureBufferObject;
                this.tbuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.text), gl.STATIC_DRAW);
          


            this.ibuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            if(this.rutaText!=null)
                this.setTexture();
            
            this.setBounding();
        },
        setTexture: function(){
              	//Init texture
                  var texaux = gl.createTexture();
                  gestorRecursos.SetTextura(this.id,texaux);
            //texturamain = gl.createTexture();
            var image = new Image();
            image.src = 'build/models/Texturas/'+this.rutaText;
            image.indice = this.id;
            gl.bindTexture(gl.TEXTURE_2D, gestorRecursos.GetTextura(this.id));
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([255, 0, 0, 255])); // red
            image.onload = function(){
                gl.bindTexture(gl.TEXTURE_2D, gestorRecursos.GetTextura(image.indice));
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            }
            
            //this.texture_coords = true;
        },
        setBounding: function(){
            var xmax = -100;
            var xmin = 100;
            for(var i=0;i<=this.vertices.length-3;i +=3){
                if(this.vertices[i]> xmax){
                     xmax = this.vertices[i];
                }else if(this.vertices[i]< xmin)
                    xmin = this.vertices[i];
            }
            var ymax = -100;
            var ymin = 100;
            for(var j=1;j<=this.vertices.length-3;j +=3){
                if(this.vertices[j]> ymax){
                     ymax = this.vertices[j];
                }else if(this.vertices[j]< ymin)
                    ymin = this.vertices[j];
            }
            var zmax = -100;
            var zmin = 100;
            for(var k=2;k<=this.vertices.length-3;k +=3){
                if(this.vertices[k]> zmax){
                     zmax = this.vertices[k];
                }else if(this.vertices[k]< zmin)
                    zmin = this.vertices[k];
            }
            if(xmax>=xmin*(-1.0)){
                this.maxX=xmax;
            }else{
                this.maxX = xmin;
            }
            if(ymax>=ymin*(-1.0)){
                this.maxY=ymax;
            }else{
                this.maxY = ymin;
            }
            if(zmax>=zmin*(-1.0)){
                this.maxZ=zmax;
            }else{
                this.maxZ = zmin;
            }

            this.center[0] = (xmin + xmax)/2;
            this.center[1] = (ymin + ymax)/2;
            this.center[2] = (zmin + zmax)/2;

            this.radio = Math.sqrt( (this.center[0] - this.maxX)*(this.center[0] - this.maxX) +  (this.center[1] - this.maxY)*(this.center[1] - this.maxY) +  (this.center[2] - this.maxZ)*(this.center[2] - this.maxZ));
        },
        beginDraw: function () {
            var matModel = mat4.create(pila[pila.length-1]);
               var mat1aux = mat4.create(pila[pila.length-1]);
            var mat2aux = mat4.create(MatView);
            var mvMatrix = mat4.multiply(mat2aux,mat1aux);
            var mvMatrixAux = mat4.create(mvMatrix);
            var pMatrixAux = mat4.create(pMatrix);
            var mvp = mat4.multiply(pMatrixAux, mvMatrixAux);
            motor.setfrustum(mvp);
            var visible = motor.esVisible(this.center,this.radio);
            if(visible==false){
                //console.log(this.nombre + "INVISIBLE");
            }
            else{
                if(this.shadertype==0){
                    try{
                        if(this.sala!=0){
                            gl.uniform1f(prg[0].pintable, 1.0);
                        }else{
                             gl.uniform1f(prg[0].pintable, 0.0);
                        }
                        gl.uniformMatrix4fv(prg[0].uMMatrix, false, matModel);
                        gl.uniform4fv(prg[0].uColorLocation,[1,1,1,1.0])    //esto pinta el objeto con textura tal y como es
                        gl.uniformMatrix4fv(prg[0].uMVMatrix, false, mvMatrix);

                        var normalMatrix = mat4.transpose(mat4.inverse(mvMatrix));
                        gl.uniformMatrix4fv(prg[0].uNMatrix, false, normalMatrix);
                        /*esto está ahora en initprogram, porque creo que solo es necesario hacerlo una vez*/
                        /*gl.enableVertexAttribArray(prg.aVertexPosition);
                        gl.enableVertexAttribArray(prg.aVertexTexCoord);
                        gl.enableVertexAttribArray(prg.aVertexNormal);*/
                        
                        if(motor.isMapActivated()){
                           let a = motor.getPorcentaje(this.sala);
                           //console.log(a);
                           gl.uniform1f(prg[0].colorMapa, a);
                           // console.log("DrawMalla"+ a );
                        }
                        //2. bind buffers 
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
                        gl.vertexAttribPointer(prg[0].aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                        if (this.texture_coords){
                            //gl.enableVertexAttribArray(prg[0].aVertexTexCoord);
                            gl.uniform1f(prg[0].hasTexture, 1.0);
                            //gl.enableVertexAttribArray(prg[0].aVertexTextureCoords);
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
                            gl.vertexAttribPointer(prg[0].aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);

                            gl.activeTexture(gl.TEXTURE0); //gl.TEXTURE0+this.id con muchos objetos?
                            gl.bindTexture(gl.TEXTURE_2D, gestorRecursos.GetTextura(this.id));
                            gl.uniform1i(prg[0].uSampler, 0);

                             /* FERNANDO */
                        
                        gl.uniform1i (prg[0].TipoSala, this.sala);   
                        gl.uniform1f(prg[0].uTime, (Date.now() - startTime)/1000.0);
                        gl.uniform2f(prg[0].resolution, c_width, c_height);

                        }else{
                            gl.uniform1f(prg[0].hasTexture, 0.0);
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
                            gl.vertexAttribPointer(prg[0].aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
                        //gl.disableVertexAttribArray(prg[0].aVertexTexCoord);
                        }

                        gl.bindBuffer(gl.ARRAY_BUFFER, this.nbuffer);
                        gl.vertexAttribPointer(prg[0].aVertexNormal,3,gl.FLOAT, false, 0,0);

                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
                        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT,0);

                        gl.bindBuffer(gl.ARRAY_BUFFER, null);
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

                    }
                    catch(err){
                        alert(err);
                        message(err.description);
                    }
                }
                else if(this.shadertype==1){    //render agua
                    gl.useProgram(prg[1]);
                    mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix);
                    gl.uniformMatrix4fv(prg[1].pMatrixUniform, false, pMatrix);
                    gl.uniform4fv(prg[1].uColorLocation,[0.27,0.43,0.86,1.0])
                    try{
                
                        gl.uniformMatrix4fv(prg[1].mvMatrixUniform, false, mvMatrix);


                        //2. bind buffers 
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
                        gl.vertexAttribPointer(prg[1].aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                    
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
                        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT,0);

                        gl.bindBuffer(gl.ARRAY_BUFFER, null);
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

                    }
                    catch(err){
                        alert(err);
                        message(err.description);
                    }
                    gl.useProgram(prg[0]);
                }
            }
            
        },

        endDraw: function () {
            //console.log("endraw TMalla");
        },

    };  

    return TMalla; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});