var nEscena;
var malla1;
var camara;
var pila = [];
var matriz = mat4.identity();
define(function (require) {
    "use strict";
    //************************************REQUIRES************************************//

    var TNodo = require('clases/TNodo');
    var TTransform = require('clases/TTransform');
    var TCamara = require('clases/TCamara');
    var TLuz = require('clases/TLuz');
    var TMalla = require('clases/TMalla');

    //***********************************ENTIDADES******************************************//
     var transformRot = new TTransform( new Float32Array([
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1 ,1,
        0, 0, 0, 1
    ]));

    var transformTra = new TTransform( new Float32Array([
        1, 0, 0, 2,
        0, 1, 0, 2,
        0, 0, 1 ,2,
        0, 0, 0, 1
    ]));

    var transformLuz = new TTransform(new Float32Array([
        1, 0, 0, 4,
        0, 1, 0, 4,
        0, 0, 1 ,4,
        0, 0, 0, 1
    ]));

     var transformMalla = new TTransform(new Float32Array([
        1, 0, 0, 7,
        0, 1, 0, 7,
        0, 0, 1 ,7,
        0, 0, 0, 1
    ]));

    camara = new TCamara(true, 100, [0.5, 0.0, -5.5]);
    var luz1 = new TLuz("azul");
    var luz2 = new TLuz("roja");
    malla1 = new TMalla("malla1", [],[],[]);
    var malla2 = new TMalla("malla2",[],[],[]);
    
    //ESCENA
    nEscena = new TNodo(null, null, null);

    /************RAMA CAMARA***********/

    //TRANSFORMACION CAMARA ROTACION
    var nTrCamaraRot = new TNodo(transformRot, null, nEscena);
    nEscena.addHijo(nTrCamaraRot);
    //TRANSFORMACION CAMARA TRANSLACION
    var nTrCamaraTra = new TNodo(transformTra, null, nTrCamaraRot);
    nTrCamaraRot.addHijo(nTrCamaraTra);
    //CAMARA
    var nCamara = new TNodo(camara, null, nTrCamaraTra);
    nTrCamaraTra.addHijo(nCamara);

    /************RAMA LUCES***********/

    //TRANSFORMACIÓN LUZ
    var nTrLuz = new TNodo(transformLuz, null, nEscena);
    nEscena.addHijo(nTrLuz);
    //LUZ 1
    var nLuz1 = new TNodo(luz1, null, nTrLuz);
    nTrLuz.addHijo(nLuz1);
    //LUZ 2 
    var nLuz2 = new TNodo(luz2, null, nTrLuz);
    nTrLuz.addHijo(nLuz2);
    
    /************RAMA MALLAS***********/

    var nTrMalla = new TNodo(transformMalla, null, nEscena);
    nEscena.addHijo(nTrMalla);
    //MALLA 1
    var nMalla1 = new TNodo(malla1, null, nTrMalla);
    nTrMalla.addHijo(nMalla1);
    //MALLA 2 
    var nMalla2 = new TNodo(malla2, null, nTrMalla);
    nTrMalla.addHijo(nMalla2);
    console.log(nEscena);


});
var gl = null; // WebGL context
var prg = null; // The program (shaders)
var c_width = 0; // Variable to store the width of the canvas
var c_height = 0; // Variable to store the height of the canvas

var mvMatrix = mat4.create(); // The Model-View matrix
var pMatrix = mat4.create(); // The projection matrix
/*-----------------------------------------------------*/
var nMatrix =  mat4.create();       // The normal matrix
/*-----------------------------------------------------*/
var sphereVerticesBuffer;
var sphereIndicesBuffer;
/*-----------------------------------------------------*/
var sphereNormalsBuffer;               //VBO for Normals
/*-----------------------------------------------------*/
var vertices;
var indices;
/*-----------------------------------------------------*/
var normals;              //JavaScript Array for Normals
/*-----------------------------------------------------*/
/**
* The program contains a series of instructions that tell the Graphic Processing Unit (GPU)
* what to do with every vertex and fragment that we pass it. 
* The vertex shader and the fragment shader together are called the program.
*/
function setmalla(entidad, vertices, indices, normales){

}
var cargar="build/models/cube2.3ds";  //CAMBIAR ESTE NOMBRE PARA LEER OTROS OBJETOS
function loaded(data){
            console.log(cargar);
            if(cargar.split(".")[1]=="obj"){
                var m = K3D.parse.fromOBJ(data);    // CAMBIAR según formato !
                console.log(m);
              // setmalla(nEscena.getHijo(2).getHijo())
                    malla1.vertices=m.c_verts;
                    
                    malla1.indices=m.i_verts;
                    malla1.normales = utils.calculateNormals(malla1.vertices, malla1.indices);
            }else if(cargar.split(".")[1]=="3ds"){
                var m = K3D.parse.from3DS(data);    // CAMBIAR según formato !
                console.log(m);
                //console.log(m.edit.objects[0].mesh);
                
                for(var x=0;x<m.edit.objects.length;x++){
                    malla1.vertices=m.edit.objects[x].mesh.vertices;
                   
                    malla1.indices=m.edit.objects[x].mesh.indices;
                   
                   malla1.normales = utils.calculateNormals(malla1.vertices, malla1.indices);
                }
            }
         gl = utils.getGLContext("canvas-element-id");
    //Initializes the program (shaders) 
    initProgram();
    //Initializes the buffers that we are going to use
    initBuffers();
    //Initializes lights
    initLights();
    //Renders the scene!
    renderLoop();
}
function initProgram() {
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
    
    prg.uLightDirection     = gl.getUniformLocation(prg, "uLightDirection");
    prg.uColorLocation  = gl.getUniformLocation(prg, "u_Color");


      pila.push(matriz);
    nEscena.draw();

}


function initLights(){
    gl.uniform3fv(prg.uLightDirection,  [-0.25, -0.25, -0.25]);
    gl.uniform4fv(prg.uAmbientLocation,[0.1,0.1,0.1,1.0])
    gl.uniform1f(prg.uShininess, 10.0);
    gl.uniform4fv(prg.uColorLocation,[0.2,0.7,0.3,1.0])
}

/**
* This function generates SPHERE data and creates the buffers
*/
function initBuffers()
{
	

    sphereVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVerticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(malla1.vertices), gl.STATIC_DRAW);

    sphereNormalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereNormalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(malla1.normales), gl.STATIC_DRAW);

    sphereIndicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(malla1.indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

}

/**
* Main rendering function. Called every 500ms according to WebGLStart function (see below)
*/
function drawScene() {
    gl.clearColor(0.3,0.3,0.3, 1.0);
    gl.clearDepth(100.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.viewport(0, 0, c_width, c_height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix);
    
    mat4.identity(mvMatrix);        //mvMatrix se traslada con la camara
    mat4.translate(mvMatrix, camara.position); //Sets the camera to a reasonable distance to view the part

    gl.uniformMatrix4fv(prg.uMVMatrix, false, mvMatrix);
    gl.uniformMatrix4fv(prg.uPMatrix, false, pMatrix);

    mat4.set(mvMatrix, nMatrix);
    mat4.inverse(nMatrix);
    mat4.transpose(nMatrix);
    
    gl.uniformMatrix4fv(prg.uNMatrix, false, nMatrix);
    
    try{
        gl.enableVertexAttribArray(prg.aVertexPosition);
        gl.enableVertexAttribArray(prg.aVertexTexCoord);
        gl.enableVertexAttribArray(prg.aVertexNormal);
        
        //2. bind buffers 
        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVerticesBuffer);
        gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, sphereNormalsBuffer);
        gl.vertexAttribPointer(prg.aVertexNormal,3,gl.FLOAT, false, 0,0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,sphereIndicesBuffer);
        gl.drawElements(gl.TRIANGLES, malla1.indices.length, gl.UNSIGNED_SHORT,0);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    }
    catch(err){
        alert(err);
        message(err.description);
    }
}
/**
* Render Loop
*/
function renderLoop() {
    requestAnimFrame(renderLoop);
    drawScene();
}
/**
* Entry point. This function is invoked when the page is loaded
*/
function runWebGLApp() {
    console.log("HIJOSSSSSSss");
    console.log(nEscena.getHijo(1));
     K3D.load(cargar, loaded);
     console.log("entro");
}