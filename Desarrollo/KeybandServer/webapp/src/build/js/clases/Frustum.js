define(function (require) {
    "use strict";

    var Plano = require('clases/Plano');
    function Frustum() { //constructor de la clase
        if (!(this instanceof Frustum)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }
        this.Plano = [];
      this.Plano[0] = new Plano();  //izquierda
      this.Plano[1] = new Plano();  //derecha
      this.Plano[2] = new Plano();  //abajo
      this.Plano[3] = new Plano();  //arriba
      this.Plano[4] = new Plano();  //cerca
      this.Plano[5] = new Plano();  //lejos
    }

    Frustum.prototype = { //instancia
    	
    	constructor: Frustum, //Se referencia al constructor

        getplanos: function () { //estos metodos son publicos
            return this.Planos;
        },

        setplanos: function (MVP) {
           this.Plano[0].setPlano(MVP[0]+MVP[3],MVP[4]+MVP[7],MVP[8]+MVP[11],MVP[12]+MVP[15]);  
           this.Plano[1].setPlano(MVP[3]-MVP[0],MVP[7]-MVP[4],MVP[11]-MVP[8],MVP[15]-MVP[12]);
           this.Plano[2].setPlano(MVP[1]+MVP[3],MVP[5]+MVP[7],MVP[9]+MVP[11],MVP[13]+MVP[15]);
           this.Plano[3].setPlano(MVP[3]-MVP[1],MVP[7]-MVP[5],MVP[11]-MVP[9],MVP[15]-MVP[13]);
           this.Plano[4].setPlano(MVP[2]+MVP[3],MVP[6]+MVP[7],MVP[10]+MVP[11],MVP[14]+MVP[15]);
           this.Plano[5].setPlano(MVP[3]-MVP[2],MVP[7]-MVP[6],MVP[11]-MVP[10],MVP[15]-MVP[14]);
        },
        esVisible: function(centro, radio){//centro[] float radio
            for(var x = 0;x<this.Plano.length;x++){
                var distance = this.Plano[x].a * centro[0] +this.Plano[x].b * centro[1] + this.Plano[x].c * centro[2] + this.Plano[x].d;
                if (distance <= -radio)
                {
                    return false; // Bounding sphere is completely outside the right plane
                }
            }
            return true;
        }
    };

    return Frustum; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});