import { z } from "zod/v4";
import {
  soundDefinitionSchema,
  wordSchema,
} from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z
  .discriminatedUnion("variant", [
    z.object({
      variant: z.literal("common_start"),
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
    }),
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
