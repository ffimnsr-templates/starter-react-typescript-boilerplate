import * as React from "react";
import styled from "styled-components";
import log from "loglevel";
import { Logo } from "@/components/Logo";
import { Container, PageHeader, Button } from "@/Commons";
import { OrderCard } from "@/components/OrderCard";
import { ServiceType, BarberType } from "@/models";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

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

type ServiceCardProps = {
  pressed: boolean;
}

const ServiceCard = styled.div`
  width: 230px;
  height: 134px;
  border: 1px solid #C7C7CC;
  box-sizing: border-box;
  border-radius: 16px;
  position: relative;

  &:hover {
    background: ${(props: ServiceCardProps) => props.pressed ? "#161616" : "#FFFFFF"};
    border: 1px solid #E1E1E1;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  }

  background: ${(props: ServiceCardProps) => props.pressed ? "#161616" : "transparent"};

  & > div, & > div > div {
    color: ${(props: ServiceCardProps) => props.pressed ? "#FFFFFF" : "#000000"} !important;
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
  const { id } = useParams() as any;
  const [services, setServices] = useState<ServiceType[]>([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  
  useEffect(() => {
    let url = "/api/services/";
    if (id !== undefined) {
      url = "/api/barbers/";
    }

    fetch(url)
      .then((res) => res.json())
      .then((json: ServiceType[] | BarberType[]) => {
        log.trace(json);
        let result = json;
        if (id !== undefined) {
          const temp = (json as BarberType[])[id];
          log.trace(temp);
          result = temp ? temp.services : [];
        }
        setServices(result as ServiceType[]);
      });
  }, [id]);

  const handleOnClick = useCallback((e, service: ServiceType, value: string) => {
    e.preventDefault();

    sessionStorage.setItem("serviceCredit", value);
    sessionStorage.setItem("serviceName", service.name);

    if (id !== undefined) {
      setSelectedItem(service.id);
      setShowOrderDialog(true);
    } else {
      history.push(`/services/${service.id}/barbers`);
    }
  }, [id]);

  const availableServices = services.map((service: ServiceType) => {
    const value = new Intl.NumberFormat("en-US", { style: "currency", currency: service.currency }).format(service.price / 100).replace(/\D00(?=\D*$)/, '');
    const pressed = selectedItem === service.id;

    return (
      <ServiceCard pressed={pressed} key={service.id} onClick={(e) => handleOnClick(e, service, value)}>
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
        {services.length === 0 ? "Loading..." : null}
      </PageOptions>
      <OrderCard visible={showOrderDialog} />
    </Container>
  );
}
