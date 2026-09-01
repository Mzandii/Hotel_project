import Form from "../../ui/Form";
import styled from "styled-components";
import Input from "../../ui/input";
import { getSettings, updateSetting } from "../../services/apiSettings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import { toast } from "react-toastify";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Label = styled.label`
  font-weight: 500;
  /* Add your label styles here */
`;
const FormRow = ({ label, children }) => {
  const id = children.props.id;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
};

//====================================
//Get the data from the api
//====================================

//====================================
//give the data to the form and manipulate
//====================================
export default function UpdateSettingsForm({ settings }) {
  const queryClient = useQueryClient();
  const { mutate: mutation, dataR } = useMutation({
    mutationFn: (data) => updateSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("seeting updates");
    },
    onError: (error) => {
      console.log(error);
      toast.error("could not change the setting");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookingLength: settings.minBookingLength,
      maxBookingLength: settings.maxBookingLength,
      maxGuestsPerBooking: settings.maxGuestsPerBooking,
      breakfastPrice: settings.breakfastPrice,
    },
  });

  function onSubmit(formData) {
    mutation(formData);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input type="number" {...register("minBookingLength")} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" {...register("maxBookingLength")} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" {...register("maxGuestsPerBooking")} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice")}
        />
      </FormRow>
      <button type="submit">submit</button>
    </Form>
  );
}
