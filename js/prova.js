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

var soccer_goals = STRUCT(s);


DRAW(soccer_goals);