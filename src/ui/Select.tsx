import styled from "styled-components";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  value?: string;
  type?: "white" | "default";
  filterField?: string;
  defaultValue?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange">;

const StyledSelect = styled.select<{ type?: "white" | "default" }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ onChange, options, value, ...props }: SelectProps) {
  return (
    <div>
      <StyledSelect value={value} onChange={onChange} {...props}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

export default Select;
