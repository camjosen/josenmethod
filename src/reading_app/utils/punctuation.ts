import { z } from "zod/v4";

export const punctuationSchema = z.union([
  z.literal("period").describe("A period (.) at the end of a statement."),
  z
    .literal("exclamation_mark")
    .describe("An exclamation mark (!) for emphasis or excitement."),
  z
    .literal("question_mark")
    .describe("A question mark (?) at the end of a question."),
  z
    .literal("quotation_mark")
    .describe("A quotation mark (\") surrounding spoken dialogue."),
  z.literal("comma").describe("A comma (,) used for pauses and lists."),
]);

export type Punctuation = z.infer<typeof punctuationSchema>;
