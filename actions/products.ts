"use server";

import { addProduct, updateProduct } from "@/prisma-db";
import { redirect } from "next/navigation";

// Form validation useActionState Hook
export type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

export type FormState = {
  errors: Errors;
};

// Server action
export async function createProduct(prevState: FormState, formData: FormData) {
  // console.log(formData);
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required!!";
  }

  if (!price) {
    errors.price = "Price is required!!";
  }

  if (!description) {
    errors.description = "Description is required!!";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  await addProduct(title, parseInt(price), description);
  redirect("/products-db");
}

export async function editProduct(
  id: number,
  prevState: FormState,
  formData: FormData
) {
  // console.log(formData);
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required!!";
  }

  if (!price) {
    errors.price = "Price is required!!";
  }

  if (!description) {
    errors.description = "Description is required!!";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  await updateProduct(id, title, parseInt(price), description);
  redirect("/products-db");
}