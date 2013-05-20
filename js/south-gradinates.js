// import support-function.js


//level0
var st0 = T([0,1])([-0.3,0.3])(stairGen(3.5,4.5,15,0.3,2));

var st1 = T([0,1,2])([-7+0.2,0.3,2])(R([0,2])([PI])(stairGen(2.3,3,10,0.2,2)));
var st2 = T([0,1,2])([-7-3-2.3,2.3+0.3,2])(R([0,2])([PI])(stairGen(1.8,2.3,10,0.2,2)));

var stairs0 = STRUCT([st0,st1,st2]);

var pl0 = T([0])([-7])(CUBOID([7,0.3,2]));
var pl1 = T([0,1])([-3-7-2.3-0.2,2.3])(CUBOID([3,0.3,2]));
var pl2 = T([0,1])([-50-7-3-2.3-2.3+0.2,2+2+0.2])(CUBOID([50,0.3,2]));

var planes0 = STRUCT([pl0,pl1,pl2]);

var lvl0 = T([1,2])([-3.5,2])(R([0,2])([PI])(STRUCT([planes0,stairs0])));

//DRAW(lvl0);

//level1

var horz = CUBOID([0.506,0.1,2]);
var vert = CUBOID([0.05,0.24,2]);
var lvl10 = STRUCT(REPLICA(25)([horz,T([0])([0.456]),vert,T([1])([0.14])]));

var lvl1c0 = STRUCT(REPLICA(20)([horz,T([0])([0.456]),vert,T([1])([0.14])]));

var c0 = CUBOID([0.7,0.3,2]);
var c1 = T([1])([0.3])(CUBOID([0.7,0.1,2]));
var c2 = T([0,1])([0.05,0.3+0.05])(CUBOID([0.65,0.1,2]));
var c3 = T([0,1])([0.1,0.3+0.1])(CUBOID([0.6,0.1,2]));
var c4 = T([0,1])([0.15,0.3+0.15])(CUBOID([0.55,0.1,2]));
var c00 = T([0,1,2])([0.65,-0.55,2])(R([0,2])([PI])(STRUCT([c0,c1,c2,c3,c4])));

var twost = T([0,1])([1.318,0.32])(STRUCT(REPLICA(2)([horz,T([0])([0.456]),vert,T([1])([0.14])])));

var lvl1center = STRUCT([lvl1c0,T([0,1])([9.17,2.9]),c00,twost]);

var pl10 = T([0,1])([16.8,2.35])(T([0])([-7])(CUBOID([50,0.1,2])));
var pl11 = T([0,1,2])([18.4,3.5,-2])(T([0])([-7])(CUBOID([50,0.1,6])));

var planes1 = STRUCT([pl10,pl11]);

var lvl1 = STRUCT([planes1,lvl1center,T([2])([-2])(lvl10),T([2])([2])(lvl10)]);

//DRAW(lvl1);

var levels = STRUCT([lvl0,lvl1]);

DRAW(levels);