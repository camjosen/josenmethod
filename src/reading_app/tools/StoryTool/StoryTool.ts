import { z } from "zod/v4";
import { wordSchema } from "../../utils/words.ts";
import { punctuationSchema } from "../../utils/punctuation.ts";
import { Tool } from "../../../tools/Tool.ts";
import {
  STORY_TOOL_DESCRIPTION,
  STORY_TOOL_NAME,
  STORY_TOOL_PROMPT,
} from "./Prompt.ts";

const titleSchema = z.object({
  words: z.array(wordSchema).nonempty().describe("The words in the title."),
});

const sentence = z.object({
  words: z
    .array(z.union([wordSchema, punctuationSchema]))
    .describe("The words in the sentence."),
  questions: z
    .array(z.string().nonempty())
    .nonempty()
    .optional()
    .describe(
      'On "_with_questions" items, the student is asked these questions when then finish reading the sentence.',
    ),
});

const paragraph = z.object({
  sentences: z.array(sentence),
});

const content = z
  .object({
    title: titleSchema.optional().describe("The title of the story."),
    paragraphs: z.array(paragraph),
  })
  .describe("The paragraphs of the story.");

const fluencyMode = z.union([
  z.literal("high:sound_out_each_word_with_guidance"),
  z.literal("medium:sound_out_each_word"),
  z.literal("low:read_the_fast_way_with_guidance"),
  z.literal("none:read_the_fast_way"),
]);

const scaffoldingRank: Record<z.infer<typeof fluencyMode>, number> = {
  "high:sound_out_each_word_with_guidance": 3,
  "medium:sound_out_each_word": 2,
  "low:read_the_fast_way_with_guidance": 1,
  "none:read_the_fast_way": 0,
};

const hints = z.object({
  longVowels: z.boolean(),
  digraphs: z.boolean(),
  funnyWords: z.boolean(),
  soundTypes: z.boolean(),
  readingDirection: z.boolean(),
});

const additionalTasks = z.object({
  prereading_tasks: z
    .array(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("analyze_the_title"),
        }),
      ]),
    )
    .optional(),
  postreading_tasks: z
    .array(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("answer_comprehension_questions"),
        }),
      ]),
    )
    .optional(),
});

const modeling = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("teacher_reads_entire_story"),
  }),
  z.object({
    type: z.literal("teacher_reads_opening_sentences"),
    numSentences: z.number(),
  }),
]);

export const inputSchema = z
  .object({
    content: content,
    firstReading: z
      .object({
        fluencyMode: fluencyMode,
        hints: hints.optional(),
        additionalTasks: additionalTasks.optional(),
        modeling: modeling.optional(),
      })
      .describe("Typically a more scaffolded and easier experience."),
    secondReading: z
      .object({
        fluencyMode: fluencyMode,
        hints: hints.optional(),
        additionalTasks: additionalTasks.optional(),
        modeling: modeling.optional(),
      })
      .optional()
      .describe(
        "Typically a less scaffolded and more challenging experience, pushing for greater fluency, greater comprehension, or both.",
      ),
  })
  .describe("Student reads a short story.")
  .refine(
    ({ firstReading, secondReading }) =>
      !secondReading ||
      scaffoldingRank[secondReading.fluencyMode] <
        scaffoldingRank[firstReading.fluencyMode],
    {
      path: ["secondReading", "fluencyMode"],
      message:
        "secondReading.fluencyMode must be less scaffolded than firstReading.fluencyMode (the second reading should push for more fluency).",
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
