# Next.js PetSoft

Next.js PetSoft created with HtML, CSS, TypeScript and Next.js.

Created during React Tutorial
https://bytegrad.com/app/professional-react-and-nextjs/

![Screenshot](screenshot.png)

## Learnings

- Route groups (folder with parenthesis)
- Add Shadcn UI

## Install Next.js

```bash
npx create-next-app@14.1.0 .
```

## Install Shadcn UI

```bash
npx shadcn-ui@0.8.0 init
npx shadcn-ui@0.8.0 add button
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
