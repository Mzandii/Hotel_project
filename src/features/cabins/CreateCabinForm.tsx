import { useForm, type SubmitHandler } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import Input from "../../ui/input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabinHook } from "./useCreateCabinForm";

// ============================================
// SCHEMA
// ============================================

const formSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    maxCapacity: z.number().min(1, "Capacity must be at least 1"),
    regularPrice: z.number().min(0, "Price cannot be negative"),
    discount: z.number().min(0, "Discount cannot be negative"),
    description: z.string().optional(),
    image: z.instanceof(FileList).or(z.string()).optional(),
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "Discount cannot be greater than regular price",
    path: ["discount"],
  });

export type FormData = z.infer<typeof formSchema>;

// ============================================
// STYLES
// ============================================

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// ============================================
// COMPONENT
// ============================================

type CreateCabinFormProps = {
  cabinToEdit?: FormData;
  onCloseForm?: () => void;
};

function CreateCabinForm({
  cabinToEdit = {} as FormData,
  onCloseForm,
}: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: isEditSession ? editValues : {},
  });

  // const queryClient = useQueryClient();

  // const { mutate: submitCabin, isPending: isLoading } = useMutation({
  //   mutationFn: ({ id, data }: { id?: number; data: FormData }) =>
  //     createEditCabin(id, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     toast.success(
  //       isEditSession
  //         ? "CABIN EDITED SUCCESSFULLY!"
  //         : "CABIN CREATED SUCCESSFULLY!",
  //       { position: "top-right" },
  //     );
  //     reset();
  //     onCloseForm?.();
  //   },
  //   onError: (error: Error) => {
  //     console.error("FAILED TO SAVE CABIN:", error);
  //     toast.error(`Error: ${error.message}`);
  //   },
  // });

  const { submitCabin, isLoading } = useCreateCabinHook(isEditSession);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    submitCabin(
      { id: editId, data },
      {
        onSuccess: (data) => {
          console.log("DATA", data);
          reset();
          onCloseForm?.();
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { valueAsNumber: true })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { valueAsNumber: true })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", { valueAsNumber: true })}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description")}
        />
        {errors.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseForm?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
