define(function (require) {
    "use strict";

    function TRecurso(nombre) { //constructor de la clase
        if (!(this instanceof TRecurso)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
        this.nombre = nombre;
        this.vertices = null;
        this.normales = null;
        this.indices = null;
    }

    TRecurso.prototype = { 
        constructor: TRecurso, 
        GetNombre: function () {
            return this.nombre
        },

        SetNombre: function (nombre) {
            this.nombre = nombre;
        },
        GetVertices: function () {
            console.log("Entra a get vertices")
            return this.vertices;
        },

        SetVertices: function (vertices) {
            this.vertices = vertices;
        },
        GetNormales: function () {
            return this.normales;
        },

        SetNormales: function (normales) {
            this.normales = normales;
        },
        GetIndices: function () {
            return this.indices;
        },

        SetIndices: function (indices) {
            this.indices = indices;
        },

        cargarFichero: function (recurso) {
            console.log(recurso);
            var cargar = ('build/models/'+ recurso.nombre)
            //var loaded;
            K3D.load(cargar, function(data) {
                var m = K3D.parse.from3DS(data);    // CAMBIAR según formato !
                console.log(m);
                var aux=0;
                for(var x=0;x<m.edit.objects.length;x++){
                    var vertices=m.edit.objects[x].mesh.vertices;
                    recurso.SetVertices(m.edit.objects[x].mesh.vertices);

                    var indices=m.edit.objects[x].mesh.indices;
                    recurso.SetIndices(m.edit.objects[x].mesh.indices);
                   // var normals = utils.calculateNormals(vertices, indices);
                    recurso.SetNormales(utils.calculateNormals(vertices, indices));
                }
            })
        },
    };

    function TGestorRecursos() { //constructor de la clase
        if (!(this instanceof TGestorRecursos)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
        //this.recursos = recursos; 
        console.log("TGestorRecursos");
        //this.TRecurso = require('clases/TRecurso');

    }

	TGestorRecursos.prototype = { //instancia

    	
    	constructor: TGestorRecursos, //Se referencia al constructor
       
        getRecurso: function(nombre){
            console.log(nombre);
            var encontrado = false;
            for (var i = 0; i <recursos.length && !encontrado; i++) {
               if(recursos[i].GetNombre() == nombre){
                    encontrado = true;
               }
               
            }
            if(!encontrado){
                var recurso = new TRecurso(nombre);
                recurso.cargarFichero(recurso);
                recursos.push(recurso);
                console.log(recursos);
            }
        }
    }
    return TGestorRecursos;

     //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});