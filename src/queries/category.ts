"use server";

import { Category } from "@/generated/prisma";
import { db } from "@/lib/db";
import { verifyAdminUser } from "@/queries/auth";

export const upsertCategory = async (
  category: Omit<Category, "createdAt" | "updatedAt">
) => {
  try {
    await verifyAdminUser();
    if (!category) throw new Error("Please provide category data");
    const existingCategory = await db.category.findFirst({
      where: {
        AND: [
          { OR: [{ name: category.name }, { url: category.url }] },
          {
            NOT: { id: category.id },
          },
        ],
      },
    });
    if (existingCategory) {
      let errorMessage = "";
      if (existingCategory.name === category.name) {
        errorMessage = "A category with the same name already exists";
      } else if (existingCategory.url === category.url) {
        errorMessage = "A category with the same URL already exists";
      }
      throw new Error(errorMessage);
    }
    const { id, ...dataForUpsert } = category;
    const categoryDetail = await db.category.upsert({
      where: { id: id },
      update: dataForUpsert,
      create: dataForUpsert,
    });
    return categoryDetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCategories = async () => {
  await verifyAdminUser();
  const list = await db.category.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return list || [];
};

export const deleteCategory = async (id: string) => {
  await verifyAdminUser();
  const category = await db.category.delete({
    where: { id },
  });
  return category;
};

export const getCategory = async (id: string) => {
  await verifyAdminUser();
  const category = await db.category.findUnique({
    where: { id },
  });
  return category;
};
