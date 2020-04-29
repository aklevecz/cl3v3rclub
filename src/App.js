import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import Plyr from "plyr";
import Hls from "hls.js";
// import io from "socket.io-client";
import "./App.css";

const Header = styled.div`
  font-size: 30px;
  display: flex;
  border: 7px solid black;
  padding: 10px;
  margin: 20px auto 7px;
  user-select: none;
  background: white;
`;

const Info = styled.div`
  border: 7px solid black;
  margin: 10px auto;
  width: 90%;
  max-width: 500px;
  position: relative;
  background-color: ${(props) => props.color};
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    z-index: -1;
    background: ${(props) => `url(${props.img})`};
  }
  .text {
    color: white;
    padding: 11px;
    font-size: 42px;
  }
  span {
    color:#ec4545;
  }
  input {
    display: block;
    margin: 10px auto;
    border: 3px solid black;
    width: 69%;
    height: 36px;
    font-size: 21px;
    padding: 3px;
    text-align: center;
  }
  button {
    margin: 22px auto;
    display: block;
    background: white;
    font-size: 24px;
    padding: 10px;
    border: 3px solid black;
    user-select: none;
    cursor: pointer;
}
  }
`;

const VideoContainer = styled.div`
  width: 90%;
  max-width: 500px;
  display: block;
  @media screen and (min-width: 768px) {
    margin: 10px;
  }
`;

// const ChatBox = styled.div`
//   border: 3px solid white;
//   padding: 1rem;
//   margin: 1 rem;
//   min-height: 300px;
// `;
// const InputWrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin: 15px auto;
//   max-width: 260px;
// `;
// const Input = styled.input`
//   background: black;
//   border: 2px solid white;
//   color: white;
//   text-align: center;
// `;
// const Button = styled.div`
//   background: black;
//   color: white;
//   border: 3px solid white;
//   padding: 0.5rem;
//   cursor: pointer;
// `;

// export const socket = io(
//   process.env.NODE_ENV !== "development"
//     ? "https://radio.raptor.pizza"
//     : "http://localhost:4444",
//   {
//     path: "/socket.io",
//     transports: ["websocket"],
//   }
// );

// socket.emit("club");
const fragmentShader = `
#include <common>
 
uniform vec3 iResolution;
uniform float iTime;
 
#define TWO_PI (PI * 2.)

vec2 rotateCoord(vec2 uv, float rads) {
    uv *= mat2(cos(rads), sin(rads), -sin(rads), cos(rads));
	return uv;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float time = iTime * 1.;									// adjust time
    vec2 uv = (2. * fragCoord - iResolution.xy) / iResolution.y;	// center coordinates
    uv = rotateCoord(uv, PI * 0.25);
    float rads = atan(uv.x, uv.y);
    float vertices = 6.;
    float baseRadius = 0.7;
    float extraRadius = 0.03 + 0.03 * sin(time * 0.5);
    float curRadius = baseRadius + extraRadius * sin(rads * vertices);
    // vec2 edge = vec2(curRadius * sin(rads), curRadius * cos(rads));
    vec2 edge = curRadius* normalize(uv);
    float distFromCenter = length(uv);
    float distFromEdge = distance(edge, uv);
    float freq = 24.;
    if(distFromCenter > curRadius) freq *= 3.;
    float col = smoothstep(0.25, 0.75, abs(sin(time + distFromEdge * freq)));
    col += distFromCenter * 0.1;
	fragColor = vec4(col);
}
void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;
function App() {
  const [email, setEmail] = useState();
  const [response, setResponse] = useState();
  useEffect(() => {
    // *** HLS ****
    const source = "https://ice.raptor.pizza/hls/shrimp.m3u8";
    const video = document.querySelector("#video");
    new Plyr(video);
    if (!Hls.isSupported()) {
      video.src = source;
    } else {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
    }
    // *** HLS ****
    // *** TWITCH ***
    // new window.Twitch.Embed("twitch-embed", {
    //   width: window.innerWidth - (window.innerWidth > 767 ? 50 : 0),
    //   height: 500,
    //   channel: "clubcl3v3r",
    // });
    // *** TWITCH ***

    function main() {
      const canvas = document.querySelector("#c");
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.autoClearColor = false;

      const camera = new THREE.OrthographicCamera(
        -1, // left
        1, // right
        1, // top
        -1, // bottom
        -1, // near,
        1 // far
      );
      const scene = new THREE.Scene();
      const plane = new THREE.PlaneBufferGeometry(2, 2);
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
      };
      const material = new THREE.ShaderMaterial({
        fragmentShader,
        uniforms,
      });
      scene.add(new THREE.Mesh(plane, material));

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      function render(time) {
        time *= 0.001; // convert to seconds

        resizeRendererToDisplaySize(renderer);

        const canvas = renderer.domElement;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }

    main();
  }, []);

  const submit = () => {
    const b = document.querySelector("button");
    b.disabled = true;
    setResponse("");
    if (!validateEmail(email)) {
      setResponse("That isn't a valid email address");
      b.disabled = false;
      return;
    }
    fetch(process.env.REACT_APP_SERVER + "/clubsignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((data) => {
        const { message } = data;
        if (message === "signed_up") {
          setResponse("Thank you for signing up!");
        } else if (message === "already_signed_up") {
          setResponse("Oh, you're already signed up!");
        } else {
          setResponse("I have no fucking idea what happened");
        }
        b.disabled = false;
      });
  };
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Header>CLUB CL3V3R</Header>
      </div>
      <Info color="rgba(255,0,0,.8)">
        <div className="text">Thank you everyone who showed up :)</div>
        <div className="text">will likely open again on saturday</div>
      </Info>
      <Info
        color="hsla(60, 100%, 52%, 0.6)"
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGtIqcmRub84qvrom0ixt4QLb-VwB6iV8mSp9UMBd_X6_TLoXX&usqp=CAU"
      >
        <div className="text">
          {response ? (
            <span>{response}</span>
          ) : (
            "Sign up to hear about future happenings"
          )}
        </div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          name="email"
        />
        <button
          disabled={false}
          onClick={(e) => {
            submit();
          }}
        >
          SIGNUP
        </button>
      </Info>
      <VideoContainer>
        {/* <div id="twitch-embed"></div> */}
        <video crossOrigin="true" autoPlay id="video" />
      </VideoContainer>

      {/* <ChatBox>
        <div
          ref={chatWrap}
          style={{
            height: "80%",
            maxHeight: "300px",
            overflow: "auto",
            marginBottom: "5px",
          }}
        >
          {messages.current.map((m, i) => (
            <div key={m + i}>☺: {m}</div>
          ))}
        </div>
        <InputWrapper>
          <Input
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendIt();
            }}
            value={inputText}
          />
          <Button onClick={sendIt}>send it</Button>
        </InputWrapper>
      </ChatBox> */}
    </div>
  );
}

export default App;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
