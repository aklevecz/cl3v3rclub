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
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
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
    background-size: 100% auto;
  }
  .text {
    color: white;
    padding: 11px;
    font-size: 42px;
  }
  a {
    display: block;
    margin: auto;
    font-size: 38px;
    text-align: center;
    color: #1fb2f9;
    letter-spacing: 6px;
  }
  span {
    color: #ec4545;
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
    // const source = "https://ice.raptor.pizza/hls/shrimp.m3u8";
    // const video = document.querySelector("#video");
    // new Plyr(video);
    // if (!Hls.isSupported()) {
    //   video.src = source;
    // } else {
    //   const hls = new Hls();
    //   hls.loadSource(source);
    //   hls.attachMedia(video);
    // }
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
      {/* <Info
        color="rgba(122, 96, 173, 0.5)"
        img="https://m.media-amazon.com/images/M/MV5BNDcwODI3MTg0OV5BMl5BanBnXkFtZTcwMzk5Mjc4NA@@._V1_.jpg"
      >
        <div className="text">Friday night movie ~ Donnie Darko</div>
        <a href="https://theater.cl3v3r.club">HERE</a>
        <div className="text">8pm PST ~ May 1st</div>
      </Info> */}
      <Info
        img="data:image/jpeg;base64,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"
        color="rgba(104,239,158, .7)"
      >
        <div className="text">Saturday Night ~ Raptor DJs</div>
        <a href="https://theater.cl3v3r.club">HERE</a>
        <div className="text">8pm PST ~ May 2nd</div>
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
      {/* <VideoContainer> */}
      {/* <div id="twitch-embed"></div> */}
      {/* <video crossOrigin="true" autoPlay id="video" />
      </VideoContainer> */}

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
