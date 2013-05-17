var domain1 = DOMAIN([[0,1]])([32]);
var domain2 = DOMAIN([[0,1],[0,1]])([32,32]);

var green = [1/255,  121/255,	111/255];
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

DRAW(soccer_pitch);
