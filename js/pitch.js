
//import support-function.js

var domain1 = DOMAIN([[0,1]])([32]);
var domain2 = DOMAIN([[0,1],[0,1]])([32,32]);

var green = [34/255,	139/255,	34/255];
var white = [255/255,	255/255,	255/255];

var pitch = T([2])([-0.201])(COLOR(green)(CUBOID([111,72,0.2])));

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

var bottom_line = BEZIER(S0)([[2.5,1.5,0],[2.5,70.5,0]]);

var bottom_line1 = BEZIER(S0)([[3,2,0],[3,70,0]]);

var side_line = BEZIER(S0)([[2.5,1.5,0],[108.5,1.5,0]]);

var side_line1 = BEZIER(S0)([[3,2,0],[108,2,0]]);

var bottom = BEZIER(S1)([bottom_line,bottom_line1]);

var side = BEZIER(S1)([side_line,side_line1]);

var bottom_side = COLOR(white)(STRUCT([MAP(bottom)(domain2),MAP(side)(domain2)]));

soccer_pitch = STRUCT([pitch,bottom_side,Rotate_AND_Translate([0,1],[PI])([0,1],[111,72])(bottom_side)]);

//soccer goals pole: circular section 0,12m; height: 2,45m cross: widht 7,30m

var domain_circular = DOMAIN([[0,2*PI],[0,1]])([32,32]);
var domain_c = DOMAIN([[0,2*PI]])([32]);



var pole1 = BEZIER(S0)(translatePoints(rotY(rotZ(circle_points(0.12,0.201),0),PI)),0.12,0,0);

var pole2 = BEZIER(S0)(translatePoints(rotY(circle_points(0.12, 2.651),3*PI/4),1.806,0,2.651+1.8)); // pole1+2.45 on z-axis and rotate of -30 degrees on they-axis

var pole3 = BEZIER(S0)(translatePoints(rotY(circle_points(0.12, 2.651),PI/4),7.12+1.7,0,0.8)); 

var pole4 = BEZIER(S0)(translatePoints(circle_points(0.12, 0.201),7.,0,0));



var pole_left = MAP(INTER_C2C(S1)([pole1,pole2]))(domain2);

var crossbeam =  MAP(INTER_C2C(S1)([pole2,pole3]))(domain2);

var pole_right = MAP(INTER_C2C(S1)([pole3,pole4]))(domain2)



var section_supporting_points = [[0,0,0],[0.06,0,0.33],[0.12,0,0.6627],[0.265,0,1.3255],[0.3,0,1.5],
                                 [0.40,0,2],[0.5,0,2.5],[0.51,0,2.51],[0.52,0,2.52],[0.55,0,2.55],
                                 [0.6,0,2.6],[0.63,0,2.63],[1,0,2.651],[2,0,2.651]]; //ok



var section_supporting1 = genNUBS(section_supporting_points)[1];

var section_supporting2 = genNUBS(translatePoints(section_supporting_points,0,6.9,0))[1];

var supporting = MAP(INTER_C2C(S1)([section_supporting1,section_supporting2]))(domain2);


var soccer_goals = STRUCT([pole_left,crossbeam,pole_right, SKELETON(1)(T([1])([2.06])(R([0,1])([-PI/2])(supporting)))]);

DRAW(soccer_goals);



