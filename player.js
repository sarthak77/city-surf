///<reference path="webgl.d.ts" />

let player = class {
	constructor(gl, pos) {
		this.positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

		this.tl=1;
		this.positions = [
			// Front face
			-1,-1,1,
			1,-1,1,
			1, 1,1,
			-1, 1,1,

			//back face
			-1,-1,-this.tl,
			1,-1,-this.tl,
			1, 1,-this.tl,
			-1, 1,-this.tl,

			//back face
			-1,-1,-this.tl,
			1,-1,-this.tl,
			1,-1,1,
			-1,-1,1,

			// Front face
			-1,1,-this.tl,
			1,1,-this.tl,
			1,1,1,
			-1,1,1,

			//back face
			1,-1,-this.tl,
			1,1,-this.tl,
			1,1,1,
			1,-1,1,

			//back face
			-1,-1,-this.tl,
			-1,1,-this.tl,
			-1,1,1,
			-1,-1,1,
		];

		this.rotation = 0;
		this.pos = pos;
		this.light=1;
		this.flashtime=0;
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);


		const normalBuffer = gl.createBuffer();
        
            gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);

            this.vertexNormals =[
				0,0,1,
				0,0,1,
				0,0,1,
				0,0,1,

				0,0,-1,
				0,0,-1,
				0,0,-1,
				0,0,-1,

				0,1,0,
				0,1,0,
				0,1,0,
				0,1,0,

				0,-1,0,
				0,-1,0,
				0,-1,0,
				0,-1,0,

				1,0,0,
				1,0,0,
				1,0,0,
				1,0,0,

				-1,0,0,
				-1,0,0,
				-1,0,0,
				-1,0,0,
			];

            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexNormals),gl.STATIC_DRAW);

		// this.faceColors = [
		// 	[ Math.random(),  Math.random(),  Math.random(),  Math.random()], 
		// 	[ Math.random(), Math.random(), Math.random(), Math.random()],
		// 	[ Math.random(), Math.random(), Math.random(), Math.random()],
		// 	[ Math.random(), Math.random(), Math.random(), Math.random()],
		// 	[ Math.random(), Math.random(), Math.random(), Math.random()],
		// 	[ Math.random(), Math.random(), Math.random(), Math.random()],

		// ];


		// var colors = [];
		// for (var j = 0; j < this.faceColors.length; ++j) {
		// 	const c = this.faceColors[j];
		// 	// Repeat each color four times for the four vertices of the face
		// 	colors = colors.concat(c, c, c, c);
		// }

		// const colorBuffer = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

        const textureCoordinates = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
 


		// Build the element array buffer; this specifies the indices
		// into the vertex arrays for each face's vertices.
		const indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);


		// This array defines each face as two triangles, using the
		// indices into the vertex array to specify each triangle's
		// position.
		const indices = [
			0, 1, 2,    0, 2, 3, // front
			4, 5, 6,    4, 6, 7,
			8, 9, 10,   8, 10, 11,
			12, 13, 14, 12, 14, 15,
			16, 17, 18, 16, 18, 19,
			20, 21, 22, 20, 22, 23, 
		];


		// Now send the element array to GL
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(indices), gl.STATIC_DRAW);

		this.buffer = {
			position: this.positionBuffer,
			normal: normalBuffer,
			textureCoord: textureCoordBuffer,
			indices: indexBuffer,
		}

	}

	drawchar(gl, projectionMatrix,programInfol, tprogramInfo, texture,deltaTime) {

		// var programInfo;
		var programInfo=programInfol;
		var a=Date.now();
		if(a-this.flashtime>150)
		{
			// this.light^=1;
			this.flashtime=a;
			// programInfo=programInfol;
		}
		else
		{
			// programInfo=tprogramInfo;
		}
		
		const modelViewMatrix = mat4.create();
		mat4.translate(
			modelViewMatrix,
			modelViewMatrix,
			this.pos
		);

		// this.rotation += .1;
		// this.rotation += Math.PI / (((Math.random()) % 100) + 50);
		mat4.rotate(modelViewMatrix,
			modelViewMatrix,
			this.rotation,
			[0, 1, 0]);

			const normalMatrix=mat4.create();
			if(this.light==1)
			{
			mat4.invert(normalMatrix,modelViewMatrix);
			mat4.transpose(normalMatrix,normalMatrix);
			}

		{
			const numComponents = 3;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(
				programInfo.attribLocations.vertexPosition);
		}

		// Tell WebGL how to pull out the colors from the color buffer
		// into the vertexColor attribute.
		{
			const numComponents = 2;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
			gl.vertexAttribPointer(
				programInfo.attribLocations.textureCoord,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(
				programInfo.attribLocations.textureCoord);
		}

		// Tell WebGL how to pull out the normals from
            // the normal buffer into the vertexNormal attribute.
			if(this.light==1)
			{
                const numComponents = 3;
                const type = gl.FLOAT;
                const normalize = false;
                const stride = 0;
                const offset = 0;
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
                gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexNormal,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
                gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexNormal);
            }

		// Tell WebGL which indices to use to index the vertices
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

		// Tell WebGL to use our program when drawing
		gl.useProgram(programInfo.program);

		// Set the shader uniforms
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.projectionMatrix,
			false,
			projectionMatrix);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			modelViewMatrix);

			if(this.light==1)
			{
				gl.uniformMatrix4fv(
                programInfo.uniformLocations.normalMatrix,
                false,
                normalMatrix);
				}
			gl.activeTexture(gl.TEXTURE0);

            // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, texture);
          
            // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);


		{
			const vertexCount = 36;
			const type = gl.UNSIGNED_SHORT;
			const offset = 0;
			gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		}

	}

	tick(move,ontrain){

		if(move=="l")
		{
			this.pos[0]-=3;
		}
		else if(move=="r")
		{
			this.pos[0]+=3;
		}
		else if(move=="d")
		{
			this.pos[1]-=2;
			if(this.pos[1]<-4)
			{
				this.pos[1]=-4;
			}
		}
		else if(move=="u" && this.pos[1]<5)
		{
			// this.pos[1]+=.005;
			// if(this.pos[1]>2)
				this.pos[1]=2;
		}
		else if(move=="f")
		{
			this.pos[1]=5.4;
		}
		else if(move=="hj")
		{
			// this.pos[1]+=.005;
			// if(this.pos[1]>5.4)
				this.pos[1]=5.4;
		}

		else if(move==0)
		{
			if(this.pos[1]>-2 && ontrain==0)
				this.pos[1]-=.1;
			else if(this.pos[1]<-2)
			{
				this.pos[1]+=.01;
			}
			else
			{
				this.pos[1]=-2;
			}

			this.pos[2]-=.5;
			// this.rotation+=.1;
		}
		else if(move==1)
		{
			this.pos[2]-=.5;
			// this.rotation+=.1;
		}

		if(ontrain==1)
		{
			// console.log("wedwdwdewdwdwdw")
			this.pos[1]=2;
		}
	}

	getpos(){
		return this.pos;
	}
};
