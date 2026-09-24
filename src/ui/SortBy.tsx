import { useSearchParams } from "react-router";
import Select from "./Select";

type Option = {
  value: string;
  label: string;
};
export type Options = Option[];
type SortByProps = {
  options: Options;
};

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterField = "sortBy";
  const defaultValue = "";

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
