import Heading from "../ui/Heading";
import Row from "../ui/Row";
//import getCabins from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import { useState } from "react";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((showForm) => !showForm)}>
          {showForm ? "Hide the Form" : "Add New Cabin"}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
