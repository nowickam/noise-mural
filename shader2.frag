// #ED7345 - orange
// 237, 115, 69
// #7EBAAE - green
// 126, 186, 174
// #8FC7EE - light blue
// 143, 198, 238
// #30659A - dark blue
// 48, 101, 154
// #0D2935 - super dark blue
// 13, 41, 53

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st){
    vec2 i=floor(st);
    vec2 f=fract(st);
    vec2 u=f*f*(3.-2.*f);
    return mix(mix(random(i+vec2(0.,0.)),random(i+vec2(1.,0.)),u.x),
    mix(random(i+vec2(0.,1.)),random(i+vec2(1.,1.)),u.x),u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

float lines(in vec2 pos,float b){
    float scale=2.;
    pos*=scale;
    return smoothstep(0.,.5+b,abs((sin(pos.y*3.1415)-b*2.))*.5);
}

vec3 lines3(float ax,float b){
    float scale=1.;
    ax*=scale;
    // return vec3(
        //     smoothstep(0.,1.,abs((sin(ax*3.1415)))*.5),
        //     smoothstep(0.,1.,abs((sin(ax*3.1415)))*.5),
        //     smoothstep(0.,1.,abs((sin(ax*3.1415+u_time/1.)-b*2.))*.5)
    // );
    
    vec3 color1=vec3(237.,115.,69.)/255.;
    vec3 color2=vec3(126.,187.,74.)/255.;
    vec3 color3=vec3(143.,198.,238.)/255.;
    vec3 color4=vec3(48.,101.,154.)/255.;
    return vec3(
        mix(mix(color1,color2,smoothstep(.0,.5,abs((sin(ax*3.1415+u_time/.8)-b*2.))*.3)),color3,smoothstep(.8,1.,abs((sin(ax*3.1415+u_time/.8)-b*2.))*.5))
    );
    
    // vec3 color1=vec3(1.,1.,0.);
    // vec3 color2=vec3(0.,0.,1.);
    // return vec3(
        //     mix(color1.x,color2.x,smoothstep(0.,1.,abs((sin(ax*3.1415+u_time/.8)))*.5)),
        //     mix(color1.y,color2.y,smoothstep(0.,1.,abs((sin(ax*3.1415+u_time/.8)))*.5)),
        //     mix(color1.z,color2.z,smoothstep(0.,1.,abs((sin(ax*3.1415+u_time/.8)-b*2.))*.5))
    // );
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.y*=u_resolution.y/u_resolution.x;
    
    vec2 pos=st.yx*vec2(10.,10.);
    
    float pattern=pos.x;
    
    // Add noise
    pos=rotate2d(noise(vec2(pos.x+u_time/8.,pos.y-u_time/10.)))*pos;
    
    // Draw lines
    pattern=lines(pos,.5);
    
    vec3 pattern3=lines3(pos.x,.5);
    // pattern3-=lines3(pos.x+u_time/4.,.5)*.15;
    
    // gl_FragColor=vec4(vec3(pattern),1.);
    gl_FragColor=vec4(pattern3,1.);
}
