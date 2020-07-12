import React, { useEffect, useState } from "react";
import { VenueBox } from "./VenueBox";
import { DoorZoomBox } from "./DoorZoomBox";
import styled from "styled-components";
// const ids = [
//   "PATCH",
//   "CLOSED_x5F_OUTLINE",
//   "CLOSED_x5F_CLUBCLEVER",
//   "CLOSED_x5F_SMILER",
//   "CLOSED_x5F_CLAW",
//   "CLOSED_x5F_SPIRAL",
//   "CLOSED_x5F_HEART",
//   "CLOSED_x5F_CLOSED",
//   "CLOSED_x5F_OPEN",
//   "CLOSED_x5F_SMALLSMILE",
//   "CLOSED_x5F_DOOR",
//   "CLOSED_x5F_MUSICNOTE",
//   "CLOSED_x5F_SQUIGGLE",
//   "CLOSED_x5F_ROOF",
// ];

const ZoomContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rosybrown;
`;

const ZoomWrapper = styled.div`
  width: 100%;
  top: ${(props) => (props.orientation === "portrait" ? "149px" : "0px")};
  position: relative;
`;

const Venue = ({ orientation }) => {
  const [scene, setScene] = useState("normal");
  const [openState, setOpenState] = useState(false);
  useEffect(() => {
    // const date = new Date();
    // if (date.getUTCHours() > 2) {
    //   setOpenState(true);
    // }
    const heart = document.getElementById("CLOSED_x5F_HEART");
    const closedSign = document.getElementById("CLOSED_x5F_CLOSED");
    const eyes = document.getElementById("DOORCLOSED_x5F_EYES");
    const blink = document.getElementById("blink");
    const open = document.querySelector("#OPEN");
    const eyeSlit = document.querySelector("#DOORCLOSED_x5F_EYESLIT");
    const door = document.querySelector("#DOORCLOSED_x5F_DOOR");

    var frameCount = 0;
    var frame, fpsInterval, now, then, elapsed;
    startAnimating(5);
    function startAnimating(fps) {
      fpsInterval = 1000 / fps;
      then = Date.now();
      animate();
    }

    function animate() {
      frame = requestAnimationFrame(animate);

      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        if (scene === "normal") {
          const wave =
            (255 * Math.sin(frameCount * Math.PI * 2 * 0.1) + 255) * 0.5;
          heart.setAttribute("stroke", frameCount % 9 ? "lime" : "white");
          // closedSign.setAttribute("stroke", `rgb(${wave},255,${wave} )`);
        }

        if (scene === "zoomed" && !openState) {
          if (frameCount % 21) {
            eyes.setAttribute("opacity", 1);
            blink.setAttribute("opacity", 0);
          } else if (frameCount % 19) {
            eyes.setAttribute("opacity", 0);
            blink.setAttribute("opacity", 1);
          }
        }
        if (openState && scene === "zoomed") {
          open.setAttribute("stroke", frameCount % 9 ? "lime" : "white");
        }
        frameCount++;
      }
    }

    if (openState && scene === "zoomed") {
      document.querySelector("#DOORCLOSED_x5F_SIGN").style.opacity = 0;
      eyeSlit.setAttribute("opacity", 0);
      eyes.setAttribute("opacity", 0);
      door.addEventListener(
        "click",
        () => (window.location.href = "https://okra.cl3v3r.club")
      );
    } else {
      if (open) open.style.opacity = 0;
    }
    return () => cancelAnimationFrame(frame);
  }, [scene]);

  const zoomToDoor = () => setScene("zoomed");
  const eyeClick = () => {
    let counter = 0;
    const what = document.getElementById("chat");

    animator((frame, frameCount) => {
      const wave = 0.5 * (1 + Math.sin(counter * Math.PI * 2 * 0.1) * 2.5);
      counter++;
      console.log(wave);
      what.setAttribute("opacity", wave);
      if (wave > 1.6) {
        cancelAnimationFrame(frame);
        counter = 0;
        animator((frame) => {
          const wave = 0.5 * (1 + Math.cos(counter * Math.PI * 2 * 0.1) * 1.5);
          counter++;
          console.log(wave);
          what.setAttribute("opacity", wave);
          if (wave <= 0) {
            cancelAnimationFrame(frame);
          }
        });
      }
    });
  };

  return (
    <div>
      {scene === "normal" && <VenueBox zoomToDoor={zoomToDoor} />}
      {scene === "zoomed" && (
        <ZoomContainer>
          <ZoomWrapper
            orientation={orientation}
            onClick={() => {
              if (openState) window.location.href = "https://okra.cl3v3r.club";
            }}
          >
            <DoorZoomBox eyeClick={eyeClick} />
          </ZoomWrapper>
        </ZoomContainer>
      )}
    </div>
  );
};
export default Venue;

function animator(cb) {
  var frameCount = 0;
  var frame, fpsInterval, now, then, elapsed;
  startAnimating(5);
  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
  }

  function animate() {
    frame = requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      cb(frame, frameCount);

      frameCount++;
    }
  }
}
