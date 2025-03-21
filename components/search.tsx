import Form from "next/form";

export const Search = () => {
  return (
    <form action="/products-db" className="flex gap-2">
      <input
        name="query"
        placeholder="Search products"
        className=" flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none bg-white text-black"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
