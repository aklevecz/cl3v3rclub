import React, { useState } from "react";
import { SignupBox } from "./SignUpBox";
import styled from "styled-components";

const SignupWrapper = styled.div`
  max-width: 400px;
  margin: auto;
  position: relative;
  #input-wrapper {
    position: absolute;
    height: 20px;
    top: 84%;
    left: 16%;
    width: 195px;
    opacity: 0;
  }
  input {
    font-family: "Comic Neue", cursive;
    position: absolute;
    top: 84%;
    left: 16%;
    width: 195px;
    color: white;
    background: none;
    border: none;
    outline-width: 0;
    pointer-events: all;
  }
  #signup-response {
    color: red;
    position: absolute;
    top: 363px;
    left: 12%;
    font-family: monospace;
  }
  #HEART {
    opacity: 0;
    transition: opacity 3s;
  }
`;
const Signup = () => {
  const [email, setEmail] = useState();
  const [response, setResponse] = useState();

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
    <SignupWrapper onClick={() => console.log("Hi")}>
      <SignupBox />
      <div
        id="input-wrapper"
        onClick={() => {
          document.querySelector("input").focus();
        }}
        style={{ background: "red" }}
      />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          document.getElementById("HEART").style.opacity = 1;
          if (e.key === "Enter") {
            submit();
          }
        }}
        name="email"
      ></input>
      <div id="signup-response">{response}</div>
      <button style={{ display: "none" }}></button>
    </SignupWrapper>
  );
};

export default Signup;

function validateEmail(email) {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
