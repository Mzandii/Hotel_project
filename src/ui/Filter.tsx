import { useSearchParams } from "react-router";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export type FilterOption = {
  value: string;
  label: string;
};

type FilterProps = {
  filterField: string;
  options: FilterOption[];
  defaultValue?: string;
};

const Filter = ({ filterField, options, defaultValue }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || defaultValue;

  function handleClick(value: string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterField, value);
    setSearchParams(newParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
