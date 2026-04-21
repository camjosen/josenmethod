import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { Tool } from "../../../tools/Tool.ts";

const base = z.object({
  items: z.array(wordSchema),
});

export const inputSchema = z
  .discriminatedUnion("variant", [
    base
      .extend({
        variant: z.literal("scaffolded"),
        itemTasks: z
          .array(
            z.union([
              z
                .literal("touch_sounds")
                .describe(
                  "Student touches each sound as it is spoken to practice methodical movement from left to right.",
                ),
              z
                .literal("recall_sounds")
                .describe(
                  "Student recalls each sound, one at a time, at the teacher's prompting.",
                ),
              z
                .literal("teacher_blends")
                .describe(
                  "The teacher says the word slowly, blending sounds without stopping.",
                ),
              z
                .literal("guided_sound_it_out")
                .describe(
                  "Teacher prompts the student for each sound, then the student blends.",
                ),
              z
                .literal("sound_it_out")
                .describe("Student sounds the word on their own."),
              z
                .literal("blend")
                .describe(
                  "Student says the word slowly, blending sounds without stopping.",
                ),
              z
                .literal("say_it_fast")
                .describe(
                  `The student says the word normally, the "fast" way.`,
                ),
            ]),
          )
          .describe("The student tasks for each item."),
      })
      .describe("Student sounds out each word."),
    base
      .extend({
        variant: z.literal("silent_letters_intro"),
      })
      .describe(
        `Introduce the concept of a "little sound" that won't be spoken aloud and will be rendered differently from the other sounds.`,
      ),
    base
      .extend({
        variant: z.literal("introduce_funny_word"),
      })
      .describe(
        `Introduce a "funny word" — a word whose pronunciation doesn't follow the usual phonics rules. The teacher explains that this word is special.`,
      ),
  ])
  .describe("Student reads individual words.");

export type ReadWordsToolInput = z.infer<typeof inputSchema>;

export const ReadWordsTool = {
  name: "ReadWords" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
