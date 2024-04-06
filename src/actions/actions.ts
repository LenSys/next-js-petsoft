"use server";

import { Pet } from ".prisma/client";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

// export async function addPet(formData) {
//   try {
//     await prisma.pet.create({
//       data: {
//         name: formData.get("name"),
//         ownerName: formData.get("ownerName"),
//         imageUrl:
//           formData.get("imageUrl") ||
//           "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
//         age: parseInt(formData.get("age")),
//         notes: formData.get("notes"),
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Could not add pet.",
//     };
//   }

//   revalidatePath("/app", "layout");
// }

// export async function editPet(petId, formData) {
//   try {
//     await prisma.pet.update({
//       where: {
//         id: petId,
//       },
//       data: {
//         name: formData.get("name"),
//         ownerName: formData.get("ownerName"),
//         age: parseInt(formData.get("age")),
//         imageUrl:
//           formData.get("imageUrl") ||
//           "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
//         notes: formData.get("notes"),
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Could not edit pet.",
//     };
//   }

//   revalidatePath("/app", "layout");
// }

// export async function checkoutPet(petId) {
//   try {
//     await prisma.pet.delete({
//       where: {
//         id: petId,
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Could not checkout pet.",
//     };
//   }

//   revalidatePath("/app", "layout");
// }

export async function addPet(pet: unknown) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPet: unknown) {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPet);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: unknown) {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not checkout pet.",
    };
  }

  revalidatePath("/app", "layout");
}
