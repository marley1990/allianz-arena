// import support-function.js

var st0 = T([0,1])([-0.3,0.3])(stairGen(3.5,4.5,15,0.3,2));

var st1 = T([0,1,2])([-7+0.2,0.3,1])(R([0,2])([PI])(stairGen(2.3,3,10,0.2,2)));
var st2 = T([0,1,2])([-7-3-2.3,2.3+0.3,1])(R([0,2])([PI])(stairGen(1.8,2.3,10,0.2,2)));

var stairs = STRUCT([st0,st1,st2]);

var pl0 = T([0])([-7])(CUBOID([7,0.3,2]));
var pl1 = T([0,1])([-3-7-2.3-0.2,2.3])(CUBOID([3,0.3,2]));
var pl2 = T([0,1])([-140-7-3-2.3-2.3+0.2,2+2+0.2])(CUBOID([140,0.3,2]));

var planes = STRUCT([pl0,pl1,pl2]);

var lvl0 = STRUCT([planes,stairs]);

DRAW(lvl0);

