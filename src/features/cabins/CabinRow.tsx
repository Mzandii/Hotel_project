import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabinHook from "./useDeleteCabin";
import { useCreateCabinHook } from "./useCreateCabinForm";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiSquare2Stack } from "react-icons/hi2";

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
    name: `@copy:${name}`,
    maxCapacity,
    regularPrice,
    discount,
    image,
  };

  function handleDuplilcateCabin() {
    submitCabin({ data: data });
  }

  function handleDeleteCabin(cabinID: number) {
    deleteCabinMutation({ id: cabinID });
  }

  return (
    <Table.Row>
      <Img
        src={image}
        alt={name}
        onClick={() => window.open(image, "_blank")}
        style={{ cursor: "pointer" }}
      />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} Guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? <Discount>{discount}</Discount> : <span>&mdash;</span>}
      <ButtonGroup>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={cabinID} />
              <Menus.List id={cabinID}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplilcateCabin}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<FaEdit />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => handleDeleteCabin(cabinID)}
                disabled={isDeleting}
              />
            </Modal.Window>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Menus>
        </Modal>
      </ButtonGroup>
    </Table.Row>
  );
}
