import Form from "../../ui/Form";
import styled from "styled-components";
import Input from "../../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUpdate from "./useUpdateSetting";

// ============================================
// STYLES
// ============================================

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; // ✅ Changed to 2 columns: label | input
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

// ============================================
// TYPES
// ============================================

type SettingType = {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

type FormRowProps = {
  label: string;
  children: React.ReactElement;
};

// ============================================
// FORM ROW COMPONENT
// ============================================

function FormRow({ label, children }: FormRowProps) {
  const id = children.props.id;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function UpdateSettingsForm({
  settings,
}: {
  settings: SettingType;
}) {
  const { mutate: mutation, isPending } = useUpdate();
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

  function onSubmit(formData: Partial<SettingType>) {
    mutation(formData);
  }

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof SettingType,
  ) {
    const value = e.target.value;
    const parsedValue = value === "" ? "" : Number(value);
    mutation({ [field]: parsedValue });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          {...register("minBookingLength")}
          disabled={isPending}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          {...register("maxBookingLength")}
          disabled={isPending}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          {...register("maxGuestsPerBooking")}
          disabled={isPending}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          {...register("breakfastPrice")}
          disabled={isPending}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}
