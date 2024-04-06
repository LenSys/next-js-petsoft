"use client";

import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { TPet } from "@/lib/types";
import { addPet, editPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { selectedPet } = usePetContext();
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
        if (actionType === "add") {
          const error = await addPet(formData);

          if (error) {
            toast.warning(error.message);
            return;
          }
        } else if (actionType === "edit") {
          const error = await editPet(selectedPet?.id, formData);

          if (error) {
            toast.warning(error.message);
            return;
          }
        }

        onFormSubmit();
      }}
      className="space-y-3 flex flex-col"
    >
      <div>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
