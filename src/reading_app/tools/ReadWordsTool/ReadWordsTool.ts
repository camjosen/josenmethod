import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import type { Tool } from "../../../tools/Tool.ts";
import {
  READ_WORDS_TOOL_DESCRIPTION,
  READ_WORDS_TOOL_NAME,
  READ_WORDS_TOOL_PROMPT,
} from "./Prompt.ts";

export const inputSchema = z
  .object({
    flow: z
      .array(
        z.union([
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
            .describe(`The student says the word normally, the "fast" way.`),
        ]),
      )
      .nonempty()
      .describe("The student tasks for each item."),
    modifications: z
      .array(
        z.union([
          z
            .literal("require_touch")
            .describe(
              "Require the student to touch each sound as they say it.",
            ),
          z
            .literal("repeat_until_firm")
            .describe(
              "Repeat the list of words until all words are read fluently.",
            ),
          z
            .literal("teach_silent_letters")
            .describe(
              `Explain the special visual treatment given to silent letters ("little sounds"), and teach the student to skip them.`,
            ),
          z
            .literal("teach_funny_words")
            .describe(
              `Introduce "funny words" whose sounds don't match how the word is actually said.`,
            ),
        ]),
      )
      .optional()
      .describe("Activity-level modifications"),
    items: z.array(wordSchema).describe("The words to read."),
  })
  .describe("Student reads individual words.");

export type ReadWordsToolInput = z.infer<typeof inputSchema>;

export const ReadWordsTool = {
  name: READ_WORDS_TOOL_NAME,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return READ_WORDS_TOOL_DESCRIPTION;
  },
  prompt: async () => {
    return READ_WORDS_TOOL_PROMPT;
  },
} satisfies Tool<typeof inputSchema, string[]>;
