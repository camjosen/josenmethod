import { z } from "zod/v4";
import { soundDefinitionSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const base = z.object({
  sayItFast: z
    .boolean()
    .optional()
    .describe("If true, the should say the sound fast without 'holding' it."),
});

export const inputSchema = z.discriminatedUnion("variant", [
  base.extend({
    variant: z.literal("introduce"),
    items: z
      .array(soundDefinitionSchema)
      .describe("The sounds being introduced for the first time."),
  }),
  base.extend({
    variant: z.literal("reintroduce"),
    items: z
      .array(soundDefinitionSchema)
      .describe(
        "The sounds being re-introduced, possibly after a failed recall check.",
      ),
  }),
  base.extend({
    variant: z.literal("recall"),
    items: z
      .array(soundDefinitionSchema)
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
