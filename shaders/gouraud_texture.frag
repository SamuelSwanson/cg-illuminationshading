#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {

    //"material color should be coming from the image" 
    vec3 ambient_final = ambient * material_color;
    vec3 diffuse_final = diffuse *  material_color;
    vec3 specular_final = specular * material_specular;
    vec3 combined = ambient_final + diffuse_final + specular_final;
    FragColor = texture(image, frag_texcoord);
}
