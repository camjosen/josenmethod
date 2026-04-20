import { z } from "zod/v4";
import { soundDefinitionSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const base = z.object({
  items: z
    .array(soundDefinitionSchema)
    .describe("The sounds for the student to see then say."),
});

export const inputSchema = z
  .discriminatedUnion("variant", [
    base
      .extend({
        variant: z.literal("introduce"),
      })
      .describe("Introduce new sounds to a student."),
    base
      .extend({
        variant: z.literal("reintroduce"),
      })
      .describe("Reintroduced sounds the student may not know well yet."),
    base
      .extend({
        variant: z.literal("recall"),
        slowThenFast: z
          .boolean()
          .optional()
          .describe(
            "Whether the student should say each sound fast after saying it slowly.",
          ),
        touchIt: z
          .boolean()
          .optional()
          .describe(
            "Whether the student must touch the sounds while saying them.",
          ),
      })
      .describe(
        "Challenge the student to recall sounds from memory, saying them slowly.",
      ),
  ])
  .describe(`Teeach individual sounds.`);

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
