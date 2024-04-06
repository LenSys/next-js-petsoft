"use server";

import { Pet } from ".prisma/client";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
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

export async function addPet(pet: PetEssentials) {
  await sleep(1000);
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPet: PetEssentials) {
  await sleep(1000);
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPet,
    });
  } catch (error) {
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: Pet["id"]) {
  await sleep(1000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Could not checkout pet.",
    };
  }

  revalidatePath("/app", "layout");
}
