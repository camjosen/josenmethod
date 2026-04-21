import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { soundDefinitionSchema } from "../../utils/sounds.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z
  .discriminatedUnion("variant", [
    z
      .object({
        variant: z.literal("prepend_a_sound"),
        items: z.array(
          z.object({
            startingSound: soundDefinitionSchema,
            ending: wordSchema,
            fullWord: wordSchema,
          }),
        ),
        scaffold: z
          .union([z.literal("teacher_models")])
          .optional()
          .describe("How much additional support the student receives"),
      })
      .describe(
        "The student plays adds and removes a common starting sound to experience simple rhymes (e.g., rat vs at and ram vs am).",
      ),
    z
      .object({
        variant: z.literal("prepend_multiple_sounds"),
        items: z.array(
          z.object({
            startingSound: soundDefinitionSchema,
            ending: wordSchema,
            fullWord: wordSchema,
          }),
        ),
        scaffold: z
          .union([z.literal("teacher_models")])
          .optional()
          .describe("How much additional support the student receives"),
      })
      .describe(
        "The student prepends different sounds to make new words (e.g., mat vs. sat vs. cat).",
      ),
  ])
  .describe(
    `An easier version of reading entire words that focuses on "rhyming" where only the first sound is displayed.`,
  );

export type RhymingToolInput = z.infer<typeof inputSchema>;

export const RhymingTool = {
  name: "Rhyming" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
