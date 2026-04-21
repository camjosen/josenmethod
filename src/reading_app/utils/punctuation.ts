import { z } from "zod/v4";

export const punctuationSchema = z.union([
  z.literal("."),
  z.literal("!"),
  z.literal("?"),
  z.literal('"'),
  z.literal(","),
]);

export type Punctuation = z.infer<typeof punctuationSchema>;
