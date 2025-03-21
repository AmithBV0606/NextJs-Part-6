import { removeProduct } from "@/actions/products";
import { getProducts } from "@/prisma-db";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDBPage() {
  const products: Product[] = await getProducts();

  return (
    <div>
      <ul className="space-y-4 p-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">
                <Link href={`/products-db/${product.id}`}>{product.title}</Link>
              </h2>
              <p>{product.description}</p>
              <p className="text-lg font-medium">${product.price}</p>
            </div>

            <form action={removeProduct.bind(null, product.id)}>
              <button
                type="submit"
                className="bg-red-500 text-white capitalize py-2 px-4 rounded-[5px] cursor-pointer hover:bg-red-700"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}