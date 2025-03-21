"use client"

// import { addProduct } from "@/prisma-db";
// import { redirect } from "next/navigation";
// import Submit from "@/components/submit";
import { useActionState } from "react";
import { FormState, Errors, createProduct } from "@/actions/products";

// Form validation useActionState Hook
// type Errors = {
//   title?: string;
//   price?: string;
//   description?: string;
// };

// type FormState = {
//   errors: Errors;
// };

export default function AddProductPage() {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState
  );

  // // Server action
  // async function createProduct(formData: FormData) {
  //   "use server";

  //   // console.log(formData);
  //   const title = formData.get("title") as string;
  //   const price = formData.get("price") as string;
  //   const description = formData.get("description") as string;

  //   const errors: Errors = {};

  //   if (!title) {
  //     errors.title = "Title is required!!";
  //   }

  //   if (!price) {
  //     errors.price = "Price is required!!";
  //   }

  //   if (!description) {
  //     errors.description = "Description is required!!";
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     return { errors: errors };
  //   }

  //   await addProduct(title, parseInt(price), description);
  //   redirect("/products-db");
  // }

  return (
    <form action={formAction} className="p-4 space-y-6 max-w-96">
      <div>
        <label className="text-white">
          Title
          <input
            type="text"
            className="block w-full p-2 text-black border rounded bg-white"
            name="title"
          />
        </label>
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div>
        <label className="text-white">
          Price
          <input
            type="number"
            className="block w-full p-2 text-black border rounded bg-white"
            name="price"
          />
        </label>
        {state.errors.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>

      <div>
        <label className="text-white">
          Description
          <textarea
            className="block w-full p-2 text-black border rounded bg-white"
            name="description"
          />
        </label>
        {state.errors.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>

      {/* <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 mt-6"
        // disabled={loading}
      > */}
      {/* {loading ? "Submitting..." : "Submit"} */}
      {/* Add Product */}
      {/* </button> */}

      {/* <Submit /> */}

      <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 mt-6"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
