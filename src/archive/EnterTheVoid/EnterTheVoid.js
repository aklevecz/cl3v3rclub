import React, { useEffect } from "react";
import { VoidBanner } from "./VoidBanner";
import styled from "styled-components";

const VoidWrapper = styled.div`
  max-width: 460px;
  margin: auto;
  position: relative;
  .enter {
    position: absolute;
    color: white;
    font-family: Comic Neue;
    left: 50%;
    top: 70%;
    border: 2px dotted white;
    padding: 7px;
    border-radius: 30%;
    user-select: none;
    cursor: pointer;
    transition: color 1s, font-weight 1s;

    &:hover {
      color: red;
      font-weight: bold;
    }
  }
`;
const EnterTheVoid = () => {
  useEffect(() => {
    const voidSvg = document.getElementById("void");
    const voidPaths = voidSvg.getElementsByTagName("path");
    // for (let i = 0; i < voidPaths.length; i++) {
    //   voidPaths[i].setAttribute("fill", "red");
    // }
    let counter = 0;
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const cfill = voidPaths[counter % voidPaths.length].getAttribute(
        "fill",
        "red"
      );
      voidPaths[counter % voidPaths.length].setAttribute(
        "fill",
        cfill === "red" ? "white" : "red"
      );
      counter++;
    };
    animate();
    return () => cancelAnimationFrame(frame);
  });
  const d = new Date();
  const date = d.getUTCDate();
  const hour = d.getUTCHours();
  let open = false;
  if (date === 15 && hour > 1) {
    open = true;
  }
  return (
    <VoidWrapper>
      <VoidBanner name={"void"} />
      {open && (
        <div
          className="enter"
          onClick={() => (window.location.href = "https://theater.cl3v3r.club")}
        >
          ENTER
        </div>
      )}
    </VoidWrapper>
  );
};
export default EnterTheVoid;
