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
  words: z.array(wordSchema).describe("The words in the title."),
});

export const inputSchema = z
  .object({
    title: titleSchema.optional().describe("The title of the story."),
    content: z
      .object({
        paragraphs: z.object({
          sentences: z.object({
            words: z
              .array(z.union([wordSchema, punctuationSchema]))
              .describe("The words in the sentence."),
            questions: z
              .array(z.string().nonempty())
              .nonempty()
              .optional()
              .describe("Questions to assess understanding of the sentence."),
          }),
          questions: z
            .array(z.string().nonempty())
            .nonempty()
            .optional()
            .describe("Questions to assess understanding of the paragraph."),
        }),
        questions: z
          .array(z.string().nonempty())
          .nonempty()
          .optional()
          .describe("Questions to assess understanding of the story."),
      })
      .describe("The paragraphs of the story."),
    markup: z
      .array(z.union([z.literal("arrows"), z.literal("dots")]))
      .describe(
        "Visual markup style: arrows show direction of reading, dots mark individual sounds.",
      ),
    items: z
      .array(
        z.union([
          z
            .literal("guided_sound_it_out")
            .describe(
              "Teacher guides the student through the story one word at a time.",
            ),
          z
            .literal("sound_it_out")
            .describe(
              "Student sounds out each word in the story, one at a time.",
            ),
          z
            .literal("sound_it_out_with_questions")
            .describe(
              "Student sounds out each word in the story, one at a time and is asked questions along the way.",
            ),
          z
            .literal("teacher_models_say_it_fast")
            .describe(
              "Teacher models reading the story at a normal, fluent pace.",
            ),
          z
            .literal("guided_say_it_fast")
            .describe("Student reads each sentence at a normal fluent pace."),
          z
            .literal("say_it_fast")
            .describe("Student reads each sentence at a normal fluent pace."),
          z
            .literal("say_it_fast_with_questions")
            .describe(
              "Student reads each sentence at a normal fluent pace and is asked questions along the way.",
            ),
          z.literal("title_reading").describe("Student reads the story title."),
        ]),
      )
      .describe("The tasks the student completes with this story."),
  })
  .describe("Student reads a short story.");

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
