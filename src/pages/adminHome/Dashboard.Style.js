import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  padding: 2rem;

  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;
