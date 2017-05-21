var nEscena;
var motor;
/*var malla1;
var malla2;*/
var pila = [];
//var recursos = [];
var gestorRecursos;
var MatView;
var interactor;
var transformRot;
var transformTra;
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
    transformRot = motor.crearTransform(mat1);
    

    /*Translación cámara*/
    let mat2 = mat4.identity();
    mat4.translate(mat2, [0.0,0.0,9.0]);
    transformTra = motor.crearTransform(mat2);
    
    /*Translación Luz*/
    let mat3 = mat4.identity();
    mat4.translate(mat3,[5.0,0.0,4.0])
    var transformLuz = motor.crearTransform(mat3);

    /*Rotación malla*/ 
  /*  let mat5 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
     mat4.rotate(mat5,(-3.1416/2),[0,1,0]);
     //mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMallaRot = motor.crearTransform(mat5);

    /*Translación malla*/ 
 /*   let mat6 = mat4.identity();
    mat4.translate(mat6, [0.0,-2.0,0.0]);
    var transformMalla = motor.crearTransform(mat6);

     /*Rotación malla2*/ 
  /*  let mat10 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
     mat4.rotate(mat10,(3.1416/2),[1,0,0]);
    // mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMalla2Rot = motor.crearTransform(mat10);

    /*Translación malla2*/ 
   /* let mat11 = mat4.identity();
    mat4.translate(mat11, [0.0,0.0,-100.0]);
    var transformMalla2 = motor.crearTransform(mat11);

    /*Rotación malla3*/ 
    /*let mat15 = mat4.identity();
    //mat4.rotate(mat5,(3.1416/7),[0,0,1]);
    mat4.rotate(mat15,(3.1416/2),[1,0,0]);
    // mat4.rotate(mat5,(3.1416/4),[0,0,1]);
    var transformMalla3Rot = motor.crearTransform(mat15);

    /*Translación malla3*/ 
   /* let mat16 = mat4.identity();
    mat4.translate(mat16, [0.0,0.0,2.0]);
    var transformMalla3 = motor.crearTransform(mat16);*/

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
   // var malla1 = motor.crearMalla("edificio1.3ds",0,0, true,'text_edificio1.jpg');   //nombre, id, shadertype, hasTexture, el id está asociado al recurso
    
    

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
    /**
     * indice salas
     * 0: exterior
     * 1: piscina
     * 2: gym
     * 3: comedor
     * 4: SPA
     * 5: masaje
     */
                        //nombre, sala, shadertype, hasTexture, textura, rot, tra
    motor.crearMalla2("cesped.3ds",0,0, true,'cesped.png',0,[0.0,0.0,0.0] );    
     motor.crearMalla2("bordepiscina.3ds",2,0, true,'bordepiscina.png',0,[0.0,0.0,0.0] );
     motor.crearMalla2("fondopiscina.3ds",2,0, true,'fondopiscina.png',0,[0.0,0.0,0.0] );
    //MALLA 2 
    motor.crearMalla2("gym.3ds",2,0, true, 'gym.png', 0, [0.0,0.0,0.0] );
    motor.crearMalla2("bancos.3ds",2,0, true, 'bancos.png', 0, [0.0,0.0,0.0] );
    motor.crearMalla2("pesas.3ds",2,0, true, 'pesas.png', 0, [0.0,0.0,0.0] );

     motor.crearMalla2("masaje.3ds",5,0, true, 'masaje.png', 0, [0.9,0.0,0.0] );
     motor.crearMalla2("camillasmasaje.3ds",5,0, true, 'camillasmasaje.png', 0, [0.0,0.0,0.0] );
     motor.crearMalla2("patasmasaje.3ds",5,0, true, 'patasmasaje.png', 0, [0.0,0.0,0.0] );
     motor.crearMalla2("letras.3ds",0,0, true, 'letras.png', 0, [0.0,0.0,0.0] );
     //MALLA 3 
     motor.crearMalla2("comedor.3ds",3,0, true, 'comedor.png',0, [0.0,0.0,0.0]);
     motor.crearMalla2("mesas.3ds",3,0, true, 'mesas.png', 0, [0.0,0.0,0.0] );
   motor.crearMalla2("spa.3ds",4,0, true,'spa.png',0,[0.0,0.0,0.0] );
 /*  motor.crearMalla2("gym2.3ds",2,0, true,'gym.png',0,[0.0,0.0,0.0] );
   motor.crearMalla2("masaje2.3ds",5,0, true,'masaje.png',0,[0.0,0.0,0.0] );
   motor.crearMalla2("comedor2.3ds",3,0, true,'comedor.png',0,[0.0,0.0,0.0] );*/

   motor.crearMalla2("centro.3ds",3,0, false,'comedor.png',0,[3,3,3] );  
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