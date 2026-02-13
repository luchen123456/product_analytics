import { z } from 'zod';

export const CreateCrawlJobBodySchema = z
  .object({
    keyword: z.string().trim().min(1).optional(),
    productUrl: z.string().trim().url().optional(),
    shopId: z.string().trim().min(1).optional(),
    pages: z.number().int().min(1).max(50).optional().default(5)
  })
  .refine((v) => Boolean(v.keyword || v.productUrl || v.shopId), {
    message: 'One of keyword/productUrl/shopId is required'
  });

export type CreateCrawlJobBody = z.infer<typeof CreateCrawlJobBodySchema>;

