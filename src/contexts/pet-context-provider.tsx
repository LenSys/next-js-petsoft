"use client";

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
  handleChangeSelectedPetId: (petId: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // state
  const [pets, setPets] = useState<TPet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers / actions
  const handleChangeSelectedPetId = (petId: string) => {
    setSelectedPetId(petId);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
