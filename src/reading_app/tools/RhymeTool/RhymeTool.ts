import { z } from "zod/v4";
import {
  soundDefinitionSchema,
  wordSchema,
} from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z.object({
  startingSound: soundDefinitionSchema.describe(
    "The sound that all words begin with.",
  ),
  words: z.array(wordSchema),
});

export type RhymeToolInput = z.infer<typeof inputSchema>;

export const RhymeTool = {
  name: "Rhyme" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
