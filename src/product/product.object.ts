import { Prisma } from "@prisma/client";
import { categoryObject } from "src/category/category.object";
import { reviewObject } from "src/review/review.object";

export const productObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
};

export const productObjectFullset: Prisma.ProductSelect = {
  ...productObject,
  Review: {
    select: reviewObject,
  },
  category: { select: categoryObject },
};
