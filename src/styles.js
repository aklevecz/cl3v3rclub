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

export const Info = styled.div`
  border: 7px solid black;
  margin: 10px auto;
  width: 90%;
  max-width: 500px;
  min-height: 300px;
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
    user-select: none;
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
