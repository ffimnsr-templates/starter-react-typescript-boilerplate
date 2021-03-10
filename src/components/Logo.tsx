import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 171px;
  height: 80px;
  left: 82px;
  top: 0px;
  background: #161616;
  border-radius: 0 0 5px 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  font-family: Bebas Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 3px;
  color: #FFFFFF;
`;

export const Logo = () => {
  const history = useHistory();

  return (
    <Container onClick={() => history.replace("/")}>
      <LogoContainer>SQUIRE</LogoContainer>
    </Container>
  );
}
