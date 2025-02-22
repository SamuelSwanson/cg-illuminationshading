#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;

void main() {

    vec3 ambient_final = ambient * material_color;
    vec3 diffuse_final = diffuse * material_color;
    vec3 specular_final = specular * material_specular;
    vec3 combined = ambient_final + diffuse_final + specular_final;
    FragColor = vec4(combined, 1.0);
}
