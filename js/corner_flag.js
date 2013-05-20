var black = [0,0,0];

var red = [1,0,0];

var white = [255/255,	255/255,	255/255];

var cyl = CYLINDER(0.05,1.5)(32);

var disk = T([2])([1.5])(DISK(0.05)(32));

var cub_red = T([0,2])([0.05,1.25])(COLOR(red)(CUBOID([0.25,0,0.25])));

var cub_white = T([0,2])([0.05,1])(COLOR(white)(CUBOID([0.25,0,0.25])));

var flag = STRUCT([cub_red,T([0])([0.50])(cub_red),T([0,2])([0.25,-0.25])(cub_red),
				   cub_white,T([0])([0.50])(cub_white),T([0,2])([0.25,0.25])(cub_white)])

var corner = COLOR(black)(STRUCT([cyl,disk]));

var corner_flag = STRUCT([corner,flag]);

var corner_on_pitch = STRUCT([T([0,1])([2.5-0,1.5-0.05])(corner_flag),T([0,1])([108.55,1.45])(corner_flag),
							  T([0,1])([2.45,70.55])(corner_flag),T([0,1])([108.55,70.55])(corner_flag)]);


/////cartelloni publicitari

var billboards0 = COLOR([1,1,1])(R([1,2])([PI/6])(CUBOID([3,0,0.5])));

supportPoints = circle_points(0.02,0);

function TR (ArrayPoints,angolo,punto){
  var result =  translatePoints( rotY (ArrayPoints,angolo),punto[0],punto[1],punto[2])
  return result;
};

var section2 = new Array();
section2.push(rotY(supportPoints,PI));
section2.push(TR (scalePoints(supportPoints, 1),PI*3/4,[0.02*COS(PI+PI*3/4),0,0.02*SIN(PI+PI*3/4)+0.3]))
section2.push(TR (scalePoints(supportPoints,1),PI/4,[0.02*COS(PI+PI/4)+2,0,0.02*SIN(PI+PI/4)+0.3]))
section2.push(TR (supportPoints,0,[0.02*COS(PI+PI/4)+2,0,0]))

var domain2 = DOMAIN([[0,1],[0,1]])([32,32])

var sectionNubs2 = new Array();
var s2 = new Array();
for (var j = 0; j < section2.length-1; j++) {
  s2.push(MAP(INTER_C2C(S1)([genNUBS(section2[j])[1],genNUBS(section2[j+1])[1]]))(domain2))

};

var support_000 = R([1,2])([PI/6])((STRUCT(s2)));

var support_000R = T([1])([0.01])(R([1,2])([PI/2])((STRUCT(s2))));

var support_R = T([0,1])([0.5,-0.03])(STRUCT([support_000,support_000R]));

var billboards = T([0,1])([-4.5,-4.50])(STRUCT([billboards0, support_R]));

var first_side_array = new Array();

DRAW(billboards);


var temp = billboards;

for (var j = 1; j < 10 ; j++) {
  	DRAW(T([0])([0.2+3])(temp));

  	temp = T([0])([0.2+3])(temp);
};

temp2 = T([0])([88])(billboards);
DRAW(temp2);


for (var j = 1; j < 10 ; j++) {
  	DRAW(T([0])([0.2+3])(temp2));

  	temp2 = T([0])([0.2+3])(temp2);
};

/*temp3 = T([0])([120-4.5-4.5-0.5])(R([0,1])([PI/2])(billboards));
DRAW(temp3);
first_side_array.push(temp3)
for (var j = 1; j < 28 ; j++) {
  	DRAW(T([1])([0.5+3])(temp3));
  	first_side_array.push(temp3);
  	temp3 = T([1])([0.5+3])(temp3);
};
*/
/*var first_side = T([0,1])([120,88-4.5])(R([0,1])([PI/2])(STRUCT(first_side_array)))

DRAW(first_side)*/

