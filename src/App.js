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
  margin: 20px auto 7px;
`;

const Info = styled.div`
  border: 2px solid black;
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
    opacity: 0.7;
    z-index: -1;
    background: ${(props) => `url(${props.img})`};
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
    new Plyr(video);

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
        <Info
          color="rgba(175, 75, 250, 0.4)"
          img="https://i.pinimg.com/originals/64/a8/be/64a8be98eddab6cef644bdd4c8115e36.png"
        >
          <div class="text">
            tonight we will be showing interstellla 5555 @ 8pm
          </div>
        </Info>
      </div>
      <VideoContainer>
        <video crossOrigin="true" autoPlay id="video" />
      </VideoContainer>
      <Info
        color="rgba(255,0,0,.8)"
        img="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/13466317_573263599503757_871852264254909025_n.jpg?_nc_cat=106&_nc_sid=7aed08&_nc_ohc=0Z-YE-AJXHQAX9L9Ski&_nc_ht=scontent-sjc3-1.xx&oh=caea1fc53420cd150d5754269dc1c043&oe=5EC97945"
      >
        <div class="text">tommorrow night @ 8pm ~ Raptor DJs</div>
      </Info>
    </div>
  );
}

export default App;
