import Spinner from "../../ui/Spinner";
import { CabinRow } from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  if (isLoading) return <Spinner />;
  if (error) return <p>Could not load cabins. Please try again.</p>;
  if (!cabins?.length) return <p>No cabins found.</p>;

  return (
    <Menus>
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
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
