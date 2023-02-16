import { Link } from "react-router-dom";
import styled from "styled-components";


export const MainWelcomeContainer = styled.div`

align-items: center;
display: flex;
justify-content: center;



`

export const WelcomeContainer = styled.div`

align-items: center;
background-color: ${({ theme }) => theme.colors.primary};
display: flex;
height: 30vh;
justify-content: center;
margin-top: 20rem;
width: 30vw;
border-radius: 10px;


`

export const WelcomeLink = styled(Link)`

    text-decoration: none;
    margin-right: 1rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.light};
    font-family: ${({ theme }) => theme.fonts.primary};


`