import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { Tool } from "../../../tools/Tool.ts";
import { soundDefinitionSchema } from "../../utils/sounds.ts";
import {
  WRITING_TOOL_DESCRIPTION,
  WRITING_TOOL_NAME,
  WRITING_TOOL_PROMPT,
} from "./Prompt.ts";

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
  name: WRITING_TOOL_NAME,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return WRITING_TOOL_DESCRIPTION;
  },
  prompt: async () => {
    return WRITING_TOOL_PROMPT;
  },
} satisfies Tool<typeof inputSchema, string[]>;
