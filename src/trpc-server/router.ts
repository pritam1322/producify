
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { router, publicProcedure } from "./index";

const prisma = new PrismaClient();

export const appRouter = router({
  addProduct: publicProcedure
  .input(
    z.object({
      name: z.string(),
      category: z.string(),
      price: z.number(),
      warranty: z.string(),
      description: z.string(),
      freeDelivery: z.boolean(),
      ownerEmail: z.string().email(),
      instagram: z.string().url(),
      url: z.string(),
      images: z.string().array(),
    }),
  )
  .mutation(async ({ input }) => {
    const product = await prisma.product.create({
      data: {
        name: input.name,
        category: input.category,
        price: input.price,
        warranty: input.warranty,
        description: input.description,
        freeDelivery: input.freeDelivery,
        ownerEmail: input.ownerEmail,
        instagram: input.instagram,
        url: input.url,
        images: input.images,
      },
    });
    return product;
  }),
  getProducts: publicProcedure
  .input(
    z.object({
      where: z.object({
        id: z.number().optional(),
      })

    })
  )
  .query(async ({input}) => {
    const { id } = input.where;

    if(id){
      // Fetch a specific product by ID if provided
      const product = await prisma.product.findUnique({
        where: { id }, // Find product by ID
      });
      return product;
    }
    const products = await prisma.product.findMany();
    return products;
  }),
  getAllProducts : publicProcedure
  .query(async() => {
    const products = await prisma.product.findMany();
    return products;
  })
});

export type AppRouter = typeof appRouter;