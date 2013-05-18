var domain1 = DOMAIN([[0,1]])([32]);
var domain2 = DOMAIN([[0,1],[0,1]])([32,32]);

var green = [34/255,	139/255,	34/255];
var white = [255/255,	255/255,	255/255];

var pitch = COLOR(green)(CUBOID([111,72,0.2]));

//rotate object and then translate resulted-oject
var Rotate_AND_Translate = function(axis,rotates){
	return function(axis, translate){
		return function(object){
			return T(axis)(translate)(R(axis)(rotates)(object));
		}
	}
}


//bottom and side lines 105 X 68
// weight line 0.5 distance border and border-line x:2.5 y:1.5

var bottom_line = BEZIER(S0)([[2.5,1.5,0.201],[2.5,70.5,0.201]]);

var bottom_line1 = BEZIER(S0)([[3,2,0.201],[3,70,0.201]]);

var side_line = BEZIER(S0)([[2.5,1.5,0.201],[108.5,1.5,0.201]]);

var side_line1 = BEZIER(S0)([[3,2,0.201],[108,2,0.201]]);

var bottom = BEZIER(S1)([bottom_line,bottom_line1]);

var side = BEZIER(S1)([side_line,side_line1]);

var bottom_side = COLOR(white)(STRUCT([MAP(bottom)(domain2),MAP(side)(domain2)]));

soccer_pitch = STRUCT([pitch,bottom_side,Rotate_AND_Translate([0,1],[PI])([0,1],[111,72])(bottom_side)]);

//soccer goals pole: circular section 0,12m; height: 2,45m cross: widht 7,30m
var domain_circular = DOMAIN([[0,2*PI],[0,1]])([32,32]);

var circle = function (r,h,angolo) {
  return function (v) {
    var c = [r*COS(v[0]), r*SIN(v[0]),h];
    if(angolo == 0)
    	return c;
    else
    return [c[0],c[1],c[0]*SIN(angolo)+c[2]*COS(angolo)];
  };
};

var INTER_C2C = function(sel){
	return function(args){ //array di punti
		var C2 = args[1]; 
		var C1 = args[0];

		return function(point) { // dominio
			v = sel(point); 
			var C1u = C1(point);
			var C2u = C2(point);

		var mapped = new Array(3); 
		var i;
		for(i=0; i<3; i +=1) {
			mapped[i] = C1u[i] + v*(C2u[i] - C1u[i]); // P1 e P2 sono punti quindi array di cordinate A*u + B(1-u);
		}
		return mapped;
		};
	};
};

var pole1 = circle(0.12,0.201,0);

var pole2 = circle(0.12, 2.651,-PI/6); // pole1+2.45 on z-axis

var pole_left = MAP(INTER_C2C(S1)([pole1,pole2]))(domain_circular);

DRAW(pole_left);
//DRAW(soccer_pitch);