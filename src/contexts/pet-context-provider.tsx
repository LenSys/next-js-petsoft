"use client";

import { addPet } from "@/actions/actions";
import { TPet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: TPet[];
};

type TPetContext = {
  pets: TPet[];
  selectedPetId: string | null;
  selectedPet: TPet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<TPet, "id">) => void;
  handleEditPet: (petId: string, newPetData: Omit<TPet, "id">) => void;
  handleChangeSelectedPetId: (petId: string) => void;
  handleCheckoutPet: (petId: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  // state
  // const [pets, setPets] = useState<TPet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers / actions
  const handleAddPet = async (newPet: Omit<TPet, "id">) => {
    // const newPetId = Date.now().toString();

    // setPets((prev) => [...prev, { ...newPet, id: newPetId }]);
    // setSelectedPetId(newPetId);

    await addPet(newPet);
  };

  const handleEditPet = (petId: string, newPetData: Omit<TPet, "id">) => {
    // setPets((prev) =>
    //   prev.map((pet) => {
    //     if (pet.id === petId) {
    //       return {
    //         id: petId,
    //         ...newPetData,
    //       };
    //     } else {
    //       return pet;
    //     }
    //   })
    // );
  };

  const handleChangeSelectedPetId = (petId: string) => {
    setSelectedPetId(petId);
  };

  const handleCheckoutPet = (petId: string) => {
    // setPets((prev) => prev.filter((pet) => pet.id !== petId));
    // setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
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
