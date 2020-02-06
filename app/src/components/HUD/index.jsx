// @flow
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100vw;
  height: 70px;
`;
const ReturnButton = styled.button``;

export default function HUD() {
  return (
    <Nav>
      <ReturnButton>Menu</ReturnButton>
    </Nav>
  );
}
