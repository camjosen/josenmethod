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
          z.literal("slowly").describe("Student says each sound slowly."),
          z.literal("say_it_fast").describe("Student says each sound quickly."),
        ]),
      )
      .describe("The tasks the student completes for each sound."),
    modifications: z
      .array(
        z.union([
          z
            .literal("require_touch")
            .describe(
              "Require the student to touch each sound as they say it.",
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
