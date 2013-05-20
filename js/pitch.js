//caricare in ordine:
//support-function.js
//soccer_goal.js
//corner_flag.js
//south-gradinates.js 



var domain1 = DOMAIN([[0,1]])([32]);
var domain2 = DOMAIN([[0,1],[0,1]])([32,32]);

var domain_circular = DOMAIN([[0,2*PI],[0,1]])([32,32]);
var domain_c = DOMAIN([[0,2*PI]])([32]);
var domain3 = TRIANGLE_DOMAIN(32, [[1,0,0],[0,1,0],[0,0,1]]);

var darkgreen = [34/255,	139/255,	34/255];
var lightgreen = [50/255,	205/255,	50/255];
var white = [255/255,	255/255,	255/255];

//pitch x start -4.5 to 115.5 y from -5.5 to 77.5 and z -0.01

var c = CUBOID([5.55,72,0.2]);
var terreno_calpestabile1 = SIMPLEX_GRID([[4.5,-111,4.5],[83],[0.2]]);
var terreno_calpestabile2 = SIMPLEX_GRID([[-4.5,111,-4.5],[5.5,-72,5.5],[0.2]]);
var terreno_calpestabile = STRUCT([terreno_calpestabile1,terreno_calpestabile2]);
var pitch = T([2])([-0.201])(STRUCT(REPLICA(10)([COLOR(darkgreen)(c),T([0])([5.55]),COLOR(lightgreen)(c),T([0])([5.55])])));

//bottom and side lines 105 X 68
// weight line 0.5 distance border and border-line x:2.5 y:1.5

var bottom_line = BEZIER(S0)([[2.5,1.5,0],[2.5,70.5,0]]);

var bottom_line1 = BEZIER(S0)([[3,2,0],[3,70,0]]);

var center_line = BEZIER(S0)([[3+52.25,1.5,0],[3+52.25,1.5+0.5+68,0]])

var center_line1 = BEZIER(S0)([[3+52.5+0.25,1.5,0],[3+52.5+0.25,1.5+0.5+68,0]])

var center = MAP(BEZIER(S1)([center_line,center_line1]))(domain2);
var center_disk = T([0,1])([2.5+0.5+105/2,1.5+0.5+68/2-0.25])(DISK(0.8)(12));

var side_line = BEZIER(S0)([[2.5,1.5,0],[108.5,1.5,0]]);

var side_line1 = BEZIER(S0)([[3,2,0],[108,2,0]]);

var bottom = BEZIER(S1)([bottom_line,bottom_line1]);

var side = BEZIER(S1)([side_line,side_line1]);

var bottom_side = STRUCT([MAP(bottom)(domain2),MAP(side)(domain2)]);

var middle_circulus = annulus_sector(2*PI,9.15,9.65);

var bezel_corner_left_down = T([0,1])([3,2])(annulus_sector(PI/2,1,1.5));

var bezel_corner_right_down = T([0,1])([110,-1])(R([0,1])([PI/2])(bezel_corner_left_down));
 
var bezel_corner_down = STRUCT([bezel_corner_left_down,bezel_corner_right_down]);

var bezel_corner_up = T([0,1])([111,72])(R([0,1])([PI])(bezel_corner_down));

var bezel_corner = STRUCT([bezel_corner_down,bezel_corner_up]);

//areas

var big_area0 = CUBOID([16.5,0.5]);
var big_area1 = T([0])([16.5-0.5])(CUBOID([0.5,40.3]));
var big_area = STRUCT([big_area0,big_area1,T([1])([40.3-0.5])(big_area0)]);

var small_area0 = CUBOID([5.5,0.5]);
var small_area1 = T([0])([5.5-0.5])(CUBOID([0.5,18.3]));
var small_area = T([1])([0.5+10.5])(STRUCT([small_area0,small_area1,T([1])([18.3-0.5])(small_area0)]));

var penalty_disk = T([0,1])([11,0.5+10.5+18.3/2-0.4])(DISK(0.8)(12));

var area0 = T([0,1])([2.5+0.5,1.5+0.5+68/2-10.5-18.3/2])(STRUCT([small_area,big_area,penalty_disk]));

var area1 = T([0,1])([105+16.5/2-2.5+0.5,1.5+0.5+34+40.3-3.85])(R([0,1])([-PI])(area0));
var areas = STRUCT([area0,area1]);

var stripes = COLOR(white)(STRUCT([areas,center_disk,center,bottom_side,Rotate_AND_Translate([0,1],[PI])([0,1],[111,72])(bottom_side),
								   T([0,1])([2.5+0.5+105/2, 1.5+0.5+68/2-0.25])(middle_circulus),bezel_corner]));

var soccer_pitch = STRUCT([pitch,stripes,COLOR([16/255,78/255,139/255])(T([0,1,2])([-4.5,-5.5,-0.201])(terreno_calpestabile))]);

var all = STRUCT([soccer_goals,soccer_pitch, corner_on_pitch]);

DRAW(all);


