(this.webpackJsonpcleverclub=this.webpackJsonpcleverclub||[]).push([[0],{13:function(n,e,t){n.exports=t(25)},18:function(n,e,t){},22:function(n,e,t){},25:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),o=t(9),r=t.n(o),u=(t(18),t(6)),c=t(3),s=t(4),d=t(1);t(19),t(21),t(22);function l(){var n=Object(c.a)(["\n  width: 90%;\n  max-width: 500px;\n  display: block;\n  @media screen and (min-width: 768px) {\n    margin: 10px;\n  }\n"]);return l=function(){return n},n}function m(){var n=Object(c.a)(["\n  border: 7px solid black;\n  margin: 10px auto;\n  width: 90%;\n  max-width: 500px;\n  position: relative;\n  background-color: ",';\n  :before {\n    content: "";\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0.9;\n    z-index: -1;\n    background: ',";\n  }\n  .text {\n    color: white;\n    padding: 11px;\n    font-size: 42px;\n  }\n  span {\n    color:#ec4545;\n  }\n  input {\n    display: block;\n    margin: 10px auto;\n    border: 3px solid black;\n    width: 69%;\n    height: 36px;\n    font-size: 21px;\n    padding: 3px;\n    text-align: center;\n  }\n  button {\n    margin: 22px auto;\n    display: block;\n    background: white;\n    font-size: 24px;\n    padding: 10px;\n    border: 3px solid black;\n    user-select: none;\n    cursor: pointer;\n}\n  }\n"]);return m=function(){return n},n}function p(){var n=Object(c.a)(["\n  font-size: 30px;\n  display: flex;\n  border: 7px solid black;\n  padding: 10px;\n  margin: 20px auto 7px;\n  user-select: none;\n  background: white;\n"]);return p=function(){return n},n}var f=s.a.div(p()),v=s.a.div(m(),(function(n){return n.color}),(function(n){return"url(".concat(n.img,")")}));s.a.div(l());var g=function(){var n=Object(a.useState)(),e=Object(u.a)(n,2),t=e[0],o=e[1],r=Object(a.useState)(),c=Object(u.a)(r,2),s=c[0],l=c[1];Object(a.useEffect)((function(){!function(){var n=document.querySelector("#c"),e=new d.g({canvas:n});e.autoClearColor=!1;var t=new d.b(-1,1,1,-1,-1,1),a=new d.d,i=new d.c(2,2),o={iTime:{value:0},iResolution:{value:new d.f}},r=new d.e({fragmentShader:"\n#include <common>\n \nuniform vec3 iResolution;\nuniform float iTime;\n \n#define TWO_PI (PI * 2.)\n\nvec2 rotateCoord(vec2 uv, float rads) {\n    uv *= mat2(cos(rads), sin(rads), -sin(rads), cos(rads));\n\treturn uv;\n}\n\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\n{\n    float time = iTime * 1.;\t\t\t\t\t\t\t\t\t// adjust time\n    vec2 uv = (2. * fragCoord - iResolution.xy) / iResolution.y;\t// center coordinates\n    uv = rotateCoord(uv, PI * 0.25);\n    float rads = atan(uv.x, uv.y);\n    float vertices = 6.;\n    float baseRadius = 0.7;\n    float extraRadius = 0.03 + 0.03 * sin(time * 0.5);\n    float curRadius = baseRadius + extraRadius * sin(rads * vertices);\n    // vec2 edge = vec2(curRadius * sin(rads), curRadius * cos(rads));\n    vec2 edge = curRadius* normalize(uv);\n    float distFromCenter = length(uv);\n    float distFromEdge = distance(edge, uv);\n    float freq = 24.;\n    if(distFromCenter > curRadius) freq *= 3.;\n    float col = smoothstep(0.25, 0.75, abs(sin(time + distFromEdge * freq)));\n    col += distFromCenter * 0.1;\n\tfragColor = vec4(col);\n}\nvoid main() {\n  mainImage(gl_FragColor, gl_FragCoord.xy);\n}\n",uniforms:o});a.add(new d.a(i,r)),requestAnimationFrame((function n(i){i*=.001,function(n){var e=n.domElement,t=e.clientWidth,a=e.clientHeight,i=e.width!==t||e.height!==a;i&&n.setSize(t,a,!1)}(e);var r=e.domElement;o.iResolution.value.set(r.width,r.height,1),o.iTime.value=i,e.render(a,t),requestAnimationFrame(n)}))}()}),[]);var m=function(){var n=document.querySelector("button");if(n.disabled=!0,l(""),!function(n){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(n).toLowerCase())}(t))return l("That isn't a valid email address"),void(n.disabled=!1);fetch("https://radio.raptor.pizza/clubsignup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}).then((function(n){return n.json()})).then((function(e){var t=e.message;l("signed_up"===t?"Thank you for signing up!":"already_signed_up"===t?"Oh, you're already signed up!":"I have no fucking idea what happened"),n.disabled=!1}))};return i.a.createElement("div",{className:"App"},i.a.createElement("div",{style:{display:"flex"}},i.a.createElement(f,null,"CLUB CL3V3R")),i.a.createElement(v,{color:"rgba(255,0,0,.8)"},i.a.createElement("div",{className:"text"},"Thank you everyone who showed up :)"),i.a.createElement("div",{className:"text"},"will likely open again on saturday")),i.a.createElement(v,{color:"hsla(60, 100%, 52%, 0.6)",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGtIqcmRub84qvrom0ixt4QLb-VwB6iV8mSp9UMBd_X6_TLoXX&usqp=CAU"},i.a.createElement("div",{className:"text"},s?i.a.createElement("span",null,s):"Sign up to hear about future happenings"),i.a.createElement("input",{type:"email",onChange:function(n){return o(n.target.value)},onKeyDown:function(n){"Enter"===n.key&&m()},name:"email"}),i.a.createElement("button",{disabled:!1,onClick:function(n){m()}},"SIGNUP")))};r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(g,null)),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.6b4ef9c0.chunk.js.map