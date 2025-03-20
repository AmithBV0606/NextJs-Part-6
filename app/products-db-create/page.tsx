import { addProduct } from "@/prisma-db";
import { redirect } from "next/navigation";
import Submit from "@/components/submit";

export default function AddProductPage() {
  // Server action
  async function createProduct(formData: FormData) {
    "use server";

    // console.log(formData);
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    await addProduct(title, parseInt(price), description);
    redirect("/products-db");
  }

  return (
    <form action={createProduct} className="p-4 space-y-6 max-w-96">
      <label className="text-white">
        Title
        <input
          type="text"
          className="block w-full p-2 text-black border rounded bg-white"
          name="title"
        />
      </label>

      <label className="text-white">
        Price
        <input
          type="number"
          className="block w-full p-2 text-black border rounded bg-white"
          name="price"
        />
      </label>

      <label className="text-white">
        Description
        <textarea
          className="block w-full p-2 text-black border rounded bg-white"
          name="description"
        />
      </label>

      {/* <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 mt-6"
        // disabled={loading}
      > */}
      {/* {loading ? "Submitting..." : "Submit"} */}
      {/* Add Product */}
      {/* </button> */}

      <Submit />
    </form>
  );
}