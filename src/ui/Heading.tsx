import styled, { css } from "styled-components";
// ============================================
// TYPES
// ============================================
type HeadingStyleTypes = {
  $primary?: boolean;
  $center?: boolean;
  as?: "h1" | "h2" | "h3";
};
// ============================================
// STYLES
// ============================================
const baseStyles = {
  h1: css`
    font-size: 30px;
    font-weight: 700;
  `,
  h2: css`
    font-size: 24px;
    font-weight: 600;
  `,
  h3: css`
    font-size: 20px;
    font-weight: 500;
  `,
} as const;
// ============================================
// COMPONENT
// ============================================
const Heading = styled.h1<HeadingStyleTypes>`
  /* ${({ $primary }) =>
    $primary
      ? css`
          background: yellow;
          color: #000;
        `
      : css`
          background: greenyellow;
          color: #333;
        `}; */
  ${({ $center }) =>
    $center
      ? css`
          text-align: center;
        `
      : css`
          text-align: left;
        `};
  ${({ as = "h1" }) => baseStyles[as as keyof typeof baseStyles]};
  line-height: 1.4;
  margin: 0;
  padding: 10px;
  border-radius: 4px;
`;
export default Heading;
