import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabinHook from "./useDeleteCabin";
import { useCreateCabinHook } from "./useCreateCabinForm";
import { FaTrash, FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinType = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export function CabinRow({ cabin }: { cabin: CabinType }) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { deleteCabinMutation, isDeleting } = useDeleteCabinHook();
  const { submitCabin } = useCreateCabinHook();

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const data = {
    name: `coppy of ${name}`,
    maxCapacity,
    regularPrice,
    discount,
    image,
  };

  function handleDuplilcateCabin() {
    submitCabin({ data: data });
  }

  function handleDeleteCabin(id: number) {
    deleteCabinMutation({ id });
  }

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} Guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? <Discount>{discount}</Discount> : <span>&mdash;</span>}
      <ButtonGroup>
        <button onClick={() => handleDuplilcateCabin()}>
          <FaCopy />
        </button>
        <Modal>
          <Modal.Open opens="delete">
            <button>
              <FaTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => handleDeleteCabin(cabinID)}
              disabled={isDeleting}
            />
          </Modal.Window>

          <Modal.Open opens="edit">
            <button>
              <FaEdit />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </Table.Row>
  );
}
