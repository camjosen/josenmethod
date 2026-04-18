import { z } from "zod/v4";
import { soundSchema, wordSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const writingTaskSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("sound"),
    sound: soundSchema,
  }),
  z.object({
    type: z.literal("word"),
    word: wordSchema,
  }),
]);

export const inputSchema = z.object({
  tasks: z
    .array(writingTaskSchema)
    .describe("The writing tasks for the student to complete."),
});

export type WritingTask = z.infer<typeof writingTaskSchema>;
export type WritingToolInput = z.infer<typeof inputSchema>;

export const WritingTool: Tool<typeof inputSchema, string[]> = {
  name: "Writing",
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
};
