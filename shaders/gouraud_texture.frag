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
   
    
    vec3 materialImage = texture(image, frag_texcoord).rgb * material_color; //this needs to be rgb so that the types of values being multiplied match
    vec3 ambient_final = ambient * materialImage;
    vec3 diffuse_final = diffuse *  materialImage;
    vec3 specular_final = specular * material_specular;
    vec3 combined = ambient_final + diffuse_final + specular_final; 
    

   FragColor = vec4(combined, 1.0); //this is the one we are trying to get to work, combines sampled texture and lighting
   //FragColor = texture(image, frag_texcoord);
   //FragColor= vec4(frag_texcoord,0.0, 1.0);
}
