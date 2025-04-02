import { Outlet } from "react-router-dom";
import styled from "styled-components"

const StyledLayout = styled.div`
background-color: #3a4a1a;
`;

const H1 = styled.h1`
  font-size  : 50px;
  font-family: Arial, Helvetica, sans-serif;
  color: blueviolet;
`;

export default function Layout() {
    return <StyledLayout>
        <H1>facebook</H1>
        {<Outlet />}
    </StyledLayout>
}