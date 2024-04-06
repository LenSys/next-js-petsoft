"use client";

import { Pet } from ".prisma/client";
import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  // handleAddPet: (newPet: Omit<TPet, "id">) => void;
  // handleEditPet: (petId: string, newPetData: Omit<TPet, "id">) => void;
  handleChangeSelectedPetId: (petId: Pet["id"]) => void;
  // handleCheckoutPet: (petId: string) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleCheckoutPet: (petId: Pet["id"]) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (prev, { action, payload }) => {
      switch (action) {
        case "add":
          return [...prev, { ...payload, id: Math.random().toString() }];
        case "edit":
          return prev.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            } else {
              return pet;
            }
          });
        case "checkout":
          return prev.filter((pet) => pet.id !== payload);
        default:
          return prev;
      }
    }
  );
  // const [pets, setPets] = useState<TPet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  // const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  // const numberOfPets = pets.length;
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions
  // const handleAddPet = async (newPet: Omit<TPet, "id">) => {
  // const newPetId = Date.now().toString();

  // setPets((prev) => [...prev, { ...newPet, id: newPetId }]);
  // setSelectedPetId(newPetId);
  // };

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  // const handleEditPet = async (petId: string, newPetData: Omit<TPet, "id">) => {
  //   setPets((prev) =>
  //     prev.map((pet) => {
  //       if (pet.id === petId) {
  //         return {
  //           id: petId,
  //           ...newPetData,
  //         };
  //       } else {
  //         return pet;
  //       }
  //     })
  //   );
  // };

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
    const error = await editPet(petId, newPetData);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetId = (petId: Pet["id"]) => {
    setSelectedPetId(petId);
  };

  // const handleCheckoutPet = async (petId: string) => {
  // setPets((prev) => prev.filter((pet) => pet.id !== petId));
  // setSelectedPetId(null);
  // };

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "checkout", payload: petId });
    const error = await checkoutPet(petId);

    if (error) {
      toast.warning(error.message);
      return;
    }

    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
