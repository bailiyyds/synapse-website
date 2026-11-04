import { latticeVertex, latticeFragment } from "./shaders";
import { motionConfig as M } from "@/lib/motion";
export function createWebGL(canvas: HTMLCanvasElement, close: boolean) {
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
  if (!gl) return null;
  const vs = latticeVertex,
    fs = latticeFragment;
  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      throw Error(gl.getShaderInfoLog(s) || "shader");
    return s;
  };
  let program: WebGLProgram;
  const resources: WebGLShader[] = [];
  try {
    program = gl.createProgram()!;
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vs],
      [gl.FRAGMENT_SHADER, fs],
    ] as const) {
      const s = shader(type, source);
      resources.push(s);
      gl.attachShader(program, s);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error("link");
  } catch {
    resources.forEach((s) => gl.deleteShader(s));
    return null;
  }
  gl.useProgram(program);
  const nodes = Array.from({ length: M.nodes }, (_, i) => {
    const a = i * 2.399963,
      r = Math.sqrt((i + 0.5) / M.nodes);
    return [Math.cos(a) * r, Math.sin(a) * r, Math.sin(i * 1.73)];
  });
  const data: number[] = [];
  for (let i = 0; i < M.edges; i++) {
    const a = i % M.nodes,
      b = (a + [21, 34, 55][Math.floor(i / M.nodes) % 3]) % M.nodes;
    data.push(...nodes[a], ...nodes[b], 0);
  }
  nodes.forEach((p) => data.push(...p, ...p, 1));
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  for (const [name, size, offset] of [
    ["a", 3, 0],
    ["b", 3, 12],
    ["kind", 1, 24],
  ] as const) {
    const loc = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 28, offset);
    gl.vertexAttribDivisor(loc, 1);
  }
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const uniforms = {
    resolution: gl.getUniformLocation(program, "resolution"),
    pointer: gl.getUniformLocation(program, "pointer"),
    time: gl.getUniformLocation(program, "time"),
    zoom: gl.getUniformLocation(program, "zoom"),
    discharge: gl.getUniformLocation(program, "discharge"),
  };
  return {
    draw(time: number, x: number, y: number, age: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(
        uniforms.resolution,
        canvas.clientWidth,
        canvas.clientHeight,
      );
      gl.uniform2f(uniforms.pointer, x, y);
      gl.uniform1f(uniforms.time, time / 1000);
      gl.uniform1f(
        uniforms.zoom,
        (close ? 1.7 : 1) + Math.min(scrollY / 8000, 0.1),
      );
      gl.uniform1f(
        uniforms.discharge,
        Math.exp(-Math.max(0, age) / M.discharge),
      );
      gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, M.nodes + M.edges);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      resources.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
    },
  };
}
