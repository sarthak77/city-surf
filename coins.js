///<reference path="webgl.d.ts" />

let coins = class {
    constructor(gl, pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.n=100;
        this.r=.4;
        this.theta=(2*Math.PI)/this.n;
        this.positions = [];
        
        var y1=this.r;
        var y2=Math.cos(this.theta)*this.r;
      
        var x1=0;
        var x2=Math.sin(this.theta)*this.r;

        for(var i=0;i<9*this.n;i=i+9){

            this.positions[i]=0;
            this.positions[i+1]=0;
            this.positions[i+2]=0; 

            this.positions[i+3]=x1;
            this.positions[i+4]=y1;
            this.positions[i+5]=0;

            this.positions[i+6]=x2;
            this.positions[i+7]=y2;
            this.positions[i+8]=0;

            x1 = x2;
            y1 = y2;
            x2 = Math.cos(this.theta)*x1 - Math.sin(this.theta)*y1;
            y2 = Math.sin(this.theta)*x1 + Math.cos(this.theta)*y2;
        };


        this.rotation = 0;
        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        this.faceColors =[];
        for(i=0;i<this.n;i++)
        {
            this.faceColors.push([212/255,175/255,55/255,1.0]);
        }
            

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
        const indices= Array.apply(null, {length: 3*this.n}).map(Number.call, Number);


        // Now send the element array to GL
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: colorBuffer,
            indices: indexBuffer,
        }

    }

    drawcoin(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );


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
            const vertexCount = 3*this.n;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }

    tick(){
        this.rotation+=.1;
    }

    getpos(){
        return this.pos;
    }

    
};