import React, { useEffect } from "react";
import { SomePartyBox2 } from "./SomePartyBox2";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 490px;
  margin: auto;
`;

const items = [
  "SOME",
  "FUCKING",
  "COMEHANG",
  "PARTY",
  "_x38_PM",
  "TINYDOOR",
  "SATURDAY",
  "IDUNNO",
  "SMILE",
  "ZIGZAG",
  "SWIRL",
  "OUTLINE",
];

const SomeParty = () => {
  useEffect(() => {
    const clickDoor = document
      .getElementById("click-door")
      .addEventListener("click", () => {
        window.location.href = "https://theater.cl3v3r.club";
      });
    const randomPeck = () => Math.floor(Math.random() * items.length);
    let pecker = [randomPeck()];
    let peckIndex = 0;
    let currentElement = document.getElementById(items[pecker[peckIndex]]);
    let frame;
    let color = 255;
    let reverse = false;
    let processing = true;
    const animate = () => {
      if (processing) {
        currentElement.style.stroke = `rgb(255,${color},${color})`;
        if (!reverse) {
          color -= 10;
          if (color < 0) processing = false;
        } else {
          color += 10;
          if (color > 255) processing = false;
        }
      } else if (pecker.length !== items.length) {
        let rPeck = randomPeck();
        while (pecker.includes(rPeck)) rPeck = randomPeck();
        pecker.push(rPeck);
        peckIndex++;
        currentElement = document.getElementById(items[pecker[peckIndex]]);
        if (!reverse) {
          color = 255;
        } else {
          color = 0;
        }
        processing = true;
      } else {
        reverse = !reverse;
        color = 255;
        peckIndex = 0;
        pecker = [randomPeck()];
        currentElement = document.getElementById(items[pecker[peckIndex]]);
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Wrapper>
      <SomePartyBox2 />
    </Wrapper>
  );
};

export default SomeParty;
