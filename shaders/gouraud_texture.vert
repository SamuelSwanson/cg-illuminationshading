#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform float material_shininess;
uniform vec2 texture_scale;
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {


    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    vec3 frag_normal = normalize(mat3(transpose(inverse(model_matrix))) * vertex_normal);
    vec4 frag_pos_w = model_matrix * vec4(vertex_position, 1.0);//may be an error with this or the equation
    vec3 frag_pos = frag_pos_w.xyz;

    for(int i = 0; i<10; i++){

        vec3 N = normalize(frag_normal);
        vec3 L = normalize(light_position[i]-frag_pos);
        float diff = max(dot(N,L), 0.0);
        vec3 V = normalize(camera_position - frag_pos);
        vec3 R = 2.0*(max(dot(N,L),0.0))*(N-L);

        ambient = light_ambient;
        diffuse = diffuse + light_color[i] * diff;
        specular = specular + light_color[i] * pow(max(dot(R,V), 0.0),material_shininess);
    }
    
    //texture_scale is never set in the js files. Need to figure out where it would go
    frag_texcoord = vertex_texcoord * texture_scale;
}
