define(function (require) {
    "use strict";

    var TEntidad = require('clases/TEntidad');
    var CAMERA_TRACKING_TYPE = 2;
    function TCamara(activa, zoom, matriz) { //constructor de la clase
        if (!(this instanceof TCamara)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
       
        //TEntidad.call(this); //llamamos al constructor padre
        this.activa = activa;
        this.zoom = zoom;
        this.position = matriz;
         this.padre;
        this.matrix     = matriz;
        this.up         = vec3.create();
        this.right      = vec3.create();
        this.normal     = vec3.create();
        this.position   = vec3.create();
        this.home       = vec3.create();
        /*this.azimuth    = 0.0;
        this.elevation  = 0.0;*/
        this.type       = CAMERA_TRACKING_TYPE;
        this.steps      = 0;

         this.hookRenderer = null;
        this.hookGUIUpdate = null;
    }

    TCamara.prototype ={
        constructor: TCamara,
        getPosition: function(){
            return this.position;
        },
        isActive: function(){
            return this.activa;
        },
        beginDraw: function () {
            //console.log("beginDraw TCamara");           
        },
        endDraw: function () {
            //console.log("endDraw TCamara");
        },

    };  

    return TCamara; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});