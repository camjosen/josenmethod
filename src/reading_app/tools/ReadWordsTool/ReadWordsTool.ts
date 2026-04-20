import { z } from "zod/v4";
import { wordSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const base = z.object({
  words: z.array(wordSchema),
});

export const inputSchema = z
  .discriminatedUnion("variant", [
    base
      .extend({
        variant: z.literal("sound_it_out"),
        scaffold: z
          .union([
            z
              .literal("maximum")
              .describe(
                "Teacher sounds it out as the student touches each sound.",
              ),
            z
              .literal("very_high")
              .describe(
                "Teacher sounds out the entire word. Student repeats it, slowly, without stopping between sounds.",
              ),
            z
              .literal("high")
              .describe(
                "Teacher prompts student for every sound. Teacher sounds it out. Student says it fast.",
              ),
            z
              .literal("medium")
              .describe(
                "Teacher prompts student for every sound. Student says it fast.",
              ),
            z
              .literal("low")
              .describe(
                "Teacher prompts student for every sound. Student says it slowly without stopping, then fast.",
              ),
          ])
          .optional()
          .describe("How much additional support the student receives"),
      })
      .describe("Student sounds out each word."),
  ])
  .describe("Student reads individual words.");

export type ReadWordsToolInput = z.infer<typeof inputSchema>;

export const ReadWordsTool = {
  name: "ReadWords" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
