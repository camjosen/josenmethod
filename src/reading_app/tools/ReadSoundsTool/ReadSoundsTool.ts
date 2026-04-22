import { z } from "zod/v4";
import { soundDefinitionSchema } from "../../utils/sounds.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z
  .object({
    items: z
      .array(soundDefinitionSchema)
      .describe("The sounds for the student to see then say."),
    flow: z
      .array(
        z.union([
          z
            .literal("introduction")
            .describe("Teacher introduces each sound to the student."),
          z
            .literal("reintroduction")
            .describe(
              "Teacher reintroduces sounds the student may not know well yet.",
            ),
          z
            .literal("say_it_slowly")
            .describe(
              "Student practices saying each slowly in preparation for future word-reading activities where blending is required.",
            ),
          z.literal("say_it_fast").describe("Student says each sound quickly."),
        ]),
      )
      .nonempty()
      .describe("The sequence of tasks for each sound."),
    modifications: z
      .array(
        z.union([
          z
            .literal("require_touch")
            .describe(
              "Encourage active reading by requiring the student to touch each sound being said.",
            ),
        ]),
      )
      .optional()
      .describe("Activity-level modifications"),
  })
  .describe("Teach individual sounds.");

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
