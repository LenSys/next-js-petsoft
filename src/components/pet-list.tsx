"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  );

  return (
    <ul>
      {filteredPets.map((pet) => (
        <li key={pet.id} className="bg-white border-b border-light">
          <button
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition",
              { "bg-[#eff1f2]": pet.id === selectedPetId }
            )}
            onClick={() => handleChangeSelectedPetId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              height={45}
              width={45}
              className="rounded-full object-cover size-[45px]"
            />
            <p className="semi-bold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
