import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { Tool } from "../../../tools/Tool.ts";
import { soundDefinitionSchema } from "../../utils/sounds.ts";

const WritingTaskSchema = z.union([soundDefinitionSchema, wordSchema]);

export const inputSchema = z
  .object({
    items: z
      .array(WritingTaskSchema)
      .describe("The sounds or words for the student to practice."),
  })
  .describe(
    `Have the student practice tracing and freehanding sounds and words, not to improve handwriting, but to build familiarity with the shapes of the symbols.`,
  );

export type WritingTask = z.infer<typeof WritingTaskSchema>;
export type WritingToolInput = z.infer<typeof inputSchema>;

export const WritingTool = {
  name: "Writing" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
