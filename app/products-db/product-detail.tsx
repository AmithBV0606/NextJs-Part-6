"use client";

import { removeProduct } from "@/actions/products";
import Link from "next/link";
import { useOptimistic } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export default function ProductsDetail({ products }: { products: Product[] }) {
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (currentProducts, productId) => {
      return currentProducts.filter((product) => product.id !== productId);
    }
  );

  const removeProductById = async (productId: number) => {
    setOptimisticProducts(productId);
    await removeProduct(productId);
  };

  return (
    <div>
      <ul className="space-y-4 p-4">
        {optimisticProducts.map((product) => (
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

            <form action={removeProductById.bind(null, product.id)}>
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