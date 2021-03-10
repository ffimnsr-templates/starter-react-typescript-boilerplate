import * as React from "react";
import styled from "styled-components";
import log from "loglevel";
import { Logo } from "@/components/Logo";
import { Container, PageHeader, Button } from "@/Commons";
import { OrderCard } from "@/components/OrderCard";
import { ServiceType } from "@/models";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const PageOptions = styled.div`
  position: absolute;
  top: 255px;
  left: 80px;
  width: 738px;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  overflow: hidden;
`;

const ServiceCard = styled.div`
  width: 230px;
  height: 134px;
  border: 1px solid #C7C7CC;
  box-sizing: border-box;
  border-radius: 16px;
  position: relative;

  &:hover {
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ServiceName = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 56px;

  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  
  /* or 129% */
  letter-spacing: -0.41px;
  
  color: #000000;  
`;

const Split = styled.div`
  position: absolute;
  top: 88px;
  left: 24px;
  width: 180px;

  display: flex;
`;

const ServiceDuration = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  
  /* identical to box height, or 147% */
  letter-spacing: -0.24px;
  
  color: rgba(60, 60, 67, 0.6);
`;

const ServicePrice = styled.div`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
  text-align: right;
  flex: 1;

  color: #006BB2;
`;

export const ChooseService = () => {
  const history = useHistory();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services/")
      .then((res) => res.json())
      .then((json) => {
        log.info(json);
        setServices(json);
      });
  }, []);

  const availableServices = services.map((service: ServiceType) => {
    const value = new Intl.NumberFormat("en-US", { style: "currency", currency: service.currency }).format(service.price / 100).replace(/\D00(?=\D*$)/, '');

    return (
      <ServiceCard key={service.id} onClick={() => history.push(`/services/${service.id}/barbers`)}>
        <ServiceName>{service.name}</ServiceName>
        <Split>
          <ServiceDuration>{service.duration} min</ServiceDuration>
          <ServicePrice>{value}</ServicePrice>
        </Split>
      </ServiceCard>
    )
  });

  return (
    <Container>
      <div>
        <Logo />
      </div>
      <PageHeader>Choose a service</PageHeader>
      <PageOptions>
        {availableServices}
      </PageOptions>
      <OrderCard />
    </Container>
  );
}
