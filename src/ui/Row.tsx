// src/ui/Row.tsx
import styled from "styled-components";

// Define the props type
type RowProps = {
  type?: "horizontal" | "vertical";
  children: React.ReactNode;
};

// Styled component with proper typing
const StyledRow = styled.div<{ type: "horizontal" | "vertical" }>`
  display: flex;
  flex-direction: ${(props) =>
    props.type === "horizontal" ? "row" : "column"};
  align-items: ${(props) =>
    props.type === "horizontal" ? "center" : "stretch"};
  gap: ${(props) => (props.type === "horizontal" ? "2.4rem" : "1.6rem")};

  /* Optional: add padding or margin */
  padding: 1.6rem 0;

  /* Optional: make it responsive */
  @media (max-width: 768px) {
    flex-direction: ${(props) =>
      props.type === "horizontal" ? "column" : "column"};
    gap: 1.6rem;
  }
`;

function Row({ type = "vertical", children }: RowProps) {
  return <StyledRow type={type}>{children}</StyledRow>;
}

export default Row;
