function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
       e.preventDefault();
    e.returnValue = false;  
}

define(function (require) {
    function CamaraInteractor(canvas, translate, rotate) { //constructor de la clase
        this.canvas = canvas;
        this.update();
        
        this.translacion = translate;
        this.rotacion = rotate;

        this.dragging = false;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.button = 0;
        this.ctrl = false;
        this.key = 0;
        this.azimuth    = 0.0;
        this.elevation  = 0.0;
        this.steps      = 9;
        this.StepsDown   = 0;
        this.StepsUp   = 0;
        this.zPositive = false;

        this.position   = vec3.create();
        this.normal     = vec3.create();

        this.MOTION_FACTOR = 10.0;
    }

CamaraInteractor.prototype.setPosition = function(p){
    //console.log("Nueva posicion: "+p);
    vec3.set(p, this.position);
}

CamaraInteractor.prototype.onMouseUp = function(ev){
    this.dragging = false;
}

CamaraInteractor.prototype.onMouseDown = function(ev){
    this.dragging = true;
    this.x = ev.clientX;
	this.y = ev.clientY;
	this.button = ev.button;
}

CamaraInteractor.prototype.onMouseMove = function(ev){
	this.lastX = this.x;
	this.lastY = this.y;
	this.x = ev.clientX;
    this.y = ev.clientY;
	
	if (!this.dragging) return;
	this.ctrl = ev.ctrlKey;
	this.alt = ev.altKey;
	var dx = this.x - this.lastX;
	var dy = this.y - this.lastY;
	
	if (this.button == 0) { 
		if(this.ctrl){
			this.translate(dy);
		}
		else{ 
			this.rotate(dx,dy);
		}
	}
}

CamaraInteractor.prototype.onKeyDown = function(ev){
    //var c = this.camera;
	
	this.key = ev.keyCode;
	this.ctrl = ev.ctrlKey;
	
	if (!this.ctrl){
		if (this.key == 38){
			this.changeElevation(10);
		}
		else if (this.key == 40){
			this.changeElevation(-10);
		}
		else if (this.key == 37){
			this.changeAzimuth(-10);
		}
		else if (this.key == 39){
			this.changeAzimuth(10);
		}
        else if (this.key == 87) {  //w -wide
            if(fovy < 120) fovy+=5;
            console.info('FovY:'+fovy);
        }
        else if (this.key == 78) { //n - narrow
            if(fovy >15 ) fovy-=5;
            console.info('FovY:'+fovy);
        }
	}
     
}

CamaraInteractor.prototype.onKeyUp = function(ev){
    if (ev.keyCode == 17){
		this.ctrl = false;
	}
}

CamaraInteractor.prototype.Wheel = function(ev) {
    if(ev.wheelDelta > 0) {
	    this.StepsUp++;
        this.zPositive = true;
        this.dolly(this.StepsUp);
    }
    if(ev.wheelDelta < 0) {
        this.StepsUp--;
        this.zPositive = false;
        this.dolly(this.StepsUp);
    }
}

CamaraInteractor.prototype.changeAzimuth = function(az){
    this.azimuth +=az;
    
    if (this.azimuth > 360 || this.azimuth <-360) {
        this.azimuth = this.azimuth % 360;
    }
},

CamaraInteractor.prototype.changeElevation = function(el){
            
    this.elevation +=el;
            
    if (this.elevation > 360 || this.elevation <-360) {
        this.elevation = this.elevation % 360;
    }
},

CamaraInteractor.prototype.update = function(){
    var self = this;
	var canvas = this.canvas;
    //console.log(canvas);
    if(canvas != null) {
        canvas.onmousedown = function(ev) {
            self.onMouseDown(ev);
        }

        canvas.onmouseup = function(ev) {
            self.onMouseUp(ev);
        }
        
        canvas.onmousemove = function(ev) {
            self.onMouseMove(ev);
        }
        
        window.onkeydown = function(ev){
            self.onKeyDown(ev);
        }
        
        window.onkeyup = function(ev){
            self.onKeyUp(ev);
        }

        canvas.addEventListener('mousewheel', function(ev) {
            if (window.addEventListener) //  FF viejo
                window.addEventListener('DOMMouseScroll', preventDefault, false);
            window.onwheel = preventDefault; // para chrome
            window.onmousewheel = document.onmousewheel = preventDefault; // navegadores obsoletos
            self.Wheel(ev);
            return false;
        }, false);
    }
}

CamaraInteractor.prototype.dolly = function(s){
    var init;
    var newPosition = vec3.create();
    if(init == undefined) {
        init = 9;
        newPosition[2] = init;
    }

    var p =  vec3.create();
    var n = vec3.create();
    
    p = this.position;
    
    var step = s - this.steps;
    //console.log(step);
    vec3.normalize(this.normal,n);
    
    newPosition[0] = p[0];
    newPosition[1] = p[1];
    newPosition[2] = p[2] - step;
	
    this.setPosition(newPosition);
    this.steps = s;
    this.translacion.transladar(this.azimuth, this.elevation, this.position, this.normal, this.right, this.up);
}
/*
CamaraInteractor.prototype.translate = function(value){
	this.dolly(value);
    this.translacion.transladar(this.position, this.normal);
    //c.update();
}*/

CamaraInteractor.prototype.rotate = function(dx, dy){
	//var camera = this.camera;
	var canvas = this.canvas;
	
	var delta_elevation = -20.0 / canvas.height;
	var delta_azimuth   = -20.0 / canvas.width;
				
	var nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
	var nElevation = dy * delta_elevation * this.MOTION_FACTOR;
	
	this.changeAzimuth(nAzimuth);
	this.changeElevation(nElevation);

    this.rotacion.rotar(this.azimuth, this.elevation, this.position, this.normal, this.right, this.up);
}

    return CamaraInteractor;
});