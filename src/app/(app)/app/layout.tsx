import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
// import { TPet } from "@/lib/types";
import prisma from "@/lib/db";

const petsUrl = "https://bytegrad.com/course-assets/projects/petsoft/api/pets";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  // const response = await fetch(petsUrl);

  // if (!response.ok) {
  //   throw new Error("Could not fetch pets");
  // }

  // const pets: TPet[] = await response.json();

  const pets = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] min-h-screen mx-auto px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
