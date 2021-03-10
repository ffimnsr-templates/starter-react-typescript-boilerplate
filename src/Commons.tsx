import * as React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 1440px;
  height: 1312px;
  background: #F7F7F7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Button = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  color: #FFFFFF;

  background: #000000;
  border-radius: 8px;

  cursor: pointer;
`;

export const PageHeader = styled.h1`
  position: absolute;
  height: 41px;
  left: 81px;
  right: 643px;
  top: 150px;
  margin: 0;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 41px;

  letter-spacing: 0.37px;

  color: #000000;
`;
