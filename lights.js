///<reference path="webgl.d.ts" />

let l = class {
	constructor(gl, pos) {
		this.positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

		this.l=100;
		this.b=5;
		this.h=6;
		this.b2=6;
		this.positions = [

			//upper part    
			// Front face
			-this.b,-1+this.h,1,
			this.b,-1+this.h,1,
			this.b, 1+this.h,1,
			-this.b, 1+this.h,1,

			//back face
			-this.b,-1+this.h,-this.l,
			this.b,-1+this.h,-this.l,
			this.b, 1+this.h,-this.l,
			-this.b, 1+this.h,-this.l,

			//back face
			-this.b,-1+this.h,-this.l,
			this.b,-1+this.h,-this.l,
			this.b,-1+this.h,1,
			-this.b,-1+this.h,1,

			// Front face
			-this.b,1+this.h,-this.l,
			this.b,1+this.h,-this.l,
			this.b,1+this.h,1,
			-this.b,1+this.h,1,

			//back face
			this.b,-1+this.h,-this.l,
			this.b,1+this.h,-this.l,
			this.b,1+this.h,1,
			this.b,-1+this.h,1,

			//back face
			-this.b,-1+this.h,-this.l,
			-this.b,1+this.h,-this.l,
			-this.b,1+this.h,1,
			-this.b,-1+this.h,1,

			//left part
			// Front face
			-1-this.b2,-1,1,
			1-this.b2,-1,1,
			1-this.b2, 1+this.h,1,
			-1-this.b2, 1+this.h,1,

			//back face
			-1-this.b2,-1,-this.l,
			1-this.b2,-1,-this.l,
			1-this.b2, 1+this.h,-this.l,
			-1-this.b2, 1+this.h,-this.l,

			//back face
			-1-this.b2,-1,-this.l,
			1-this.b2,-1,-this.l,
			1-this.b2,-1,1,
			-1-this.b2,-1,1,

			// Front face
			-1-this.b2,1+this.h,-this.l,
			1-this.b2,1+this.h,-this.l,
			1-this.b2,1+this.h,1,
			-1-this.b2,1+this.h,1,

			//back face
			1-this.b2,-1,-this.l,
			1-this.b2,1+this.h,-this.l,
			1-this.b2,1+this.h,1,
			1-this.b2,-1,1,

			//back face
			-1-this.b2,-1,-this.l,
			-1-this.b2,1+this.h,-this.l,
			-1-this.b2,1+this.h,1,
			-1-this.b2,-1,1,


			//right part
			// Front face
			-1+this.b2,-1,1,
			1+this.b2,-1,1,
			1+this.b2, 1+this.h,1,
			-1+this.b2, 1+this.h,1,

			//back face
			-1+this.b2,-1,-this.l,
			1+this.b2,-1,-this.l,
			1+this.b2, 1+this.h,-this.l,
			-1+this.b2, 1+this.h,-this.l,

			//back face
			-1+this.b2,-1,-this.l,
			1+this.b2,-1,-this.l,
			1+this.b2,-1,1,
			-1+this.b2,-1,1,

			// Front face
			-1+this.b2,1+this.h,-this.l,
			1+this.b2,1+this.h,-this.l,
			1+this.b2,1+this.h,1,
			-1+this.b2,1+this.h,1,

			//back face
			1+this.b2,-1,-this.l,
			1+this.b2,1+this.h,-this.l,
			1+this.b2,1+this.h,1,
			1+this.b2,-1,1,

			//back face
			-1+this.b2,-1,-this.l,
			-1+this.b2,1+this.h,-this.l,
			-1+this.b2,1+this.h,1,
			-1+this.b2,-1,1,


		];

		this.rotation = 0;
		this.pos = pos;

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

		this.faceColors = [
			
            [0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			[0,0,0,1], 
			

		];


		var colors = [];
		for (var j = 0; j < this.faceColors.length; ++j) {
			const c = this.faceColors[j];
			// Repeat each color four times for the four vertices of the face
			colors = colors.concat(c, c, c, c);
		}

		const colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		// Build the element array buffer; this specifies the indices
		// into the vertex arrays for each face's vertices.
		const indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);


		// This array defines each face as two triangles, using the
		// indices into the vertex array to specify each triangle's
		// position.
		const indices = [
			0, 1, 2,    0, 2, 3,
			4, 5, 6,    4, 6, 7,
			8, 9, 10,   8, 10, 11,
			12, 13, 14, 12, 14, 15,
			16, 17, 18, 16, 18, 19,
			20, 21, 22, 20, 22, 23, 

			24,25,26,   24,26,27,
			28,29,30,   28,30,31,
			32,33,34,   32,34,35,
			36,37,38,   36,38,39,
			40,41,42,   40,42,43,
			44,45,46,   44,46,47,

			48,49,50,   48,50,51,
			52,53,54,   52,54,55,
			56,57,58,   56,58,59,
			60,61,62,   60,62,63,
			64,65,66,   64,66,67,
			68,69,70,   68,70,71,

		];


		// Now send the element array to GL
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(indices), gl.STATIC_DRAW);

		this.buffer = {
			position: this.positionBuffer,
			color: colorBuffer,
			indices: indexBuffer,
		}

	}

	drawl(gl, projectionMatrix, programInfo, deltaTime) {
		const modelViewMatrix = mat4.create();
		mat4.translate(
			modelViewMatrix,
			modelViewMatrix,
			this.pos
		);

		//this.rotation += Math.PI / (((Math.random()) % 100) + 50);
		mat4.rotate(modelViewMatrix,
			modelViewMatrix,
			this.rotation,
			[1, 1, 1]);

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
			const numComponents = 4;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.color);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexColor,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(
				programInfo.attribLocations.vertexColor);
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

		{
			const vertexCount = 36*3;
			const type = gl.UNSIGNED_SHORT;
			const offset = 0;
			gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		}

	}



	getpos(){
		return this.pos;
	}
};
