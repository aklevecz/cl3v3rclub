import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Plyr from "plyr";
import Hls from "hls.js";
// import io from "socket.io-client";
import "./App.css";

const Header = styled.div`
  font-size: 30px;
  display: flex;
  border: 2px solid black;
  padding: 10px;
  margin: 20px auto 7px;
  user-select: none;
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

function App() {
  useEffect(() => {
    // const source = "https://ice.raptor.pizza/hls/daftpunk.m3u8";
    // const video = document.querySelector("#video");
    // new Plyr(video);

    // if (!Hls.isSupported()) {
    //   video.src = source;
    // } else {
    //   const hls = new Hls();
    //   hls.loadSource(source);
    //   hls.attachMedia(video);
    // }

    new window.Twitch.Embed("twitch-embed", {
      width: window.innerWidth - (window.innerWidth > 767 ? 50 : 0),
      height: 500,
      channel: "clubcl3v3r",
    });
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Header>CLUB CL3V3R</Header>
      </div>
      <Info
        color="rgba(255,0,0,.8)"
        img="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/13466317_573263599503757_871852264254909025_n.jpg?_nc_cat=106&_nc_sid=7aed08&_nc_ohc=0Z-YE-AJXHQAX9L9Ski&_nc_ht=scontent-sjc3-1.xx&oh=caea1fc53420cd150d5754269dc1c043&oe=5EC97945"
      >
        <div className="text">Thank you everyone who showed up :)</div>
        <div className="text">will likely open again on saturday</div>
      </Info>
      <VideoContainer>
        <div id="twitch-embed"></div>
        {/* <video crossOrigin="true" autoPlay id="video" /> */}
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
