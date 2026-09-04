import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModel((show) => !show)}>
        {isOpenModel ? "Hide the Form" : "Add New Cabin"}
      </Button>
      {isOpenModel && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CreateCabinForm onCloseForm={() => setIsOpenModel(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddCabin;
