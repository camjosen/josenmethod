import { z } from "zod/v4";
import { wordSchema } from "../../utils/shared_schemas.ts";
import { punctuationSchema } from "../../utils/punctuation.ts";
import { Tool } from "../../../tools/Tool.ts";

const titleSchema = z.object({
  words: z.array(wordSchema).describe("The words in the title."),
});

export const inputSchema = z
  .object({
    title: titleSchema.optional().describe("The title of the story."),
    paragraphs: z
      .array(
        z
          .array(
            z
              .array(z.union([wordSchema, punctuationSchema]))
              .describe("The words in the sentence."),
          )
          .describe("The sentences of the paragraph."),
      )
      .describe("The paragraphs of the story."),
    markup: z
      .array(z.union([z.literal("arrows"), z.literal("dots")]))
      .describe(
        "Visual markup style: arrows show direction of reading, dots mark individual sounds.",
      ),
    itemTasks: z
      .array(
        z.union([
          z
            .literal("guide_word_by_word")
            .describe(
              "Teacher guides the student through the story one word at a time.",
            ),
          z
            .literal("teacher_models_the_fast_way")
            .describe(
              "Teacher models reading the story at a normal, fluent pace.",
            ),
          z
            .literal("picture_comprehension")
            .describe(
              "Student answers questions about the story using a picture for support.",
            ),
          z
            .literal("sound_it_out")
            .describe(
              "Student sounds out each word in the story, one at a time.",
            ),
          z
            .literal("read_the_fast_way_with_questions")
            .describe(
              "Student reads each sentence at a normal fluent pace; teacher asks comprehension questions after each sentence.",
            ),
          z
            .literal("title_reading")
            .describe("Student reads the story title."),
        ]),
      )
      .describe("The tasks the student completes with this story."),
  })
  .describe("Student reads a short story.");

export type StoryToolInput = z.infer<typeof inputSchema>;

export const StoryTool = {
  name: "Story" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
