import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        defaultValue="all"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-dec", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (low first)" },
          { value: "regularPrice-dec", label: "Sort By Price (high first)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (low first)" },
          { value: "maxCapacity-dec", label: "Sort By Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}
