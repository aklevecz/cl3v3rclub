import React, { useEffect } from "react";
import styled from "styled-components";
import Plyr from "plyr";
import Hls from "hls.js";
import "./App.css";

const Header = styled.div`
  font-size: 30px;
  display: flex;
  border: 2px solid black;
  padding: 10px;
  margin: 20px auto;
`;

const Info = styled.div`
  border: 2px solid black;
  margin: 10px auto;
  width: 90%;
  max-width: 500px;
  position: relative;
  background-color: rgba(175, 75, 250, 0.4);
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: -1;
    background: url("https://i.pinimg.com/originals/64/a8/be/64a8be98eddab6cef644bdd4c8115e36.png");
  }
  .text {
    color: white;
    padding: 11px;
    font-size: 42px;
  }
`;

const VideoContainer = styled.div`
  width: 90%;
  max-width: 500px;
  display: block;
  margin: auto;
`;

function App() {
  useEffect(() => {
    const source = "https://ice.raptor.pizza/hls/daftpunk.m3u8";
    const video = document.querySelector("#video");
    const player = new Plyr(video);
    player.on("ready", () => {
      video.muted = true;
    });

    if (!Hls.isSupported()) {
      video.src = source;
    } else {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
    }
  });
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Header>CLUB CL3V3R</Header>
      </div>
      <div>
        <Info>
          <div class="text">
            tonight we will be showing interstellla 5555 @ 8pm
          </div>
        </Info>
      </div>
      <VideoContainer>
        <video crossOrigin="true" autoPlay id="video" />
      </VideoContainer>
    </div>
  );
}

export default App;
