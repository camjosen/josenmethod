import { z } from "zod/v4";
import {
  soundDefinitionSchema,
  wordSchema,
} from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const WriteTaskSchema = z.union([soundDefinitionSchema, wordSchema]);

export const inputSchema = z.object({
  items: z
    .array(WriteTaskSchema)
    .describe("The write tasks for the student to complete."),
});

export type WriteTask = z.infer<typeof WriteTaskSchema>;
export type WriteToolInput = z.infer<typeof inputSchema>;

export const WriteItTool = {
  name: "WriteIt" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
