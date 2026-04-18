import { z } from "zod/v4";
import { soundSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("teach"),
    sounds: z
      .array(soundSchema)
      .describe("The sounds being introduced for the first time."),
  }),
  z.object({
    mode: z.literal("reteach"),
    sounds: z
      .array(soundSchema)
      .describe(
        "The sounds being re-introduced, possibly after a failed recall check.",
      ),
  }),
  z.object({
    mode: z.literal("recall_check"),
    sounds: z
      .array(soundSchema)
      .describe("The sounds the student will read from memory."),
  }),
]);

export type ReadSoundsToolInput = z.infer<typeof inputSchema>;

export const ReadSoundsTool: Tool<typeof inputSchema, string[]> = {
  name: "ReadSounds",
  call: async (input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
};
