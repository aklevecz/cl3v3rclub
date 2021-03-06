import React, { useEffect, useState } from "react";
import { Background } from "./Background";
import { CleverHeading } from "./CleverHeading";
import Venue from "./Venue";
import Signup from "./Signup";
import styled from "styled-components";
import "./App.css";

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -99;
`;

function App() {
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  );
  const resize = () =>
    setOrientation(
      window.innerWidth > window.innerHeight ? "landscape" : "portrait"
    );
  useEffect(() => {
    window.addEventListener("resize", resize, false);

    return () => window.removeEventListener(resize, false);
  }, []);
  return (
    <div className="App">
      <div style={{ display: "block" }}>
        {/* <Header>CLUB CL3V3R</Header> */}
        <CleverHeading />
      </div>
      <Venue orientation={orientation} />
      <Signup />
      {/* <VideoContainer> */}
      {/* <div id="twitch-embed"></div> */}
      {/* <video crossOrigin="true" autoPlay id="video" />
      </VideoContainer> */}
      {orientation === "landscape" && (
        <BackgroundWrapper>
          <Background />
        </BackgroundWrapper>
      )}
    </div>
  );
}

export default App;

// useEffect(() => {
//     // *** HLS ****
//     // const source = "https://ice.raptor.pizza/hls/shrimp.m3u8";
//     // const video = document.querySelector("#video");
//     // new Plyr(video);
//     // if (!Hls.isSupported()) {
//     //   video.src = source;
//     // } else {
//     //   const hls = new Hls();
//     //   hls.loadSource(source);
//     //   hls.attachMedia(video);
//     // }
//     // *** HLS ****
//     // *** TWITCH ***
//     // new window.Twitch.Embed("twitch-embed", {
//     //   width: window.innerWidth - (window.innerWidth > 767 ? 50 : 0),
//     //   height: 500,
//     //   channel: "clubcl3v3r",
//     // });
//     // *** TWITCH ***
//     // THREE JS
//     // function main() {
//     //   const canvas = document.querySelector("#c");
//     //   const renderer = new THREE.WebGLRenderer({ canvas });
//     //   renderer.autoClearColor = false;
//     //   const camera = new THREE.OrthographicCamera(
//     //     -1, // left
//     //     1, // right
//     //     1, // top
//     //     -1, // bottom
//     //     -1, // near,
//     //     1 // far
//     //   );
//     //   const scene = new THREE.Scene();
//     //   const plane = new THREE.PlaneBufferGeometry(2, 2);
//     //   const uniforms = {
//     //     iTime: { value: 0 },
//     //     iResolution: { value: new THREE.Vector3() },
//     //   };
//     //   const material = new THREE.ShaderMaterial({
//     //     fragmentShader,
//     //     uniforms,
//     //   });
//     //   scene.add(new THREE.Mesh(plane, material));
//     //   function resizeRendererToDisplaySize(renderer) {
//     //     const canvas = renderer.domElement;
//     //     const width = canvas.clientWidth;
//     //     const height = canvas.clientHeight;
//     //     const needResize = canvas.width !== width || canvas.height !== height;
//     //     if (needResize) {
//     //       renderer.setSize(width, height, false);
//     //     }
//     //     return needResize;
//     //   }
//     //   function render(time) {
//     //     time *= 0.001; // convert to seconds
//     //     resizeRendererToDisplaySize(renderer);
//     //     const canvas = renderer.domElement;
//     //     uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
//     //     uniforms.iTime.value = time;
//     //     renderer.render(scene, camera);
//     //     requestAnimationFrame(render);
//     //   }
//     //   requestAnimationFrame(render);
//     // }
//     // main();
//     // THREE JS
//   }, []);
