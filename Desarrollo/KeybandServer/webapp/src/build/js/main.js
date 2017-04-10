var nEscena;
var motor;
/*var malla1;
var malla2;*/
var pila = [];
//var recursos = [];
var gestorRecursos;
var MatView;
var interactor;

define(function (require) {
   "use strict";
    //************************************REQUIRES************************************//
    var TMotorTAG = require('clases/TMotorTAG');
    var CamaraInteractor = require('clases/CamaraInteractor');

    //***********************************ENTIDADES******************************************//
    /*
    Meter en primer lugar las cámaras, luego las luces y finalmente las mallas
    */
    motor = new TMotorTAG(nEscena);
    gestorRecursos = motor.crearGestorrecursos();
    /*Rotación cámara*/
    let mat1 = mat4.identity();
    var transformRot = motor.crearTransform(mat1);
    

    /*Translación cámara*/
    let mat2 = mat4.identity();
    mat4.translate(mat2, [0.0,0.0,9.0]);
    var transformTra = motor.crearTransform(mat2);
    
    /*Translación Luz*/
    let mat3 = mat4.identity();
    mat4.translate(mat3,[5.0,0.0,4.0])
    var transformLuz = motor.crearTransform(mat3);

    /*Rotación malla*/ 
    let mat5 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
     mat4.rotate(mat5,(-3.1416/2),[0,1,0]);
     //mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMallaRot = motor.crearTransform(mat5);

    /*Translación malla*/ 
    let mat6 = mat4.identity();
    mat4.translate(mat6, [0.0,-2.0,0.0]);
    var transformMalla = motor.crearTransform(mat6);

     /*Rotación malla2*/ 
    let mat10 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
     mat4.rotate(mat10,(3.1416/2),[1,0,0]);
    // mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMalla2Rot = motor.crearTransform(mat10);

    /*Translación malla2*/ 
    let mat11 = mat4.identity();
    mat4.translate(mat11, [0.0,0.0,-100.0]);
    var transformMalla2 = motor.crearTransform(mat11);

    /*Rotación malla3*/ 
    let mat15 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
    mat4.rotate(mat15,(3.1416/2),[1,0,0]);
    // mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMalla3Rot = motor.crearTransform(mat15);

    /*Translación malla3*/ 
    let mat16 = mat4.identity();
    mat4.translate(mat16, [0.0,0.0,2.0]);
    var transformMalla3 = motor.crearTransform(mat16);

    var camara = motor.crearCamara(true, 100, new Float32Array([    //Activa, posicion. Activa solo puede haber una
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
    //var luz2 = motor.crearLuz("roja");
    var malla1 = motor.crearMalla("edificio1.3ds",0,0, true,'text_edificio1.jpg');   //nombre, id, shadertype, hasTexture, el id está asociado al recurso
    var malla2 = motor.crearMalla("esfera.obj",1,0, false, 'esferatex.jpg');
    var malla3 = motor.crearMalla("cesped-bruno.3ds",2,0, true, 'cesped-buno.png');

    nEscena = motor.crearNodo(null,null,null);
    


    /************RAMA CAMARA***********/

    //TRANSFORMACION CAMARA ROTACION
    var nTrCamaraRot = motor.crearNodo(transformRot, null, nEscena);
    nEscena.addHijo(nTrCamaraRot);
    //TRANSFORMACION CAMARA TRANSLACION
    var nTrCamaraTra = motor.crearNodo(transformTra, null, nTrCamaraRot);
    nTrCamaraRot.addHijo(nTrCamaraTra);
    //CAMARA
    var nCamara = motor.crearNodo(camara, null, nTrCamaraTra);
    nTrCamaraTra.addHijo(nCamara);
     /******************CAMARA INTERACTOR**********************+ */
    var canvas = document.getElementById("canvas-element-id");
    interactor = new CamaraInteractor(canvas, transformTra, transformRot);
    /************RAMA LUCES***********/

    //TRANSFORMACIÓN LUZ
    var nTrLuz = motor.crearNodo(transformLuz, null, nEscena);
    nEscena.addHijo(nTrLuz);
    //LUZ 1
    var nLuz = motor.crearNodo(luz1, null, nTrLuz);
    nTrLuz.addHijo(nLuz);
    //LUZ 2 
    //var nLuz2 = motor.crearNodo(luz2, null, nTrLuz);
   // nTrLuz.addHijo(nLuz2);
    
    /************RAMA MALLAS***********/
    //MALLA 1
    var nTrMallaRot = motor.crearNodo(transformMallaRot, null, nEscena);
    nEscena.addHijo(nTrMallaRot);
    var nTrMalla = motor.crearNodo(transformMalla, null, nTrMallaRot);
    nTrMallaRot.addHijo(nTrMalla);
    
    var nMalla1 = motor.crearNodo(malla1, null, nTrMalla);
    nTrMalla.addHijo(nMalla1);
    //MALLA 2 
    var nTrMallaRot2 = motor.crearNodo(transformMalla2Rot, null, nEscena);
    nEscena.addHijo(nTrMallaRot2);
    var nTrMalla2 = motor.crearNodo(transformMalla2, null, nTrMallaRot2);
    nTrMallaRot2.addHijo(nTrMalla2);
    var nMalla2 = motor.crearNodo(malla2, null, nTrMalla2);
    nTrMalla2.addHijo(nMalla2);


     //MALLA 3 
    var nTrMallaRot3 = motor.crearNodo(transformMalla3Rot, null, nEscena);
    nEscena.addHijo(nTrMallaRot3);
    var nTrMalla3 = motor.crearNodo(transformMalla3, null, nTrMallaRot3);
    nTrMallaRot3.addHijo(nTrMalla3);
    var nMalla3 = motor.crearNodo(malla3, null, nTrMalla3);
    nTrMalla3.addHijo(nMalla3);
    motor.setEscena(nEscena);
    console.log("nodo raíz:");
    console.log(nEscena);

});

//HASTA AQUI TODO ADAPTADO PARA LA FACHADA -------
//------------------------------------------------

    var gl = null; // WebGL context
    var prg = []; // The program (shaders)
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