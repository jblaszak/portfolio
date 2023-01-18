const ParticlesFragmentShader = /* glsl */ `precision highp float;
uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 color = texture2D(uTexture, puv);

    // circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

	// final color
	color.a = t*uOpacity;

	gl_FragColor = color;

    // #include <tonemapping_fragment>
    #include <encodings_fragment>
}`;

export default ParticlesFragmentShader;
