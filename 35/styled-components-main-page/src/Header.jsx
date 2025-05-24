import styled, { css } from "styled-components";

const paddingMarginBorder = css`
  padding: 20px;
  margin: 20px;
  border: 5px solid #999;
`;

const colors = {
  red: "color: red",
  black: "color: #000",
  white: "color: white",
  green: "color: green",
};

const H1 = styled.h1`
  background-color: #b2c0b2;
  color: #5c4e4e;
  ${paddingMarginBorder};

  ${(props) => props.color === "red" && "color: red"};
  ${(props) => props.size === "small" && "color: blue"};
  ${(props) => colors[props.color]};
`;

//Default Props
H1.defaultProps = {
    color : 'black',
    size : 'small'
}

export default function Header({ color, size }) {
  return (
    <H1 color={color} size={size}>
      This is a Header
    </H1>
  );
}
