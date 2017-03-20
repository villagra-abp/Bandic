var nEscena;
var motor;
var malla1;
var camara;
var nCamara;
var nLuz;
var pila = [];
var matriz = mat4.identity();
var recursos = [];
var gestorRecursos;
var MatView;

define(function (require) {
   "use strict";
    //************************************REQUIRES************************************//
    var TMotorTAG = require('clases/TMotorTAG');

    //***********************************ENTIDADES******************************************//
    
    motor = new TMotorTAG(nEscena);
    /*Rotación cámara*/
    let mat1 = mat4.identity();
    var transformRot = motor.crearTransform(mat1);
    

    /*Translación cámara*/
    let mat2 = mat4.identity();
    mat4.translate(mat2, [0.0,0.0,9.0]);
    var transformTra = motor.crearTransform(mat2);
    
    /*Translación Luz*/
    let mat3 = mat4.identity();
    var transformLuz = motor.crearTransform(mat3);

    /*Rotación malla*/ 
    let mat5 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
     mat4.rotate(mat5,(3.1416/4),[0,1,0]);
     mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMallaRot = motor.crearTransform(mat5);

    /*Translación malla*/ 
    let mat6 = mat4.identity();
    mat4.translate(mat6, [0.0,0.0,-3.0]);
    var transformMalla = motor.crearTransform(mat6);

    camara = motor.crearCamara(true, 100, new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1 ,0,
        0, 0, 0, 1
    ]));
    var luz1 = motor.crearLuz("azul",new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1 ,0,
        0, 0, 0, 1
    ]) );
    var luz2 = motor.crearLuz("roja");
    malla1 = motor.crearMalla("hotel.obj");
    //var malla2 = motor.crearMalla("malla2");

    nEscena = motor.crearNodo(null,null,null);
    gestorRecursos = motor.crearGestorrecursos();


    /************RAMA CAMARA***********/

    //TRANSFORMACION CAMARA ROTACION
    var nTrCamaraRot = motor.crearNodo(transformRot, null, nEscena);
    nEscena.addHijo(nTrCamaraRot);
    //TRANSFORMACION CAMARA TRANSLACION
    var nTrCamaraTra = motor.crearNodo(transformTra, null, nTrCamaraRot);
    nTrCamaraRot.addHijo(nTrCamaraTra);
    //CAMARA
    nCamara = motor.crearNodo(camara, null, nTrCamaraTra);
    nTrCamaraTra.addHijo(nCamara);
    /************RAMA LUCES***********/

    //TRANSFORMACIÓN LUZ
    var nTrLuz = motor.crearNodo(transformLuz, null, nEscena);
    nEscena.addHijo(nTrLuz);
    //LUZ 1
    nLuz = motor.crearNodo(luz1, null, nTrLuz);
    nTrLuz.addHijo(nLuz);
    //LUZ 2 
    //var nLuz2 = motor.crearNodo(luz2, null, nTrLuz);
   // nTrLuz.addHijo(nLuz2);
    
    /************RAMA MALLAS***********/
    var nTrMallaRot = motor.crearNodo(transformMallaRot, null, nEscena);
    nEscena.addHijo(nTrMallaRot);
    var nTrMalla = motor.crearNodo(transformMalla, null, nTrMallaRot);
    nTrMallaRot.addHijo(nTrMalla);
    //MALLA 1
    var nMalla1 = motor.crearNodo(malla1, null, nTrMalla);
    nTrMalla.addHijo(nMalla1);
    //MALLA 2 
    /*var nMalla2 = motor.crearNodo(malla2, null, nTrMalla);
    nTrMalla.addHijo(nMalla2);*/
    motor.setEscena(nEscena);

});

//HASTA AQUI TODO ADAPTADO PARA LA FACHADA -------
//------------------------------------------------

    var gl = null; // WebGL context
    var prg = null; // The program (shaders)
    var c_width = 0; // Variable to store the width of the canvas
    var c_height = 0; // Variable to store the height of the canvas

    var mvMatrix = mat4.create(); // The Model-View matrix
    var pMatrix = mat4.create(); // The projection matrix
    /*-----------------------------------------------------*/
    var nMatrix =  mat4.create();       // The normal matrix
    /*-----------------------------------------------------*/
    var normals;

function runWebGLApp() {
    //Obtains a WebGL context
    gl = utils.getGLContext("canvas-element-id");
    //Initializes the program (shaders) 
    motor.initProgram(nEscena);
    //Initializes the buffers that we are going to use
    motor.initBuffers();
    //Initializes lights
    motor.initLights();
    //Renders the scene!
    motor.renderLoop();
}