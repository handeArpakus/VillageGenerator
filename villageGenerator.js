
var canvas;
var gl;

var visibility = "visible";

var maxNumTriangles = 10000;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;

var widthRiver;
var maxWidth=50;
var minWidth=50;

var numCircle;

var circleFirst = [0];
var numOfCircle = [0];
var circleNum = 0;

var houseFirst = [0];
var numOfHouse = [0];
var houseNum = 0;

var treeFirst = [0];
var numOfTree = [0];
var treeNum = 0;

var fruitFirst = [0];
var numOfFruit = [0];
var fruitNum = 0;

var numRock = 0;
var numOfRock = [];
numOfRock[0] = 0;
var rockFirst = [0];

var fruits = [];

var vilCount=0;
var rivCount=0;

var XCoor;
var YCoor;

var radius = 0.12;
var treeRadius = 0.09;

var circOrigArr=[ ];
var attrLocation = [ ];
var attrDistance = [ ];
var circleIndex;
var attrType=[];

var vBuffer ;
var vPosition;
var cBuffer;
var vColor

var program;

var attrKind = "house";

var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 0.8, 0.8, 0.8, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 1.0, 0.7, 0.0, 1.0 ),  // orange
	vec4( 1.0, 0.5, 0.0, 1.0 ),  // dark orange
	vec4( 0.6, 1.0, 0.5, 1.0 )	 //green for the tree	
];

var vertices = [
	vec2(0,0),
	vec2(0,0),
	vec2(0,0),
	vec2(0,0)
];

var verHouse = [
	vec2(0,0),
	vec2(0,0),
	vec2(0,0),
	vec2(0,0)
];

var verHouseHalf = [
	vec2(0,0),
	vec2(0,0),
	vec2(0,0),
	vec2(0,0)
];

var verHouseFlue = [
	vec2(0,0),
	vec2(0,0),
	vec2(0,0),
	vec2(0,0)
];


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 1, 0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    
    vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
	
	document.getElementById("attractor").addEventListener("click", getAttr);
	
	document.getElementById("circleNumber").addEventListener("click", getCircle);
	
	document.getElementById("riverButton").addEventListener("click", rivRegenerate);
	document.getElementById("riverButton").addEventListener("click", widthFunc);
	
	document.getElementById("village").addEventListener("click", regenerate);
	document.getElementById("village").addEventListener("click", drawVillage);
	
	document.getElementById("slidermin").onchange = function() {
		minWidth = (event.srcElement.value);  
    };

	document.getElementById("slidermax").onchange = function() {
		maxWidth = (event.srcElement.value); 
    };
	
	document.getElementById("appearance").onchange = function() {
		visibility = (event.srcElement.value);
			
		if(visibility==="visible")
		{
			for(var i=0; i<circOrigArr.length; i++)
			{
				var XCoorCrc = circOrigArr[i][0];
				var YCoorCrc = circOrigArr[i][1];
				drawCircle(XCoorCrc, YCoorCrc, 5);
			}
		}
		else
		{	
			circleFirst = [0];
			numOfCircle = [0];
			circleNum = 0;
			for(var i=0; i<circOrigArr.length; i++)
			{
				var XCoorCrc = circOrigArr[i][0];
				var YCoorCrc = circOrigArr[i][1];
				drawCircle(XCoorCrc, YCoorCrc, 3);
			}
			
		}
	};
	
	function rivRegenerate() //when the draw river button is clicked second time regenerate the whole scene
	{
		if(rivCount>0){
			
			circleFirst = [0];
			numOfCircle = [0];
			circleNum = 0;
			
			houseFirst = [0];
			numOfHouse = [0];
			houseNum = 0;

			treeFirst = [0];
			numOfTree = [0];
			treeNum = 0;

			fruitFirst = [0];
			numOfFruit = [0];
			fruitNum = 0;

			numRock = 0;
			numOfRock = [];
			numOfRock[0] = 0;
			rockFirst = [0];
			
			circOrigArr=[ ];
			attrLocation = [ ];
			attrDistance = [ ];
			circleIndex;
			attrType=[];
		 }
	}
	
	function regenerate() //when the village button is clicked the second time, regenerate the entities
	{
		 if(vilCount>0){
			houseFirst = [0];
			numOfHouse = [0];
			houseNum = 0;

			treeFirst = [0];
			numOfTree = [0];
			treeNum = 0;

			fruitFirst = [0];
			numOfFruit = [0];
			fruitNum = 0;

			numRock = 0;
			numOfRock = [];
			numOfRock[0] = 0;
			rockFirst = [0];
		 }
	}

////////////////////////////////////////////////////////DRAWING RIVER/////////////////////////////////////////////	
	function drawRiver(col){
		
		riverFirstIndex = index;
		gl.clear( gl.COLOR_BUFFER_BIT );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(vertices[0]));
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+1), flatten(vertices[1]));
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+2), flatten(vertices[3]));
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+3), flatten(vertices[2]));
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		index+=4;
		
		t = vec4(colors[col]);
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-4), flatten(t));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-3), flatten(t));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-2), flatten(t));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-1), flatten(t));
		
		riverLastIndex = index;
		
		render();
	}
	
	function widthFunc()
	{		
		rivCount++;
		var result = Math.random()*(maxWidth-minWidth);
		widthRiver = Math.round(result + parseFloat(minWidth));
		drawRiver(3);
		
		vertices[0] = vec2( -widthRiver/200, -1 );
        vertices[1] =  vec2(  -widthRiver/200,  1 );
        vertices[2] = vec2( widthRiver/200, -1 );
        vertices[3] = vec2( widthRiver/200, 1);
		drawRiver(4);
		render();
	}
    	
////////////////////////////////////////////////////////DRAWING CIRCLE/////////////////////////////////////////////
	function getCircle()
	{
		numCircle = document.getElementById("circleNum").value;
		var c=0
		
		var maxCoor=1-radius-(radius/2);
		var minCoor=-1+radius+(radius/2);
		while(c<numCircle){
			
			var collision=true;
			var XCoor = Math.random() * (+maxCoor - minCoor) + minCoor;
			
			var YCoor = Math.random() * (+maxCoor - minCoor) + minCoor;
				
			//check the collision with the river
			if(XCoor>0)
			{
				if(XCoor - radius < (widthRiver/200)+(radius/2))
				{
					collision=false;
				}
				if( XCoor < (widthRiver/200)+(radius/2))
				{	
					collision=false;
				}
			}
			else{
				if(XCoor + radius > (-widthRiver/200)-(radius/2))
				{	
					collision=false;
				}
				if(  XCoor > (-widthRiver/200)-(radius/2))
				{
					collision=false;
				}
			}
			if(collision && circOrigArr.length!=0)
			{
				for(var i=0; i<circOrigArr.length; i++)
				{
					var x1 = circOrigArr[i][0];
					var y1 = circOrigArr[i][1];
					
					var h = radius*2;
					var n = x1-XCoor;
					var d = y1-YCoor;
					
					var res = Math.sqrt( ( XCoor-x1 ) * ( XCoor-x1 )  + ( YCoor-y1 ) * ( YCoor-y1 ) )
					
					if( res < ( radius + radius+(radius/1.10) )){
						collision=false;
					}
					
				}
			}
			
			if(collision)
			{
				var origCoor = vec2(XCoor, YCoor);
				circOrigArr.push(origCoor);
				var visiblityCol;
				if(visibility === "visible")
					visiblityCol=5;
				else
					visiblityCol=3;
				drawCircle(XCoor, YCoor, visiblityCol);
				c++;
			}
			
		}	
	}
	

	function drawCircle(x, y, col) {
		circleFirst[circleNum]=index;
		circleFirstIndex = index;
		numOfCircle[circleNum] = 0;
		var center = vec2(x, y); 
		var r = 360;
		
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(center));
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		
		//t = vec4(colors[3]); 
		t = vec4(colors[col]); //for making the circles visible
		
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

		for (i = 0; i <= 32; i++){
			var crc;
			var agl = (i-1)/32 * 2*Math.PI;
			var crcResult = vec2((r* Math.cos(agl)*2/canvas.width -1)*radius, (2*(canvas.height-r*Math.sin(agl))/canvas.height-1)*radius) ;
			crc = vec2(crcResult[0]+center[0]+radius,crcResult[1]+center[1]-radius);

			gl.clear( gl.COLOR_BUFFER_BIT );
			gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(crc));
			
			//t = vec4(colors[3]); 
			t = vec4(colors[col]); //for making the circles visible

			gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
			gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
			numOfCircle[circleNum]++;
			index++;
		}


		circleLastIndex = index;
		circleNum++;
		render();

	}		
  
///////////////////////////////GET ATTRACTOR///////////////////////////
	function getAttr() {
		attrKind = (event.srcElement.value);
	
    };
	canvas.addEventListener("mousedown", function(event){ //attractor location
        var t = vec2(2*event.clientX/canvas.width-1, 
           2*(canvas.height-event.clientY)/canvas.height-1);
		
		attrLocation.push(t);
		attrType.push(attrKind);
		
    } );

////////////////////////////////////////////////////////DRAWING VILLAGE/////////////////////////////////////////////
	
	function drawVillage()
	{
		vilCount++;
		var at;
		var totalDist=0;
		
		//for each circle in the canvas
		for(var i=0; i<circOrigArr.length; i++)
		{
			totalDist=0;
			attrDistance=[];
			//use all attractor on the canvas
			for(var j=0; j<attrLocation.length; j++)
			{
				//calculate the disatnace between the circle and the attractor
				var xDist = circOrigArr[i][0] - attrLocation[j][0];
				var yDist = circOrigArr[i][1] - attrLocation[j][1];
				var dist = Math.sqrt(xDist*xDist + yDist*yDist);
				
				attrDistance.push (dist);
				totalDist = totalDist+dist;
				
			}
			//for probability: sort the distance array and reverse sort so, the longest gap have the closest attractor
			var orig = attrDistance;
			var sorted = attrDistance.sort(function(a, b){return b - a});
			var reversed = sorted.reverse();

			
			minNum=0;
			maxNum=totalDist; //random number can be maximum the total of the distances 0----------total
			var limit=0;
			
			//calculate the random number
			var vil = Math.random() * (+maxNum - minNum) + minNum;
			
			//probability part
			
			for(var k=0; k<orig.length; k++)
			{
				if(limit <= vil )
				{
					if( vil <= reversed[k]+limit)
					{
					
						for(var m=0; m<orig.length; m++)
						{
							if(sorted[k]===orig[m])
							{
								at=attrType[m];
								
								if(at==="house")
									drawHouse(i);
								else if(at==="tree")
									drawTree(i);
								else if(at==="rock")
									drawRock(i);
							}
						}
					}
					
				}
				limit=limit+reversed[k]; 
			}			
		}
		
	}
////////////////////////////////////////////////////////DRAWING HOUSE/////////////////////////////////////////////
	function drawHouse(circIndex)
	{
		thetaLoc = gl.getUniformLocation( program, "theta" );
		
		var houseX = circOrigArr[circIndex][0];
		var houseY = circOrigArr[circIndex][1];
		
		verHouse[0] = vec2( houseX-radius+0.035, houseY-radius+0.035 );
		verHouse[1] = vec2( houseX-radius+0.035, houseY+radius-0.035 );
		verHouse[2] = vec2( houseX+radius-0.035, houseY-radius+0.035 );
		verHouse[3] = vec2( houseX+radius-0.035, houseY+radius-0.035 );
		drawingHouse(6, verHouse);
		
		//the darker half of the roof		
		verHouseHalf[0] = vec2( houseX-radius+0.035, houseY );
		verHouseHalf[1] = vec2( houseX-radius+0.035, houseY+radius-0.035 );
		verHouseHalf[2] = vec2( houseX+radius-0.035, houseY );
		verHouseHalf[3] = vec2( houseX+radius-0.035, houseY+radius-0.035 );
		drawingHouse(7, verHouseHalf);
		
		//the flue of the roof
		verHouseFlue[0] = vec2( houseX+(radius/2)-0.05, houseY+0.04 );
		verHouseFlue[1] = vec2( houseX+(radius/2)-0.05, houseY+radius-0.05 );
		verHouseFlue[2] = vec2( houseX+(radius/2)+0.01, houseY+0.04 );
		verHouseFlue[3] = vec2( houseX+(radius/2)+0.01, houseY+radius-0.05 );
		drawingHouse(0, verHouseFlue);
	}
	
	function drawingHouse(col, vert)
	{
		houseFirstIndex = index;
		houseFirst[houseNum]=index;
		numOfHouse[houseNum]=0;
		
		gl.clear( gl.COLOR_BUFFER_BIT );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(vert[0]));
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+1), flatten(vert[1]));
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+2), flatten(vert[3]));
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+3), flatten(vert[2]));
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		index+=4;
		t = vec4(colors[col]);
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-4), flatten(t));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-3), flatten(t));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-2), flatten(t));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-1), flatten(t));
		
		
		numOfHouse[houseNum]+=4;
		
		houseLastIndex = index;
		houseNum++;
		
		render();
		
		
	}

	////////////////////////////////////////////////////////DRAWING TREE/////////////////////////////////////////////
	function drawTree(circIndex)
	{
		var treeX = circOrigArr[circIndex][0]; 
		var treeY = circOrigArr[circIndex][1];
		
		drawingTree(treeX, treeY);
	}
	
	function drawingTree(x, y){
		treeFirst[treeNum]=index;
		numOfTree[treeNum] = 0;
		var orig = vec2(x, y); 
		var r = 360;
		
		for (i = 0; i <= 32; i++){
			
			var newcircle;
			var angle = (i-1)/32 * 2*Math.PI;
			var here = vec2((r* Math.cos(angle)*2/canvas.width -1)*treeRadius, (2*(canvas.height-r*Math.sin(angle))/canvas.height-1)*treeRadius) ;
			newcircle = vec2(here[0]+orig[0]+treeRadius,here[1]+orig[1]-treeRadius);

			gl.clear( gl.COLOR_BUFFER_BIT );
			gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(newcircle));
			t = vec4(colors[8]);
			
			gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
			gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
			
			numOfTree[treeNum]++;
			index++;
			
		}
		
		treeNum++;
		
		fruits = [];
		for(var i=0; i<5; i++)
		{
			var check = drawFruits(x,y);
			if(!check)
				i--;
		}
		render();
	}
/////////////////////////////////////////drawing fruits	
	function drawFruits(x,y){
		var fruitRadius = 0.013;
		
		fruitFirst[fruitNum]=index;
		numOfFruit[fruitNum] = 0;
		
		var collisionFruit=true;		
		var XFCoor;
		var YFCoor;
			
		var XmaxCoor = x+treeRadius-fruitRadius-0.035;
		var XminCoor = x-treeRadius+0.035;
		
		var YmaxCoor = y+treeRadius-fruitRadius-0.035;
		var YminCoor = y-treeRadius+0.035;
		
		XFCoor = Math.random() * (+XmaxCoor - XminCoor) + XminCoor;
		
		YFCoor = Math.random() * (+YmaxCoor - YminCoor) + YminCoor;
		
		
		
		if(fruits.length>0)
		{
			for(var j=0; j<fruits.length; j++)
			{
				var x1 = fruits[j][0];
				var y1 = fruits[j][1];
				
				var res = Math.sqrt( ( XFCoor-x1 ) * ( XFCoor-x1 )  + ( YFCoor-y1 ) * ( YFCoor-y1 ) )
				
				if( res < ( fruitRadius + fruitRadius +(fruitRadius/1.2))){
					collisionFruit=false;
				}
				
			}
		}
		if(collisionFruit)
		{
			var orig = vec2(XFCoor, YFCoor);
			fruits.push(vec2(XFCoor, YFCoor));
			var c = 360;
			
			for (i = 0; i <= 32; i++){
				
				var crc;
				var agl = (i-1)/32 * 2*Math.PI;
				var crcResult = vec2((c* Math.cos(agl)*2/canvas.width -1)*fruitRadius, (2*(canvas.height-c*Math.sin(agl))/canvas.height-1)*fruitRadius) ;
				crc = vec2(crcResult[0]+orig[0]+fruitRadius,crcResult[1]+orig[1]-fruitRadius);

				gl.clear( gl.COLOR_BUFFER_BIT );
				gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
				gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(crc));
				
				t = vec4(colors[1]);
				gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
				gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
				numOfFruit[fruitNum]++;
				index++;

			}
			
			fruitNum++;		
			render();
		}
		return collisionFruit;
	}

	/////////////////////////////////////////////////////////DRAWING ROCK/////////////////////////////////////////////
	function drawRock(circIndex)
	{
	
		numOfRock[numRock] = 0;
		rockFirst[numRock] = index;
		
		rockCoor = [];

		var checkRock =false;

		var xCoor=circOrigArr[circIndex][0];
		var yCoor=circOrigArr[circIndex][1];
		
		var oneX;
		var oneY;
		
		var twoX;
		var twoY;
		
		var threeX;
		var threeY;
		
		var fourX;
		var fourY;
		
		var fiveX;
		var fiveY;
		
		
		
		while(!checkRock) //point 1
		{
			var maxX=xCoor+radius;
			var minX=xCoor;
			
			var maxY=yCoor+radius;
			var minY=yCoor;
			
			
			oneX = Math.random() * (maxX - minX) + minX;			
			oneY = Math.random() * (maxY - minY) + minY;
			
			var res = Math.sqrt( ( oneX-xCoor ) * ( oneX-xCoor )  + ( oneY-yCoor ) * ( oneY-yCoor ) );
				
			if( res <  radius )
				checkRock=true;
			
		}
		
		rockCoor = vec2(oneX, oneY);

		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(rockCoor));

		t = vec4(colors[2]);
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

		numOfRock[numRock]++;
		index++;
		
		checkRock=false;
		
		while(!checkRock) //point 2
		{
			var maxX=xCoor;
			var minX=xCoor-radius;
			
			var maxY=yCoor+radius;
			var minY=yCoor;
			
			twoX = Math.random() * (+maxX - minX) + minX;			
			twoY = Math.random() * (+maxY - minY) + minY;
			
			var res = Math.sqrt( ( twoX-xCoor ) * ( twoX-xCoor )  + ( twoY-yCoor ) * ( twoY-yCoor ) );
				
				if( res <  radius)
					checkRock=true;
			
		}
		
		rockCoor = vec2(twoX, twoY);

		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(rockCoor));

		t = vec4(colors[2]);
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

		numOfRock[numRock]++;
		index++;
		
		checkRock=false;
		
		while(!checkRock) //point 3
		{
			var maxX=xCoor;
			var minX=xCoor-radius;
			
			var maxY=yCoor;
			var minY=yCoor-radius;
			
			
			threeX = Math.random() * (+maxX - minX) + minX;			
			threeY = Math.random() * (+maxY - minY) + minY;
			
			var res = Math.sqrt( ( threeX-xCoor ) * ( threeX-xCoor )  + ( threeY-yCoor ) * ( threeY-yCoor ) );
				
				if( res <  radius)
					checkRock=true;
			
		}
		
		rockCoor = vec2(threeX, threeY);

		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(rockCoor));

		t = vec4(colors[2]);
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

		numOfRock[numRock]++;
		index++;
		
		checkRock=false;
		
		while(!checkRock) //point 4
		{
			var maxX=xCoor+radius;
			var minX=xCoor;
			
			var maxY=yCoor;
			var minY=yCoor-radius;
			
			fourX = Math.random() * (+maxX - minX) + minX;			
			fourY = Math.random() * (+maxY - minY) + minY;
			
			var res = Math.sqrt( ( fourX-xCoor ) * ( fourX-xCoor )  + ( fourY-yCoor ) * ( fourY-yCoor ) );
				
				if( res <  radius)
					checkRock=true;
			
		}
		
		rockCoor = vec2(fourX, fourY);

		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(rockCoor));

		t = vec4(colors[2]);
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

		numOfRock[numRock]++;
		index++;
		
		checkRock=false;
		
		while(!checkRock) //point 5
		{
			var maxX=xCoor+radius;
			var minX=xCoor;
			
			var maxY=yCoor;
			var minY=yCoor-radius;
			
			fiveX = Math.random() * (+maxX - minX) + minX;			
			fiveY = Math.random() * (+maxY - minY) + minY;
			
			var res = Math.sqrt( ( fiveX-xCoor ) * ( fiveX-xCoor )  + ( fiveY-yCoor ) * ( fiveY-yCoor ) );
				
				if( res <  radius)
					checkRock=true;
			
		}
		
		rockCoor = vec2(fiveX, fiveY);

		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(rockCoor));

		t = vec4(colors[2]);
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

		numOfRock[numRock]++;
		index++;
		
		/*for(var i=0; i<4; i++)
		{
			var XmaxCoor = xCoor+radius-0.2;
			var XminCoor = xCoor-radius+0.2;
			
			var YmaxCoor = yCoor+radius-0.2;
			var YminCoor = yCoor-radius+0.2;
			
			var XRCoor = Math.random() * (+XmaxCoor - XminCoor) + XminCoor;
			
			var YRCoor = Math.random() * (+YmaxCoor - YminCoor) + YminCoor;
			
			rockCoor = vec2(XRCoor, YRCoor);

			gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(rockCoor));

			t = vec4(colors[2]);
			
			gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
			gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

			numOfRock[numRock]++;
			index++;
		
		}*/
		numRock++;
	}
}
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	
    for(var i = riverFirstIndex; i<riverLastIndex; i+=4)
        gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );

	for( var i = 0; i < circleNum; i++)  
		gl.drawArrays( gl.LINE_LOOP, circleFirst[i], numOfCircle[i] );
	
	for(var i = 0; i<houseNum; i++)
        gl.drawArrays( gl.TRIANGLE_FAN, houseFirst[i], numOfHouse[i] );
	
	for( var i = 0; i < treeNum; i++)  
			gl.drawArrays( gl.TRIANGLE_FAN, treeFirst[i], numOfTree[i] );
		
	for( var i = 0; i < fruitNum; i++)  
			gl.drawArrays( gl.TRIANGLE_FAN, fruitFirst[i], numOfFruit[i] );
		
	for(var i=0; i<numRock; i++) {
		gl.drawArrays( gl.TRIANGLE_FAN, rockFirst[i], numOfRock[i] );
    }
		
    window.requestAnimFrame(render);


}