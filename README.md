# Next.js PetSoft

Next.js PetSoft created with HtML, CSS, TypeScript and Next.js.

Created during React Tutorial
https://bytegrad.com/app/professional-react-and-nextjs/

![Screenshot](screenshot.png)

## Learnings

- Route groups (folder with parenthesis)
- Add Shadcn UI
- Nested Layout for specific routes
- Create dashboard page
- Create a responsive Grid Layout
- Use Context API for pets
- When using ContextProvider (as client), the wrapped components do not automatically become client components as well, because the children pattern is used -> a server component only becomes a client components if we import it!
- Add search pet feature
- Create account page
- Customize reusable components with cn()
- Add pet buttons for CRUD-Actions
- Add delete (checkout) functionality for a pet
- Implement functionality to add and edit a pet
- Add Shadcn UI dialog
- Add Shadcn Input + Label + Textarea elements
- Omit elements in type
- Prefill edit pet form
- Add SQLite database and use Prisma ORM
- Create a model in Prisma
- Seed the database
- Get data from database with Prisma instead of fetch API:

```TS
const pets = await prisma.pet.findMany();
```

- Use action on form instead of onSubmit: server actions (progressive enhancement)
- Add revalidatePath in server actions to update the UI
- Add loading state for server actions
- Use sonner toast (Shadcn UI) for error state messages
- useOptimistic for Optimistic UI -> remove loading state
- flushSync(): force update of state immediately
- Prisma types: create types from Prisma model
- Add React-Hook-Form with validation
- Add validation with Zod
- Infer TypeScript Type from Zod
- Use Zod Schema for client + server validation

## Install Next.js

```bash
npx create-next-app@14.1.0 .
```

## Install Shadcn UI

```bash
npx shadcn-ui@0.8.0 init
npx shadcn-ui@0.8.0 add button
npx shadcn-ui@0.8.0 add dialog
npx shadcn-ui@0.8.0 add label input textarea
npx shadcn-ui@0.8.0 add sonner
```

## Install Prisma

```bash
npm install typescript@5 ts-node@10.9.1 @types/node@20 --save-dev
npm install prisma@5.8.1 --save-dev
```

## Create a database

```bash
npx prisma init --datasource-provider sqlite
```

## Create a table in the database

```bash
npx prisma db push
```

## Seed the database

```bash
npx prisma db seed
```

## Install React-Hook-Form

```bash
npm install react-hook-form@7.47.0
```

## Install Zod

```bash
npm install zod@3.22.4
npm install @hookform/resolvers@3.3.2
```

## Other Learnings

- Server actions with form data
- Revalidate path after server action
- Add data on client-side before sending to server with useOptimisticUI
- Progressive enhancement -> no JS necessary
- Zod: validate input data from:
  - form data
  - URL
  - localStorage
  - API requests
  - third-party API
- Infer type from Schema with Zod:

```JS
import { z } from "zod";

const productSchema = z.object({
	name: z.string(),
	price: z.number()
});

type Product = z.infer<typeof productSchema>

const getPriceFromProduct = (product: Product) => {
	const validatedProduct = productSchema.safeParse(product);

	if (!validatedProduct) {
		console.log(validatedProduct.error);
		return 0;
	}

	return validatedProduct.data.price;
}
```

- localStorage validation:

```JS
import { z } from "zod";

const cartSchema = z.array(z.object({
	id: z.number(),
	quantity: z.number().int().positive()
}));

export default function Cart() {
	const cart = JSON.parse(localStorage.getItem('cart') || "{}");

	const validatedCart = cartSchema.safeParse(cart);

	if (!validatedCart.success) {
		localStorage.removeItem('cart');
		return;
	}

	// access cart data
	console.log(validatedCart.data.map((item) => item.id));

	return <div>Cart</div>;
}
```

- URL (searchParams) validation:

```JS
import { z } from "zod";
import { useSearchParams } from "next/navigation";

const searchParamsSchema = z.object({
	// ensure id is a number (automatically transfer to number)
	id: z.coerce.number(),
	color: z.enum(["red", "green", "blue"])
});

export default function Product() {
	const searchParams = useSearchParams();

	const searchParamsObject = Object.fromEntries(searchParams);
	const validatedSearchParams = searchParamsSchema.safeParse(searchParamsObject);

	if (!validatedSearchParams.success) {
		return;
	}

	console.log(validatedSearchParams.data.id);

	return <div>Product</div>;
}
```
