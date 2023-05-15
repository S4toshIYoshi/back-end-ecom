import { Prisma } from "@prisma/client";
import { UserObject } from "src/user/objects/user.object";

export const reviewObject: Prisma.ReviewSelect = {
  user: {
    select: UserObject,
  },
  createdAt: true,
  text: true,
  rating: true,
  id: true,
};
