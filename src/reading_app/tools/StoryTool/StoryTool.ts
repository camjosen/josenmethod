import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { punctuationSchema } from "../../utils/punctuation.ts";
import { Tool } from "../../../tools/Tool.ts";
import {
  STORY_TOOL_DESCRIPTION,
  STORY_TOOL_NAME,
  STORY_TOOL_PROMPT,
} from "./Prompt.ts";

const questions = z.array(z.string().nonempty()).nonempty().optional();

const sentence = z
  .object({
    words: z
      .array(z.union([wordSchema, punctuationSchema]))
      .describe("The words in the sentence."),
    firstReadingQuestions: questions.describe(
      "Questions for student during the first reading.",
    ),
    secondReadingQuestions: questions.describe(
      "Questions for student during the second reading.",
    ),
  })
  .describe("A setnence in a story.");

const titleSchema = sentence.describe("The title of the story");

const paragraph = z.object({
  sentences: z.array(sentence),
});

const content = z
  .object({
    title: titleSchema.optional().describe("The title of the story."),
    paragraphs: z.array(paragraph),
  })
  .describe("The paragraphs of the story.");

const fluencyExpectation = z
  .union([
    z.literal("beginner:sound_out_each_word"),
    z.literal("intermediate:say_each_word_the_fast_way"),
    z.literal("advanced:read_like_a_storyteller"),
  ])
  .describe("");

const fluencyExpectationRank: Record<
  z.infer<typeof fluencyExpectation>,
  number
> = {
  "beginner:sound_out_each_word": 0,
  "intermediate:say_each_word_the_fast_way": 1,
  "advanced:read_like_a_storyteller": 2,
};

const scaffolding = z
  .object({
    // Phonics
    disambiguateSounds: z
      .boolean()
      .optional()
      .describe(
        `Whether to highlighting long vowels, digraphs, and "heart parts" (irregular pronunciations that must be memorized).`,
      ),
    visualizeBlending: z
      .boolean()
      .optional()
      .describe(
        "Help the student navigate each word smoothly, without stopping between sounds",
      ),

    // General
    visualizeReadingDirection: z.boolean().optional(),
    modelItFirst: z
      .enum(["first_word", "first_sentence", "full_story"])
      .optional()
      .describe(
        "Teacher demonstrates how to read some or all of the story at the expected fluency before the student attempts it.",
      ),
    directStudentAttention: z
      .enum(["each_word", "each_sentence", "each_paragraph"])
      .optional()
      .describe(
        "How often should the student's focus be directed? For example, should they be guided word by word?",
      ),
  })
  .describe("");

const askQuesitons = z
  .boolean()
  .describe("Whether to ask the student question while they read.");

export const inputSchema = z
  .object({
    content: content,
    firstReading: z
      .object({
        fluencyExpectation: fluencyExpectation,
        scaffolding: scaffolding.optional(),
        // TODO there should probably be a "student touches" option of some kind
      })
      .describe(
        "Fluency expectations and scaffolding should be configured such that the student feels successful.",
      ),
    secondReading: z
      .object({
        fluencyExpectation: fluencyExpectation,
        scaffolding: scaffolding.optional(),
        // TODO there should probably be a "student touches" option of some kind
      })
      .optional()
      .describe(
        "Either fluency expectations increase, scaffolding decreases, or both. The student should feel appropriately challenged.",
      ),
  })
  .describe("Student reads a short story.")
  .refine(
    ({ firstReading, secondReading }) =>
      secondReading != null &&
      fluencyExpectationRank[secondReading.fluencyExpectation] <
        fluencyExpectationRank[firstReading.fluencyExpectation],
    {
      path: ["secondReading", "difficulty"],
      message:
        "secondReading.difficulty must be less scaffolded than firstReading.difficulty (the second reading should push for more fluency).",
    },
  );

export type StoryToolInput = z.infer<typeof inputSchema>;

export const StoryTool = {
  name: STORY_TOOL_NAME,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return STORY_TOOL_DESCRIPTION;
  },
  prompt: async () => {
    return STORY_TOOL_PROMPT;
  },
} satisfies Tool<typeof inputSchema, string[]>;
