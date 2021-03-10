import { Button } from "@/Commons";
import * as React from "react";
import log from "loglevel";
import { useHistory } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  left: 947px;
  top: 140px;
  width: 413px;
  height: 760px;

  background: #FFFFFF;
  border: 1px solid #E1E1E1;
  box-sizing: border-box;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
`;

const Title = styled.h1`
  position: absolute;
  top: 40px;
  left: 32px;
  margin: 0;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 33px;

  color: #000000;
`;

const OrderButton = styled(Button)`
  position: absolute;
  width: 349px;
  height: 48px;
  top: 672px;
  left: 32px;
`;

const OrderBarberContainer = styled.div`
  position: absolute;
  top: 105px;
  left: 38.5px;
  display: flex;
  width: 80%;
`;

const OrderNumber = styled.div`
  background: #000000;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center; 
  border-radius: 50%;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;

  /* identical to box height */
  text-align: center;
  margin-right: 18.5px;
  margin-top: 1.5px;

  color: #FFFFFF;
`;

const OrderBarber = styled.div`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  /* identical to box height */
  letter-spacing: 0.55px;

  color: #000000;
`;

const OrderPrice = styled.div`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  /* identical to box height */
  letter-spacing: 0.55px;

  color: #000000;
  flex: 1;
  text-align: right;
`;

const OrderList = styled.div`
  position: absolute;
  top: 145px;
  left: 38.5px;
  display: flex;
`;

const OrderItem = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;

  /* identical to box height, or 129% */
  letter-spacing: -0.41px;

  color: #3C3C43;
`;

type OrderCardProps = {
  visible: boolean;
}

export const OrderCard = ({ visible }: OrderCardProps) => {
  const history = useHistory();

  if (visible) {
    const barberName = sessionStorage.getItem("barberName");
    const serviceCredit = sessionStorage.getItem("serviceCredit");
    const serviceName = sessionStorage.getItem("serviceName");

    log.trace(`Order: ${barberName} with ${serviceName}, ${serviceCredit}`);

    return (
      <Container>
        <Title>Your order</Title>
        <OrderBarberContainer>
          <OrderNumber>1</OrderNumber>
          <OrderBarber>{barberName}</OrderBarber>
          <OrderPrice>{serviceCredit}</OrderPrice>
        </OrderBarberContainer>
        <OrderList>
          <OrderItem>{serviceName}</OrderItem>
        </OrderList>
        <OrderButton onClick={() => history.replace("/")}>Choose a time</OrderButton>
      </Container>
    );
  }

  return null;
}