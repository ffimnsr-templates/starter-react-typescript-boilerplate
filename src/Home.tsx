import * as React from "react";
import styled from "styled-components";
import background from "@/assets/images/background.jpg";
import { Logo } from "@/components/Logo";
import { Container, Button } from "@/Commons";
import { useHistory } from "react-router-dom";

const HeroContainer = styled.div`
  position: absolute;
  width: 300px;
  left: 189px;
  top: 513px;
`;

const ServiceName = styled.div`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 57px;
  letter-spacing: 0.37px;
  color: #000000;
`;

const ServiceAddress = styled.div`
  margin-top: 24px;
  width: 262px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;

  letter-spacing: 0.55px;
  color: rgba(60, 60, 67, 0.6);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Background = styled.div`
  position: absolute;
  width: 1440px;
  height: 1312px;
  left: 0px;
  top: 0px;

  background: linear-gradient(270deg, rgba(247, 247, 247, 0) 6.5%, #F7F7F7 120%), url(${background});
`;

const ActionLinks = styled.div`
  position: absolute;
  top: 751px;
  left: 189px;

  display: flex;
`;

const ActionButton = styled(Button)`
  width: 193px;
  height: 48px;
`;

export const Home = () => {
  const history = useHistory();

  return (
    <Container>
      <Background />
      <div>
        <Logo />
      </div>
      <HeroContainer>
        <ServiceName>X-CUTZ Barbershop</ServiceName>
        <ServiceAddress>4791 Lowndes Hill Park Road Bakersfield, CA 93307</ServiceAddress>
      </HeroContainer>
      <ActionLinks>
        <ActionButton onClick={() => history.push("/services")}>Choose a service</ActionButton>
        <ActionButton onClick={() => history.push("/barbers")} style={{ marginLeft: 24 }}>Choose a barber</ActionButton>
      </ActionLinks>
    </Container>
  );
}