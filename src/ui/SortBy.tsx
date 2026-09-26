import { useSearchParams } from "react-router";
import Select from "./Select";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterProps = {
  filterField: string;
  options: FilterOption[];
  defaultValue?: string;
};

function SortBy({ filterField, defaultValue, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(filterField) || defaultValue;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set(filterField, e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <Select
        options={options}
        type="white"
        onChange={handleChange}
        value={currentValue}
      />
    </div>
  );
}

export default SortBy;
