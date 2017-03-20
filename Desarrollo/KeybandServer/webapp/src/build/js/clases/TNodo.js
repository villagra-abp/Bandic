define(function () {
    "use strict";

    function TNodo(entidad, hijos, padre) { //constructor de la clase
        if (!(this instanceof TNodo)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }

        this.entidad = entidad;
        if(hijos == null)
            hijos = [];
        this.hijos = hijos;
        this.padre = padre;
    }

    TNodo.prototype = { //instancia
    	
    	constructor: TNodo, //Se referencia al constructor

        addHijo: function (nodo) { //estos metodos son publicos
            this.hijos.push(nodo);
            return "Añado un hijo a este nodo";
        },

        remHijo: function (nodo) {
            this.hijos.remove(nodo);
            return "Elimino un hijo de este nodo";
        },

        getEntidad: function() {
            return this.entidad;
        },
        getHijo: function (int){
            return  this.hijos[0];
        },
        setEntidad: function(entidad) {
            this.entidad = entidad;
        },

        getPadre: function() {
            return this.padre;
        },

        draw: function() {
            
            //nodos que no son el primero
            if(this.entidad != null){
                //nodo hijo
                //transformaciones intermedias
                this.entidad.beginDraw();
                if(this.hijos.length!=0){
                    for (var i = 0; i < this.hijos.length; i++) {
                        //console.log("hijos de los hijos de escena" );
                        //console.log(this.hijos[i]);
                        //this.entidad.beginDraw();
                        //console.log(this.hijos[i].entidad);
                        this.hijos[i].draw();
                    };
                    this.entidad.endDraw();
                }
                //nodos hoja del arbol
                else{
                    
                    this.entidad.endDraw();
                }
            }
            //nodo primero o escena
            else{
                //begindraw()
                //nodo padre no tiene entidad/ recorrer sus nodos hijos
                for (var i = 0; i < this.hijos.length; i++) {
                    //console.log("los hijos de escena:" );
                    //console.log(this.entidad);
                    this.hijos[i].draw();
                };
                //endDraw
            }
            
        }
    };

    return TNodo; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});