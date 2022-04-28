#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position[10];//needs to become an array with multiple lights
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n



out vec4 FragColor;

void main() {

    vec3 combined = vec3(0.0);
    //normalize light and view
    vec3 ambientIntensity = light_ambient * material_color;
    for(int i = 0; i<10; i++){
        vec3 N = normalize(frag_normal);
        vec3 L = normalize(light_position[i]-frag_pos);
       
        float diff = max(dot(N,L), 0.0);
        vec3 diffuseIntensity = light_color[i] * material_color * diff;
        vec3 V = normalize(camera_position - frag_pos);
        vec3 R = 2.0*(max(dot(N,L),0.0))*(N-L);

        vec3 specularIntensity = light_color[i] * material_specular * pow(max(dot(R,V), 0.0),material_shininess);
        
        combined = combined + diffuseIntensity + specularIntensity;
    }

    combined = combined + ambientIntensity;
    FragColor = vec4(combined, 1.0);
}
