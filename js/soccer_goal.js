soccerGoalPoints = circle_points(0.12,0);

function TR (ArrayPoints,angolo,punto){
  var result =  translatePoints( rotY (ArrayPoints,angolo),punto[0],punto[1],punto[2])
  return result;
};

var section = new Array();
section.push(rotY(soccerGoalPoints,PI));
section.push(TR (scalePoints(soccerGoalPoints, 1),PI*3/4,[0.12*COS(PI+PI*3/4),0,0.12*SIN(PI+PI*3/4)+2.65]))
section.push(TR (scalePoints(soccerGoalPoints,1),PI/4,[0.12*COS(PI+PI/4)+7,0,0.12*SIN(PI+PI/4)+2.65]))
section.push(TR (soccerGoalPoints,0,[0.12*COS(PI+PI/4)+7,0,0]))

var domain2 = DOMAIN([[0,1],[0,1]])([32,32])

var sectionNubs = new Array();
var s = new Array();
for (var j = 0; j < section.length-1; j++) {
  s.push(MAP(INTER_C2C(S1)([genNUBS(section[j])[1],genNUBS(section[j+1])[1]]))(domain2))

};

var soccer_goals_000 = STRUCT(s);

var soccer_goal_support = R([1,2])([-PI/2])(S([0,1,2])([1,0.5,0.80])(soccer_goals_000));

var net_points = [[0.02,0,0.10],[0.06,0,0.33],[0.12,0,0.6627],[0.265,0,1.3255],[0.3,0,1.5],
          [0.40,0,2],[0.5,0,2.5],[0.51,0,2.51],[0.52,0,2.52],[0.55,0,2.55],
          [0.6,0,2.6],[0.63,0,2.63],[1,0,2.651],[2,0,2.651]];

var net_curve0 = genNUBS(net_points)[1];

var net_curve1 = genNUBS(translatePoints(net_points,0,6.9,0))[1];

var net0 = SKELETON(1)(T([1])([2.06])(R([0,1])([-PI/2])(MAP(INTER_C2C(S1)([net_curve0, net_curve1]))(domain2))));

var net1 = SKELETON(1)(T([1])([2.06])(R([0,1])([-PI/2])(MAP(CONICAL_SURFACE([2,0,0])(net_curve0))(domain2))));

var net2 = T([0])([6.9])(net1);

var net = STRUCT([net0,net1,net2]);

//net supports 

var support0 = CYLINDER(0.05,2.8)(12);
var supports = STRUCT([T([1])([2.5]),support0,T([0])([6.9]),support0]);

var soccer_goal0 = T([0,1])([2.5+0.5,1.5+0.5+34-6.9/2])(R([0,1])([PI/2])(STRUCT([soccer_goals_000,net,soccer_goal_support])));
var soccer_goal1 = T([0,1])([105+2.5+0.5,1.5+0.5+34+3])(R([0,1])([-PI/2])(STRUCT([soccer_goals_000,net,soccer_goal_support])));
var soccer_goals = STRUCT([soccer_goal0,soccer_goal1]);

//DRAW(soccer_goals);