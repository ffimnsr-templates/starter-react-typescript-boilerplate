import * as React from "react";
import styled from "styled-components";
import log from "loglevel";
import { Logo } from "@/components/Logo";
import { Container, PageHeader, Button } from "@/Commons";
import { OrderCard } from "./components/OrderCard";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BarberType, ServiceType } from "@/models";
import { useParams } from "react-router-dom";

const PageOptions = styled.div`
  position: absolute;
  top: 258px;
  left: 80px;
  width: 735px;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  overflow: hidden;
`;

type BarberCardProps = {
  pressed: boolean;
}

const BarberCard = styled.div`
  width: 229px;
  height: 322px;
  border: 1px solid #C7C7CC;
  box-sizing: border-box;
  border-radius: 16px;

  &:hover {
    background: ${(props: BarberCardProps) => props.pressed ? "#161616" : "#FFFFFF"};
    border: 1px solid #E1E1E1;
    box-sizing: border-box;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  }

  background: ${(props: BarberCardProps) => props.pressed ? "#161616" : "transparent"};

  & > div {
    color: ${(props: BarberCardProps) => props.pressed ? "#FFFFFF" : "#000000"} !important;
  }
`;

const BarberAvatar = styled.img`
  margin-top: 40px;
  margin-left: 66px;
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

const BarberName = styled.div`
  margin-top: 24px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  /* identical to box height */
  text-align: center;
  letter-spacing: 0.55px;

  color: #000000;
`;

const BarberAvailability = styled.div`
  margin-top: 8px;

  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;

  text-align: center;
  letter-spacing: -0.24px;
  text-transform: capitalize;

  color: rgba(60, 60, 67, 0.6);
`;

const BarberDivider = styled.div`
  margin-top: 24px;
  margin-left: 94px;
  width: 40px;
  height: 0px;
  border: 1px solid #D1D1D6;
`;

const BarberLink = styled.div`
  margin-top: 24px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
  text-align: center;

  color: #006BB2;
  cursor: pointer;
`;

const GradientBotton = styled.div`
  position: absolute;
  width: 1439px;
  height: 240px;
  left: 1px;
  top: 1072px;
  background: linear-gradient(177.42deg, rgba(247, 247, 247, 0) 2.15%, rgba(247, 247, 247, 0.9) 38.56%);
`;

export const ChooseBarber = () => {
  const history = useHistory();
  const { id } = useParams() as any;
  const [barbers, setBarbers] = useState<BarberType[]>([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    let url = "/api/barbers/";

    fetch(url)
      .then((res) => res.json())
      .then((json: BarberType[]) => {
        log.trace(json);
        let temp = json;

        if (id !== undefined) {
          temp = json.filter((barber) => 
            barber.services.find((service) => service.id === Number(id)))
          log.trace(temp);
        }
        setBarbers(temp);
      });
  }, [id]);

  const handleOnClick = useCallback((e, barber: BarberType) => {
    e.preventDefault();

    sessionStorage.setItem("barberName", `${barber.firstName} ${barber.lastName.charAt(0)}.`);

    if (id !== undefined) {
      setSelectedItem(barber.id);
      setShowOrderDialog(true);
    } else {
      history.push(`/barbers/${barber.id}/services`);
    }
  }, [id]);

  const availableBarbers = barbers.map((barber: BarberType) => {
    const pressed = selectedItem === barber.id;

    return (
      <BarberCard pressed={pressed} onClick={(e) => handleOnClick(e, barber)} key={barber.id}>
        <BarberAvatar src={barber.photo} />
        <BarberName>{`${barber.firstName} ${barber.lastName.charAt(0)}.`}</BarberName>
        <BarberAvailability>Available Today</BarberAvailability>
        <BarberDivider />
        <BarberLink onClick={() => history.replace("/")}>About {barber.firstName}</BarberLink>
      </BarberCard>
    );
  });

  return (
    <Container>
      <div>
        <Logo />
      </div>
      <PageHeader>Choose a professional</PageHeader>
      <PageOptions>
        {availableBarbers}
      </PageOptions>
      <OrderCard visible={showOrderDialog} />
      <GradientBotton />
    </Container>
  );
}
