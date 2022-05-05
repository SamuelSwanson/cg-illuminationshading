#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform sampler2D image;          // use in conjunction with Ka and Kd

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
        vec3 R = 2.0*(max(dot(N,L),0.0))*N-L;
        vec3 specularIntensity = light_color[i] * material_specular * pow(max(dot(R,V), 0.0),material_shininess);
        
        //calculate the distance of each point light
        float distance = length(light_position[i]-frag_pos);
        float attenuation = clamp(1.0/distance, 0.0, 1.0);//1.0/(1.0+0.1*distance+0.01*distance*distance);

        combined = combined + (diffuseIntensity + specularIntensity + ambientIntensity)*attenuation;
    }

    //combined = combined + ambientIntensity;
    FragColor = vec4(combined, 1.0); 

    FragColor = vec4(combined, 1.0) * texture(image, frag_texcoord);
}
