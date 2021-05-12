import styled from "styled-components";

export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Helvetica, Roboto, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
`;

export const MenuItem = styled.span`
  cursor: pointer;
  color: ${({ hovered, selected }) => {
    if (hovered && !selected) {
      return "lightgrey";
    } else if (hovered && selected) {
      return "blue";
    } else if (selected) {
      return "blue";
    }
  }};
`;
