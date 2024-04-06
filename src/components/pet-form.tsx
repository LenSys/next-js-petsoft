"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE_URL } from "@/lib/constants";
import { TPetForm, petFormSchema } from "@/lib/validations";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      imageUrl: selectedPet?.imageUrl,
      age: selectedPet?.age,
      notes: selectedPet?.notes,
    },
  });

  // const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     const formData = new FormData(event.currentTarget);
  //     const pet = {
  //       name: formData.get("name") as string,
  //       ownerName: formData.get("ownerName") as string,
  //       imageUrl:
  //         (formData.get("imageUrl") as string) ||
  //         "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //       age: +(formData.get("age") as string),
  //       notes: formData.get("notes") as string,
  //     };

  //     if (actionType === "add") {
  //       handleAddPet(pet);
  //     } else {
  //       handleEditPet(selectedPet?.id || "", pet);
  //     }

  //     onFormSubmit();
  //   };

  return (
    <form
      action={async (formData) => {
        // react-hook-form validation
        const result = await trigger();

        if (!result) return;

        // close form dialog before adding or editing the pet -> optimistic UI
        onFormSubmit();

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE_URL;

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="space-y-3 flex flex-col"
    >
      <div>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-700">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-700">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-700">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-700">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
