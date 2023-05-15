import { faker } from "@faker-js/faker";
import { PrismaClient, Product } from "@prisma/client";
import * as dotenv from "dotenv";
import { generateSlugSeed } from "./generateSlugSeed";

dotenv.config();
const prisma = new PrismaClient();

const createProducts = async (
  name,
  price,
  images = [],
  value = 1,
  description = "",
  categoryName = "нету"
) => {
  const products: Product[] = [];

  const product = await prisma.product.create({
    data: {
      name,
      slug: generateSlugSeed(name),
      description,
      price,
      images,
      value,
      category: {
        create: {
          name: categoryName,
          slag: generateSlugSeed(categoryName),
        },
      },
      Review: {
        create: [
          {
            rating: faker.datatype.number({ min: 1, max: 5 }),
            text: faker.lorem.paragraph(),
            user: {
              connect: {
                id: 3,
              },
            },
          },
          {
            rating: faker.datatype.number({ min: 1, max: 5 }),
            text: faker.lorem.paragraph(),
            user: {
              connect: {
                id: 3,
              },
            },
          },
        ],
      },
    },
  });

  console.log(`Create ${value} products`);
};

async function main() {
  console.log("creating element...");
  await createProducts(
    "Чайник",
    200,
    [
      "https://avatars.mds.yandex.net/get-mpic/5284139/img_id7525624030977745735.jpeg/orig",
    ],
    30,
    "Ча́йник — полое изделие (сосуд) различной формы с крышкой, ручкой и носиком (также существуют чайники без носика), предназначенное для кипячения воды и заваривания чая.",
    "чайник"
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
