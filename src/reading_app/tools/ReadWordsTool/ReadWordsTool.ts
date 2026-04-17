import { z } from "zod/v4";
import { soundSchema, userTypeSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z.object({
  turns: z.array(userTypeSchema),
});

export type ReadWordsToolInput = z.infer<typeof inputSchema>;

export const ReadWordsTool: Tool<typeof inputSchema, string[]> = {
  name: "ReadWords",
  call: async (input) => {
    // For demonstration purposes, we'll just return the sounds as they are.
    // In a real implementation, you might want to do something more complex here.
    return { data: [] };
  },
  description: async (input) => {
    return `This tool helps students practice reading sounds. The student will read the following sounds: ${input.turns.join(", ")}. The turns for this activity are: ${input.turns.join(", ")}.`;
  },
};
