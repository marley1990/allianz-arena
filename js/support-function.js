function translatePoints (arrayOfPoints,dx,dy,dz) {
  var result = [];
  var dx = dx || 0;
  var dy = dy || 0;
  var dz = dz || 0;
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i].concat([1])
    AffineTransformation = [[1,0,0,dx],[0,1,0,dy],[0,0,1,dz],[0,0,0,1]]
    var mul = numeric.dot(AffineTransformation,p)
    mul.pop()
    result=result.concat([mul])
  }
  return result
}

function scalePoints (arrayOfPoints,sx,sy,sz) {
  var result = [];
  var sx = sx || 1;
  var sy = sy || 1;
  var sz = sz || 1;
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i].concat([1])

    AffineTransformation = [[sx,0,0,0],[0,sy,0,0],[0,0,sz,0],[0,0,0,1]]
    var mul = numeric.dot(AffineTransformation,p)
    mul.pop()
    result=result.concat([mul])
  }
  return result
}

function rotY (arrayOfPoints,angle) {
  var a = angle
  var result = [];
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i]
    AffineTransformation = [[COS(a),0,-SIN(a)],[0,1,0],[SIN(a),0,COS(a)]]
    var mul = numeric.dot(AffineTransformation,p)
    result=result.concat([mul])
  }
  return result
}

function rotZ (arrayOfPoints,angle) {
  var a = angle
  var result = [];
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i]
    AffineTransformation = [[COS(a),-SIN(a),0],[SIN(a),COS(a),0],[0,0,1]]
    var mul = numeric.dot(AffineTransformation,p)
    result=result.concat([mul])
  }
  return result
}

function circle_points(r,h){
  var circle = [[r*1,0,h],[r*COS(PI/6),r*SIN(PI/6),h],[r*COS(PI/4),r*SIN(PI/4),h],[r*COS(PI/3),r*SIN(PI/3),h],
  [r*COS(PI/2),r*SIN(PI/2),h], [r*COS(2*PI/3),r*SIN(2*PI/3),h],[r*COS(3*PI/4),r*SIN(3*PI/4),h],
  [r*COS(5*PI/6),r*SIN(5*PI/6),h],[r*COS(PI),r*SIN(PI),h],[r*COS(7*PI/6),r*SIN(7*PI/6),h],[r*COS(5*PI/4),r*SIN(5*PI/4),h],
  [r*COS(4*PI/3),r*SIN(4*PI/3),h],[r*COS(3*PI/2),r*SIN(3*PI/2),h],[r*COS(5*PI/3),r*SIN(5*PI/3),h],[r*COS(7*PI/4),r*SIN(7*PI/4),h]
  ,[r*COS(11*PI/6),r*SIN(11*PI/6),h],[r*1,0,h]];

  return circle;
}



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

var circle = function (r,h,angolo) {
  return function (v) {
    var c = [r*COS(v[0]), r*SIN(v[0]),h];
    if(angolo == 0)
      return c;
    else{
      var x = COS(angolo)*c[0]+SIN(angolo)*c[2];
      var z = -SIN(angolo)*c[0]+COS(angolo)*c[2];
    return [c[0],c[1],z];
  }};
};

var circle_translate = function (r,h,angolo, translatex) {
  return function (v) {
    var c = [r*COS(v[0]), r*SIN(v[0]),h];
    if(angolo == 0)
      return [c[0]+translatex,c[1],c[2]];
    else
    return [c[0]+translatex,c[1],-c[0]*SIN(angolo)+c[2]*COS(angolo)];
  };
};

function view(object) {
  DRAW(MAP(object)(domain2))
}

function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
  //var nodeSeq =  new Array(lun);
  var nodeSeq = []
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2
  nodeSeq[lun-2] = i-2
  nodeSeq[lun-3] = i-2
  return nodeSeq
}

function genNUBS (controlPoints){
//var domain = INTERVALS(1)(50)
  var domain = INTERVALS(1)(20)
  var knots = generateKnot(controlPoints)
  var nubs = NUBS(S0)(2)(knots)(controlPoints)
  var curve = MAP(nubs)(domain)
  return [curve,nubs]
}

var CYLINDER = function(r,h){
  function C0(l){
  var s = CYL_SURFACE([r,h])(l);
  var b1 = DISK(r)(l);
  var b2 = T([2])([h])(b1);
  return STRUCT([s,b1,b2]);
  }
  return C0;
}

//rotate object and then translate resulted-oject
var Rotate_AND_Translate = function(axis,rotates){
  return function(axis, translate){
    return function(object){
      return T(axis)(translate)(R(axis)(rotates)(object));
    }
  }
}

function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}