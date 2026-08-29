import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { mutate: deleteCabinMutation, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id }: { id: number | string }) => deleteCabin({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("DELETED SUCCESSFULLY!", {
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      console.error("Failed to delete cabin:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  function handleDeleteCabin(id: number) {
    deleteCabinMutation({ id });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity} Guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}</Discount>
        <ButtonGroup>
          <button
            onClick={() => handleDeleteCabin(cabinID)}
            disabled={isDeleting}
          >
            Delete
          </button>
          <button onClick={() => setIsEditFormOpen((open) => !open)}>
            {isEditFormOpen ? "Close" : "Update"}
          </button>
        </ButtonGroup>
      </TableRow>
      {isEditFormOpen && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onCloseForm={() => setIsEditFormOpen(false)}
        />
      )}
    </>
  );
}
