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

