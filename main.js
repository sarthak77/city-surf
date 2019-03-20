main();

//game controlling variables
var score;
var dead;
var end;
var endtime;
var jumpdisable;
var jumptime;
var highjumptime;
var highjump;
var switchcoins;
var ontrain;
var endcor;
var hoverbonus;
var baw;
var lighton;

//array of objects
var metro;
var metrono;
var c;
var sbarr;
var abarr;
var fbarr;
var jbarr;
var harr;
var larr;

//no of each type of objects
var cno;
var pil;
var pno;
var sno;
var abno;
var fbno;
var jbno;
var hno;
var lno;

//other objects
var trk;
var w;
var camerazcor;
var character;
var pol;
var d;

//textures
var texturedog;
var texturepolice;
var texturehover;
var textureshoe;
var texturefly;
var textureplayer;



//when game ends
function gameover()
{
	//hide canvas
	var x=document.getElementById("glcanvas");
	x.style.display="none";

	//hide running score
	var x=document.getElementById("search3");
	x.id="search4";

	//display image
	document.getElementById("end").innerHTML = "<img src='./assets/end.png' alt='GAME OVER' class='center' height='550' width='720'/>"
}



//checks collision of different objects
function collisioncheck()
{
	//player and coins
	for(var i=0;i<cno;i++)
	{
		if(distance(character.getpos(),c[i].getpos())<2)
		{
			score+=10;
			c.splice(i,1);
			cno-=1;
		}
	}

	//player and sb
	for(var i=0;i<sno;i++)
	{
		if(distance(character.getpos(),sbarr[i].getpos())<2)
		{
			sbarr.splice(i,1);
			dead=1;
			end+=1;
			sno-=1;
			score-=10;
		}
	}

	//player and ab
	for (var i=0;i<abno;i++)
	{
		if(distance(character.getpos(),abarr[i].getpos())<4 && character.getpos()[1]>=-2.1 && character.getpos()[0]==abarr[i].getpos()[0])
		{
			abarr.splice(i,1);
			dead=1;
			end+=1;
			abno-=1;
			score-=10;
		}
	}


	var count=0;
	//player and train
	for(var i=0;i<metrono;i++)
	{

		//front face collision
		if(distance(character.getpos(),metro[i].getpos())<2)
		{
			gameover();
		}


		var temp=JSON.parse(JSON.stringify(metro[i].getpos()));
		var temp2=JSON.parse(JSON.stringify(character.getpos()));

		//landing on train
		if((temp2[0]==temp[0] && temp2[1]-temp[1]>2 && temp2[1]-temp[1]<2.1) && ((temp2[2]-temp[2]<2 && temp2[2]-temp[2]>0) || (temp[2]-temp2[2]<41 && temp[2]-temp2[2]>0)))
		{
			count+=1;
			character.tick(100,1);
		}
		if(count>0)
		{
			character.tick(100,1);
			ontrain=1;
		}
		else
		{
			ontrain=0;
		}

		// var temp=JSON.parse(JSON.stringify(metro[i].getpos()));
		// var temp2=JSON.parse(JSON.stringify(character.getpos()));
		//side face collision
		if((temp2[0]==temp[0] && temp[1]-temp2[1]>0) && ((temp2[2]-temp[2]<2 && temp2[2]-temp[2]>0) || (temp[2]-temp2[2]<41 && temp[2]-temp2[2]>0)))
		{
			gameover();
		}
	}



	//player and tunnel
	for(var i=0;i<lno;i++)
	{
		var temp=JSON.parse(JSON.stringify(larr[i].getpos()));
		var temp2=JSON.parse(JSON.stringify(character.getpos()));

		if(((temp2[2]-temp[2]<2 && temp2[2]-temp[2]>0) || (temp[2]-temp2[2]<101 && temp[2]-temp2[2]>0)) && temp2[1]>5)
		{
			gameover();
		}
	}



	//plater and pillar
	for(var i=0;i<pno;i++)
	{
		var temp=JSON.parse(JSON.stringify(pil[i].getpos()));
		temp[0]+=3;
		if(distance(character.getpos(),temp)<2)
		{
			gameover();
		}

		temp[0]-=6;
		if(distance(character.getpos(),temp)<2)
		{
			gameover();
		}

		temp[0]+=3;
		temp[1]+=4;
		if(distance(character.getpos(),temp)<2)
		{
			gameover();
		}
	}



	//player and fb
	for(var i=0;i<fbno;i++)
	{
		if(distance(character.getpos(),fbarr[i].getpos())<2)
		{
			fbarr.splice(i,1);
			fbno-=1;
			score+=20;
			jumpdisable=1;
			character.tick("f",ontrain)
		}
	}


	//player and hb
	for(var i=0;i<hno;i++)
	{
		if(distance(character.getpos(),harr[i].getpos())<1.5)
		{
			harr.splice(i,1);
			hno-=1;
			score+=20;
			hoverbonus+=1;
		}
	}



	//player and jb
	for(var i=0;i<jbno;i++)
	{
		if(distance(character.getpos(),jbarr[i].getpos())<2)
		{
			jbarr.splice(i,1);
			jbno-=1;
			score+=20;
			highjump=1;
		}
	}
}



//distance formula
function distance(p1,p2)
{
	var dx=(p1[0]-p2[0])*(p1[0]-p2[0]);
	var dy=(p1[1]-p2[1])*(p1[1]-p2[1]);
	var dz=(p1[2]-p2[2])*(p1[2]-p2[2]);
	var d=dx+dy+dz;
	return Math.sqrt(d);
}



//tick elements
function tick()
{

	//update score
	score+=1;
	document.getElementById("search3").innerHTML=score;


	//endgame when won
	if(character.getpos()[2]<endcor)
	{
		//hide canvas
		var x=document.getElementById("glcanvas");
		x.style.display="none";

		//hide running score
		var x=document.getElementById("search3");
		x.id="search4";

		//display image
		document.getElementById("end").innerHTML = "<img src='./assets/win.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"

	}


	//fly power up
	if(jumpdisable==1)
	{
		if(switchcoins==0)
		{
			for(var i=0;i<cno;i++)
			{
				temp=c[i].getpos();
				temp[1]+=6.4;
			}
		}
		switchcoins=2;
	}
	else if(switchcoins==1)
	{
		for(var i=0;i<cno;i++)
		{
			temp=c[i].getpos();
			temp[1]-=6.4;
		}
		switchcoins=0;
	}


	//condition for game over
	if(end>1)
	{
		gameover();
	}


	var x=Date.now();

	//update end after 10s
	if(x-endtime>1000*10)
	{
		// console.log("end updates");
		end=0;
		endtime=x;
	}


	//update fly power up
	if(x-jumptime>1000*20)
	{
		jumpdisable=0;
		jumptime=x;

		if(switchcoins==2)
		{
			switchcoins=1;
		}
	}


	//update highjump powerup
	if(x-highjumptime>1000*20)
	{
		highjump=0;
		highjumptime=x;
	}


	///////////////////////////////////////////////////////
	///regular movements
	///////////////////////////////////////////////////////

		//move train
		for(var i=0;i<metrono;i++)
	{
		metro[i].tick( Math.random());
	}

	//rotate powerup
	for(var i=0;i<fbno;i++)
	{
		fbarr[i].tick();
	}

	//rotate coins
	for(var i=0;i<cno;i++)
	{
		c[i].tick();
	}

	//rotate power up
	for(var i=0;i<jbno;i++)
	{
		jbarr[i].tick();
	}

	//rotate power up
	for(var i=0;i<hno;i++)
	{
		harr[i].tick();
	}


	//movements for people
	character.tick(jumpdisable,ontrain);
	pol.tick(character.getpos(),dead,end);
	d.tick(character.getpos(),dead,end);


	//update dead
	if(dead==1)
	{
		dead=0;
	}
}


//function for taking user input
function userinput()
{
	window.addEventListener("keydown", function (event) {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}

		switch (event.key) {
			case "b":
				// code for " " key press.
				if(baw==0)
				{
					baw=1;
				}
				else
				{
					baw=0;
				}
				break;
			case "l":
				// code for " " key press.
				if(lighton==0)
				{
					lighton=1;
				}
				else
				{
					lighton=0;
				}
				break;
			case " ":
				// code for " " key press.
				console.log(hoverbonus);
				if(hoverbonus>0)
				{
					end-=1;
					hoverbonus-=1;
				}
				break;
			case "ArrowDown":
				// code for "down arrow" key press.
				character.tick("d",ontrain);
				break;
			case "ArrowLeft":
				// code for "left arrow" key press.
				pol.tick("l");
				d.tick("l");
				character.tick("l",ontrain);
				if(character.getpos()[0]==-6)
				{
					dead=1;
					end+=1;
					pol.tick("r");
					d.tick("r");
					character.tick("r",ontrain);
				}
				break;
			case "ArrowRight":
				// code for "right arrow" key press.
				pol.tick("r");
				d.tick("r");
				character.tick("r",ontrain);
				if(character.getpos()[0]==6)
				{
					dead=1;
					end+=1;
					pol.tick("l");
					d.tick("l");
					character.tick("l",ontrain);
				}
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	}, true);
	// the last option dispatches the event to the listener first,
	// then dispatches event to window
}


//jump function
function jump()
{
	window.addEventListener("keydown", function (event) {

		switch (event.key) {
			case "ArrowUp":

				if(highjump==0)
				{
					character.tick("u",ontrain);
				}
				else
				{
					character.tick("hj",ontrain);

				}
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		}
		event.preventDefault();
	}, true);
}


//initialises objects
function init(gl)
{
	endtime=0;
	camerazcor=10;
	score=0;
	dead=0;
	end=0;
	jumpdisable=0;
	jumptime=0;
	highjumptime=0;
	highjump=0;
	switchcoins=0;
	ontrain=0;
	hoverbonus=0;
	baw=0;
	lighton=0;

	metrono=40;
	// cno=1000;
	cno=10;
	pno=25;
	sno=20;
	abno=20;
	fbno=10;
	jbno=10;
	hno=30;
	lno=30;

	fbarr=[];
	jbarr=[];
	pil=[];
	c=[];
	metro=[];
	sbarr=[];
	abarr=[];
	harr=[];
	larr=[];


	//trains
	var mz=-500;
	var mx=0;
	for(var i=0;i<metrono;i++)
	{
		var mx = Math.floor((Math.random() * 3));
		// console.log(mx);
		if(mx==0)
		{
			mx=-3;
		}
		else if(mx==1)
		{
			mx=0;
		}
		else if(mx==2)
		{
			mx=3
		}

		t = new cube(gl, [mx,-2,mz]);

		mz -= Math.floor((Math.random() * 30)+70);//random between 70 and 100
		metro.push(t);

	}

	//update endcor when to end game
	endcor=mz;


	//coins
	var cy=-1;
	var cz=-200;
	for(var i=0;i<cno;i++)
	{
		for(var j=0;j<20;j++)
		{
			var cx = (Math.floor((Math.random() * 3))-1)*3;
			t2 = new coins(gl, [cx,cy,cz]);
			c.push(t2);
			cz-=2;
		}
		cz -= Math.floor((Math.random() * 30)+20);
		cy=Math.floor((Math.random() * 4))-1
	}

	//speed brkrs
	sz=-400;
	sx=0;
	for(var i=0;i<sno;i++)
	{
		var sx = Math.floor((Math.random() * 3));
		if(sx==0)
		{
			sx=-3;
		}
		else if(sx==1)
		{
			sx=0;
		}
		else if(sx==2)
		{
			sx=3
		}
		t3 = new sb(gl, [sx,-2,sz]);
		sbarr.push(t3);
		sz-=Math.floor((Math.random() * 50)+100);//random between 50 and 100
	}


	//air breakers
	az=-350;
	ax=0;
	for(var i=0;i<abno;i++)
	{
		var ax = Math.floor((Math.random() * 3));
		// console.log(mx);
		if(ax==0)
		{
			ax=-3;
		}
		else if(ax==1)
		{
			ax=0;
		}
		else if(ax==2)
		{
			ax=3
		}
		t4 = new ab(gl, [ax,-2,az]);
		abarr.push(t4);
		az-=Math.floor((Math.random() * 50)+100);//random between 50 and 100
	}


	//fly boosts
	fz=-700;
	fx=0;
	for(var i=0;i<fbno;i++)
	{
		var fx = Math.floor((Math.random() * 3));
		// console.log(mx);
		if(fx==0)
		{
			fx=-3;
		}
		else if(fx==1)
		{
			fx=0;
		}
		else if(fx==2)
		{
			fx=3
		}
		// t4 = new ab(gl, [0,-2,-5]);
		t5 = new fly(gl, [fx,-1,fz]);
		fbarr.push(t5);
		fz-=Math.floor((Math.random() * 50)+300);

	}


	//hover boosts
	hz=-200;
	hx=0;
	for(var i=0;i<hno;i++)
	{
		var hx = Math.floor((Math.random() * 3));
		// console.log(mx);
		if(hx==0)
		{
			hx=-3;
		}
		else if(hx==1)
		{
			hx=0;
		}
		else if(hx==2)
		{
			hx=3
		}
		// t4 = new ab(gl, [0,-2,-5]);
		t7 = new h(gl, [hx,-1,hz]);
		harr.push(t7);
		hz-=Math.floor((Math.random() * 50)+100);

	}


	//jump boosts
	jz=-800;
	jx=0;
	for(var i=0;i<jbno;i++)
	{
		var jx = Math.floor((Math.random() * 3));
		if(jx==0)
		{
			jx=-3;
		}
		else if(jx==1)
		{
			jx=0;
		}
		else if(jx==2)
		{
			jx=3
		}
		t6 = new jb(gl, [jx,-1,jz]);
		jbarr.push(t6);
		jz-=Math.floor((Math.random() * 50)+300);//random between 50 and 100

	}


	//pillars
	pz=-200;
	for(var i=0;i<pno;i++)
	{
		t3 = new p(gl, [0,-2,pz]);
		pil.push(t3);
		pz-=Math.floor((Math.random() * 100)+100);//random between 100 and 200
	}


	//lights
	lz=-100;
	for(var i=0;i<lno;i++)
	{
		t3 = new l(gl, [0,-2,lz]);
		larr.push(t3);
		lz-=Math.floor((Math.random() * 200)+150);//random between 100 and 200
	}


	//other objects
	character=new player(gl,[0,-2,2]);
	pol=new police(gl,[0,-2,9]);
	d=new dog(gl,[3,-2,5]);
	trk=new track(gl,[0,-4,0]);
	w=new wall(gl,[0,0,0]);

}


//main function
function main() {

	const canvas = document.querySelector('#glcanvas');
	const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

	// If we don't have a GL context, give up now
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}


	//call the init function
	init(gl);

	// Vertex shader program
	const vsSource = `
	attribute vec4 aVertexPosition;
	attribute vec4 aVertexColor;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	varying lowp vec4 vColor;

	void main(void) {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = aVertexColor;
	}
	`;

	// Fragment shader program
	const fsSource = `
	varying lowp vec4 vColor;

	void main(void) {
		gl_FragColor = vColor;
	}
	`;

	// Initialize a shader program; this is where all the lighting
	// for the vertices and so forth is established.
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

	const vsSource2 = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, -0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
	`;


	// Fragment shader program

	const fsSource2 = `
	varying highp vec2 vTextureCoord;
	uniform sampler2D uSampler;
	void main(void) {
		gl_FragColor = texture2D(uSampler, vTextureCoord);
	}
	`;

	const shaderProgram2 = initShaderProgram(gl, vsSource2, fsSource2);



	const fsSourcebw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;
    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);
        gl_FragColor = vec4(grayscale, vColor.a);
    }
  `;

  const shaderProgram3 = initShaderProgram(gl, vsSource, fsSourcebw);


  const fsSourceTexbw = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;
  uniform sampler2D uSampler;
  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    
    vec3 color = texelColor.rgb;
    float gray = (color.r + color.g + color.b) / 3.0;
    vec3 grayscale = vec3(gray);
    gl_FragColor = vec4(grayscale , texelColor.a);
  }
`;

const shaderProgram4 = initShaderProgram(gl, vsSource2, fsSourceTexbw);



	// Collect all the info needed to use the shader program.
	// Look up which attributes our shader program is using
	// for aVertexPosition, aVevrtexColor and also
	// look up uniform locations.
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		},
	};

	const programInfo2 = {
		program: shaderProgram2,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
			textureCoord: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
			uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
		},
	};


	

	const programInfo3 = {
		program: shaderProgram3,
		attribLocations: {
		  vertexPosition: gl.getAttribLocation(shaderProgram3, 'aVertexPosition'),
		  vertexColor: gl.getAttribLocation(shaderProgram3, 'aVertexColor'),
		},
		uniformLocations: {
		  projectionMatrix: gl.getUniformLocation(shaderProgram3, 'uProjectionMatrix'),
		  modelViewMatrix: gl.getUniformLocation(shaderProgram3, 'uModelViewMatrix'),
		},
	  };


	const programInfo4 = {
		program: shaderProgram4,
		attribLocations: {
		  vertexPosition: gl.getAttribLocation(shaderProgram4, 'aVertexPosition'),
		  vertexNormal: gl.getAttribLocation(shaderProgram4, 'aVertexNormal'),
		  textureCoord: gl.getAttribLocation(shaderProgram4, 'aTextureCoord'),
		},
		uniformLocations: {
		  projectionMatrix: gl.getUniformLocation(shaderProgram4, 'uProjectionMatrix'),
		  modelViewMatrix: gl.getUniformLocation(shaderProgram4, 'uModelViewMatrix'),
		  normalMatrix: gl.getUniformLocation(shaderProgram4, 'uNormalMatrix'),
		  uSampler: gl.getUniformLocation(shaderProgram4, 'uSampler'),
		},
	  };



	// Here's where we call the routine that builds all the
	// objects we'll be drawing.
	//const buffers

	// const gltexture=gl;
	// var gltexture=JSON.parse(JSON.stringify(gl));

	texturedog = loadTexture(gl,'assets/dog.jpg');
	texturepolice = loadTexture(gl,'assets/police.jpg');
	texturehover = loadTexture(gl,'assets/hover.jpg');
	textureshoe = loadTexture(gl,'assets/shoe.jpeg');
	texturefly = loadTexture(gl,'assets/jet.png');
	textureplayer = loadTexture(gl,'assets/player.jpg');


	// Draw the scene repeatedly
	var then = 0;
	function render(now) {
		now *= 0.001;  // convert to seconds
		const deltaTime = now - then;
		then = now;

		var vsSourcel;
	if(lighton==1)
	{
		vsSourcel = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
			highp vec3 directionalLightColor = vec3(1, 1, 1);
			
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, -0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
	`;
	}
	else
	{
		vsSourcel = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
			highp vec3 directionalLightColor = vec3(1, 1, 1);
			
      highp vec3 directionalVector = normalize(vec3(0.85, -0.8, +0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
	`;
	}

	const fsSourcel = `
	varying highp vec2 vTextureCoord;
	varying highp vec3 vLighting;

	uniform sampler2D uSampler;

	void main(void) {
		highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

		gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
	}
`;
const shaderPrograml = initShaderProgram(gl, vsSourcel, fsSourcel);

const programInfol = {
	program: shaderPrograml,
	attribLocations: {
		vertexPosition: gl.getAttribLocation(shaderPrograml, 'aVertexPosition'),
		vertexNormal: gl.getAttribLocation(shaderPrograml, 'aVertexNormal'),
		textureCoord: gl.getAttribLocation(shaderPrograml, 'aTextureCoord'),
	},
	uniformLocations: {
		projectionMatrix: gl.getUniformLocation(shaderPrograml, 'uProjectionMatrix'),
		modelViewMatrix: gl.getUniformLocation(shaderPrograml, 'uModelViewMatrix'),
		normalMatrix: gl.getUniformLocation(shaderPrograml, 'uNormalMatrix'),
		uSampler: gl.getUniformLocation(shaderPrograml, 'uSampler'),
	},
};



		tick();
		userinput();
		jump();
		collisioncheck();
		camerazcor-=.5;
		if(baw==0)
		{
			drawScene(gl,programInfol, programInfo,programInfo2,deltaTime);
		}
		else
		{
			drawScene(gl,programInfol, programInfo3,programInfo4,deltaTime);
		}

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}



// Draw the scene.
function drawScene(gl,programInfol,programInfo, programInfo2,deltaTime) {
	gl.clearColor(0,128/255,1,1);  // Clear and add colour after clearing
	gl.clearDepth(1.0);                 // Clear everything
	gl.enable(gl.DEPTH_TEST);           // Enable depth testing
	gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

	// Clear the canvas before we start drawing on it.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


	// Create a perspective matrix, a special matrix that is
	// used to simulate the distortion of perspective in a camera.
	// Our field of view is 45 degrees, with a width/height
	// ratio that matches the display size of the canvas
	// and we only want to see objects between 0.1 units
	// and 100 units away from the camera.
	const fieldOfView = 45 * Math.PI / 180;   // in radians
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;
	const projectionMatrix = mat4.create();

	// note: glmatrix.js always has the first argument
	// as the destination to receive the result.
	mat4.perspective(projectionMatrix,
		fieldOfView,
		aspect,
		zNear,
		zFar);

	// Set the drawing position to the "identity" point, which is
	// the center of the scene.
	var cameraMatrix = mat4.create();
	mat4.translate(cameraMatrix, cameraMatrix, [0,3,camerazcor+5]);//set camera position
	var cameraPosition = [
		cameraMatrix[12],
		cameraMatrix[13],
		cameraMatrix[14],
	];

	var up = [0, 1, 0];
	mat4.lookAt(cameraMatrix, cameraPosition, [0,0,camerazcor-7], up);
	var viewMatrix = cameraMatrix;//mat4.create();
	//mat4.invert(viewMatrix, cameraMatrix);
	var viewProjectionMatrix = mat4.create();
	mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);


	//call the draw functions
	for(var i=0;i<metrono;i++)
	{
		metro[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
	}


	for(var i=0;i<cno;i++)
	{
		c[i].drawcoin(gl, viewProjectionMatrix, programInfo, deltaTime);
	}


	for(var i=0;i<pno;i++)
	{
		pil[i].drawp(gl, viewProjectionMatrix, programInfo, deltaTime);
	}

	for(var i=0;i<lno;i++)
	{
		larr[i].drawl(gl, viewProjectionMatrix, programInfo, deltaTime);
	}


	for(var i=0;i<sno;i++)
	{
		sbarr[i].drawsb(gl, viewProjectionMatrix, programInfo, deltaTime);
	}


	for(var i=0;i<abno;i++)
	{
		abarr[i].drawab(gl, viewProjectionMatrix, programInfo, deltaTime);
	}


	for(var i=0;i<fbno;i++)
	{
		fbarr[i].drawfb(gl, viewProjectionMatrix, programInfo2, texturefly,deltaTime);
	}


	for(var i=0;i<jbno;i++)
	{
		jbarr[i].drawjb(gl, viewProjectionMatrix, programInfo2, textureshoe,deltaTime);
	}


	for(var i=0;i<hno;i++)
	{
		harr[i].drawh(gl, viewProjectionMatrix, programInfo2, texturehover,deltaTime);
	}


	trk.drawtrack(gl, viewProjectionMatrix, programInfo, deltaTime);
	w.drawwall(gl, viewProjectionMatrix, programInfo, deltaTime);

	character.drawchar(gl, viewProjectionMatrix,programInfol,programInfo2, textureplayer,deltaTime);

	pol.drawpol(gl, viewProjectionMatrix, programInfo2, texturepolice, deltaTime);

	d.drawdog(gl, viewProjectionMatrix, programInfo2, texturedog, deltaTime);


}


// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);


	// Create the shader program
	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);


	// If creating the shader program failed, alert
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}

	return shaderProgram;
}


// creates a shader of the given type, uploads the source and
// compiles it.
function loadShader(gl, type, source) {
	const shader = gl.createShader(type);

	// Send the source to the shader object
	gl.shaderSource(shader, source);

	// Compile the shader program
	gl.compileShader(shader);

	// See if it compiled successfully
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}


function loadTexture(gl, url) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Because images have to be download over the internet
	// they might take a moment until they are ready.
	// Until then put a single pixel in the texture so we can
	// use it immediately. When the image has finished downloading
	// we'll update the texture with the contents of the image.
	const level = 0;
	const internalFormat = gl.RGBA;
	const width = 1;
	const height = 1;
	const border = 0;
	const srcFormat = gl.RGBA;
	const srcType = gl.UNSIGNED_BYTE;
	const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
		width, height, border, srcFormat, srcType,
		pixel);

	const image = new Image();
	image.onload = function() {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
			srcFormat, srcType, image);

		// WebGL1 has different requirements for power of 2 images
		// vs non power of 2 images so check if the image is a
		// power of 2 in both dimensions.
		if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
			// Yes, it's a power of 2. Generate mips.
			gl.generateMipmap(gl.TEXTURE_2D);
		} else {
			// No, it's not a power of 2. Turn of mips and set
			// wrapping to clamp to edge
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
	};
	image.src = url;

	return texture;
}

function isPowerOf2(value) {
	return (value & (value - 1)) == 0;
}
