import Spinner from "../../ui/Spinner";
import { CabinRow } from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router";

export default function CabinTable() {
  const [searchParams] = useSearchParams();
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <p>Could not load cabins. Please try again.</p>;
  if (!cabins?.length) return <p>No cabins found.</p>;

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((el) => el.discount > 0);
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((el) => el.discount === 0);
  }

  // 2. Sort
  const sortValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const aVal = a[field as keyof typeof a];
    const bVal = b[field as keyof typeof b];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * modifier;
    }
    return String(aVal).localeCompare(String(bVal)) * modifier;
  });

  return (
    <Table columns="1fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}
