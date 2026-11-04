export const latticeVertex = `#version 300 es
precision highp float;
in vec3 a;in vec3 b;in float kind;
uniform vec2 resolution;uniform vec2 pointer;uniform float time;uniform float zoom;uniform float discharge;
out vec4 color;out vec2 uv;out float point;
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);vec3 k=vec3(1.,57.,113.);float n=dot(i,k);return mix(mix(mix(fract(sin(n)*43758.5453),fract(sin(n+1.)*43758.5453),f.x),mix(fract(sin(n+57.)*43758.5453),fract(sin(n+58.)*43758.5453),f.x),f.y),mix(mix(fract(sin(n+113.)*43758.5453),fract(sin(n+114.)*43758.5453),f.x),mix(fract(sin(n+170.)*43758.5453),fract(sin(n+171.)*43758.5453),f.x),f.y),f.z);}
vec2 project(vec3 p){float t=time*.02;float c=cos(t),s=sin(t);vec2 q=mat2(c,-s,s,c)*p.xy;float z=p.z+(noise(p*2.+t)-.5)*.12;return vec2(.66,.45)+q*vec2(.42,.55)*zoom*(.82+z*.15);}
void main(){vec2 p=project(a),q=project(b);vec2 delta=(q-p)*resolution;vec2 normal=normalize(vec2(-delta.y,delta.x)+vec2(.00001));int id=gl_VertexID;float endp=(id==1||id==2||id==4)?1.:0.;float side=(id==0||id==1||id==3)?-1.:1.;vec2 pos=mix(p,q,endp);float hot=1.-smoothstep(80.,160.,length(p*resolution-pointer));uv=vec2(0.);point=kind;if(kind>0.5){vec2 corners[6]=vec2[6](vec2(-1,-1),vec2(1,-1),vec2(1,1),vec2(-1,-1),vec2(1,1),vec2(-1,1));uv=corners[id];pos=p+uv*(1.+hot)/resolution;}else{pos+=normal*side*.4/resolution;}gl_Position=vec4(pos.x*2.-1.,1.-pos.y*2.,0,1);float depth=.5+.5*a.z;color=vec4(mix(vec3(.82,.88,.85),vec3(.78,1.,.24),hot),kind>.5?.3+depth*.3+hot*.4:.04+depth*.08+hot*.25*discharge);}`;
export const latticeFragment = `#version 300 es
precision highp float;in vec4 color;in vec2 uv;in float point;out vec4 outColor;void main(){float alpha=point>.5?1.-smoothstep(.5,1.,length(uv)):1.;outColor=vec4(color.rgb,color.a*alpha);}`;
