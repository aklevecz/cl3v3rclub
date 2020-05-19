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
  useEffect(() => {
    const heart = document.getElementById("CLOSED_x5F_HEART");
    const closedSign = document.getElementById("CLOSED_x5F_CLOSED");
    const eyes = document.getElementById("DOORCLOSED_x5F_EYES");
    const blink = document.getElementById("blink");

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
          heart.setAttribute("stroke", frameCount % 9 ? "red" : "white");
          closedSign.setAttribute("stroke", `rgb(255,${wave},${wave} )`);
        }

        if (scene === "zoomed") {
          if (frameCount % 21) {
            eyes.setAttribute("opacity", 1);
            blink.setAttribute("opacity", 0);
          } else if (frameCount % 19) {
            eyes.setAttribute("opacity", 0);
            blink.setAttribute("opacity", 1);
          }
        }
        frameCount++;
      }
    }
    return () => cancelAnimationFrame(frame);
  }, [scene]);

  const zoomToDoor = () => setScene("zoomed");
  const eyeClick = () => alert("....");
  return (
    <div>
      {scene === "normal" && <VenueBox zoomToDoor={zoomToDoor} />}
      {scene === "zoomed" && (
        <ZoomContainer>
          <ZoomWrapper orientation={orientation}>
            <DoorZoomBox eyeClick={eyeClick} />
          </ZoomWrapper>
        </ZoomContainer>
      )}
    </div>
  );
};
export default Venue;
