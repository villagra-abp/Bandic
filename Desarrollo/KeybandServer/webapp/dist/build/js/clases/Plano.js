define(function (require) {
    "use strict";

    function Plano() { //constructor de la clase
        if (!(this instanceof Plano)) {
            throw new TypeError("nodo constructor cannot be called as a function.");
        }

      this.a;
      this.b;
      this.c;
      this.d;
    }

    Plano.prototype = { //instancia
    	
    	constructor: Plano, //Se referencia al constructor

        getPlano: function () { //estos metodos son publicos
            return this;
        },

        setPlano: function (a1,b1, c1, d1) {
        var lenght  = Math.sqrt(a1 * a1 + b1 * b1 + c1 * c1);
          this.a = a1/lenght;
          this.b = b1/lenght;
          this.c = c1/lenght;
          this.d = d1/lenght;
        }
    };

    return Plano; //requireJS necesita hacer return para luego poder definir la clase en otro fichero
});