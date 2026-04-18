import { z } from "zod/v4";
import { soundSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const base = z.object({
  sayItFast: z
    .boolean()
    .optional()
    .describe("If true, the should say the sound fast without 'holding' it."),
});

export const inputSchema = z.discriminatedUnion("mode", [
  base.extend({
    mode: z.literal("teach"),
    sounds: z
      .array(soundSchema)
      .describe("The sounds being introduced for the first time."),
  }),
  base.extend({
    mode: z.literal("reteach"),
    sounds: z
      .array(soundSchema)
      .describe(
        "The sounds being re-introduced, possibly after a failed recall check.",
      ),
  }),
  base.extend({
    mode: z.literal("recall_check"),
    sounds: z
      .array(soundSchema)
      .describe("The sounds the student will read from memory."),
  }),
]);

export type ReadSoundsToolInput = z.infer<typeof inputSchema>;

export const ReadSoundsTool = {
  name: "ReadSounds" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
