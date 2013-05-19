
//import support-function.js

var domain1 = DOMAIN([[0,1]])([32]);
var domain2 = DOMAIN([[0,1],[0,1]])([32,32]);

var domain_circular = DOMAIN([[0,2*PI],[0,1]])([32,32]);
var domain_c = DOMAIN([[0,2*PI]])([32]);
var domain3 = TRIANGLE_DOMAIN(32, [[1,0,0],[0,1,0],[0,0,1]]);

var darkgreen = [34/255,	139/255,	34/255];
var lightgreen = [50/255,	205/255,	50/255];
var white = [255/255,	255/255,	255/255];

var c = CUBOID([5.55,72,0.2]);
var pitch = T([2])([-0.201])(STRUCT(REPLICA(10)([COLOR(darkgreen)(c),T([0])([5.55]),COLOR(lightgreen)(c),T([0])([5.55])])));

//bottom and side lines 105 X 68
// weight line 0.5 distance border and border-line x:2.5 y:1.5

var bottom_line = BEZIER(S0)([[2.5,1.5,0],[2.5,70.5,0]]);

var bottom_line1 = BEZIER(S0)([[3,2,0],[3,70,0]]);

var center_line = BEZIER(S0)([[2.5+52.5,1.5,0],[2.5+52.5,1.5+0.5+68,0]])

var center_line1 = BEZIER(S0)([[2.5+52.5+0.5,1.5,0],[2.5+52.5+0.5,1.5+0.5+68,0]])

var center = MAP(BEZIER(S1)([center_line,center_line1]))(domain2);

var side_line = BEZIER(S0)([[2.5,1.5,0],[108.5,1.5,0]]);

var side_line1 = BEZIER(S0)([[3,2,0],[108,2,0]]);

var bottom = BEZIER(S1)([bottom_line,bottom_line1]);

var side = BEZIER(S1)([side_line,side_line1]);

var bottom_side = STRUCT([MAP(bottom)(domain2),MAP(side)(domain2)]);

var stripes = COLOR(white)(STRUCT([center,bottom_side,Rotate_AND_Translate([0,1],[PI])([0,1],[111,72])(bottom_side)]));

var soccer_pitch = STRUCT([pitch,stripes]);

//soccer goals pole: circular section 0,12m; height: 2,45m; crossbeam length: 7m;

var pole1 = BEZIER(S0)(translatePoints(rotY(rotZ(circle_points(0.12,0.201),0),PI)),0.12,0,0);

var pole2 = BEZIER(S0)(translatePoints(rotY(circle_points(0.12, 2.651),3*PI/4),1.806,0,2.651+1.8)); // pole1+2.45 on z-axis and rotate of -30 degrees on they-axis

var pole3 = BEZIER(S0)(translatePoints(rotY(circle_points(0.12, 2.651),PI/4),7.12+1.7,0,0.8)); 

var pole4 = BEZIER(S0)(translatePoints(circle_points(0.12, 0.201),7.,0,0));

var pole_left = MAP(INTER_C2C(S1)([pole1,pole2]))(domain2);

var crossbeam =  MAP(INTER_C2C(S1)([pole2,pole3]))(domain2);

var pole_right = MAP(INTER_C2C(S1)([pole3,pole4]))(domain2)

// net(rete)

var net_points = [[0,0,0],[0.06,0,0.33],[0.12,0,0.6627],[0.265,0,1.3255],[0.3,0,1.5],
                                 [0.40,0,2],[0.5,0,2.5],[0.51,0,2.51],[0.52,0,2.52],[0.55,0,2.55],
                                 [0.6,0,2.6],[0.63,0,2.63],[1,0,2.651],[2,0,2.651]]; //ok

var net_curve0 = genNUBS(net_points)[1];

var net_curve1 = genNUBS(translatePoints(net_points,0,6.9,0))[1];

var net0 = SKELETON(1)(T([1])([2.06])(R([0,1])([-PI/2])(MAP(INTER_C2C(S1)([net_curve0, net_curve1]))(domain2))));

var net1 = SKELETON(1)(T([1])([2.06])(R([0,1])([-PI/2])(MAP(CONICAL_SURFACE([2,0,0])(net_curve0))(domain2))));

var net2 = T([0])([6.9])(net1);

var net = STRUCT([net0,net1,net2]);

//net supports 

var support0 = CYLINDER(0.05,2.8)(12);
var supports = STRUCT([T([1])([2.5]),support0,T([0])([6.9]),support0]);

var soccer_goal0 = T([0,1])([2.5+0.5,1.5+0.5+34])(R([0,1])([PI/2])(STRUCT([pole_left,crossbeam,pole_right, net, supports])));
var soccer_goal1 = T([0,1])([105+2.5+0.5,1.5+0.5+34])(R([0,1])([-PI/2])(STRUCT([pole_left,crossbeam,pole_right, net, supports])));
var soccer_goals = STRUCT([soccer_goal0,soccer_goal1]);

var all = STRUCT([soccer_goals,soccer_pitch]);

DRAW(all);


