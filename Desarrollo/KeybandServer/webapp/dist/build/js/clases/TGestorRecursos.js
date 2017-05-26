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
        this.textura = null;
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
        GetTextura: function () {
            return this.textura;
        },

        SetTextura: function (textura) {
            this.textura = textura;
        },

        cargarFichero: function (recurso) {
            var cargar = ('build/models/'+ recurso.nombre)
            //var loaded;
            K3D.load(cargar, function(data) {
                if(recurso.nombre.split(".")[1]=="obj"){
                var m = K3D.parse.fromOBJ(data);    // CAMBIAR según formato !
               
                    var vertices=m.c_verts;
                    var texturas = m.c_uvt;
                    var indices=m.i_verts;
                    var normals =m.c_norms;
                    recurso.SetVertices(vertices);
                    recurso.SetTextura(texturas);
                    recurso.SetIndices(indices);
                     recurso.SetNormales(utils.calculateNormals(vertices, indices));
                     console.log("Cargado el fichero: "+cargar);
                    console.log("Vértices:");
                    console.log(vertices);
                    console.log("índices:");
                    console.log(indices);
                    console.log("Textura:");
                    console.log(texturas);
            }else if(recurso.nombre.split(".")[1]=="3ds"){
                var m = K3D.parse.from3DS(data);    // CAMBIAR según formato !
                var aux=0;
                for(var x=0;x<m.edit.objects.length;x++){
                    var vertices=m.edit.objects[x].mesh.vertices;
                    recurso.SetVertices(m.edit.objects[x].mesh.vertices);
                    var texturas = m.edit.objects[x].mesh.uvt;
                    recurso.SetTextura(m.edit.objects[x].mesh.uvt);
                    var indices=m.edit.objects[x].mesh.indices;
                    recurso.SetIndices(m.edit.objects[x].mesh.indices);
                   // var normals = utils.calculateNormals(vertices, indices);
                    recurso.SetNormales(utils.calculateNormals(vertices, indices));
                    console.log("Cargado el fichero: "+cargar);
                    console.log("Vértices:");
                    console.log(vertices);
                    console.log("índices:");
                    console.log(indices);
                    console.log("Textura:");
                    console.log(texturas);
                }
            }  
            })
        },
    };

    function TGestorRecursos() { //constructor de la clase
        if (!(this instanceof TGestorRecursos)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
        //this.recursos = recursos; 
        //this.TRecurso = require('clases/TRecurso');
         this.texturas = [];
         this.recursos = [];

    }

	TGestorRecursos.prototype = { //instancia

    	
    	constructor: TGestorRecursos, //Se referencia al constructor
       
        getRecurso: function(nombre){
            var encontrado = false;
            for (var i = 0; i <this.recursos.length && !encontrado; i++) {
               if(this.recursos[i].GetNombre() == nombre){
                    encontrado = true;
               }
               
            }
            if(!encontrado){
                var recurso = new TRecurso(nombre);
                recurso.cargarFichero(recurso);
                this.recursos.push(recurso);
            }
        },
        getRecursoById: function(int){
            return this.recursos[int];
        },
        getNumRecursos: function(){
            return this.recursos.length;
        },
        GetTextura: function (int) {
            return this.texturas[int];
        },

        SetTextura: function (int,textura) {
            this.texturas[int] = textura;
        }
    }
    return TGestorRecursos;

     //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});