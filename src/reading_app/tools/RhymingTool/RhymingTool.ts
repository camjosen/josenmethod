import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { soundDefinitionSchema } from "../../utils/sounds.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z
  .object({
    items: z.array(
      z.object({
        startingSound: soundDefinitionSchema,
        ending: wordSchema,
        fullWord: wordSchema,
      }),
    ),
    flow: z
      .array(
        z.union([
          z.literal("read_start").describe("Student says the starting sound."),
          z.literal("hear_ending").describe("Teacher says the ending aloud."),
          z
            .literal("blend")
            .describe(
              "Student says the rhyme slowly, without stopping between sounds.",
            ),
          z.literal("say_it_fast").describe("Student says the rhyme quickly."),
        ]),
      )
      .nonempty()
      .describe("The student tasks for each item."),
    modifications: z
      .array(
        z.union([
          z
            .literal("teacher_models")
            .describe(
              "Before the student rhymes, the teacher demonstrates the rhyme.",
            ),
        ]),
      )
      .optional()
      .describe("Activity-level modifications"),
  })
  .describe(
    `An easier version of reading entire words that focuses on "rhyming" where only the first sound is displayed.`,
  );

export type RhymingToolInput = z.infer<typeof inputSchema>;

export const RhymingTool = {
  name: "Rhyming" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
