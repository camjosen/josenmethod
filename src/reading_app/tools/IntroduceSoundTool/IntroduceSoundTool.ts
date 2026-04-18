import { z } from "zod/v4";
import { soundSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z.object({
  sound: soundSchema.describe(
    "The sound that the student will practice reading during this activity.",
  ),
});

export type IntroduceSoundToolInput = z.infer<typeof inputSchema>;

export const IntroduceSoundTool: Tool<typeof inputSchema, string[]> = {
  name: "IntroduceSound",
  call: async (input) => {
    // For demonstration purposes, we'll just return the sounds as they are.
    // In a real implementation, you might want to do something more complex here.
    return { data: [] };
  },
  description: async (input) => {
    return "";
  },
};
